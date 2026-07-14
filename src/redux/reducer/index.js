import {
  GET_ALL_COMPANIES,
  GET_CATALOGUES_BY_COMPANY,
  RESET_CATALOGUES_BY_COMPANY,
  GET_COMPANY_BY_ID,
  UPDATE_CATALOGUES_BY_ID,
  GET_ALL_CATALOGUES,
  GET_CATALOG_CATEGORIES,
  GET_HOME_CATEGORY_CATALOGUES,
  CLEAR_HOME_CATEGORY_CATALOGUES,
  SET_API_ERROR,
  CLEAR_API_ERROR,
} from "../actions";
import { ensureArray } from "../../utils/ensureArray";

const emptyCompanyPagination = {
  limit: 0,
  offset: 0,
  total: 0,
  hasMore: false,
};

const initialState = {
  companies: [],
  currentCatalogues: [],
  companyCataloguesPagination: emptyCompanyPagination,
  company: [],
  updateMessage: "",
  allCatalogues: [],
  catalogCategories: [],
  homeCategoryCatalogues: [],
  homeCategoryCataloguesSlug: null,
  apiErrors: {
    companies: null,
    companyCatalogues: null,
    chatCatalogues: null,
    catalogCategories: null,
    homeCategoryCatalogues: null,
  },
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_COMPANIES:
      return { ...state, companies: ensureArray(payload) };

    case GET_CATALOGUES_BY_COMPANY: {
      const items = Array.isArray(payload)
        ? payload
        : ensureArray(payload?.items);
      const pagination = Array.isArray(payload)
        ? emptyCompanyPagination
        : {
            ...emptyCompanyPagination,
            ...(payload?.pagination ?? {}),
          };

      return {
        ...state,
        currentCatalogues: items,
        companyCataloguesPagination: pagination,
      };
    }

    case RESET_CATALOGUES_BY_COMPANY:
      return {
        ...state,
        currentCatalogues: initialState.currentCatalogues,
        companyCataloguesPagination: initialState.companyCataloguesPagination,
        apiErrors: {
          ...state.apiErrors,
          companyCatalogues: null,
        },
      };

    case GET_COMPANY_BY_ID:
      return { ...state, company: payload };

    case UPDATE_CATALOGUES_BY_ID:
      return { ...state, updateMessage: payload.message };

    case GET_ALL_CATALOGUES:
      return { ...state, allCatalogues: ensureArray(payload) };

    case GET_CATALOG_CATEGORIES:
      return { ...state, catalogCategories: ensureArray(payload) };

    case GET_HOME_CATEGORY_CATALOGUES:
      return {
        ...state,
        homeCategoryCatalogues: ensureArray(payload.items),
        homeCategoryCataloguesSlug: payload.category ?? null,
      };

    case CLEAR_HOME_CATEGORY_CATALOGUES:
      return {
        ...state,
        homeCategoryCatalogues: initialState.homeCategoryCatalogues,
        homeCategoryCataloguesSlug: initialState.homeCategoryCataloguesSlug,
        apiErrors: {
          ...state.apiErrors,
          homeCategoryCatalogues: null,
        },
      };

    case SET_API_ERROR:
      return {
        ...state,
        apiErrors: {
          ...state.apiErrors,
          [payload.key]: payload.message,
        },
      };

    case CLEAR_API_ERROR:
      return {
        ...state,
        apiErrors: {
          ...state.apiErrors,
          [payload.key]: null,
        },
      };

    default:
      return state;
  }
}
