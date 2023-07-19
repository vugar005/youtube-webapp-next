import { PaletteMode, PaletteOptions } from "@mui/material";
import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: PaletteMode) => createTheme({
    palette: {
        mode: mode,
        ...(mode === 'light' ? lightPalette : darkPalette)
    },
    typography: {
        h1: {
            fontSize: '2.4rem',
            fontWeight: '400',
            lineHeight: '3.2rem',
            letterSpacing: 'normal',
            margin: '0 0 16px',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: '500',
            lineHeight: '3.2rem',
            letterSpacing: 'normal',
            margin: '0 0 16px',
        },
        h3: {
            fontSize: '1.4rem',
            fontWeight: '500',
            lineHeight: '2rem',
            letterSpacing: 'normal',
            margin: '0 0 16px',
        },
        subtitle1: {
            fontSize: '1.4rem',
            fontWeight: '500',
            lineHeight: '2rem',
            letterSpacing: 'normal',
            margin: '0 0 16px'
        },
        subtitle2: {
            fontSize: '1.2rem',
            fontWeight: '400',
            lineHeight: '1.8rem',
            letterSpacing: '.15'
        },
    },
    components: {
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    fontSize: '2.4rem'
                }
            }
        }
    }
});

const lightPalette: PaletteOptions = {
    mode: 'light',
    primary: {
        main: '#3f50b5'
    },
    secondary: {
        main: '#b0bebb'
    },
    background: {
        default: '#fbfbf8'
    }
}

const darkPalette: PaletteOptions = {
    ...lightPalette,
    mode: 'dark',
    text: {
        primary: '#fff'
    },
    background: {
        default: '#181818',
        paper: '#181818'
    }
}