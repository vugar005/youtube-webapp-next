import { Fragment, useCallback, useState } from "react";
import YouTube, { YouTubeEvent, YouTubePlayer } from "react-youtube";
import styles from './video-player.module.scss';

interface Props {
    videoId?: string;
    startSeconds?: number;
    width?: number;
    height?: 170;
    playerVars?: {
        showinfo: number;
        modestbranding: number;
    }
    onReady?: (playerRef: YouTubePlayer) => void
    onStateChange?: (playerRef: YouTubePlayer.PlayerState) => void
}

export default function VideoPlayer(props: Props) {
    const [playerRef, setPlayerRef] = useState<any>(null);

    const width = props.width || '100%';
    const height = props.height || '100%';
    const playerVars = props.playerVars || {
        showinfo: 0,
        modestbranding: 0
    };

    const opts = {
        width,
        height,
        playerVars
    };

    const onReady = useCallback((event: YouTubeEvent<any>) => {
        const videPlayerRef: YouTubePlayer = event.target;
        setPlayerRef(videPlayerRef);
        videPlayerRef?.playVideo();

        if (props.onReady) {
            props.onReady(videPlayerRef);
        }

    }, []);

    const onStateChange = useCallback((event: YouTubeEvent<any>) => {
        if (props.onStateChange) {
            props.onStateChange(event);
        }

    }, []);

    return (
        <Fragment>
            <YouTube
                videoId={props.videoId}
                className={styles.videoPlayer}
                opts={opts}
                onReady={onReady}
                onStateChange={onStateChange}
            />
        </Fragment>
    );
}