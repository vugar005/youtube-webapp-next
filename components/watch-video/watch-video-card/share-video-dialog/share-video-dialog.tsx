import { Button, Checkbox, Dialog, Divider, FormControlLabel, TextField } from "@mui/material";
import styles from './share-video-dialog.module.scss';
import { Close } from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";

interface Props {
    open: boolean;
    currenVideoTime: number;
    videoUrl: string;
    handleClose: any;
}
export default function ShareVideoDialog(props: Props) {
    const { open, currenVideoTime } = props;
    const [videoUrl, setVideoUrl] = useState<string>(props.videoUrl);
    const [hasStartTime, setHasStartTime] = useState<boolean>(false);

    const texfieldStyles = {
        '& .MuiInputBase-input': {
            fontSize: '1.4rem'
        }
    };

    const onCopyUrl = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(videoUrl);
        } catch (err) {
            console.log('Failed to copy: ', err);
        }
    }, [videoUrl]);

    useEffect(() => {
        if (hasStartTime) {
            setVideoUrl(`${props.videoUrl}?t=${currenVideoTime}`);
        } else {
            setVideoUrl(props.videoUrl);
        }
    }, [hasStartTime, props.videoUrl, currenVideoTime]);

    return (
        <Dialog open={open} onClose={props.handleClose}>
            <div className={styles.host}>
                <div className={styles.shareDialog}>
                    <div>
                        <div className={styles.shareDialogHeader}>
                            <h2 className={`${styles.shareDialogHeader__title} mat-h2`}>Share</h2>
                            <div className={styles.shareDialogHeader__close} onClick={props.handleClose}>
                                <Close />
                            </div>
                        </div>
                        <div className={styles.dialogInput}>
                            <TextField value={videoUrl} sx={texfieldStyles} className={styles.dialogInput__field} variant="filled" />
                            <Button className={styles.dialogInput__suffix} sx={{ fontSize: '1.4rem' }} onClick={onCopyUrl}>COPY</Button>
                        </div>

                        <Divider />

                        <FormControlLabel
                            control={<Checkbox checked={hasStartTime} onChange={(event) => setHasStartTime(event.target.checked)} />}
                            label={`Start at ${currenVideoTime}`}
                        />

                    </div>

                </div>
            </div>
        </Dialog>
    );
}