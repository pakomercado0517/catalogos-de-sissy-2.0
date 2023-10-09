"use client";
import { Navbar } from "flowbite-react";
import logo from "../assets/logo-white.png";
import { Link } from "react-router-dom";

function SissyNavbar() {
  return (
    <section className="mb-6">
      <Navbar fluid rounded className="bg-bgDark shadow-lg">
        <Navbar.Brand href="/">
          <img src={logo} alt="logo store" className="mr-3 h-6 sm:h-9" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Catálogos de Sissy
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
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
