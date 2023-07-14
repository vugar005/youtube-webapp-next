import { Fragment, useState } from 'react';
import styles from './browse-videos.module.scss';
import MiniSidebar from '../mini-sidebar/mini-sidebar';
import { IYoutubeSearchItem } from '@/lib/ui/models/youtube-search-list.model';
import { SEARCHLIST_MOCK } from '@/mocks/searchlist';
import { IYoutubeVideoItem, IYoutubeVideoResult } from '@/lib/ui/models/youtube-video-list.model';
import VideoThumbnail from '@/lib/ui/components/video-thumbnail/video-thumbnail';

export default function BrowserVideos() {
    const [videoLinks, setVideoLinks] = useState<IYoutubeSearchItem[]>(SEARCHLIST_MOCK.items);
    const [videoDetails, setVideoDetails] = useState<IYoutubeVideoResult[]>([]);

    const getVideoDetail = (id: string | undefined): IYoutubeVideoItem | undefined => {
        return videoDetails?.find((item) => item.items[0].id === id)?.items?.[0];
    }
    return (
        <Fragment>
            <div className={styles.browseVideos}>
                <div className={styles.browseVideos__sidenav}>
                    <MiniSidebar className={styles.miniSidebarWrapper} />
                </div>

                <div className={styles.browseVideosList}>
                    {videoLinks.map((videoLink, index) => {
                        return (
                            <div
                                className={styles.videoPlayer}
                                key={index}
                            >
                                <VideoThumbnail
                                 searchItem={videoLink}
                                 isNowPlaying={false}
                                 direction='horizontal'
                                />
                            </div>
                        );
                    })}
                </div>

            </div>
        </Fragment>
    );
}