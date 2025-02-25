import { getTheme } from "@/styles/theme";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AppTheme, selectSettingsTheme, setTheme } from "@/store/reducers/settings.reducer";
import { ThemeProvider, Theme } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { LocalStorageEnum } from "@/lib/ui/constants/local-storage.constants";

interface Props {
    children: any
}

const DarkThemeProvider = (props: Props) => {
    const themeMode = useAppSelector(selectSettingsTheme);
    const dispatch = useAppDispatch();
    const [muiTheme, setMuiTheme] = useState<Theme>(getTheme('light'));

    useEffect(() => {
        const savedTheme: string | null = localStorage.getItem(LocalStorageEnum.SAVED_THEME);
        if (!savedTheme) { return; }

        const isDark = savedTheme === AppTheme.DARK;
        if (isDark) {
            dispatch(setTheme({ theme: AppTheme.DARK }))
        } else {
            dispatch(setTheme({ theme: AppTheme.LIGHT }))
        }

    }, []);

    useEffect(() => {
        const isDark = themeMode === AppTheme.DARK;
        const mode = isDark ? 'dark' : 'light';
        setMuiTheme(getTheme(mode));
        const root = document.getElementsByTagName('html')[0];
        root.setAttribute('class', themeMode);
        console.log('setting Theme', mode)
    }, [themeMode]);

    return (
        <ThemeProvider theme={muiTheme}>
            {props.children}
        </ThemeProvider>
    );
};

export default DarkThemeProvider;
