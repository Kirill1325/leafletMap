export type User = {
    id: number
    username: string,
    email: string,
    password: string,
    // created_at: number,
    // is_activated: boolean,
    // activation_link: string
}

type UserDto = {
    email: string
    id: string
    isActivated: boolean
}

export type Response = {
    user: UserDto,
    accessToken: string,
    refreshToken: string
}