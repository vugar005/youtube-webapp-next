import { Fragment } from "react";
import styles from './browse-videos-loader.module.scss';
import VideoThumbnailLoader from "@/lib/ui/components/video-thumbnail-loader/video-thumbnail-loader";

export default function BrowserVideosLoader() {
    const loaderItems = new Array(18).fill('some-data');

    return (
        <Fragment>
            <div className={styles.loaderTemplate}>
                {loaderItems.map((item, index) => {
                    return (
                        <div className={styles.loaderTemplate__item} key={index}>
                            <VideoThumbnailLoader
                                direction="horizontal"
                            />
                        </div>
                    );
                })}

            </div>
        </Fragment>
    );
}