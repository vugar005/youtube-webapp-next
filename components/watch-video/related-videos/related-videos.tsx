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
    const { query } = props;
    const { fetchSeachItems, searchItems, isSearchItemsLoading } = useSearchList();

    useEffect(() => {
        if (!query) { return; }
        fetchSeachItems({ query: query })
    }, [query]);

    if (isSearchItemsLoading) {
        return (
            <div className={styles.videoCardLoader}>
                <VideoThumbnailLoader direction="horizontal" />
            </div>
        );
    }

    return (
        <Fragment>
            <div className="host">
                <div className={styles.videoList}>
                    {searchItems?.map((video, videoIndex) => {
                        return (
                            <Link href={`/watch?v=${video.id?.videoId}`}>

                                <div
                                    className={styles.videoItem}
                                    key={videoIndex}
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