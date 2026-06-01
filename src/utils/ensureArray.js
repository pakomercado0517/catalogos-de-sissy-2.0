export function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

export function parsePaginatedResponse(response) {
  const body = response?.data;

  if (Array.isArray(body)) {
    return { items: body, hasMore: false };
  }

  if (body && Array.isArray(body.data)) {
    return {
      items: body.data,
      hasMore: Boolean(body.pagination?.hasMore),
    };
  }

  return null;
}

export function invalidApiShapeError() {
  const error = new Error("Respuesta invalida del servidor.");
  error.isInvalidShape = true;
  return error;
}
