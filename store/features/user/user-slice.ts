import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '../../../core'
import { RootState } from '../../store'

export const USER_SLICE = 'user'

const initialState: User = {
    memberId: "",
    name: "",
    status: "",
    isAuthenticated: false
}

export const userSlice = createSlice({
    name: USER_SLICE,
    initialState: initialState,
    reducers: {
        setUser: (state: User, action: PayloadAction<User>) => {
            const user = action.payload;
            state.isAuthenticated = user.isAuthenticated;
            state.email = user.email;
            state.memberId = user.memberId;
            state.mobile = user.mobile;
            state.name = user.name;
            state.shortName = user.shortName;
            state.status = user.status
        }
    }
})

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
export const selectMemberId = (state: RootState) => state.user.memberId

export default userSlice.reducer