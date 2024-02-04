export interface User {
    userId: string
    name: string
    shortName?: string
    email?: string
    mobile?: string
    status: string
    isAuthenticated: boolean
}