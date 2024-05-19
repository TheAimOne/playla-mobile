import httpClient from "../../../axios-config"
import { AppDispatch } from "../../store"
import { setGroupList } from "./group-slice"

export const getGroupsAction = (memberId: string) => async (dispatch: AppDispatch) => {
    const groups = await httpClient.get('member/group', { params: { memberId: memberId } })
    dispatch(setGroupList(groups.data))
}