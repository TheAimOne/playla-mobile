import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/user-slice';


const store = configureStore({
    reducer: {
        user: userSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: true})
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
