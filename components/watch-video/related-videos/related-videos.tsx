import { Fragment, useEffect } from "react";
import styles from './related-videos.module.scss';
import { useSearchList } from "@/lib/ui/hooks/useSearchList";
import VideoThumbnail from "@/lib/ui/components/video-thumbnail/video-thumbnail";
import VideoThumbnailLoader from "@/lib/ui/components/video-thumbnail-loader/video-thumbnail-loader";
import Link from "next/link";

interface Props {
    query?: string;
}
export default function RelatedVideos(props: Props) {
    const loaderItems = new Array(5).fill('item');

    const { query } = props;
    const { fetchSeachItems, searchItems, isSearchItemsLoading } = useSearchList();

    useEffect(() => {
        if (!query) { return; }
        fetchSeachItems({ query: query })
    }, [query, fetchSeachItems]);

    if (isSearchItemsLoading) {
        return (
            <div className={styles.videoList}>
                {
                    loaderItems?.map((item, loaderIndex) => {
                        return (
                            <div className={styles.thumbnailLoaderTemplate} key={loaderIndex}>
                                <VideoThumbnailLoader direction="vertical" />
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    return (
        <Fragment>
            <div className={styles.host}>
                <div className={styles.videoList}>
                    {searchItems?.map((video, videoIndex) => {
                        return (
                            <Link href={`/watch?v=${video.id?.videoId}`} key={videoIndex}>
                                <div
                                    className={styles.videoItem}
                                >
                                    <div className={styles.videoItem__thumbnail}>
                                        <VideoThumbnail searchItem={video} direction="vertical" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

        </Fragment>
    );
}