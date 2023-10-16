import httpClient from "../../../config"
import { AppDispatch } from "../../store"
import { setGroupList } from "./group-slice"

export const getGroupsAction = (memberId: string) => async (dispatch: AppDispatch) => {
    const groups = await httpClient.get('member/group', { params: { memberId: memberId } })
    console.log(groups.status, groups.statusText)
    dispatch(setGroupList(groups.data))
}