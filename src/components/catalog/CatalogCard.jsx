/* eslint-disable react/prop-types */
import { FaExternalLinkAlt, FaWhatsapp } from "react-icons/fa";
import { buildWhatsAppQuoteUrl } from "../../utils/whatsapp";

function CatalogBadge({ variant, label }) {
  if (!label) return null;
  const styles =
    variant === "featured"
      ? "bg-[#FFD700] text-black"
      : "bg-secondary-container text-on-secondary-container";
  return (
    <span
      className={`font-label-sm rounded-full px-3 py-1.5 shadow-lg ${styles}`}
    >
      {label}
    </span>
  );
}

export default function CatalogCard({ catalog, companyName }) {
  const subtitle =
    catalog.subtitle ??
    catalog.validity ??
    catalog.season ??
    catalog.description ??
    "";

  const showUpdated =
    catalog.isUpdated ?? catalog.updated ?? catalog.isActualizado;
  const showFeatured =
    catalog.featured ?? catalog.mostConsulted ?? catalog.isFeatured;

  const quoteUrl = buildWhatsAppQuoteUrl(catalog.name, companyName);

  return (
    <article className="catalog-hover group glass-card flex flex-col overflow-hidden rounded-[24px] transition-all duration-300">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={catalog.image}
          alt={catalog.name ? `Portada: ${catalog.name}` : "Portada del catálogo"}
        />
        <div className="absolute top-4 left-4 z-10">
          <CatalogBadge
            variant="updated"
            label={showUpdated ? "Actualizado" : null}
          />
        </div>
        <div className="absolute top-4 right-4 z-10">
          <CatalogBadge
            variant="featured"
            label={showFeatured ? "Más consultado" : null}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
      </div>
      <div className="flex flex-grow flex-col p-6">
        <div className="mb-4">
          <h3 className="font-title-md text-title-md mb-1 text-on-surface">
            {catalog.name}
          </h3>
          {subtitle ? (
            <p className="font-label-sm text-on-surface-variant">{subtitle}</p>
          ) : null}
        </div>
        <div className="mt-auto space-y-3">
          <a
            href={catalog.url}
            target="_blank"
            rel="noreferrer"
            className="font-label-sm flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-on-surface transition-all hover:bg-white/10"
          >
            <FaExternalLinkAlt className="text-sm shrink-0" aria-hidden />
            Abrir catálogo
          </a>
          <a
            href={quoteUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-gradient-primary font-label-sm flex w-full items-center justify-center gap-2 rounded-xl py-3 text-white shadow-lg transition-all hover:shadow-secondary-container/20 active:scale-[0.98]"
          >
            <FaWhatsapp className="text-base shrink-0" aria-hidden />
            Cotizar
          </a>
        </div>
      </div>
    </article>
  );
}
