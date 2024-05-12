import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/user-slice';
import sessionSlice from './features/session/session-slice';


const store = configureStore({
    reducer: {
        user: userSlice,
        session: sessionSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: true})
})

store.subscribe(() => {
    console.log("STORE UPDATES")
    console.log(store.getState())
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
