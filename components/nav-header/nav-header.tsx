import { Drawer, IconButton, Popover } from "@mui/material";
import { Fragment, useState } from "react";
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

type Anchor = 'left' | 'right';

export default function NavHeader() {
    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectSettingsTheme);

    const [featureAnchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isSidenavOpen, setSidenavOpen] = useState({
        left: false,
        right: false
    });

    const isFeatureMenuOpen = Boolean(featureAnchorEl);
    const navFeatures = NAV_FEATURES;

    const handleFeatureMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleFeatureMenuClose = () => {
        setAnchorEl(null);
    };

    const toggleDrawer = (anchor: Anchor, open: boolean) => () => {
        setSidenavOpen({ ...isSidenavOpen, [anchor]: open });
    };

    const onChageTheme = () => {
        if (theme === AppTheme.DARK) {
            dispatch(setTheme({ theme: AppTheme.LIGHT }))
        } else {
            dispatch(setTheme({ theme: AppTheme.DARK }))
        }
    };

    return (
        <Fragment>

            <div className={styles['header-host']}>
                <div className={styles.header}>
                    <div className={styles.header__start}>
                        <div className={styles['header-nav-icon']} >
                            <IconButton
                                className={styles['header-nav-icon__btn']}
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
                            <LeftSidebar />
                        </Drawer>

                        <Drawer
                            anchor={'right'}
                            open={isSidenavOpen['right']}
                            onClose={toggleDrawer('right', false)}
                        >
                            <AccountSidebar />
                        </Drawer>

                        <Link href="/">
                            <div className={styles['header-brand-icon']}>
                                <BrandIcon className={styles['brand-icon']} />
                                <span className={styles['header-brand-icon__country-code']}>PL</span>
                            </div>
                        </Link>
                    </div>

                    <div className={styles.header__center}>
                        <SearchBox />
                    </div>

                    <div className={styles.header__end}>
                        <div className={styles['header-feature header-feature--community']}>
                            <IconButton
                                className={styles['header-nav-icon__btn']}
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
                                                            <img src={feature.imgSrc} alt={feature.imgAlt} />
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

                        <div className={styles['header-feature']}>
                            <IconButton className={styles['header-nav-icon__btn']} onClick={onChageTheme}>
                                <Lightbulb />
                            </IconButton>
                        </div>

                        <div className={styles['header-feature flash']}>
                            <IconButton
                                onClick={toggleDrawer('right', true)}
                                className={styles['header-nav-icon__btn']}
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