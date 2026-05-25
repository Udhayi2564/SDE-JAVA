const BASE_URL = "http://localhost:8080/api/backups";

async function handleResponse(response) {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

export const api = {
  getAll: () => fetch(BASE_URL).then(handleResponse),

  create: (data) =>
    fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(handleResponse),

  updateStatus: (id, status) =>
    fetch(`${BASE_URL}/${id}/status?status=${status}`, {
      method: "PUT"
    }).then(handleResponse),

  delete: (id) =>
    fetch(`${BASE_URL}/${id}`, {
      method: "DELETE"
    }).then(handleResponse),

  getStats: () => fetch(`${BASE_URL}/stats`).then(handleResponse)
};
