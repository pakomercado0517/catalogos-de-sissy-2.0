/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCataloguesByCompany,
  resetCataloguesByCompany,
  getCompanyById,
} from "../redux/actions";
import { useParams } from "react-router-dom";
import SissyCard from "../components/SissyCard";
import CardSkeleton from "./CardSkeleton";
import ApiErrorMessage from "./ApiErrorMessage";
import { ensureArray } from "../utils/ensureArray";

const DESKTOP_PAGE_SIZE = 9;
const MOBILE_PAGE_SIZE = 6;
const MD_MEDIA_QUERY = "(min-width: 768px)";

export default function SissyCatalogues() {
  const dispatch = useDispatch();
  const currentCatalogues = ensureArray(
    useSelector((state) => state.currentCatalogues),
  );
  const error = useSelector((state) => state.apiErrors.companyCatalogues);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(MD_MEDIA_QUERY).matches
      : false,
  );

  const pageSize = isDesktop ? DESKTOP_PAGE_SIZE : MOBILE_PAGE_SIZE;

  useEffect(() => {
    const mediaQuery = window.matchMedia(MD_MEDIA_QUERY);
    const onChange = () => setIsDesktop(mediaQuery.matches);
    onChange();
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [id, pageSize]);

  const totalPages = Math.max(
    1,
    Math.ceil(currentCatalogues.length / pageSize),
  );

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const paginatedCatalogues = useMemo(() => {
    const start = (page - 1) * pageSize;
    return currentCatalogues.slice(start, start + pageSize);
  }, [currentCatalogues, page, pageSize]);

  const goToPage = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fetchCatalogues = async () => {
    setIsLoading(true);
    await dispatch(getCataloguesByCompany(id));
    await dispatch(getCompanyById(id));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCatalogues();

    return () => {
      dispatch(resetCataloguesByCompany());
      dispatch(getCompanyById(""));
    };
  }, [id]);

  return (
    <section className="px-6 pt-28">
      {error && (
        <ApiErrorMessage
          message={error}
          onRetry={fetchCatalogues}
          className="mx-auto mb-8 max-w-xl"
        />
      )}

      <div className="grid justify-items-center gap-10 md:grid-cols-2 md:justify-items-center lg:grid-cols-3">
        {isLoading ? (
          <>
            {[...Array(pageSize)].map((_, index) => (
              <div key={index} className="w-80 animate-fade-up">
                <CardSkeleton />
              </div>
            ))}
          </>
        ) : error ? null : currentCatalogues.length > 0 ? (
          paginatedCatalogues.map((cat) => (
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
      </div>

      {!isLoading &&
        !error &&
        currentCatalogues.length > pageSize && (
          <nav
            className="mx-auto mt-12 flex max-w-md flex-col items-center gap-4 pb-16 sm:flex-row sm:justify-between"
            aria-label="Paginación de catálogos"
          >
            <p className="text-sm text-white/60">
              Página {page} de {totalPages}
              <span className="mx-2 hidden sm:inline">·</span>
              <span className="block sm:inline">
                {currentCatalogues.length} catálogos
              </span>
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => goToPage(page - 1)}
                disabled={page <= 1}
                className="rounded-lg border border-white/20 bg-dark-800 px-4 py-2 text-sm text-white transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/20 disabled:hover:text-white"
              >
                Anterior
              </button>
              <button
                type="button"
                onClick={() => goToPage(page + 1)}
                disabled={page >= totalPages}
                className="rounded-lg border border-white/20 bg-dark-800 px-4 py-2 text-sm text-white transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/20 disabled:hover:text-white"
              >
                Siguiente
              </button>
            </div>
          </nav>
        )}
    </section>
  );
}
