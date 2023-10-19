import { useState, useEffect } from "react";
import { Spinner } from "flowbite-react";
import allCatalogues from "../Db/catalogos.json";
import { useParams } from "react-router-dom";
import SissyCard from "../components/SissyCard";
import "./styles/Catalogos.css";

export default function Catalogos() {
  const [getCatalogs, setGetCatalogs] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    //buscamos el nombre del catálogo dentro del objeto y guardamos el catálogo en el state para utilizarlo y renderizarlo
    allCatalogues.forEach((entry) => {
      for (const key in entry)
        if (Object.hasOwnProperty.call(entry, key)) {
          if (key === name) {
            const item = entry[name];
            setGetCatalogs(item);
          }
        }
    });
  }, [name]);

  return (
    <section className="grid justify-center gap-3 md:grid-cols-2 md:justify-items-center lg:grid-cols-4">
      {getCatalogs.map((cat, i) => {
        return cat ? (
          <a
            href={cat.href}
            target="_blank"
            rel="noreferrer"
            key={i}
            className="animate-fade-down animate-once"
          >
            <SissyCard imgURL={cat.imgSrc}>
              {cat.title ? <h2 className="text-center">{cat.title}</h2> : ""}
            </SissyCard>
          </a>
        ) : (
          <Spinner aria-label="Purple spinner" color="purple" />
        );
      })}
    </section>
  );
}
