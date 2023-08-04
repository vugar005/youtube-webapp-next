import { Drawer, IconButton, Popover } from "@mui/material";
import { Fragment, useState } from "react";
import Image from "next/image";
import MenuIcon from '@mui/icons-material/Menu';
import BrandIcon from "@/lib/ui/components/brand-icon";
import styles from './nav-header.module.scss';
import { NAV_FEATURES } from "./nav-header.constants";
import { AccountCircle, GridView, Lightbulb } from "@mui/icons-material";
import LeftSidebar from "../left-sidebar/left-sidebar";
import AccountSidebar from "../account-sidebar/account-sidebar";
import Link from "next/link";
import SearchBox from "@/lib/ui/components/search-box/search-box";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AppTheme, selectSettingsTheme, setTheme } from "@/store/reducers/settings.reducer";
import { LocalStorageEnum } from "@/lib/ui/constants/local-storage.constants";
import { IYoutubeSearchItem } from "@/lib/ui/models/youtube-search-list.model";
import { useRouter } from "next/router";
import { setVideoSearchQuery } from "@/store/reducers/video.reducer";

type Anchor = 'left' | 'right';

export default function NavHeader() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const theme = useAppSelector(selectSettingsTheme);

    const [featureAnchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isSidenavOpen, setSidenavOpen] = useState({
        left: false,
        right: false
    });

    const isFeatureMenuOpen = Boolean(featureAnchorEl);
    const navFeatures = NAV_FEATURES;

    const handleFeatureMenuClick = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleFeatureMenuClose = (): void => {
        setAnchorEl(null);
    };

    const toggleDrawer = (anchor: Anchor, open: boolean) => () => {
        setSidenavOpen({ ...isSidenavOpen, [anchor]: open });
    };

    const onChageTheme = (): void => {
        if (theme === AppTheme.DARK) {
            dispatch(setTheme({ theme: AppTheme.LIGHT }))
            localStorage.setItem(LocalStorageEnum.SAVED_THEME, AppTheme.LIGHT);
        } else {
            dispatch(setTheme({ theme: AppTheme.DARK }))
            localStorage.setItem(LocalStorageEnum.SAVED_THEME, AppTheme.DARK);
        }
    };

    const inputChangeHandler = (option: IYoutubeSearchItem | string): void => {
        if (typeof option === 'object') {
            router.push(`/watch?v=${option?.id?.videoId}`);
        } else {
            dispatch(setVideoSearchQuery(option))
        }
    }

    return (
        <Fragment>

            <div className={styles.host}>
                <div className={styles.header}>
                    <div className={styles.header__start}>
                        <div className={styles.headerNavIcon}>
                            <IconButton
                                className={styles.headerNavIcon__btn}
                                onClick={toggleDrawer('left', true)}
                            >
                                <MenuIcon />
                            </IconButton>
                        </div>

                        <Drawer
                            anchor={'left'}
                            open={isSidenavOpen['left']}
                            onClose={toggleDrawer('left', false)}
                        >
                            <LeftSidebar closeHandler={toggleDrawer('left', false)} />
                        </Drawer>

                        <Drawer
                            anchor={'right'}
                            open={isSidenavOpen['right']}
                            onClose={toggleDrawer('right', false)}
                        >
                            <AccountSidebar />
                        </Drawer>

                        <Link href="/">
                            <div className={styles.headerBrandIcon}>
                                <BrandIcon className={styles.brandIcon} />
                                <span className={styles.headerBrandIcon__countryCode}>PL</span>
                            </div>
                        </Link>
                    </div>

                    <div className={styles.header__center}>
                        <SearchBox inputChangeHandler={inputChangeHandler} />
                    </div>

                    <div className={styles.header__end}>
                        <div className={`${styles.headerFeature} ${styles[`headerFeature--community`]}`}>
                            <IconButton
                                className={styles.headerNavIcon__btn}
                                onClick={handleFeatureMenuClick}
                            >
                                <GridView />
                            </IconButton>

                            <Popover
                                open={isFeatureMenuOpen}
                                anchorEl={featureAnchorEl}
                                onClose={handleFeatureMenuClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            >
                                <div className="feature-apps-content">
                                    <h3 className="feature-apps-content__title mat-h3">Community Apps</h3>
                                    <div className="apps-container">
                                        {navFeatures.map((feature, index) => {
                                            return (
                                                <Fragment
                                                    key={index}
                                                >
                                                    <a
                                                        className='app-item'
                                                        href={feature.githubUrl}
                                                        target="_blank"
                                                    >
                                                        <div className='app-item__image'>

                                                            <Image
                                                                src={feature.imgSrc}
                                                                alt={feature.imgAlt}
                                                                fill
                                                                sizes="(min-width: 0) 100%, 100%"
                                                            />
                                                        </div>

                                                        <div
                                                            className='app-item__text mat-caption'
                                                            dangerouslySetInnerHTML={{ __html: feature.description }}
                                                        >
                                                        </div>
                                                    </a>

                                                </Fragment>
                                            )
                                        })}
                                    </div>
                                </div>
                            </Popover>

                        </div>

                        <div className={styles.headerFeature}>
                            <IconButton className={styles.headerNavIcon__btn} onClick={onChageTheme}>
                                <Lightbulb />
                            </IconButton>
                        </div>

                        <div className={`${styles.headerFeature} ${styles[`flash`]}`}>
                            <IconButton
                                onClick={toggleDrawer('right', true)}
                                className={styles.headerNavIcon__btn}
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}