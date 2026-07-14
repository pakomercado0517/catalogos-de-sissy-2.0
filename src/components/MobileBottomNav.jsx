import { Link, useLocation } from "react-router-dom";
import MaterialIcon from "./MaterialIcon";

export default function MobileBottomNav() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  if (!isHome) return null;

  const scrollToBrands = () => {
    document.getElementById("marcas")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around border-t border-white/5 bg-background/95 py-4 backdrop-blur-lg md:hidden">
      <Link
        to="/"
        className="flex flex-col items-center gap-1 text-primary"
      >
        <MaterialIcon name="home" filled />
        <span className="font-label-sm text-[10px]">Inicio</span>
      </Link>
      <button
        type="button"
        onClick={scrollToBrands}
        className="flex flex-col items-center gap-1 text-on-surface-variant"
      >
        <MaterialIcon name="grid_view" />
        <span className="font-label-sm text-[10px]">Catálogos</span>
      </button>
      <a
        href="https://wa.me/527831362077"
        target="_blank"
        rel="noreferrer"
        className="flex flex-col items-center gap-1 text-on-surface-variant"
      >
        <MaterialIcon name="receipt_long" />
        <span className="font-label-sm text-[10px]">Cotizar</span>
      </a>
      <a
        href={`mailto:shirsava14@gmail.com`}
        className="flex flex-col items-center gap-1 text-on-surface-variant"
      >
        <MaterialIcon name="person" />
        <span className="font-label-sm text-[10px]">Contacto</span>
      </a>
    </nav>
  );
}
