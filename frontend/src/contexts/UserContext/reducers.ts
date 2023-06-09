import { IUserState } from "./types";
import { Actions } from "./types";

export const initialUserState: IUserState = {
    isAuth: false,
    user: null,
    error: '',
    loading: false,
}

export const userReducer = (state: IUserState, action: Actions): IUserState => {
    switch (action.type) {
        case "LOGIN_REQUEST": {
            return {
                ...state,
                error: "",
                loading: true
            }
        }
        
        case "USER_LOGGED_IN": {
            return {
                ...state,
                user: {
                    ...action.payload
                }
            }
        }

        case "LOGIN_SUCCESS": {

            return {
                ...state,
                isAuth: true,
                loading: false,
                error: '',
                user: {
                    ...action.payload
                },
            }
        }

        case "LOGIN_FAIL": {
            const { error } = action.payload || ""
            console.log(error)
            return {
                ...state,
                isAuth: false,
                user: null,
                error: action.payload?.error,
                loading: false
            }
        }

        case "LOGOUT": {
            return {
                ...state,
                isAuth: false,
                user: null,
                loading: false,
                error: ''
            }
        }

        case "REGISTER_REQUEST": {
            return {
                ...state,
                loading: true
            }
        }

        case "REGISTER_SUCCESS": {

            return {
                ...state,
                isAuth: true,
                loading: false,
                error: '',
                user: {
                    ...action.payload
                }
            }
        }

        case "REGISTER_FAIL": {
            return {
                ...state,
                isAuth: false,
                user: null,
                error: action.payload.error,
                loading: false
            }
        }

        default: {
            return state
        }
    }
}