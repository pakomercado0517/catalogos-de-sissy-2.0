import { Routes, Route, useLocation } from "react-router-dom";
import SissyNavbar from "./components/SissyNavbar";
import Home from "./pages/Home";
import Catalogos from "./pages/Catalogos";
import SissyFooter from "./components/SissyFooter";
import UpdateCatalogos from "./pages/UpdateCatalogos";

function App() {
  const location = useLocation();

  return (
    <section>
      <SissyNavbar key={location.key} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          key={location.key}
          path="/catalogos/:id"
          element={<Catalogos />}
        />
        <Route path="/actualizar" element={<UpdateCatalogos />} />
      </Routes>
      <SissyFooter />
    </section>
  );
}

export default App;
