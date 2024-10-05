export type User = {
    id: number
    username: string,
    email: string,
    password: string,
}

export type UserDto = Omit<User, 'password'> 

export type Response = {
    user: UserDto,
    accessToken: string,
    refreshToken: string
}

export type UserPosition = {
    user_id: number,
    lat: number,
    lng: number
}