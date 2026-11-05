export async function getCsrfToken() {
  const API_URL = import.meta.env.VITE_APP_URL;

  const res = await fetch(`${API_URL}/csrf`, {
    credentials: "include",
  });
  const data = await res.json();
  return data.csrfToken;
}
