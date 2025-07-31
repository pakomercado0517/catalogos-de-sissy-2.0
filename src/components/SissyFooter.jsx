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
    <section className="border-dark-700/50 mt-20">
      <Footer container className="bg-transparent backdrop-blur-sm">
        <div className="w-full px-4 py-8">
          <div className="grid w-full justify-between gap-12 sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-3">
                <img
                  src={logo}
                  alt="Catalogos de sissy Logo"
                  className="h-10 transition-transform hover:scale-105"
                />
                <span className="text-lg italic text-gray-300">
                  Catálogos de Sissy
                </span>
              </div>
              <span className="mt-4 text-sm italic text-white/60">
                Tu estilo, tu elección
              </span>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-2 sm:gap-10">
              <div>
                <Footer.Title
                  title="Enlaces"
                  className="font-playfair text-white/90"
                />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="/"
                    className="hover:text-accent text-white/70 transition-colors"
                  >
                    Inicio
                  </Footer.Link>
                  <Footer.Link
                    href="#"
                    className="hover:text-accent text-white/70 transition-colors"
                  >
                    Cotiza tus Productos
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title
                  title="Contáctanos"
                  className="font-playfair text-white/90"
                />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="#"
                    className="hover:text-accent text-white/70 transition-colors"
                  >
                    Tuxpan, Veracruz. México
                  </Footer.Link>
                  <Footer.Link
                    href="tel:+527831362077"
                    className="hover:text-accent text-white/70 transition-colors"
                  >
                    783-136-2077
                  </Footer.Link>
                  <Footer.Link
                    href="mailto:shirsava14@gmail.com"
                    className="hover:text-accent text-white/70 transition-colors"
                  >
                    shirsava14@gmail.com
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
          <Footer.Divider className="border-dark-700/30 my-6" />
          <div className="w-full text-center sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright
              by="Catálogos de Sissy™"
              href="#"
              year={year}
              className="italic text-white/60"
            />
          </div>
        </div>
      </Footer>
    </section>
  );
}
