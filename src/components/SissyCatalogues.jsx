/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCataloguesByCompany,
  resetCataloguesByCompany,
  getCompanyById,
} from "../redux/actions";
import { useParams } from "react-router-dom";
import SissyCard from "../components/SissyCard";
import CardSkeleton from "./CardSkeleton";

export default function SissyCatalogues() {
  const dispatch = useDispatch();
  const currentCatalogues = useSelector((state) => state.currentCatalogues);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCatalogues = async () => {
      setIsLoading(true);
      await dispatch(getCataloguesByCompany(id));
      await dispatch(getCompanyById(id));
      setIsLoading(false);
    };

    fetchCatalogues();

    return () => {
      dispatch(resetCataloguesByCompany());
      dispatch(getCompanyById(""));
    };
  }, [id]);

  return (
    <section className="grid justify-items-center gap-10 px-6 pt-28 md:grid-cols-2 md:justify-items-center lg:grid-cols-3">
      {isLoading ? (
        <>
          {[...Array(6)].map((_, index) => (
            <div key={index} className="w-80 animate-fade-up">
              <CardSkeleton />
            </div>
          ))}
        </>
      ) : currentCatalogues.length > 0 ? (
        currentCatalogues.map((cat) => (
          <a
            href={cat.url}
            target="_blank"
            rel="noreferrer"
            key={cat.id}
            className="animate-fade-down animate-once"
          >
            <SissyCard image={cat.image}>
              {cat.name ? <h2 className="text-center">{cat.name}</h2> : ""}
            </SissyCard>
          </a>
        ))
      ) : (
        <div className="col-span-full text-center text-lg italic text-white/70">
          No se encontraron catálogos
        </div>
      )}
    </section>
  );
}
