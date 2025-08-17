export const API = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// include JWT set by the starter login flow
const authHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem('token') || ''}` });

// GET helper
export async function apiGet(path){
  const res = await fetch(`${API}${path}`, { headers: authHeaders() });
  return res.json();
}

// JSON method helper
export async function apiJSON(path, method, body){
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(body)
  });
  return res.json();
}
