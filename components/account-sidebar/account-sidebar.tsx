import { AccountCircle, Diamond, Keyboard, NightlightRounded, Policy, ShowChart, VideoSettings } from "@mui/icons-material";
import { Fragment } from "react";
import styles from './account-sidebar.module.scss';
import { Divider } from "@mui/material";
import packageJson from '../../package.json';

export default function AccountSidebar() {
    const nextVersion = packageJson.dependencies.next;

    return (
        <Fragment>
            <div className={styles.sidebar}>
                <div className={styles.sidebarTop}>
                    <div className={styles.sidebarTop__avatar}>
                        <AccountCircle sx={{width: '4rem', height: '4rem'}} />
                    </div>
                    <div className={styles.sidebarTop__text}>
                        <h2 className="mat-h2">Anonymous</h2>
                        <h3 className="mat-caption">Version: Nextjs v.{nextVersion} </h3>
                    </div>
                </div>

                <Divider />

                <div className={styles.sidebarContent}>
                    <div className={styles.sidebarContentItem}>
                        <div className={styles.sidebarContentItem__icon}>
                            <NightlightRounded />
                        </div>
                        <div className={`mat-h3 ${styles.sidebarContentItem__text}`}>Change Appearance</div>
                    </div>

                    <div className={styles.sidebarContentItem}>
                        <div className={styles.sidebarContentItem__icon}>
                            <Diamond />
                        </div>
                        <div className={`mat-h3 ${styles.sidebarContentItem__text}`}>Source Code</div>
                    </div>

                    <div className={styles.sidebarContentItem}>
                        <div className={styles.sidebarContentItem__icon}>
                            <Keyboard />
                        </div>
                        <div className={`mat-h3 ${styles.sidebarContentItem__text}`}>Keyboard shortcuts</div>
                    </div>

                    <div className={styles.sidebarContentItem}>
                        <div className={styles.sidebarContentItem__icon}>
                            <VideoSettings />
                        </div>
                        <div className={`mat-h3 ${styles.sidebarContentItem__text}`}>Change Youtube API Service</div>
                    </div>

                    <div className={styles.sidebarContentItem}>
                        <div className={styles.sidebarContentItem__icon}>
                            <Policy />
                        </div>
                        <div className={`mat-h3 ${styles.sidebarContentItem__text}`}>Policy & Terms</div>
                    </div>

                    <a
                        className={styles.sidebarContentItem}
                        href="https://www.vugar.app"
                        target="_blank"
                    >
                        <div className={styles.sidebarContentItem__icon}>
                            <ShowChart />
                        </div>
                        <div className={`mat-h3 ${styles.sidebarContentItem__text}`}>About Author</div>
                    </a>
                </div>

            </div>

        </Fragment >
    );
}