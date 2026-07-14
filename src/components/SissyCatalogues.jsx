/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCataloguesByCompany,
  resetCataloguesByCompany,
  getCompanyById,
  getCatalogCategories,
} from "../redux/actions";
import { useParams } from "react-router-dom";
import ApiErrorMessage from "./ApiErrorMessage";
import MaterialIcon from "./MaterialIcon";
import CatalogCard from "./catalog/CatalogCard";
import CatalogCardSkeleton from "./catalog/CatalogCardSkeleton";
import CategoryFilterNav from "./catalog/CategoryFilterNav";
import WhatsAppFab from "./catalog/WhatsAppFab";
import { ensureArray } from "../utils/ensureArray";
import { formatCategoryLabel } from "../utils/categoryDisplay";
import {
  catalogueMatchesCategory,
  catalogueMatchesSearch,
} from "../utils/catalogFilters";
import useCataloguePageLimit from "../hooks/useCataloguePageLimit";

export default function SissyCatalogues({ catalogSearch = "" }) {
  const dispatch = useDispatch();
  const currentCatalogues = ensureArray(
    useSelector((state) => state.currentCatalogues),
  );
  const pagination = useSelector(
    (state) => state.companyCataloguesPagination,
  );
  const catalogCategories = ensureArray(
    useSelector((state) => state.catalogCategories),
  );
  const company = useSelector((state) => state.company);
  const error = useSelector((state) => state.apiErrors.companyCatalogues);
  const { id } = useParams();
  const limit = useCataloguePageLimit();
  const [offset, setOffset] = useState(0);
  const [idSnapshot, setIdSnapshot] = useState(id);
  const [limitSnapshot, setLimitSnapshot] = useState(limit);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [localSearch, setLocalSearch] = useState("");

  if (id !== idSnapshot || limit !== limitSnapshot) {
    setIdSnapshot(id);
    setLimitSnapshot(limit);
    setOffset(0);
  }

  const companyName =
    company && typeof company === "object" ? company.name : "";
  const searchQuery = catalogSearch || localSearch;

  const filteredCatalogues = useMemo(() => {
    return currentCatalogues.filter(
      (cat) =>
        catalogueMatchesCategory(cat, activeCategory) &&
        catalogueMatchesSearch(cat, searchQuery),
    );
  }, [currentCatalogues, activeCategory, searchQuery]);

  const pageLimit = pagination?.limit || limit;
  const pageOffset = pagination?.offset ?? offset;
  const total = pagination?.total ?? 0;
  const hasMore = Boolean(pagination?.hasMore);
  const currentPage =
    pageLimit > 0 ? Math.floor(pageOffset / pageLimit) + 1 : 1;
  const totalPages =
    pageLimit > 0 && total > 0 ? Math.ceil(total / pageLimit) : 1;
  const showPagination = !error && total > pageLimit;

  const fetchCatalogues = async (pageOffset = offset) => {
    setIsLoading(true);
    await Promise.all([
      dispatch(getCataloguesByCompany(id, { limit, offset: pageOffset })),
      dispatch(getCatalogCategories()),
    ]);
    setIsLoading(false);
  };

  useEffect(() => {
    setActiveCategory(null);
    setLocalSearch("");

    return () => {
      dispatch(resetCataloguesByCompany());
      dispatch(getCompanyById(""));
    };
  }, [id]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      await Promise.all([
        dispatch(getCataloguesByCompany(id, { limit, offset })),
        dispatch(getCatalogCategories()),
      ]);
      if (!cancelled) {
        setIsLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [id, limit, offset]);

  useEffect(() => {
    const title = companyName
      ? `Catálogos ${companyName} | Catálogos de Sissy`
      : "Catálogos de Sissy";
    document.title = title;
  }, [companyName]);

  const goToPreviousPage = () => {
    setOffset((current) => Math.max(0, current - limit));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToNextPage = () => {
    if (!hasMore) return;
    setOffset((current) => current + limit);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const searchPlaceholder = companyName
    ? `Buscar en ${companyName}...`
    : "Buscar catálogo...";

  const skeletonCount = limit;

  return (
    <>
      <aside className="fixed left-0 top-0 z-40 hidden h-full w-64 flex-col rounded-r-xl border-r border-white/5 bg-surface-container-high pt-24 lg:flex">
        <div className="mb-8 px-6">
          <h4 className="font-title-md text-title-md mb-1 text-on-surface">
            Filtros
          </h4>
          <p className="font-label-sm text-on-surface-variant">
            Explorar categorías
          </p>
        </div>
        <CategoryFilterNav
          categories={catalogCategories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      </aside>

      <main className="mx-auto w-full max-w-container-max flex-grow px-margin-x pb-24 pt-12 lg:pl-[calc(16rem+2rem)]">
        <section className="mb-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="font-label-sm mb-2 block uppercase tracking-widest text-primary">
                Premium Brand
              </span>
              <h1 className="font-display-lg text-display-lg mb-4 text-on-surface">
                Catálogos {companyName || "…"}
              </h1>
              <p className="leading-relaxed text-on-surface-variant">
                Selecciona un catálogo para abrirlo. Cuando encuentres un modelo
                que te guste, envíame captura o código por WhatsApp para cotizar.
              </p>
            </div>
            <div className="w-full md:w-auto lg:hidden">
              <div className="flex w-full items-center rounded-xl border border-white/10 bg-surface-container-high px-4 py-3">
                <MaterialIcon
                  name="search"
                  className="mr-3 text-on-surface-variant"
                />
                <input
                  type="search"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="font-body-lg text-body-lg w-full border-none bg-transparent text-on-surface placeholder:text-on-surface-variant/50 focus:ring-0"
                  placeholder={searchPlaceholder}
                  aria-label="Buscar catálogo"
                />
              </div>
            </div>
          </div>
        </section>

        {error && (
          <ApiErrorMessage
            message={error}
            onRetry={() => fetchCatalogues(offset)}
            className="mb-8"
          />
        )}

        <div className="mb-8 lg:hidden">
          <p className="font-label-sm mb-2 text-on-surface-variant">
            Categorías
          </p>
          <div className="-mx-1 flex gap-2 overflow-x-auto pb-2">
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className={`shrink-0 rounded-full px-4 py-2 font-label-sm text-label-sm ${
                activeCategory === null
                  ? "bg-secondary-container text-on-secondary-container"
                  : "bg-surface-container-high text-on-surface-variant"
              }`}
            >
              Todas
            </button>
            {catalogCategories.map((slug) => (
              <button
                key={slug}
                type="button"
                onClick={() => setActiveCategory(slug)}
                className={`shrink-0 rounded-full px-4 py-2 font-label-sm text-label-sm ${
                  activeCategory === slug
                    ? "bg-secondary-container text-on-secondary-container"
                    : "bg-surface-container-high text-on-surface-variant"
                }`}
              >
                {formatCategoryLabel(slug)}
              </button>
            ))}
          </div>
        </div>

        {!isLoading && !error && total > 0 && (
          <p className="font-label-sm mb-4 text-on-surface-variant">
            {total} catálogo{total === 1 ? "" : "s"}
            {showPagination
              ? ` · Página ${currentPage} de ${totalPages}`
              : ""}
          </p>
        )}

        <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading ? (
            [...Array(skeletonCount)].map((_, index) => (
              <CatalogCardSkeleton key={index} />
            ))
          ) : error ? null : filteredCatalogues.length > 0 ? (
            filteredCatalogues.map((cat) => (
              <CatalogCard
                key={cat.id}
                catalog={cat}
                companyName={companyName}
              />
            ))
          ) : (
            <p className="font-body-lg text-body-lg col-span-full py-12 text-center text-on-surface-variant">
              No se encontraron catálogos con estos filtros.
            </p>
          )}
        </div>

        {showPagination && (
          <nav
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
            aria-label="Paginación de catálogos"
          >
            <button
              type="button"
              onClick={goToPreviousPage}
              disabled={isLoading || pageOffset <= 0}
              className="font-label-sm inline-flex items-center gap-2 rounded-xl border border-white/10 bg-surface-container-high px-4 py-2.5 text-on-surface transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <MaterialIcon name="chevron_left" className="text-lg" />
              Anterior
            </button>
            <span className="font-label-sm px-2 text-on-surface-variant">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={goToNextPage}
              disabled={isLoading || !hasMore}
              className="font-label-sm inline-flex items-center gap-2 rounded-xl border border-white/10 bg-surface-container-high px-4 py-2.5 text-on-surface transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Siguiente
              <MaterialIcon name="chevron_right" className="text-lg" />
            </button>
          </nav>
        )}
      </main>

      <WhatsAppFab />
    </>
  );
}
