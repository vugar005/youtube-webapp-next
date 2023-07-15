import BrandIcon from "@/lib/ui/components/brand-icon";
import { Divider, Icon, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import { Fragment } from "react";
import { SIDEBAR_NAV_ENDPOINTS } from "./left-sidebar.constants";
import { INavLink } from "@/lib/ui/models/nav-link.model";
import styles from './left-sidebar.module.scss';
import Link from "next/link";

export default function () {
    const endpointLinks: INavLink[] = SIDEBAR_NAV_ENDPOINTS;

    return (
        <Fragment>
            <div className={styles.sidebar}>
                <div className={styles['sidebar__header']}>
                    <div className={styles['header-nav-icon']}>
                        <IconButton
                            className={styles['header-nav-icon__btn']}
                        >
                            <MenuIcon />
                        </IconButton>
                    </div>
                    <div >
                        <BrandIcon className={styles['header-brand-icon']}></BrandIcon>
                    </div>
                </div>
                <div className={styles['sidebar__nav']}>

                    {endpointLinks.map((endpoint, index) => {
                        return (
                            <Link href={`/${endpoint.url}`} key={index}>
                                <div
                                    className={styles['sidebar-endpoint']}
                                >
                                    <div className={styles['sidebar-endpoint__icon']}>
                                        <Icon>{endpoint?.icon}</Icon>
                                    </div>
                                    <div className={`mat-h3 ${styles['sidebar-endpoint__text']}`}>{endpoint?.text}</div>
                                </div>
                            </Link>
                        );
                    })}

                    <Divider />
                </div>
            </div >
        </Fragment >
    );
}