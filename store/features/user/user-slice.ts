import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '../../../core'
import { RootState } from '../../store'

export const USER_SLICE = 'user'

const initialState: User = {
    userId: "",
    name: "",
    status: "",
}

export const userSlice = createSlice({
    name: USER_SLICE,
    initialState: initialState,
    reducers: {
        setUser: (state: User, action: PayloadAction<User>) => {
            const user = action.payload;
            state.userId = user.userId
            state.email = user.email;
            state.userId = user.userId;
            state.mobile = user.mobile;
            state.name = user.name;
            state.shortName = user.shortName;
            state.status = user.status
            return state
        },
        clearUser: (state: User, action: PayloadAction<User>) => {
            state = initialState
            return state
        }
    }
})

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
export const selectMemberId = (state: RootState) => state.user.userId

export default userSlice.reducer