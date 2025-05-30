import { fetchWithAuthAndAutoRefresh } from "../../lib/api/client";

const API_URL = import.meta.env.VITE_API_URL;

export async function getCSRFToken() {
  const res = await fetch(`${API_URL}/csrf-token`, {
    credentials: "include",
  });

  const { csrfToken } = await res.json();

  return csrfToken;
}

export async function putProfile(data) {
  const csrfToken = await getCSRFToken();

  const res = await fetchWithAuthAndAutoRefresh(`${API_URL}/outsider/edit`, {
    method: "PUT",
    headers: {
      "X-CSRF-Token": csrfToken,
    },
    body: JSON.stringify(data),
  });

  const bodyRes = await res.json();

  if (!res.ok) {
    const msg =
      res.status !== 422 ? bodyRes.err : "Hubo un problema al editar el perfil";

    return { success: false, err: msg };
  }

  return { success: true, data: {} };
}

export async function getProfile() {
  const res = await fetchWithAuthAndAutoRefresh(`${API_URL}/outsider/profile`, {
    method: "GET",
  });

  const bodyRes = await res.json();

  if (!res.ok) {
    const msg =
      res.status !== 422
        ? bodyRes.err
        : "Hubo un problema al obtener los datos del perfil";

    return { success: false, err: msg };
  }

  return { success: true, data: bodyRes.data };
}
