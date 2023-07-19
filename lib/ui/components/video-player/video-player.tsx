import { Fragment, useCallback, useState } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";
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

    const onReadyHandler = useCallback((event: YouTubeEvent<any>) => {
        const playerRef = event.target;
        setPlayerRef(playerRef);
        event.target?.playVideo();
    }, []);

    return (
        <Fragment>
            <YouTube
                videoId={props.videoId}
                className={styles.videoPlayer}
                opts={opts}
                onReady={onReadyHandler}
            />
        </Fragment>
    );
}