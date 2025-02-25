import { AccountCircle, Diamond, Keyboard, NightlightRounded, Policy, ShowChart, VideoSettings } from "@mui/icons-material";
import { Fragment, useState } from "react";
import styles from './account-sidebar.module.scss';
import { Button, Divider, Menu, MenuItem } from "@mui/material";
import packageJson from '../../package.json';
import Link from "next/link";
import { AppTheme, setTheme } from "@/store/reducers/settings.reducer";
import { useAppDispatch } from "@/store/hooks";
import { LocalStorageEnum } from "@/lib/ui/constants/local-storage.constants";

export default function AccountSidebar() {
    const dispatch = useAppDispatch();
    const nextVersion = packageJson.dependencies.next;
    const [appearanceMenuAnchor, setAppearanceMenuAnchor] = useState<null | HTMLElement>(null);
    const isAppearanceMenuOpen = Boolean(appearanceMenuAnchor);

    const onOpenAppearanceMenu = (event: React.MouseEvent<HTMLElement>): void => {
        setAppearanceMenuAnchor(event.currentTarget);
    };

    const onCloseAppearanceMenu = (event: React.MouseEvent<HTMLElement>): void => {
        setAppearanceMenuAnchor(null);
    };

    const handleAppearanceMenuClose = (theme: AppTheme): void => {
        setAppearanceMenuAnchor(null);
        console.log(theme)
        if (theme === AppTheme.DARK) {
            dispatch(setTheme({ theme: AppTheme.DARK }))
            localStorage.setItem(LocalStorageEnum.SAVED_THEME, AppTheme.DARK);
        } else {
            dispatch(setTheme({ theme: AppTheme.LIGHT }))
            localStorage.setItem(LocalStorageEnum.SAVED_THEME, AppTheme.LIGHT);
        }
    };

    return (
        <Fragment>
            <div className={styles.sidebar}>
                <div className={styles.sidebarTop}>
                    <div className={styles.sidebarTop__avatar}>
                        <AccountCircle sx={{ width: '4rem', height: '4rem' }} />
                    </div>
                    <div className={styles.sidebarTop__text}>
                        <h2 className="mat-h2">Anonymous</h2>
                        <h3 className="mat-caption">Version: Nextjs v.{nextVersion} </h3>
                    </div>
                </div>

                <Divider />

                <div className={styles.sidebarContent}>

                    <Button
                        className={styles.sidebarContentItem}
                        onClick={onOpenAppearanceMenu}
                    >
                   <div className={styles.sidebarContentItem__icon}>
                            <NightlightRounded />
                    </div>

                     <div className={`mat-h3 ${styles.sidebarContentItem__text}`}>Change Appearance</div>
                    </Button>

                    <Menu
                        anchorEl={appearanceMenuAnchor}
                        open={isAppearanceMenuOpen}
                        onClose={onCloseAppearanceMenu}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        slotProps={{
                            paper: {
                                sx: {
                                  width: '200px',
                                  maxWidth: '200px',
                                },
                              },
                        }}
                    >
                        <MenuItem onClick={() => handleAppearanceMenuClose(AppTheme.LIGHT)}>Light Theme</MenuItem>
                        <MenuItem onClick={() => handleAppearanceMenuClose(AppTheme.DARK)}>Dark Theme</MenuItem>
                   </Menu>

                    <Button className={styles.sidebarContentItem}>
                        <div className={styles.sidebarContentItem__icon}>
                            <Diamond />
                        </div>

                        <a
                            href="https://github.com/vugar005/youtube-webapp-next"
                            target="_blank"
                            className={`mat-h3 ${styles.sidebarContentItem__text}`}
                        >Source Code</a>

                    </Button>

                    <Button className={styles.sidebarContentItem} disabled={true}>
                        <div className={styles.sidebarContentItem__icon}>
                            <Keyboard />
                        </div>
                        <div className={`mat-h3 ${styles.sidebarContentItem__text}`}>Keyboard shortcuts</div>
                    </Button>

                    <Button className={styles.sidebarContentItem} disabled={true}>
                        <div className={styles.sidebarContentItem__icon}>
                            <VideoSettings />
                        </div>
                        <div className={`mat-h3 ${styles.sidebarContentItem__text}`}>Change Youtube API Service</div>
                    </Button>

                    <Link href={'/policy-terms'}>
                        <Button className={styles.sidebarContentItem}>
                            <div className={styles.sidebarContentItem__icon}>
                                <Policy />
                            </div>
                            <div className={`mat-h3 ${styles.sidebarContentItem__text}`}>Policy & Terms</div>
                        </Button>
                    </Link>

                    <Button className={styles.sidebarContentItem}>

                        <div className={styles.sidebarContentItem__icon}>
                            <ShowChart />
                        </div>

                        <a
                            href="https://www.vugar.app"
                            target="_blank"
                            className={`mat-h3 ${styles.sidebarContentItem__text}`}
                        >
                            About Author
                        </a>
                    </Button>
                </div>

            </div>

        </Fragment >
    );
}