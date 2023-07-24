import { Fragment, useCallback, useEffect, useState } from "react";
import styles from './index.module.scss';
import { useAppSelector } from "@/store/hooks";
import { selectLikedVideos } from "@/store/reducers/account.reducer";
import { IYoutubeSearchItem } from "@/lib/ui/models/youtube-search-list.model";
import VideoThumbnail from "@/lib/ui/components/video-thumbnail/video-thumbnail";
import { EMPTY, Observable, catchError, filter, forkJoin, from, map, of, tap } from "rxjs";
import { useSearchList } from "@/lib/ui/hooks/useSearchList";
import VideoThumbnailLoader from "@/lib/ui/components/video-thumbnail-loader/video-thumbnail-loader";
import { Search } from "@mui/icons-material";
import Link from "next/link";

export default function Likes() {
    const videoIds = useAppSelector(selectLikedVideos);
    const { fetchSeachItems } = useSearchList();

    const [likedVideos, setLikedVideos] = useState<IYoutubeSearchItem[]>([]);

    const getLikedVideosInfo = useCallback((videoIds: string[]): void => {
        const reqArray: Observable<IYoutubeSearchItem>[] = [];
        videoIds?.forEach((id: string) => {
            const videoRequest = from(fetchSeachItems({ query: id })).pipe(
                map((data) => data?.[0]),
                filter(Boolean)
            );
            reqArray.push(videoRequest);
        });

        forkJoin(reqArray)
            .pipe(catchError(() => EMPTY))
            .subscribe((data: IYoutubeSearchItem[]) => {
                setLikedVideos(data);
            });
    }, [fetchSeachItems])

    useEffect(() => {
        getLikedVideosInfo(videoIds);
    }, [videoIds, getLikedVideosInfo]);

    const loadingTemplate = () => {
        return (
            <Fragment>
                {videoIds?.map((item, index) => {
                    return (
                        <div className={styles.thumbnailLoaderTemplateItem} key={index} >
                            <VideoThumbnailLoader
                                direction="vertical"
                            />
                        </div>
                    );
                })}
            </Fragment>
        );
    }

    const primaryLoadingTemplate = () => {
        return (
            <Fragment>
                {videoIds?.map((item, index) => {
                    return (
                        <div className={styles.thumbnailPrimaryLoaderTemplateItem} key={index}>
                            <VideoThumbnailLoader
                                direction="horizontal"
                            />
                        </div>
                    );
                })}
            </Fragment>
        );
    }

    const emptyTemplate = () => {
        return (
            <Fragment>
                <div className={styles.emptyTemplate}>
                    <div className={styles.emptyTemplate__header}>
                        <Search className={styles.emptyTemplateIcon} />
                    </div>

                    <div className={styles.emptyTemplate__text}>
                        <h2 className="mat-h2">Seems like you have not liked videos yet</h2>
                        <a className="mat-h3" > Watch and like some videos </a>
                    </div>
                </div>
            </Fragment>
        );
    }

    if (!videoIds?.length) {
        return emptyTemplate();
    }

    return (
        <Fragment>
            <div className={styles.host}>
                <div className={styles.home}>
                    <div className={styles.homeSidebar}>
                        <div className={styles.homeSidebar__video}>
                            {likedVideos?.[0] ?
                                <VideoThumbnail
                                    searchItem={likedVideos[0]}
                                    direction="horizontal"
                                />
                                : primaryLoadingTemplate()
                            }

                        </div>

                        <h1 className={`${styles.homeSidebar__title} mat-display-1`}>Liked videos</h1>
                    </div>


                    <div className={styles.videoList}>
                        {likedVideos?.length ?

                            likedVideos.map((video, videoIndex) => {
                                return (
                                    <div
                                        key={videoIndex}
                                        className={styles.videoItem}
                                    >
                                        {<div className={styles.videoItem__index}>{videoIndex + 1}</div>}

                                        <div className={styles.videoItem__thumbnail}>
                                            <Link href={`/watch?v=${video.id?.videoId}`}>
                                                <VideoThumbnail
                                                    searchItem={video}
                                                    direction="vertical"
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })
                            : loadingTemplate()}
                    </div>
                </div>

            </div>

        </Fragment>
    );
}