import {
  GET_ALL_COMPANIES,
  GET_CATALOGUES_BY_COMPANY,
  RESET_CATALOGUES_BY_COMPANY,
  GET_COMPANY_BY_ID,
  UPDATE_CATALOGUES_BY_ID,
  GET_ALL_CATALOGUES,
  SET_API_ERROR,
  CLEAR_API_ERROR,
} from "../actions";
import { ensureArray } from "../../utils/ensureArray";

const initialState = {
  companies: [],
  currentCatalogues: [],
  company: [],
  updateMessage: "",
  allCatalogues: [],
  apiErrors: {
    companies: null,
    companyCatalogues: null,
    chatCatalogues: null,
  },
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_COMPANIES:
      return { ...state, companies: ensureArray(payload) };

    case GET_CATALOGUES_BY_COMPANY:
      return { ...state, currentCatalogues: ensureArray(payload) };

    case RESET_CATALOGUES_BY_COMPANY:
      return {
        ...state,
        currentCatalogues: initialState.currentCatalogues,
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
