import { IYoutubeVideoItem } from "@/lib/ui/models/youtube-video-list.model";
import styles from './video-card-secondary-info.module.scss';
import { Button } from "@mui/material";

interface Props {
    videoItem: IYoutubeVideoItem | undefined;
}
export default function VideoCardSecondaryInfo(props: Props) {
    const { videoItem } = props;
    return (
        <div className={styles.host}>
            <div className={styles.ytContainer}>
                <div className={styles.ytRow}>
                    <div className={styles.videoOwner}>
                        <div className={styles.videoOwner__avatar}></div>
                        <div className={`${styles.videoOwner__title} mat-subtitle-1`} >{videoItem?.snippet?.channelTitle}</div>
                        <a
                            className={styles.videoOwner__subscribe}
                            href="https://www.youtube.com/channel/{ videoItem?.snippet?.channelId }"
                            target="_blank"
                        >
                            <Button sx={{fontSize: '1.4rem'}}>SUBSCRIBE</Button>
                        </a>
                    </div>
                </div>

                <div className={styles.ytRow}>
                    <div className={styles.ytExpander}>
                        <div
                            className={`${styles.ytExpander__content} mat-subtitle-1`}
                            dangerouslySetInnerHTML={{ __html: videoItem?.snippet?.description || '' }}
                        ></div>

                        <Button className={`${styles.ytExpander__more} mat-subtitle-2`}>
                            <span >Show More</span>
                            <span>Show Less</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}