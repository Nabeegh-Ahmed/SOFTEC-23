import { Dispatch } from "react"
import { ICartState } from "./types"
import { OrderItem } from "../../types/order.types"

export const loadCart = (dispatch: Dispatch<any>, items: OrderItem[]) => {
    dispatch({type: "INIT_CART", payload: items})
}

// export const checkUserLoggedIn = (dispatch: Dispatch<any>) => {
//     dispatch({type: "LOGIN_REQUEST"})
//     dispatch({type: "LOGIN_SUCCESS", payload: ""})
//     dispatch({type: "LOGIN_FAIL"})
    
// }

// export const login = async (dispatch: Dispatch<any>) => {
//     try {
//         dispatch({type: "LOGIN_REQUEST"})
        
//         dispatch({type: "LOGIN_SUCCESS"})
//     } catch (error: any) {
//         dispatch({
//             type: "LOGIN_FAIL",
//             payload: { error: error.message }
//         })
//         throw Error("Failed")
//     }
// }

// export const register = async (dispatch: Dispatch<any>) => {
//     try {
//         dispatch({type: "REGISTER_REQUEST"})
        
//         dispatch({
//             type: "REGISTER_SUCCESS",

//         })
//     } catch (error: any) {
//         dispatch({
//             type: "REGISTER_FAIL",
//             payload: {error: error.message}
//         })
//         throw Error("Failed")
//     }
// }

// export const logout = (dispatch: Dispatch<any>) => {
//     dispatch({type: "LOGOUT"})
//     localStorage.removeItem("user")
// }

