import {
  GET_ALL_COMPANIES,
  GET_CATALOGUES_BY_COMPANY,
  RESET_CATALOGUES_BY_COMPANY,
  GET_COMPANY_BY_ID,
} from "../actions";

const initialState = {
  companies: [],
  currentCatalogues: [],
  company: [],
};
export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_COMPANIES:
      return { ...state, companies: payload };

    case GET_CATALOGUES_BY_COMPANY:
      return { ...state, currentCatalogues: payload };

    case RESET_CATALOGUES_BY_COMPANY:
      return { ...state, currentCatalogues: initialState.currentCatalogues };

    case GET_COMPANY_BY_ID:
      return { ...state, company: payload };

    default:
      return state;
  }
}
