import { Fragment, useState } from 'react';
import styles from './browse-videos.module.scss';
import MiniSidebar from '../mini-sidebar/mini-sidebar';
import VideoPlayer from '@/lib/ui/components/video-player/video-player';

export default function BrowserVideos() {
    const [videoLinks, setVideoLinks] = useState(['PGdw29X129I']);

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
                                <VideoPlayer
                                 videoId={videoLink}
                                />
                            </div>
                        );
                    })}
                </div>

            </div>
        </Fragment>
    );
}