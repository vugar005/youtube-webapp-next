import { createSlice } from "@reduxjs/toolkit";

export interface AccountState {
    isAuthenticated: boolean;
    likedVideoList: string[];
    dislikedVideoList: string[];
    watchedVideos: string[];
    isWatchHistoryEnabled: boolean;
}

const initialState: AccountState = {
    likedVideoList: [],
    dislikedVideoList: [],
    isAuthenticated: false,
    watchedVideos: [],
    isWatchHistoryEnabled: true,
};

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        login(state) {
            return {
                ...state,
                isAuthenticated: true,
            }
        },
        logout(state) {
            return {
                ...state,
                isAuthenticated: false,
            }
        },
        toggleLikeVideo(state, action) {
            const likedVideoId = action.payload.videoId;
            let likedList = [...state.likedVideoList];
            const isAlreadyLiked = !!likedList.find((videoId: string) => videoId === likedVideoId);
            if (!isAlreadyLiked) {
                likedList.push(likedVideoId);
            } else {
                likedList = likedList.filter((videoId) => videoId !== likedVideoId);
            }
            return {
                ...state,
                likedVideoList: likedList,
            };
        },
        toggleDislikeVideo(state, action) {
            const dislikedVideoId = action.payload.videoId;
            let disikedList = [...state.dislikedVideoList];
            const isAlreadyDisLiked = !!disikedList.find((videoId: string) => videoId === dislikedVideoId);
            if (!isAlreadyDisLiked) {
                disikedList.push(dislikedVideoId);
            } else {
                disikedList = disikedList.filter((videoId) => videoId !== dislikedVideoId);
            }
            return {
                ...state,
                dislikedVideoList: disikedList,
            };
        },
        addVideoToHistoryList(state, action) {
            const videoId = action.payload.videoId;
            const watchedList = new Set([...state.watchedVideos]);
            watchedList.add(videoId);

            return {
                ...state,
                watchedVideos: Array.from(watchedList),
            };
        },
        clearWatchHistory(state) {
            return {
                ...state,
                watchedVideos: [],
            };
        },
        toggleIsWatchHistoryEnabled(state, action) {
            return {
                ...state,
                isWatchHistoryEnabled: action.payload.isActive,
            };
        }
    }
});

export default accountSlice;

export const selectLikedVideos = (state: AccountState): string[] => state.likedVideoList;
export const selectDislikedVideos = (state: AccountState): string[] => state.dislikedVideoList;
export const selectedWatchedVideos = (state: AccountState): string[] => state.watchedVideos;
export const selectIsWatchHistoryEnabled = (state: AccountState): boolean => state.isWatchHistoryEnabled;