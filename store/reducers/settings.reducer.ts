import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export enum AppTheme {
    LIGHT = 'light-theme',
    DARK = 'dark-theme',
}

export interface SettingsState {
    theme: AppTheme;
}

const initialState: SettingsState = {
    theme: AppTheme.LIGHT,
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setTheme(state, action) {
            return {
                ...state,
                theme: action.payload.theme,
            }
        }
    }
});

export default settingsSlice;

export const { setTheme } = settingsSlice.actions;

export const selectSettingsTheme = (state: RootState): AppTheme => state.settings?.theme;