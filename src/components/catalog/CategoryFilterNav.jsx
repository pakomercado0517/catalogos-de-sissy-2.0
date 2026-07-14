/* eslint-disable react/prop-types */
import MaterialIcon from "../MaterialIcon";
import {
  formatCategoryLabel,
  getCategoryIcon,
} from "../../utils/categoryDisplay";

export default function CategoryFilterNav({
  categories,
  activeCategory,
  onSelectCategory,
  className = "",
}) {
  return (
    <nav className={`flex flex-col gap-1 ${className}`}>
      <button
        type="button"
        onClick={() => onSelectCategory(null)}
        className={`mx-2 my-1 flex items-center gap-4 rounded-lg px-6 py-3 transition-all duration-300 ${
          activeCategory === null
            ? "bg-secondary-container text-on-secondary-container"
            : "text-on-surface-variant hover:bg-surface-variant"
        }`}
      >
        <MaterialIcon name="apps" />
        <span className="font-label-sm">Todas</span>
      </button>
      {categories.map((slug) => (
        <button
          key={slug}
          type="button"
          onClick={() => onSelectCategory(slug)}
          className={`mx-2 my-1 flex items-center gap-4 rounded-lg px-6 py-3 transition-all duration-300 ${
            activeCategory === slug
              ? "bg-secondary-container text-on-secondary-container"
              : "text-on-surface-variant hover:bg-surface-variant"
          }`}
        >
          <MaterialIcon name={getCategoryIcon(slug)} />
          <span className="font-label-sm">{formatCategoryLabel(slug)}</span>
        </button>
      ))}
    </nav>
  );
}
