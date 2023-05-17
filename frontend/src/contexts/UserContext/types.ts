export interface IUserDetails {
    _id: string
    dob: Date
    email: string
    gender: string
    name: string
    role: string
    status: string
    photo: string
}

export interface IUserState {
    isAuth: boolean
    user: IUserDetails | null
    error: string
    loading: boolean
}

export type ActionType =
    'LOGIN_REQUEST' | 'LOGIN_SUCCESS' | 'LOGIN_FAIL' | 'USER_LOGGED_IN' |
    'LOGOUT' | 'REGISTER_REQUEST' | 'REGISTER_SUCCESS' | 'REGISTER_FAIL' | 'UPDATE_BALANCE'

export type Actions = {
    type: ActionType,
    payload: any
}