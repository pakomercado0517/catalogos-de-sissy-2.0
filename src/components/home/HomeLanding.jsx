/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ApiErrorMessage from "../ApiErrorMessage";
import MaterialIcon from "../MaterialIcon";
import CatalogCard from "../catalog/CatalogCard";
import CatalogCardSkeleton from "../catalog/CatalogCardSkeleton";
import { ensureArray } from "../../utils/ensureArray";
import {
  formatCategoryLabel,
  getCategoryIcon,
} from "../../utils/categoryDisplay";
import {
  getAllCompanies,
  getCatalogCategories,
  getCataloguesByCategory,
  clearHomeCategoryCatalogues,
} from "../../redux/actions";

const WHATSAPP_URL = "https://wa.me/527831362077";
const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCoRxDERoXiNi5Q0Z8ejZj8M8wTZRjurB0hlyDYvh_--TXj0aRggGX71t4Qcxle4ySGfOPx69KiKCuz4lQxb6mefQCc8w3Pymm3kGqTTSsil6VP1kHodfMIeJf3xnUjNc-xSA0pfo-SDtmhy890WEGsXt9xPq7ny-YqXvTa8CLbY0Q5f0x60H1urYiMKCA0YsD5SUNkol940dQZQ-Dz5CkNwPQx2Kxm27IU3p3pvKTXQo_RuKf3CWM3dmKi4RWxA0c6FtTORy8uXUzj";

function BrandCardSkeleton() {
  return (
    <div className="glass-card animate-pulse overflow-hidden rounded-2xl">
      <div className="h-64 bg-surface-container-high" />
      <div className="space-y-3 p-6">
        <div className="h-5 w-1/3 rounded bg-surface-container-high" />
        <div className="h-3 w-2/3 rounded bg-surface-container-high" />
        <div className="h-4 w-full rounded bg-surface-container-high" />
      </div>
    </div>
  );
}

export default function HomeLanding({ brandSearch = "" }) {
  const dispatch = useDispatch();
  const companies = ensureArray(useSelector((state) => state.companies));
  const catalogCategories = ensureArray(
    useSelector((state) => state.catalogCategories),
  );
  const homeCategoryCatalogues = ensureArray(
    useSelector((state) => state.homeCategoryCatalogues),
  );
  const companiesError = useSelector((state) => state.apiErrors.companies);
  const categoryCataloguesError = useSelector(
    (state) => state.apiErrors.homeCategoryCatalogues,
  );
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
  const [isLoadingCategory, setIsLoadingCategory] = useState(false);
  /** null = vista Empresas; slug = catálogos por categoría */
  const [activeCategory, setActiveCategory] = useState(null);

  const isEmpresasView = activeCategory === null;

  const loadCompaniesAndCategories = async () => {
    setIsLoadingCompanies(true);
    await Promise.all([
      dispatch(getAllCompanies()),
      dispatch(getCatalogCategories()),
    ]);
    setIsLoadingCompanies(false);
  };

  useEffect(() => {
    loadCompaniesAndCategories();
  }, [dispatch]);

  useEffect(() => {
    if (activeCategory === null) {
      dispatch(clearHomeCategoryCatalogues());
      return;
    }

    let cancelled = false;

    const load = async () => {
      setIsLoadingCategory(true);
      await dispatch(getCataloguesByCategory(activeCategory));
      if (!cancelled) setIsLoadingCategory(false);
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [activeCategory, dispatch]);

  const filteredCompanies = useMemo(() => {
    const query = brandSearch.trim().toLowerCase();
    if (!query) return companies;
    return companies.filter((company) =>
      company.name.toLowerCase().includes(query),
    );
  }, [companies, brandSearch]);

  const filteredCategoryCatalogues = useMemo(() => {
    const query = brandSearch.trim().toLowerCase();
    if (!query) return homeCategoryCatalogues;
    return homeCategoryCatalogues.filter((catalogue) => {
      const name = (catalogue.name ?? "").toLowerCase();
      const company = (catalogue.company ?? "").toLowerCase();
      return name.includes(query) || company.includes(query);
    });
  }, [homeCategoryCatalogues, brandSearch]);

  const scrollToBrands = () => {
    document.getElementById("marcas")?.scrollIntoView({ behavior: "smooth" });
  };

  const selectEmpresas = () => setActiveCategory(null);

  const selectCategory = (slug) => setActiveCategory(slug);

  const retryCategoryLoad = () => {
    if (activeCategory) {
      dispatch(getCataloguesByCategory(activeCategory));
    }
  };

  const gridLoading = isEmpresasView ? isLoadingCompanies : isLoadingCategory;
  const gridError = isEmpresasView ? companiesError : categoryCataloguesError;

  return (
    <main className="hero-gradient min-h-screen pb-24 md:pb-0">
      <section className="relative mx-auto max-w-container-max overflow-hidden px-margin-x pb-24 pt-8 md:pt-16">
        <div className="relative z-10 flex flex-col items-center gap-12 md:flex-row">
          <div className="w-full text-center md:w-1/2 md:text-left">
            <span className="font-label-sm text-label-sm mb-6 inline-block rounded-full border border-secondary-container/30 bg-secondary-container/20 px-4 py-1.5 text-secondary-fixed">
              EDICIÓN PREMIUM {new Date().getFullYear()}
            </span>
            <h1 className="font-display-lg text-display-lg mb-6 leading-tight text-white">
              Consulta catálogos actualizados y{" "}
              <span className="text-primary">cotiza por WhatsApp</span>
            </h1>
            <p className="font-body-lg text-body-lg mx-auto mb-10 max-w-lg text-on-surface-variant md:mx-0">
              Tu boutique digital favorita: elige tu marca favorita, revisa los
              modelos de temporada y envíanos tu pedido directamente para una
              cotización inmediata.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
              <button
                type="button"
                onClick={scrollToBrands}
                className="font-title-md text-title-md transform rounded-xl bg-gradient-to-r from-secondary-container to-on-tertiary-container px-8 py-4 text-white transition-all hover:shadow-[0_0_20px_rgba(205,3,124,0.4)] active:scale-95"
              >
                Ver catálogos
              </button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="font-title-md text-title-md flex items-center justify-center gap-2 rounded-xl border border-primary px-8 py-4 text-primary transition-all hover:bg-primary/5 active:scale-95"
              >
                <MaterialIcon name="chat" />
                Cotizar por WhatsApp
              </a>
            </div>
          </div>
          <div className="group relative w-full md:w-1/2">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary opacity-20 blur transition duration-1000 group-hover:opacity-40 group-hover:duration-200" />
            <div className="glass-card relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl">
              <img
                className="h-full w-full object-cover"
                src={HERO_IMAGE}
                alt="Productos de moda y calzado en ambiente premium"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="marcas"
        className="mx-auto max-w-container-max px-margin-x py-stack-lg"
      >
        {gridError && (
          <ApiErrorMessage
            message={gridError}
            onRetry={
              isEmpresasView ? loadCompaniesAndCategories : retryCategoryLoad
            }
            className="mb-8"
          />
        )}

        <div className="flex flex-col gap-gutter lg:flex-row">
          <aside className="flex-shrink-0 lg:w-64">
            <div className="top-28 space-y-stack-md lg:sticky">
              <div>
                <h3 className="font-title-md text-title-md mb-2 text-on-surface">
                  Filtros
                </h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Explorar categorías
                </p>
              </div>
              <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:space-y-1 lg:overflow-visible lg:pb-0">
                <button
                  type="button"
                  onClick={selectEmpresas}
                  className={`flex shrink-0 items-center gap-3 rounded-lg px-4 py-3 transition-all duration-300 ${
                    isEmpresasView
                      ? "bg-secondary-container text-on-secondary-container"
                      : "text-on-surface-variant hover:bg-white/5"
                  }`}
                >
                  <MaterialIcon name="storefront" />
                  <span className="font-label-sm text-label-sm">Empresas</span>
                </button>
                {catalogCategories.map((slug) => (
                  <button
                    key={slug}
                    type="button"
                    onClick={() => selectCategory(slug)}
                    className={`flex shrink-0 items-center gap-3 rounded-lg px-4 py-3 transition-all duration-300 ${
                      activeCategory === slug
                        ? "bg-secondary-container text-on-secondary-container"
                        : "text-on-surface-variant hover:bg-white/5"
                    }`}
                  >
                    <MaterialIcon name={getCategoryIcon(slug)} />
                    <span className="font-label-sm text-label-sm">
                      {formatCategoryLabel(slug)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="min-w-0 flex-grow">
            {!isEmpresasView && (
              <p className="font-label-sm text-label-sm mb-6 text-on-surface-variant">
                {formatCategoryLabel(activeCategory)} ·{" "}
                {filteredCategoryCatalogues.length} catálogo
                {filteredCategoryCatalogues.length === 1 ? "" : "s"}
              </p>
            )}

            <div
              className={
                isEmpresasView
                  ? "grid grid-cols-1 gap-stack-lg md:grid-cols-2 xl:grid-cols-3"
                  : "grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              }
            >
              {gridLoading ? (
                isEmpresasView ? (
                  [...Array(6)].map((_, index) => (
                    <BrandCardSkeleton key={index} />
                  ))
                ) : (
                  [...Array(8)].map((_, index) => (
                    <CatalogCardSkeleton key={index} />
                  ))
                )
              ) : gridError ? null : isEmpresasView ? (
                filteredCompanies.length === 0 ? (
                  <p className="font-body-lg text-body-lg col-span-full text-center text-on-surface-variant">
                    No hay empresas que coincidan con tu búsqueda.
                  </p>
                ) : (
                  filteredCompanies.map((company) => (
                    <Link
                      key={company.id}
                      to={`/catalogos/${company.id}`}
                      className="group glass-card relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          src={company.image}
                          alt={`Catálogos de ${company.name}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      </div>
                      <div className="p-6">
                        <div className="mb-2 flex items-start justify-between">
                          <h4 className="font-title-md text-title-md text-white">
                            {company.name}
                          </h4>
                          <MaterialIcon
                            name="verified"
                            filled
                            className="text-primary"
                          />
                        </div>
                        <p className="font-label-sm text-label-sm mb-4 text-on-surface-variant">
                          {company.description ??
                            "Explora la colección de temporada"}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-label-sm text-white/60">
                            Ver catálogos
                          </span>
                          <span className="font-title-md text-title-md flex items-center gap-1 text-primary transition-all group-hover:gap-2">
                            Ver catálogos
                            <MaterialIcon name="arrow_forward" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
                )
              ) : filteredCategoryCatalogues.length === 0 ? (
                <p className="font-body-lg text-body-lg col-span-full text-center text-on-surface-variant">
                  No hay catálogos en esta categoría
                  {brandSearch.trim() ? " con esa búsqueda" : ""}.
                </p>
              ) : (
                filteredCategoryCatalogues.map((catalogue) => (
                  <CatalogCard
                    key={catalogue.id}
                    catalog={catalogue}
                    companyName={catalogue.company ?? ""}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-container-max rounded-3xl bg-surface-container-low/50 px-margin-x py-24">
        <h2 className="font-display-lg text-display-lg mb-16 text-center text-white">
          ¿Cómo funciona?
        </h2>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {[
            {
              icon: "style",
              title: "1. Elige tu marca",
              text: "Explora nuestra selección de marcas líderes en México.",
            },
            {
              icon: "menu_book",
              title: "2. Revisa modelos",
              text: "Consulta los catálogos digitales interactivos y actualizados.",
            },
            {
              icon: "whatshot",
              title: "3. Cotiza por WhatsApp",
              text: "Envíanos captura o código y te cotizamos de inmediato.",
            },
          ].map((step) => (
            <div key={step.title} className="group text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-black">
                <MaterialIcon name={step.icon} className="text-3xl" />
              </div>
              <h3 className="font-title-md text-title-md mb-3 text-white">
                {step.title}
              </h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
