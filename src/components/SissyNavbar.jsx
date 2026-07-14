/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaWhatsapp } from "react-icons/fa";
import MaterialIcon from "./MaterialIcon";
import logoWhite from "../assets/logo-white.png";

export default function SissyNavbar({
  brandSearch = "",
  onBrandSearchChange,
  catalogSearch = "",
  onCatalogSearchChange,
}) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isCatalog = location.pathname.startsWith("/catalogos/");
  const company = useSelector((state) => state.company);
  const [searchFocused, setSearchFocused] = useState(false);

  const companyName =
    company && typeof company === "object" ? company.name : "";

  const searchValue = isCatalog ? catalogSearch : brandSearch;
  const onSearchChange = isCatalog
    ? onCatalogSearchChange
    : onBrandSearchChange;
  const showSearch = Boolean(onSearchChange);
  const searchPlaceholder = isCatalog
    ? companyName
      ? `Buscar en ${companyName}...`
      : "Buscar catálogo..."
    : "Buscar marcas...";
  const searchAriaLabel = isCatalog ? "Buscar catálogo" : "Buscar marcas";

  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b border-white/5 bg-background/80 shadow-sm backdrop-blur-md">
      <div className="relative mx-auto flex h-full w-full max-w-container-max items-center justify-between px-margin-x">
        <div className="flex min-w-[2.5rem] items-center gap-3">
          {isCatalog && (
            <Link
              to="/"
              className="text-on-surface-variant transition-colors hover:text-on-surface"
              aria-label="Volver al inicio"
            >
              <MaterialIcon name="arrow_back" />
            </Link>
          )}
          <Link to="/" aria-label="Catálogos de Sissy" className="shrink-0">
            <img
              src={logoWhite}
              alt="Catálogos de Sissy"
              className="h-10 w-10 rounded-md object-cover"
            />
          </Link>
        </div>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          <Link
            to="/"
            className={`font-title-md text-title-md border-b-2 pb-1 ${
              isHome
                ? "border-primary text-primary"
                : "border-transparent text-on-surface-variant transition-colors duration-200 hover:text-on-surface"
            }`}
          >
            Inicio
          </Link>
          <a
            href="https://wa.me/527831362077"
            target="_blank"
            rel="noreferrer"
            className="font-title-md text-title-md border-b-2 border-transparent pb-1 text-on-surface-variant transition-colors duration-200 hover:text-on-surface"
          >
            Cotizaciones
          </a>
        </nav>

        <div className="flex items-center gap-4">
          {showSearch && (
            <div
              className={`relative hidden sm:block ${
                searchFocused ? "rounded-full ring-2 ring-primary/20" : ""
              }`}
            >
              <MaterialIcon
                name="search"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
              />
              <input
                type="search"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="font-label-sm text-label-sm h-9 w-48 rounded-full border border-outline/20 bg-surface-container-lowest py-0 pl-10 pr-4 transition-all duration-300 focus:w-64 focus:border-primary"
                placeholder={searchPlaceholder}
                aria-label={searchAriaLabel}
              />
            </div>
          )}
          <a
            href="https://wa.me/527831362077"
            target="_blank"
            rel="noreferrer"
            className="text-on-surface-variant transition-colors hover:text-primary"
            aria-label="WhatsApp"
          >
            <FaWhatsapp className="text-xl" aria-hidden />
          </a>
        </div>
      </div>
    </header>
  );
}
