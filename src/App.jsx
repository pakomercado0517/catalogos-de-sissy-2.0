import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import SissyNavbar from "./components/SissyNavbar";
import Home from "./pages/Home";
import Catalogos from "./pages/Catalogos";
import SissyFooter from "./components/SissyFooter";
import ChatBox from "./components/ChatBox";
import MobileBottomNav from "./components/MobileBottomNav";

function App() {
  const location = useLocation();
  const [brandSearch, setBrandSearch] = useState("");
  const [catalogSearch, setCatalogSearch] = useState("");
  const isCatalogRoute = location.pathname.startsWith("/catalogos/");

  useEffect(() => {
    if (!isCatalogRoute) {
      setCatalogSearch("");
    }
  }, [isCatalogRoute]);

  return (
    <section className="min-h-screen bg-background font-body-lg text-on-background">
      <SissyNavbar
        brandSearch={brandSearch}
        onBrandSearchChange={setBrandSearch}
        catalogSearch={catalogSearch}
        onCatalogSearchChange={setCatalogSearch}
      />
      <Routes>
        <Route
          path="/"
          element={<Home brandSearch={brandSearch} key={location.key} />}
        />
        <Route
          key={location.key}
          path="/catalogos/:id"
          element={<Catalogos catalogSearch={catalogSearch} />}
        />
      </Routes>
      <SissyFooter />
      <MobileBottomNav />
      {!isCatalogRoute && <ChatBox />}
    </section>
  );
}

export default App;
