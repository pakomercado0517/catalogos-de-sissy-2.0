import { Routes, Route } from "react-router-dom";
import SissyNavbar from "./components/SissyNavbar";
import Home from "./pages/Home";
import Catalogos from "./pages/Catalogos";
import SissyFooter from "./components/SissyFooter";

function App() {
  return (
    <section>
      <SissyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogos/:name" element={<Catalogos />} />
      </Routes>
      <SissyFooter />
    </section>
  );
}

export default App;
