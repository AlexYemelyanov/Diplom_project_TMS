import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  theme: 'dark' | 'light';
}

const initialState: ThemeState = {
  theme: 'light'
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
  },
})