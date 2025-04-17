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
    <section className="mb-8">
      <Navbar fluid rounded className="bg-neutral-900 shadow-lg">
        <Navbar.Brand>
          <Link to="/" className="flex">
            <img src={logo} alt="logo store" className="mr-3 h-20" />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Catálogos de Sissy
            </span>
          </Link>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <div className=""></div>
          <Navbar.Toggle />
        </div>
        <h2 className="text-lg font-bold italic sm:hidden lg:block">
          {" "}
          {name?.toUpperCase()}
        </h2>
        <Navbar.Collapse>
          <Link className="text-lg font-semibold" to="/">
            Inicio
          </Link>
          <Link className="text-lg font-semibold" to="/contact">
            Cotizaciones
          </Link>
        </Navbar.Collapse>
      </Navbar>
    </section>
  );
}

export default SissyNavbar;
