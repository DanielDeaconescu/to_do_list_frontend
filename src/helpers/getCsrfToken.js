export async function getCsrfToken() {
  const API_URL = "http://localhost:8000";

  const res = await fetch(`${API_URL}/csrf`, {
    credentials: "include",
  });
  const data = await res.json();
  return data.csrfToken;
}
