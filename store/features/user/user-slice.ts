import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../../core'

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
        login: (state) => {
            state.isAuthenticated = true
        }
    }
})

export const { login } = userSlice.actions;

export default userSlice.reducer