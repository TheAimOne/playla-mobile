import { Filter } from "./Filter"

export interface User {
    userId: string
    name: string
    shortName?: string
    email?: string
    mobile?: string
    status: string
    isAuthenticated: boolean
}

export class UserFilter {
    filter: Filter = new Filter()
    groupId?: string = ""
    excludeUserByGroupId?: boolean = false

    constructor() {}
}