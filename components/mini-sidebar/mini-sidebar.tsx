import { Fragment } from "react";
import { MINI_SIDEBAR_NAV_ENDPOINTS } from "./mini-sidebar.constants";
import styles from './mini-sidebar.module.scss';
import { Icon } from "@mui/material";

export default function MiniSidebar() {
    const endpoints = MINI_SIDEBAR_NAV_ENDPOINTS;

    return (
        <Fragment>
            <div className={styles['mini-sidebar']}>
                {endpoints.map((endpoint, index) => {
                    return (
                        <a key={index} className={styles['mini-sidebar-endpoint']}>
                            <div className={styles['mini-sidebar-endpoint__icon']}>
                                <Icon>{endpoint?.icon}</Icon>
                            </div>
                            <div className={`mat-caption ${styles['mini-sidebar-endpoint__text']}`}>{endpoint.text}</div>
                        </a>
                    );
                })};

            </div>
        </Fragment>
    );
}