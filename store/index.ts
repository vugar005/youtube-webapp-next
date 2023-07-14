import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import videoSlice from './reducers/video.reducer'
import settingsSlice from './reducers/settings.reducer'
import accountSlice from './reducers/account.reducer'

const store = configureStore({
    reducer: {
        video: videoSlice.reducer,
        settings: settingsSlice.reducer,
        account: accountSlice.reducer
    }
})

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
 >;