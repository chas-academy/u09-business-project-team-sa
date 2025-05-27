import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com';

export const searchRecipes = async (query: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/recipes/complexSearch`, {
      params: {
        apiKey: API_KEY,
        query,
        number: 10, // how many results to return
      },
    });
    return res.data;
  } catch (error) {
    throw new Error('Failed to fetch recipes');
  }
};

export const getRecipeById = async (id: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/recipes/${id}/information`, {
      params: {
        apiKey: API_KEY,
        includeNutrition: false,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error('Failed to fetch recipe details');
  }
};
