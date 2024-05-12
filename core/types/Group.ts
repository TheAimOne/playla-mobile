import { User } from "./User"

export interface Group {
    groupId: string
    name: string
    description: string
    size: number
}

export interface GroupMember {
    groupId?: string
    memberId: string
    name?: string
    shortName?: string
    mobile?: string
    email?: string
    isAdmin: boolean
    status?: string
}