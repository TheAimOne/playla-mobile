import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../../core/types/Auth";
import permStorage from "../../PermStorage";

export const SESSION_SLICE = 'session';

const initialState: AuthState = {
    userId: "",
    accessToken: "",
    session: {
      refreshToken: "",
      deviceId: "",
      deviceType: "",
      refreshTokenExpiry: undefined
    }
}

export const sessionSlice = createSlice({
    name: SESSION_SLICE,
    initialState: initialState,
    reducers: {
        setSession: (state: any, action: PayloadAction<AuthState>) => {
            const auth = action.payload;
            state.accessToken = auth.accessToken;
            state.userId = auth.userId;
            state.session = auth.session;
            permStorage.save({
                key: SESSION_SLICE,
                data: {
                    ...auth
                }
            })
            return state
        },
        setAccessToken: (state: any, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
            return state
        },
        clearSession: (state: any, action: PayloadAction<AuthState>) => {
            state = initialState
            return state
        }
    }
})

export const { setSession, setAccessToken, clearSession } = sessionSlice.actions;

export const selectSession = (state: any) => state.session;
export const selectAccessToken = (state: any) => state.session.accessToken;

export default sessionSlice.reducer;
