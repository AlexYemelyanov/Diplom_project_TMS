import { RootState } from "../store";

export const authSelector = (state: RootState) => state.auth;
export const themeSelector = ( state: RootState) => state.theme;
