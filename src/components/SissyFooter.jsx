import { useState, useEffect } from "react";
import { Footer } from "flowbite-react";
import logo from "../assets/logo-white.png";

export default function SissyFooter() {
  const [year, setYear] = useState();

  useEffect(() => {
    const newYear = new Date().getFullYear();
    setYear(newYear);
  }, []);

  return (
    <section className="mt-6 border-t-2 border-gray-600">
      <Footer container bgDark>
        <div className="w-full">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div>
              <Footer.Brand
                alt="Catalogos de sissy Logo"
                href="/"
                name="Catálogos de Sissy"
                src={logo}
              />
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
              <div>
                <Footer.Title title="links" />
                <Footer.LinkGroup col>
                  <Footer.Link href="/">Inicio</Footer.Link>
                  <Footer.Link href="#">Cotiza tus Productos</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Contáctanos" />
                <Footer.LinkGroup col>
                  <Footer.Link href="#">Tuxpan, Veracruz. México</Footer.Link>
                  <Footer.Link href="#">783-136-2077</Footer.Link>
                  <Footer.Link href="#">shirsava14@gmail.com</Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
          <Footer.Divider />
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright by="Catálogos de Sissy™" href="#" year={year} />
          </div>
        </div>
      </Footer>
    </section>
  );
}
