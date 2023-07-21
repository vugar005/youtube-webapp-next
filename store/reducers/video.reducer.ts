import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface IMiniPlayerVideo {
    videoId: string | null;
    startSeconds: number;
}
export interface VideoState {
    searchQuery: string;
    isMiniPlayerEnabled: boolean;
    miniPlayerVideo: IMiniPlayerVideo;
}

const initialState: VideoState = {
    searchQuery: 'arabic lounge',
    isMiniPlayerEnabled: false,
    miniPlayerVideo: {
        videoId: null,
        startSeconds: 0,
    },
};

export const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        setVideoSearchQuery(state, action) {
            return {
                ...state,
                searchQuery: action.payload,
            }
        },
        setIsMiniPlayerMode(state, action) {
            return {
                ...state,
                isMiniPlayerEnabled: action.payload,
            }
        },
        setMiniPlayerVideo(state, action) {
            return {
                ...state,
                miniPlayerVideo: {
                    videoId: action.payload.videoId,
                    startSeconds: action.payload.startSeconds || 0,
                }
            }
        }
    }
});

export const {
    setVideoSearchQuery,
    setIsMiniPlayerMode,
    setMiniPlayerVideo
} = videoSlice.actions;

export const selectSearchQuery = (state: RootState): string => state.video.searchQuery;
export const selectVideoIsMiniPlayerMode = (state: RootState): boolean => state.video.isMiniPlayerEnabled;
export const selectVideoMiniPlayerVideo = (state: RootState): IMiniPlayerVideo => state.video.miniPlayerVideo;
export const selectCurrentVideoId = (state: RootState): string | null => state.video.miniPlayerVideo.videoId;

export default videoSlice;
