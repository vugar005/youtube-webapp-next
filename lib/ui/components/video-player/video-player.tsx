import { Fragment } from "react";
import YouTube from "react-youtube";
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

    console.log(opts)

    return (
        <Fragment>
            <YouTube
                videoId={props.videoId}
                className={styles.videoPlayer}
                opts={opts}
            />
        </Fragment>
    );
}