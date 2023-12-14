import { authSlice } from "./slice";
export const { signIn, signOut} = authSlice.actions;
export const authReducer = authSlice.reducer;
