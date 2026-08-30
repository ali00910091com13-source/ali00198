import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ADMIN_CREDENTIALS,
  Order,
  OrderStatus,
  Product,
  SEED_ORDERS,
  SEED_PRODUCTS,
} from "./data";

/* ------------------------------------------------------------------ */

export interface CartLine {
  id: string;
  qty: number;
}

export interface Toast {
  id: number;
  msg: string;
  kind: "ok" | "warn" | "info";
}

type AgeStatus = "unknown" | "ok" | "denied";

interface CheckoutInfo {
  customer: string;
  email: string;
  address: string;
}

interface StoreValue {
  products: Product[];
  orders: Order[];
  cart: CartLine[];
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  cartCount: number;
  cartSubtotal: number;
  cartLines: { product: Product; qty: number }[];
  addToCart: (id: string, qty?: number, open?: boolean) => void;
  setCartQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  checkout: (info: CheckoutInfo) => Order;
  saveProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  toasts: Toast[];
  toast: (msg: string, kind?: Toast["kind"]) => void;
  dismissToast: (id: number) => void;
  ageStatus: AgeStatus;
  verifyAge: () => void;
  denyAge: () => void;
  resetAge: () => void;
  authed: boolean;
  login: (u: string, p: string) => boolean;
  logout: () => void;
  orderBump: number;
}

const StoreContext = createContext<StoreValue | null>(null);

/* ------------------------------------------------------------------ */

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or unavailable — app keeps working in memory */
  }
}

/* ------------------------------------------------------------------ */

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() =>
    load("sc_products_v1", SEED_PRODUCTS)
  );
  const [orders, setOrders] = useState<Order[]>(() => load("sc_orders_v1", SEED_ORDERS));
  const [cart, setCart] = useState<CartLine[]>(() => load("sc_cart_v1", []));
  const [cartOpen, setCartOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [ageStatus, setAgeStatus] = useState<AgeStatus>(() =>
    (sessionStorage.getItem("sc_age") as AgeStatus) || "unknown"
  );
  const [authed, setAuthed] = useState<boolean>(
    () => sessionStorage.getItem("sc_admin") === "1"
  );
  const [orderBump, setOrderBump] = useState(0);
  const toastId = useRef(0);

  useEffect(() => save("sc_products_v1", products), [products]);
  useEffect(() => save("sc_orders_v1", orders), [orders]);
  useEffect(() => save("sc_cart_v1", cart), [cart]);

  /* ---------------- toasts ---------------- */

  const dismissToast = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const toast = useCallback(
    (msg: string, kind: Toast["kind"] = "ok") => {
      const id = ++toastId.current;
      setToasts((t) => [...t.slice(-2), { id, msg, kind }]);
      window.setTimeout(() => dismissToast(id), 3000);
    },
    [dismissToast]
  );

  /* ---------------- cart ---------------- */

  const addToCart = useCallback(
    (id: string, qty = 1, open = false) => {
      setCart((c) => {
        const existing = c.find((l) => l.id === id);
        if (existing)
          return c.map((l) => (l.id === id ? { ...l, qty: Math.min(l.qty + qty, 99) } : l));
        return [...c, { id, qty }];
      });
      const p = products.find((x) => x.id === id);
      toast(p ? `${p.name} added to cart` : "Added to cart", "ok");
      if (open) setCartOpen(true);
      setOrderBump((n) => n + 1);
    },
    [products, toast]
  );

  const setCartQty = useCallback((id: string, qty: number) => {
    setCart((c) =>
      qty <= 0
        ? c.filter((l) => l.id !== id)
        : c.map((l) => (l.id === id ? { ...l, qty: Math.min(qty, 99) } : l))
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((c) => c.filter((l) => l.id !== id));
  }, []);

  const cartLines = useMemo(
    () =>
      cart
        .map((l) => ({ product: products.find((p) => p.id === l.id), qty: l.qty }))
        .filter((x): x is { product: Product; qty: number } => Boolean(x.product)),
    [cart, products]
  );

  const cartCount = useMemo(() => cart.reduce((s, l) => s + l.qty, 0), [cart]);
  const cartSubtotal = useMemo(
    () => cartLines.reduce((s, l) => s + l.product.price * l.qty, 0),
    [cartLines]
  );

  const checkout = useCallback(
    (info: CheckoutInfo): Order => {
      const subtotal = cartLines.reduce((s, l) => s + l.product.price * l.qty, 0);
      const shipping = subtotal >= 150 || subtotal === 0 ? 0 : 12;
      const order: Order = {
        id: "SC-" + String(Math.floor(90000 + Math.random() * 9999)).slice(0, 5),
        customer: info.customer,
        email: info.email,
        address: info.address,
        items: cartLines.map((l) => ({
          id: l.product.id,
          name: l.product.name,
          price: l.product.price,
          qty: l.qty,
          image: l.product.image,
        })),
        subtotal,
        shipping,
        total: subtotal + shipping,
        date: new Date().toISOString(),
        status: "pending",
      };
      setOrders((o) => [order, ...o]);
      setProducts((ps) =>
        ps.map((p) => {
          const line = cart.find((l) => l.id === p.id);
          return line ? { ...p, stock: Math.max(0, p.stock - line.qty) } : p;
        })
      );
      setCart([]);
      return order;
    },
    [cart, cartLines]
  );

  /* ---------------- admin ---------------- */

  const saveProduct = useCallback((p: Product) => {
    setProducts((ps) => {
      const exists = ps.some((x) => x.id === p.id);
      return exists ? ps.map((x) => (x.id === p.id ? p : x)) : [p, ...ps];
    });
  }, []);

  const deleteProduct = useCallback(
    (id: string) => {
      setProducts((ps) => ps.filter((p) => p.id !== id));
      setCart((c) => c.filter((l) => l.id !== id));
    },
    []
  );

  const updateOrderStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((os) => os.map((o) => (o.id === id ? { ...o, status } : o)));
  }, []);

  const login = useCallback(
    (u: string, p: string) => {
      const ok = u.trim() === ADMIN_CREDENTIALS.username && p === ADMIN_CREDENTIALS.password;
      if (ok) {
        setAuthed(true);
        sessionStorage.setItem("sc_admin", "1");
      }
      return ok;
    },
    []
  );

  const logout = useCallback(() => {
    setAuthed(false);
    sessionStorage.removeItem("sc_admin");
  }, []);

  /* ---------------- age gate ---------------- */

  const verifyAge = useCallback(() => {
    setAgeStatus("ok");
    sessionStorage.setItem("sc_age", "ok");
  }, []);

  const denyAge = useCallback(() => {
    setAgeStatus("denied");
    sessionStorage.setItem("sc_age", "denied");
  }, []);

  const resetAge = useCallback(() => {
    setAgeStatus("unknown");
    sessionStorage.removeItem("sc_age");
  }, []);

  /* ---------------- value ---------------- */

  const value: StoreValue = {
    products,
    orders,
    cart,
    cartOpen,
    setCartOpen,
    cartCount,
    cartSubtotal,
    cartLines,
    addToCart,
    setCartQty,
    removeFromCart,
    checkout,
    saveProduct,
    deleteProduct,
    updateOrderStatus,
    toasts,
    toast,
    dismissToast,
    ageStatus,
    verifyAge,
    denyAge,
    resetAge,
    authed,
    login,
    logout,
    orderBump,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
