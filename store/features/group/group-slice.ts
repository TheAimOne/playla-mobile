import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../../config";
import { Group } from "../../../core/types/Group";
import { AppDispatch } from "../../store";

export const GROUP_LIST_SLICE = "groupList";
const groupListState: Group[] = []

export const groupListSlice = createSlice({
    name: GROUP_LIST_SLICE,
    initialState: groupListState,
    reducers: {
        setGroupList: (state: Group[], action: PayloadAction<Group[]>) => {
            state = [...action.payload]
        }
    }
})

export const { setGroupList } = groupListSlice.actions;

export default groupListSlice.actions;