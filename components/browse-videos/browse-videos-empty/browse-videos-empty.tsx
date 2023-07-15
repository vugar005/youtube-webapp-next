import { Fragment } from "react";
import styles from './browse-videos-empty.module.scss';
import { Search } from "@mui/icons-material";

export default function BrowseVideosEmpty() {
    return (
        <Fragment>
            <div className={styles.emptyTemplate}>
                <div className={styles.emptyTemplate__header}>
                    <Search className={styles.emptyTemplateIcon} />
                </div>

                <div className={styles.emptyTemplate__text}>
                    <h2 className="mat-h2">No results found</h2>
                </div>
            </div>
        </Fragment>
    );
}