import axios from "axios";

const { VITE_SERVER } = import.meta.env;
const constants = {
  server: VITE_SERVER,
};

export const GET_ALL_COMPANIES = "GET_ALL_COMPANIES";
export const GET_CATALOGUES_BY_COMPANY = "GET_CATALOGUES_BY_COMPANY";
export const RESET_CATALOGUES_BY_COMPANY = "RESET_CATALOGUES_BY_COMPANY";
export const GET_COMPANY_BY_ID = "GET_COMPANY_BY_ID";
export const UPDATE_CATALOGUES_BY_ID = "UPDATE_CATALOGUES_BY_ID";
export const GET_ALL_CATALOGUES = "GET_ALL_CATALOGUES";

export const getAllCompanies = () => async (dispatch) => {
  try {
    const companies = await axios.get(`${constants.server}/companies`);
    dispatch({
      type: GET_ALL_COMPANIES,
      payload: companies.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllCatalogues = () => async (dispatch) => {
  try {
    const catalogues = await axios.get(`${constants.server}/catalogos`);
    dispatch({
      type: GET_ALL_CATALOGUES,
      payload: catalogues.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCataloguesByCompany = (id) => async (dispatch) => {
  try {
    const catalogues = await axios.get(`${constants.server}/companies/${id}`);
    dispatch({
      type: GET_CATALOGUES_BY_COMPANY,
      payload: catalogues.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const resetCataloguesByCompany = () => (dispatch) => {
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
  } catch (error) {
    console.log(error);
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
