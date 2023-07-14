import { createSlice } from "@reduxjs/toolkit";

export enum AppTheme {
    LIGHT = 'light-theme',
    DARK = 'dark-theme',
}

export interface SettingsState {
    theme: AppTheme;
}

const initialState: SettingsState = {
    theme: AppTheme.DARK,
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

export const selectSettingsTheme = (state: SettingsState): AppTheme => state.theme;