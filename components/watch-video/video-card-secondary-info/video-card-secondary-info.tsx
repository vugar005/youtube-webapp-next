import { IYoutubeVideoItem } from "@/lib/ui/models/youtube-video-list.model";
import styles from './video-card-secondary-info.module.scss';
import { Button } from "@mui/material";
import classNames from "classnames";
import { useState } from "react";

interface Props {
    videoItem: IYoutubeVideoItem | undefined;
}
export default function VideoCardSecondaryInfo(props: Props) {
    const { videoItem } = props;
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const expanderClasses = classNames(`${styles.ytExpander__content} mat-subtitle-1`, {
        [styles['ytExpander__content--expanded']]: isExpanded,
    });

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
                            <Button sx={{ fontSize: '1.4rem' }}>SUBSCRIBE</Button>
                        </a>
                    </div>
                </div>

                <div className={styles.ytRow}>
                    <div className={styles.ytExpander}>
                        <div
                            className={expanderClasses}
                            dangerouslySetInnerHTML={{ __html: videoItem?.snippet?.description || '' }}
                        ></div>

                        <Button className={`${styles.ytExpander__more} mat-subtitle-2`}>
                            {!isExpanded ?
                                <span onClick={() => setIsExpanded(true)} >Show More</span>
                                : <span onClick={() => setIsExpanded(false)}>Show Less</span>

                            }

                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}