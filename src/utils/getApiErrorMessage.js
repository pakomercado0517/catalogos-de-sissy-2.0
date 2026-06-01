export function getApiErrorMessage(error) {
  if (error?.isInvalidShape) {
    return error.message;
  }

  if (!error?.response) {
    return "No se pudo conectar con el servidor. Revisa tu conexion e intenta de nuevo.";
  }

  const { status, data } = error.response;
  const apiMessage =
    typeof data?.message === "string"
      ? data.message
      : typeof data === "string"
        ? data
        : null;

  if (apiMessage) return apiMessage;

  if (status === 404) return "Recurso no encontrado.";
  if (status >= 500) return "Error del servidor. Intenta mas tarde.";

  return "Ocurrio un error al cargar los datos.";
}
