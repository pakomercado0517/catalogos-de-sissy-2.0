import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SissyFooter() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="mt-stack-lg w-full border-t border-white/5 bg-surface-container-lowest">
      <div className="mx-auto flex w-full max-w-container-max flex-col items-center justify-between px-margin-x py-stack-lg md:flex-row">
        <div className="mb-6 md:mb-0">
          <span className="font-headline-lg text-headline-lg font-bold text-primary">
            Catálogos de Sissy
          </span>
          <p className="font-label-sm text-label-sm mt-2 text-on-surface-variant opacity-60">
            Tu conexión con las mejores marcas.
          </p>
        </div>
        <div className="mb-6 flex flex-wrap justify-center gap-8 md:mb-0">
          <a
            href="mailto:shirsava14@gmail.com"
            className="font-label-sm text-label-sm text-on-surface-variant transition-colors hover:text-secondary-fixed"
          >
            Contacto
          </a>
          <Link
            to="/"
            className="font-label-sm text-label-sm text-on-surface-variant transition-colors hover:text-secondary-fixed"
          >
            Inicio
          </Link>
          <a
            href="tel:+527831362077"
            className="font-label-sm text-label-sm text-on-surface-variant transition-colors hover:text-secondary-fixed"
          >
            783-136-2077
          </a>
        </div>
        <div className="font-label-sm text-label-sm text-secondary">
          © {year} Catálogos de Sissy. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
