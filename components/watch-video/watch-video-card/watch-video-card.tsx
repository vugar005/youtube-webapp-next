import { IYoutubeVideoItem } from "@/lib/ui/models/youtube-video-list.model";
import { Fragment } from "react";
import styles from './watch-video-card.module.scss';
import { PictureInPictureAlt, Share, ThumbDown } from "@mui/icons-material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { ytdAbbreviateNumber } from "@/lib/ui/pipes/abbreviate-number/abbreviate-number.pipe";
import { Button, Divider } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import { selectDislikedVideos, selectLikedVideos } from "@/store/reducers/account.reducer";
import VideoPlayer from "@/lib/ui/components/video-player/video-player";
import VideoCardSecondaryInfo from "../video-card-secondary-info/video-card-secondary-info";
import VideoThumbnailLoader from "@/lib/ui/components/video-thumbnail-loader/video-thumbnail-loader";

interface Props {
    videoId: string | undefined;
    startSeconds?: number | undefined;
    videoResult: IYoutubeVideoItem | undefined;
}
export default function WatchVideoCard(props: Props) {
    const { videoId, startSeconds, videoResult } = props;
    const likedVideos = useAppSelector(selectLikedVideos);
    const dislikedVideos = useAppSelector(selectDislikedVideos);

    const isLiked = (): boolean => {
        if (!videoId) { return false; }
        return likedVideos?.includes(videoId);
    }

    const isDisliked = (): boolean => {
        if (!videoId) { return false; }
        return dislikedVideos?.includes(videoId);
    }

    if(!videoResult?.snippet?.title) {
        return(
            <div className={styles.videoCardLoader}>
             <VideoThumbnailLoader direction="horizontal"/>
          </div>
        );
    }


    return (
        <Fragment>
            <div className={styles.videoCard}>
                <div className={styles.videoCard__player}>
                    <VideoPlayer videoId={videoId} startSeconds={startSeconds} />
                </div>

                <div className={styles.videoDetails}>
                    {
                        videoResult?.snippet?.tags?.length ?
                            <div className={styles.videoDetailsTags}>
                                {videoResult.snippet.tags.map(tag => {
                                    return (
                                        <div className={`${styles.videoDetailsTag} mat-subtitle-2`}>
                                            #{tag}
                                        </div>
                                    );
                                })}
                            </div> : null

                    }

                    <div className={`${styles.videoDetails__title} mat-h2`}>{videoResult?.snippet?.title}</div>

                    <div className={styles.videoDetails__footer}>
                        <div className={`${styles.videoDetails__footer__views} mat-h3`}>
                            <span> {videoResult?.statistics?.viewCount} views </span>
                            <span> • {videoResult?.snippet?.publishedAt?.toString()} </span>
                        </div>

                        <div className={styles.videoDetailsActions}>
                            <Button className={styles.videoDetailsActions__item}>
                                {isLiked() && <ThumbUpOffAltIcon className={styles.videoDetailsActions__item__icon} />}
                                {!isLiked() && <ThumbUpIcon className={styles.videoDetailsActions__item__icon} />}

                                <p className={`${styles.videoDetailsActions__item__text} mat-h3`}
                                >
                                    {ytdAbbreviateNumber(Number(videoResult?.statistics?.likeCount), 0)} LIKES
                                </p>

                            </Button>

                            <Button className={styles.videoDetailsActions__item}>
                                {isDisliked() && <ThumbDown className={styles.videoDetailsActions__item__icon} />}
                                {!isDisliked() && <ThumbDownOffAltIcon className={styles.videoDetailsActions__item__icon} />}

                                <p
                                    className={`${styles.videoDetailsActions__item__text} mat-h3`}
                                >
                                    DISLIKE
                                </p>

                            </Button>

                            <Button className={styles.videoDetailsActions__item}>
                                {<Share className={styles.videoDetailsActions__item__icon} />}

                                <p className={`${styles.videoDetailsActions__item__text} mat-h3`}
                                >
                                    SHARE
                                </p>

                            </Button>

                            <Button className={styles.videoDetailsActions__item}>
                                {<PictureInPictureAlt className={`${styles.videoDetailsActions__item__icon} flash`} />}

                                <p className={`${styles.videoDetailsActions__item__text} mat-h3`}
                                >
                                    MINI PLAYER
                                </p>

                            </Button>
                        </div>

                    </div>

                </div>

                <Divider />

                {
                    videoResult?.snippet?.description ?
                        <div className={styles.videoCard__secondaryInfo}>
                            <VideoCardSecondaryInfo videoItem={videoResult} />
                        </div> : null
                }

            </div>
        </Fragment>
    );
}