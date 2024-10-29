import { configureStore, createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
      const existingMovie = state.find(movie => movie.id === action.payload.id);
      if (!existingMovie) {
        state.push({ ...action.payload, rating: action.payload.rating });
      }
    },
    removeFavorite: (state, action) => {
      return state.filter(movie => movie.id !== action.payload);
    },
    setRating: (state, action) => {
      const movie = state.find(movie => movie.id === action.payload.id);
      if (movie) {
        movie.rating = action.payload.rating;
      }
    },
  },
});

export const { addFavorite, removeFavorite, setRating } = favoritesSlice.actions;

const store = configureStore({
  reducer: {
    favorites: favoritesSlice.reducer,
  },
});

export default store;
