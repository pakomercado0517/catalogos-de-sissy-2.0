const CATEGORY_ICONS = {
  accesorios: "diamond",
  belleza: "spa",
  calzado: "shopping_bag",
  deportivo: "sports_soccer",
  hogar: "home",
  infantil: "child_care",
  joyeria: "diamond",
  outlet: "local_offer",
  ropa: "checkroom",
  otros: "category",
};

export function getCategoryIcon(slug) {
  return CATEGORY_ICONS[slug] ?? "label";
}

export function formatCategoryLabel(slug) {
  if (!slug) return "";
  const special = {
    joyeria: "Joyería",
    outlet: "Ofertas",
  };
  if (special[slug]) return special[slug];
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}
