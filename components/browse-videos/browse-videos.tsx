import { Fragment, useCallback, useEffect, useState } from 'react';
import styles from './browse-videos.module.scss';
import MiniSidebar from '../mini-sidebar/mini-sidebar';
import { IYoutubeVideoItem } from '@/lib/ui/models/youtube-video-list.model';
import VideoThumbnail from '@/lib/ui/components/video-thumbnail/video-thumbnail';
import { useAppSelector } from '@/store/hooks';
import { selectSearchQuery } from '@/store/reducers/video.reducer';
import { useSearchList } from '@/lib/ui/hooks/useSearchList';
import { useVideoList } from '@/lib/ui/hooks/useVideoList';
import BrowserVideosLoader from './browse-videos-loader/browse-videos-loader';
import BrowseVideosEmpty from './browse-videos-empty/browse-videos-empty';
import BrowseVideosError from './browse-videos-error/browse-videos-error';
import Link from 'next/link';

export default function BrowserVideos() {
    const [videoIds, setVideoIds] = useState<string | undefined>();
    const searchQuery = useAppSelector(selectSearchQuery);
    const { fetchSeachItems, searchItems, isSearchItemsLoading, searchItemsError } = useSearchList();
    const { fetchVideoItems, videoItems } = useVideoList();

    const getVideoDetail = useCallback((id: string | undefined): IYoutubeVideoItem | undefined => {
        return videoItems?.find((videoItem) => videoItem.items[0].id === id)?.items?.[0];
    }, [videoItems])

    useEffect(() => {
        const ids = searchItems?.map((item) => item.id?.videoId).join(',');
        setVideoIds(ids);
    }, [searchItems]);

    useEffect(() => {
        fetchSeachItems({ query: searchQuery })
    }, [searchQuery, fetchSeachItems]);

    useEffect(() => {
        fetchVideoItems({ id: videoIds })
    }, [videoIds, fetchVideoItems]);

    if (searchItemsError) {
        return (
            <BrowseVideosError />
        );
    }

    if (!isSearchItemsLoading && !searchItemsError && !searchItems?.length) {
        return (
            <BrowseVideosEmpty />
        );
    }


    if (isSearchItemsLoading) {
        return (
            <BrowserVideosLoader />
        );
    }

    return (
        <Fragment>
            <div className={styles.browseVideos}>
                <div className={styles.browseVideos__sidenav}>
                    <MiniSidebar className={styles.miniSidebarWrapper} />
                </div>

                <div className={styles.browseVideosList}>
                    {searchItems?.map((searchItem, index) => {
                        return (
                            <div
                                className={styles.videoPlayer}
                                key={index}
                            >

                                <Link href={`/watch?v=${searchItem.id?.videoId}`}>
                                    <VideoThumbnail
                                        searchItem={searchItem}
                                        videoDetail={getVideoDetail(searchItem.id?.videoId)}
                                        isNowPlaying={false}
                                        direction='horizontal'
                                    />
                                </Link>
                            </div>
                        );
                    })}
                </div>

            </div>
        </Fragment>
    );
}
