import axios from "axios";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";
import {
  invalidApiShapeError,
  parsePaginatedResponse,
} from "../../utils/ensureArray";

const { VITE_SERVER } = import.meta.env;
const constants = {
  server: VITE_SERVER,
};

const PAGE_LIMIT = 100;

async function fetchAllPaginated(path, extraParams = {}) {
  let offset = 0;
  let all = [];
  let hasMore = true;

  while (hasMore) {
    const response = await axios.get(`${constants.server}${path}`, {
      params: { limit: PAGE_LIMIT, offset, ...extraParams },
    });
    const page = parsePaginatedResponse(response);

    if (!page) {
      throw invalidApiShapeError();
    }

    all = all.concat(page.items);
    hasMore = page.hasMore;
    offset += PAGE_LIMIT;
  }

  return all;
}

export const GET_ALL_COMPANIES = "GET_ALL_COMPANIES";
export const GET_CATALOGUES_BY_COMPANY = "GET_CATALOGUES_BY_COMPANY";
export const RESET_CATALOGUES_BY_COMPANY = "RESET_CATALOGUES_BY_COMPANY";
export const GET_COMPANY_BY_ID = "GET_COMPANY_BY_ID";
export const UPDATE_CATALOGUES_BY_ID = "UPDATE_CATALOGUES_BY_ID";
export const GET_ALL_CATALOGUES = "GET_ALL_CATALOGUES";
export const GET_CATALOG_CATEGORIES = "GET_CATALOG_CATEGORIES";
export const GET_HOME_CATEGORY_CATALOGUES = "GET_HOME_CATEGORY_CATALOGUES";
export const CLEAR_HOME_CATEGORY_CATALOGUES = "CLEAR_HOME_CATEGORY_CATALOGUES";
export const SET_API_ERROR = "SET_API_ERROR";
export const CLEAR_API_ERROR = "CLEAR_API_ERROR";

export const setApiError = (key, message) => ({
  type: SET_API_ERROR,
  payload: { key, message },
});

export const clearApiError = (key) => ({
  type: CLEAR_API_ERROR,
  payload: { key },
});

export const getAllCompanies = () => async (dispatch) => {
  dispatch(clearApiError("companies"));

  try {
    const companies = await fetchAllPaginated("/companies");
    dispatch({
      type: GET_ALL_COMPANIES,
      payload: companies,
    });
    return { ok: true };
  } catch (error) {
    dispatch(setApiError("companies", getApiErrorMessage(error)));
    return { ok: false };
  }
};

export const getAllCatalogues = () => async (dispatch) => {
  dispatch(clearApiError("chatCatalogues"));

  try {
    const [catalogues, companies] = await Promise.all([
      fetchAllPaginated("/catalogos"),
      fetchAllPaginated("/companies"),
    ]);

    const companyById = Object.fromEntries(
      companies.map((company) => [company.id, company.name]),
    );

    const enriched = catalogues.map((catalogue) => ({
      ...catalogue,
      company: companyById[catalogue.companyId] ?? null,
    }));

    dispatch({
      type: GET_ALL_CATALOGUES,
      payload: enriched,
    });
    return { ok: true };
  } catch (error) {
    dispatch(setApiError("chatCatalogues", getApiErrorMessage(error)));
    return { ok: false };
  }
};

export const getCatalogCategories = () => async (dispatch) => {
  dispatch(clearApiError("catalogCategories"));

  try {
    const response = await axios.get(
      `${constants.server}/catalogos/categories`,
    );

    if (!Array.isArray(response.data)) {
      throw invalidApiShapeError();
    }

    dispatch({
      type: GET_CATALOG_CATEGORIES,
      payload: response.data,
    });
    return { ok: true };
  } catch (error) {
    dispatch(setApiError("catalogCategories", getApiErrorMessage(error)));
    return { ok: false };
  }
};

export const getCataloguesByCategory = (category) => async (dispatch, getState) => {
  dispatch(clearApiError("homeCategoryCatalogues"));

  try {
    const catalogues = await fetchAllPaginated("/catalogos/", { category });
    const companies = getState().companies ?? [];
    const companyById = Object.fromEntries(
      companies.map((company) => [company.id, company.name]),
    );

    const enriched = catalogues.map((catalogue) => ({
      ...catalogue,
      company: companyById[catalogue.companyId] ?? catalogue.company ?? null,
    }));

    dispatch({
      type: GET_HOME_CATEGORY_CATALOGUES,
      payload: { category, items: enriched },
    });
    return { ok: true };
  } catch (error) {
    dispatch(
      setApiError("homeCategoryCatalogues", getApiErrorMessage(error)),
    );
    dispatch({
      type: GET_HOME_CATEGORY_CATALOGUES,
      payload: { category, items: [] },
    });
    return { ok: false };
  }
};

export const clearHomeCategoryCatalogues = () => (dispatch) => {
  dispatch(clearApiError("homeCategoryCatalogues"));
  dispatch({ type: CLEAR_HOME_CATEGORY_CATALOGUES });
};

export const getCataloguesByCompany = (id) => async (dispatch) => {
  // Server-side read cache ~5 min — see docs/CACHE_LECTURAS.md
  dispatch(clearApiError("companyCatalogues"));

  try {
    const catalogues = await axios.get(`${constants.server}/companies/${id}`);

    if (!Array.isArray(catalogues.data)) {
      throw invalidApiShapeError();
    }

    dispatch({
      type: GET_CATALOGUES_BY_COMPANY,
      payload: catalogues.data,
    });
    return { ok: true };
  } catch (error) {
    dispatch(
      setApiError("companyCatalogues", getApiErrorMessage(error)),
    );
    dispatch({
      type: GET_CATALOGUES_BY_COMPANY,
      payload: [],
    });
    return { ok: false };
  }
};

export const resetCataloguesByCompany = () => (dispatch) => {
  dispatch(clearApiError("companyCatalogues"));
  dispatch({
    type: RESET_CATALOGUES_BY_COMPANY,
  });
};

export const getCompanyById = (id) => async (dispatch) => {
  try {
    if (id === "") {
      dispatch({
        type: GET_COMPANY_BY_ID,
        payload: "",
      });
    } else {
      const company = await axios.get(
        `${constants.server}/companies/information/${id}`,
      );
      dispatch({
        type: GET_COMPANY_BY_ID,
        payload: company.data,
      });
    }
    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
};

export const updateCataloguesById = (id) => async (dispatch) => {
  dispatch({
    type: UPDATE_CATALOGUES_BY_ID,
    payload: "",
  });
  try {
    const isUpdateCatalogues = await axios.get(
      `${constants.server}/catalogos/updateCatalogues/${id}`,
    );
    dispatch({
      type: UPDATE_CATALOGUES_BY_ID,
      payload: isUpdateCatalogues.data,
    });
  } catch (error) {
    console.log(error.response);
  }
};
