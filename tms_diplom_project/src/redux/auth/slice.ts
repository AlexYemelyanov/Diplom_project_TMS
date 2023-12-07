import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: string | null
}

const initialState: AuthState = {
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: ( state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
    signOut: state => {
      state.user = null
    },
  },
});