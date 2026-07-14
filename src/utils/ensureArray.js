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

/** Respuesta de GET /companies/information/:id (empresa + catálogos paginados). */
export function parseCompanyInformationResponse(response) {
  const body = response?.data;

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return null;
  }

  if (!Array.isArray(body.data)) {
    return null;
  }

  const pagination = body.pagination ?? {};

  return {
    company: {
      id: body.id,
      name: body.name,
      image: body.image,
      createdAt: body.createdAt,
      updatedAt: body.updatedAt,
    },
    items: body.data,
    pagination: {
      limit: Number(pagination.limit) || 0,
      offset: Number(pagination.offset) || 0,
      total: Number(pagination.total) || body.data.length,
      hasMore: Boolean(pagination.hasMore),
    },
  };
}

export function invalidApiShapeError() {
  const error = new Error("Respuesta invalida del servidor.");
  error.isInvalidShape = true;
  return error;
}
