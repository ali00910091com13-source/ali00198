import { useEffect } from "react";
import { HashRouter, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { StoreProvider } from "./store";
import { AgeGate, CartDrawer, Footer, Navbar, SmokeBackground, WarningTicker } from "./chrome";
import { ToastViewport } from "./ui";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import { About, Contact, NotFound } from "./pages/Static";
import { AdminRoot, Overview } from "./admin/Admin";
import { OrdersAdmin, ProductsAdmin } from "./admin/Manage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

function PublicLayout() {
  return (
    <div className="min-h-screen relative flex flex-col">
      <SmokeBackground />
      <WarningTicker />
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <CartDrawer />
      <AgeGate />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/admin" element={<AdminRoot />}>
            <Route index element={<Overview />} />
            <Route path="products" element={<ProductsAdmin />} />
            <Route path="orders" element={<OrdersAdmin />} />
          </Route>
        </Routes>
        <ToastViewport />
      </HashRouter>
    </StoreProvider>
  );
}
