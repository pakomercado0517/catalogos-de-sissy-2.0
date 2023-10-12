import { useState, useEffect } from "react";
import { Spinner } from "flowbite-react";
import {
  Cklass,
  Andrea,
  PriceShoes,
  Concord,
  Betterware,
} from "../Db/catalogos";
import { useParams } from "react-router-dom";
import SissyCard from "../components/SissyCard";
// import ModalCatalogue from "../components/ModalCatalogue";
import "./styles/Catalogos.css";

export default function Catalogos() {
  // const [openModal, setOpenModal] = useState(false);
  // const [catData, setCatData] = useState({});
  const [getCatalogs, setGetCatalogs] = useState([]);
  const { name } = useParams();
  const allCatalogues = { Cklass, Andrea, PriceShoes, Concord, Betterware };
  const companyCatalogues = allCatalogues[`${name}`];

  useEffect(() => {
    const getAllCatalogs = async () => {
      await setGetCatalogs(companyCatalogues);
    };
    getAllCatalogs();
  }, [companyCatalogues]);

  // const handleOpenModal = (name, url) => {
  //   setOpenModal(true);
  //   setCatData({ name, url });
  // };

  // const closeModal = () => {
  //   setOpenModal(false);
  // };

  return (
    <section className="grid justify-center gap-3 md:grid-cols-2 md:justify-items-center lg:grid-cols-4">
      {getCatalogs.map((cat, i) => {
        return cat ? (
          <a
            href={cat.url}
            target="_blank"
            rel="noreferrer"
            key={i}
            className="animate-fade-down animate-once"
          >
            <SissyCard imgURL={cat.image}>
              {cat.name ? <h2 className="text-center">{cat.name}</h2> : ""}
            </SissyCard>
          </a>
        ) : (
          <Spinner aria-label="Purple spinner" color="purple" />
        );

        // <div key={i} onClick={() => handleOpenModal(cat.name, cat.url)}>
        //   <SissyCard imgURL={cat.image}>
        //     {cat.name ? <h2 className="text-center">{cat.name}</h2> : ""}
        //   </SissyCard>
        // </div>
      })}
      {/* <div>
        <ModalCatalogue
          openModal={openModal}
          close={closeModal}
          catalogueName={catData.name}
          catalogueURL={catData.url}
        />
      </div> */}
    </section>
  );
}
