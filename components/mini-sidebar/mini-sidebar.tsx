import { Fragment } from "react";
import { MINI_SIDEBAR_NAV_ENDPOINTS } from "./mini-sidebar.constants";
import styles from './mini-sidebar.module.scss';
import { Icon } from "@mui/material";
import Link from "next/link";

interface Props {
    className?: string;
}

export default function MiniSidebar(props: Props) {
    const endpoints = MINI_SIDEBAR_NAV_ENDPOINTS;

    return (
        <Fragment>
            <div className={styles['mini-sidebar']}>
                {endpoints.map((endpoint, index) => {
                    return (
                        <Link href={`/${endpoint.url}`} key={index}>
                            <div className={styles['mini-sidebar-endpoint']}>
                                <div className={styles['mini-sidebar-endpoint__icon']}>
                                    <Icon>{endpoint?.icon}</Icon>
                                </div>
                                <div className={`mat-caption ${styles['mini-sidebar-endpoint__text']}`}>{endpoint.text}</div>
                            </div>
                        </Link>
                    );
                })};

            </div>
        </Fragment>
    );
}