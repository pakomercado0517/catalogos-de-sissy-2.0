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
  categoriesPresentInCatalogues,
} from "../utils/catalogFilters";

export default function SissyCatalogues({ catalogSearch = "" }) {
  const dispatch = useDispatch();
  const currentCatalogues = ensureArray(
    useSelector((state) => state.currentCatalogues),
  );
  const catalogCategories = ensureArray(
    useSelector((state) => state.catalogCategories),
  );
  const company = useSelector((state) => state.company);
  const error = useSelector((state) => state.apiErrors.companyCatalogues);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [localSearch, setLocalSearch] = useState("");

  const companyName =
    company && typeof company === "object" ? company.name : "";
  const searchQuery = catalogSearch || localSearch;

  const sidebarCategories = useMemo(
    () =>
      categoriesPresentInCatalogues(
        currentCatalogues,
        catalogCategories,
      ),
    [currentCatalogues, catalogCategories],
  );

  const filteredCatalogues = useMemo(() => {
    return currentCatalogues.filter(
      (cat) =>
        catalogueMatchesCategory(cat, activeCategory) &&
        catalogueMatchesSearch(cat, searchQuery),
    );
  }, [currentCatalogues, activeCategory, searchQuery]);

  const fetchCatalogues = async () => {
    setIsLoading(true);
    await Promise.all([
      dispatch(getCataloguesByCompany(id)),
      dispatch(getCompanyById(id)),
      dispatch(getCatalogCategories()),
    ]);
    setIsLoading(false);
  };

  useEffect(() => {
    setActiveCategory(null);
    setLocalSearch("");
    fetchCatalogues();

    return () => {
      dispatch(resetCataloguesByCompany());
      dispatch(getCompanyById(""));
    };
  }, [id]);

  useEffect(() => {
    const title = companyName
      ? `Catálogos ${companyName} | Catálogos de Sissy`
      : "Catálogos de Sissy";
    document.title = title;
  }, [companyName]);

  const searchPlaceholder = companyName
    ? `Buscar en ${companyName}...`
    : "Buscar catálogo...";

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
          categories={sidebarCategories}
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
            onRetry={fetchCatalogues}
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
            {sidebarCategories.map((slug) => (
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

        <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading ? (
            [...Array(8)].map((_, index) => (
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
      </main>

      <WhatsAppFab />
    </>
  );
}
