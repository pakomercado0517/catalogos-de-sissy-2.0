import { useState, useEffect } from "react";
import { Navbar } from "flowbite-react";
import { useSelector } from "react-redux";
import logo from "../assets/logo-white.png";
import { Link } from "react-router-dom";

function SissyNavbar() {
  const [name, setName] = useState("");
  const company = useSelector((state) => state.company);

  useEffect(() => {
    if (company) setName(company.name);

    return () => {
      setName("");
    };
  }, [company, name]);

  return (
    <section className="fixed top-0 z-50 w-full">
      <Navbar fluid className="bg-dark-900/45 backdrop-blur-sm ">
        <Navbar.Brand>
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="logo store"
              className="mr-3 h-16 transition-transform hover:scale-105"
            />
            <span className="hover:text-accent self-center whitespace-nowrap text-xl font-semibold italic text-white/90 transition-colors">
              Catálogos de Sissy
            </span>
          </Link>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <div className=""></div>
          <Navbar.Toggle />
        </div>
        {name && (
          <h2 className="text-accent/90 text-lg font-bold italic sm:hidden lg:block">
            {name?.toUpperCase()}
          </h2>
        )}
        <Navbar.Collapse>
          <Link
            className="hover:text-accent px-4 py-2 text-lg font-semibold text-white/80 transition-colors"
            to="/"
          >
            Inicio
          </Link>
          <Link
            className="hover:text-accent px-4 py-2 text-lg font-semibold text-white/80 transition-colors"
            to="/contact"
          >
            Cotizaciones
          </Link>
        </Navbar.Collapse>
      </Navbar>
    </section>
  );
}

export default SissyNavbar;
