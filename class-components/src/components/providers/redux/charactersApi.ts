import { API_URL } from '../../../constants';

export const fetchCharacters = async (term = '', page = 1) => {
  const url = term
    ? `${API_URL}?name=${encodeURIComponent(term)}&page=${page}`
    : `${API_URL}?page=${page}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  return res.json();
};
