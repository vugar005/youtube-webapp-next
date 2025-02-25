import { Fragment } from "react";
import styles from './video-thumbnail-loader.module.scss';
import classNames from "classnames";

interface Props {
    direction?: 'vertical' | 'horizontal';
}
export default function VideoThumbnailLoader(props: Props) {
    const { direction } = props;

    const thumbnailClasses = classNames(`${styles.thumbnail}`, {
        [styles['thumbnail--vertical']]: direction === 'vertical',
        [styles['thumbnail--horizontal']]: direction === 'horizontal'
    });

    return (
        <Fragment>
            <div className={styles.host}>
                <a
                    className={thumbnailClasses}
                >
                    <div className={styles.thumbnail__image}>
                        <div></div>
                    </div>

                    <div className={styles.thumbnailDetails}>
                        <div className={styles.thumbnailDetails__icon}></div>
                        <div className={styles.thumbnailDetailsContent}>
                            <h3 className={styles.thumbnailDetailsContent__title}></h3>
                            <h3 className={styles.thumbnailDetailsContent__channelTitle}></h3>
                            <p className={styles.thumbnailDetailsContent__footer}></p>
                        </div>
                    </div>
                </a>
            </div>
        </Fragment>
    );
}