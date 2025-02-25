import { Fragment } from 'react';
import styles from './browse-videos-error.module.scss';
import { ReportProblem } from '@mui/icons-material';

export default function BrowseVideosError() {
    return (
        <Fragment>
            <div className={styles.errorTemplate}>
                <div className={styles.errorTemplate__header}>
                    <ReportProblem className={styles.errorTemplateIcon}></ReportProblem>
                </div>

                <div className={styles.errorTemplate__text}>
                    <h2 className="mat-h2">Oops... Someting went wrong.</h2>
                </div>
            </div>
        </Fragment>
    );
}