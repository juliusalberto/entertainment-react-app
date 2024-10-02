// src/services/tmdbApi.js

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchTrending = async (mediaType = 'all', timeWindow = 'week') => {
  try {
    const response = await fetch(`${BASE_URL}/trending/${mediaType}/${timeWindow}?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching trending content:', error);
    return [];
  }
};

export const fetchByCategory = async (mediaType, category) => {
  try {
    const response = await fetch(`${BASE_URL}/${mediaType}/${category}?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching ${category} ${mediaType}:`, error);
    return [];
  }
};

export const searchMulti = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error searching content:', error);
    return [];
  }
};

export const fetchDetails = async (mediaType, id) => {
  try {
    const response = await fetch(`${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${mediaType} details:`, error);
    return null;
  }
};

