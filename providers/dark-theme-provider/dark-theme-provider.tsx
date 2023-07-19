import { getTheme } from "@/styles/theme";
import { useAppSelector } from "@/store/hooks";
import { AppTheme, selectSettingsTheme } from "@/store/reducers/settings.reducer";
import { ThemeProvider, Theme } from '@mui/material/styles';
import { useEffect, useState } from "react";

interface Props {
    children: any
}

const DarkThemeProvider = (props: Props) => {
    const themeMode = useAppSelector(selectSettingsTheme);
    const [muiTheme, setMuiTheme] = useState<Theme>(getTheme('light'));

    useEffect(() => {
        const isDark = themeMode === AppTheme.DARK;
        const mode = isDark ? 'dark' : 'light';
        setMuiTheme(getTheme(mode));

        const root = document.getElementsByTagName('html')[0];
        root.setAttribute('class', themeMode);

    }, [themeMode]);

    return (
        <ThemeProvider theme={muiTheme}>
            {props.children}
        </ThemeProvider>
    );
};

export default DarkThemeProvider;
