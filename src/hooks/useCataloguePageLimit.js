import { useEffect, useState } from "react";
import {
  CATALOGUE_PAGE_DESKTOP_MQ,
  CATALOGUE_PAGE_LIMIT_DESKTOP,
  CATALOGUE_PAGE_LIMIT_MOBILE,
} from "../constants/cataloguePagination";

function getLimitForViewport() {
  if (typeof window === "undefined") {
    return CATALOGUE_PAGE_LIMIT_MOBILE;
  }
  return window.matchMedia(CATALOGUE_PAGE_DESKTOP_MQ).matches
    ? CATALOGUE_PAGE_LIMIT_DESKTOP
    : CATALOGUE_PAGE_LIMIT_MOBILE;
}

export default function useCataloguePageLimit() {
  const [limit, setLimit] = useState(getLimitForViewport);

  useEffect(() => {
    const mediaQuery = window.matchMedia(CATALOGUE_PAGE_DESKTOP_MQ);
    const onChange = (event) => {
      setLimit(
        event.matches
          ? CATALOGUE_PAGE_LIMIT_DESKTOP
          : CATALOGUE_PAGE_LIMIT_MOBILE,
      );
    };

    mediaQuery.addEventListener("change", onChange);
    setLimit(getLimitForViewport());

    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  return limit;
}
