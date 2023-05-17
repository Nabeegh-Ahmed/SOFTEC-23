import React, {createContext} from 'react'
import {initialCartState, cartReducer} from "./reducers";
import {ICartState} from "./types";
import { loadCart } from './actions';

interface CartContextInterface {
    state: ICartState,
    dispatch: React.Dispatch<any>
}

export const CartContext = createContext<CartContextInterface>({
    state: initialCartState,
    dispatch: () => undefined
})

interface ProviderProps {
    children: JSX.Element | JSX.Element[] | React.ReactNode
}

export const CartContextProvider: React.FC<ProviderProps> = (props: ProviderProps) => {
    const [state, dispatch] = React.useReducer(cartReducer, initialCartState)
    const { children } = props
    const value = { state, dispatch }
    
    React.useEffect(() => {
        loadCart(dispatch, JSON.parse(localStorage.getItem("cart") ?? "{}").items ?? [])
    }, [])


    return (
        <CartContext.Provider
            value={value}
        >
            {children}
        </CartContext.Provider>
    )
}