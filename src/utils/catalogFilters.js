export function catalogueMatchesCategory(catalogue, categorySlug) {
  if (!categorySlug) return true;
  const cat = catalogue.category ?? catalogue.categories;
  if (Array.isArray(cat)) return cat.includes(categorySlug);
  return cat === categorySlug;
}

export function catalogueMatchesSearch(catalogue, query) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const name = (catalogue.name ?? "").toLowerCase();
  const subtitle = (
    catalogue.subtitle ??
    catalogue.description ??
    catalogue.validity ??
    ""
  ).toLowerCase();
  return name.includes(q) || subtitle.includes(q);
}

export function categoriesPresentInCatalogues(catalogues, allCategorySlugs) {
  const present = new Set();
  for (const catalogue of catalogues) {
    const cat = catalogue.category ?? catalogue.categories;
    if (Array.isArray(cat)) {
      cat.forEach((slug) => present.add(slug));
    } else if (cat) {
      present.add(cat);
    }
  }
  if (present.size === 0) {
    return allCategorySlugs;
  }
  return allCategorySlugs.filter((slug) => present.has(slug));
}
