import VideoPlayer from '@/lib/ui/components/video-player/video-player';
import styles from './mini-player.module.scss';
import { Close, FeaturedVideo } from '@mui/icons-material';
import { MiniVideoPayload } from '@/lib/ui/models/mini-video-payload.model';
import { useState } from 'react';
import { YouTubePlayer } from 'react-youtube';

interface Props {
    videoId: string;
    startSeconds?: number;
    expandVideo?: (payload: MiniVideoPayload) => void;
    closeVideo?: () => void;
}

export default function MiniPlayer(props: Props) {
    const [playerRef, setPlayerRef] = useState<YouTubePlayer>();
    const { videoId } = props;

    const onExpandVideo = (): void => {
        const playerInfo = playerRef?.playerInfo;
        const videoData = playerRef?.getVideoData?.();
        const videoId = videoData?.video_id;
        const currentTime = playerInfo?.currentTime || 0;

        if (videoId && props.expandVideo) {
            props.expandVideo({ videoId, startSeconds: currentTime });
        }
    }

    const onReadyHandler = (videoPlayerRef: YouTubePlayer): void => {
        setPlayerRef(videoPlayerRef);
    }

    if (!videoId) {
        return null;
    }

    return (
        <div className={styles.host}>
            <div className={styles.miniplayer}>
                <div className={styles.miniplayerHeader}>
                    <div className={styles.headerActions}>
                        <FeaturedVideo className={`${styles.headerActions__item} ${styles['headerActions__item--expand']}`} onClick={onExpandVideo} />
                        <Close className={styles.headerActions__item} onClick={props.closeVideo} />
                    </div>
                </div>

                <div className={styles.miniplayer__video}>

                    <VideoPlayer
                        videoId={videoId}
                        onReady={onReadyHandler}
                    />

                </div>
            </div>
        </div>
    );
}