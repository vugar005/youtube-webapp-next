import { useAppDispatch, useAppSelector } from "@/store/hooks";
import MiniPlayer from "../mini-player/mini-player";
import { selectCurrentVideoId, selectVideoIsMiniPlayerMode, setIsMiniPlayerMode, setMiniPlayerVideo } from "@/store/reducers/video.reducer";
import { MiniVideoPayload } from "@/lib/ui/models/mini-video-payload.model";
import { useRouter } from "next/router";

export default function MiniPlayerWrapper() {
    const videoId = useAppSelector(selectCurrentVideoId);
    const isMiniPlayerOn = useAppSelector(selectVideoIsMiniPlayerMode);
    const dispatch = useAppDispatch();
    const router = useRouter();

    if (!videoId) {
        return null;
    }

    const onExpandVideoHandler = (videoPayload: MiniVideoPayload): void => {
        const { videoId, startSeconds } = videoPayload;
        console.log(videoPayload)
        dispatch(setIsMiniPlayerMode(false));
        dispatch(setMiniPlayerVideo({ videoId, startSeconds }));

        router.push({
            pathname: '/watch',
            query: { v: videoId, t: startSeconds },
        });
    };

    const onCloseVideoHandler = (): void => {
        dispatch(setIsMiniPlayerMode(false));
        dispatch(setMiniPlayerVideo({ videoId: null, startSeconds: null }));
    };

    if (!isMiniPlayerOn || !videoId) {
        return null;
    }

    return (
        <MiniPlayer
            videoId={videoId}
            expandVideo={onExpandVideoHandler}
            closeVideo={onCloseVideoHandler} />
    );
}