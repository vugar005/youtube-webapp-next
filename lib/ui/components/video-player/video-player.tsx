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
    const { onReady, onStateChange } = props;
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

    const onReadyHandler = useCallback((event: YouTubeEvent<any>) => {
        console.log('onReadyHandler')
        const videPlayerRef: YouTubePlayer = event.target;
        setPlayerRef(videPlayerRef);
        videPlayerRef?.playVideo();

        if (onReady) {
            onReady(videPlayerRef);
        }

    }, [onReady]);

    const onStateChangeHandler = useCallback((event: YouTubeEvent<any>) => {
        console.log('onStateChangeHandler')

        if (onStateChange) {
            onStateChange(event);
        }

    }, [onStateChange]);

    return (
        <Fragment>
            <YouTube
                videoId={props.videoId}
                className={styles.videoPlayer}
                opts={opts}
                onReady={onReadyHandler}
                onStateChange={onStateChangeHandler}
            />
        </Fragment>
    );
}