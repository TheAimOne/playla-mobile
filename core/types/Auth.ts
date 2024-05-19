
export interface Session {
    refreshToken: string,
    deviceId: string,
    deviceType: string,
    refreshTokenExpiry?: Date
}

export interface AuthState {
    userId: string
    accessToken: string,
    accessTokenExpiry?: Date,
    session: Session
}
