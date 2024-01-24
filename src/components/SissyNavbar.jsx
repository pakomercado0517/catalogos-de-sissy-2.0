"use client";
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
    <section className="mb-6 fixed top-0 z-30 w-full">
      <Navbar fluid rounded className="bg-bgDark shadow-lg">
        <div>
          <Link to="/" className="flex">
            <img src={logo} alt="logo store" className="mr-3 h-6 sm:h-9" />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Catálogos de Sissy
            </span>
          </Link>
        </div>
        <div className="flex md:order-2">
          <div className="flex items-center mr-2">
            <h2 className="text-lg font-bold italic"> {name?.toUpperCase()}</h2>
          </div>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Link to="/">Inicio</Link>
          <Link to="/contact">Cotizaciones</Link>
        </Navbar.Collapse>
      </Navbar>
    </section>
  );
}

export default SissyNavbar;
