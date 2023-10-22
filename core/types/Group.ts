export interface Group {
    groupId: string
    name: string
    description: string
    size: number
}

export interface GroupMember {
    groupId?: string
    memberId: string
    isAdmin: boolean
    status?: string
}