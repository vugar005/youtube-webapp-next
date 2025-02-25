import BrandIcon from "@/lib/ui/components/brand-icon";
import { Divider, Icon, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import { Fragment, useCallback } from "react";
import { SIDEBAR_NAV_ENDPOINTS } from "./left-sidebar.constants";
import { INavLink } from "@/lib/ui/models/nav-link.model";
import styles from './left-sidebar.module.scss';
import { useRouter } from "next/router";

interface Props {
    closeHandler: () => void
}

export default function LeftSidebar(props: Props) {
    const router = useRouter();
    const endpointLinks: INavLink[] = SIDEBAR_NAV_ENDPOINTS;


    const closeSidebar = useCallback(() => {
        props?.closeHandler();
    }, [props]);

    const onNavigate = useCallback((link: string) => {
        router.push(`/${link}`);
        closeSidebar();
    }, [router, closeSidebar]);

    return (
        <Fragment>
            <div className={styles.sidebar}>
                <div className={styles['sidebar__header']}>
                    <div className={styles['header-nav-icon']} onClick={closeSidebar}>
                        <IconButton
                            className={styles['header-nav-icon__btn']}
                        >
                            <MenuIcon />
                        </IconButton>
                    </div>
                    <div onClick={closeSidebar}>
                        <BrandIcon className={styles['header-brand-icon']}></BrandIcon>
                    </div>
                </div>
                <div className={styles['sidebar__nav']}>

                    {endpointLinks.map((endpoint, index) => {
                        return (
                            <div onClick={() => onNavigate(endpoint.url)} key={index}
                                className={styles['sidebar-endpoint']}
                            >
                                <div className={styles['sidebar-endpoint__icon']}>
                                    <Icon>{endpoint?.icon}</Icon>
                                </div>
                                <div className={`mat-h3 ${styles['sidebar-endpoint__text']}`}>{endpoint?.text}</div>
                            </div>
                        );
                    })}

                    <Divider />
                </div>
            </div >
        </Fragment >
    );
}