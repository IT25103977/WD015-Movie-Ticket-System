const API_URL = "http://localhost:8080/api";

const jsonHeaders = { "Content-Type": "application/json" };

export async function apiGet(path) {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed`);
  return res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`POST ${path} failed`);
  return res.json();
}

export async function apiPut(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "PUT",
    headers: jsonHeaders,
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`PUT ${path} failed`);
  return res.json();
}

export async function apiDelete(path) {
  const res = await fetch(`${API_URL}${path}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`DELETE ${path} failed`);
}

export function normalizeMovie(movie) {
  return {
    ...movie,
    tags: Array.isArray(movie.tags) ? movie.tags : [],
    prices: movie.prices || {
      adult: movie.adultPrice || 0,
      child: movie.childPrice || 0
    }
  };
}

export function moviePayload(movie) {
  return {
    ...movie,
    tags: Array.isArray(movie.tags)
      ? movie.tags
      : String(movie.tags || "").split(",").map(t => t.trim()).filter(Boolean),
    adultPrice: Number(movie.adultPrice ?? movie.prices?.adult ?? 0),
    childPrice: Number(movie.childPrice ?? movie.prices?.child ?? 0),
    rating: Number(movie.rating) || 0
  };
}
