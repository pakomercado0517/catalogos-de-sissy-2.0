import {
  Cklass,
  Andrea,
  PriceShoes,
  Concord,
  Betterware,
} from "../Db/catalogos";
import { useParams } from "react-router-dom";
import SissyCard from "../components/SissyCard";
import "./styles/Catalogos.css";

export default function Catalogos() {
  const { name } = useParams();
  const allCatalogues = { Cklass, Andrea, PriceShoes, Concord, Betterware };
  const companyCatalogues = allCatalogues[`${name}`];

  return (
    <section className="grid justify-center gap-3 md:grid-cols-2 md:justify-items-center lg:grid-cols-4">
      {companyCatalogues.map((cat, i) => {
        return (
          <a
            href={cat.url}
            target="_blank"
            rel="noreferrer"
            key={i}
            className="catalogoCard"
          >
            <SissyCard imgURL={cat.image}>
              {cat.name ? <h2 className="text-center">{cat.name}</h2> : ""}
            </SissyCard>
          </a>
        );
      })}
    </section>
  );
}
