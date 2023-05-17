import React, { useContext, useEffect } from "react"
import { UserContext } from "../contexts/UserContext"
import { useNavigate } from "react-router-dom"

interface AuthMiddlewareProps {
    children: React.ReactNode,
}

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
    const { state } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!state.user) {
            navigate("/login")
            return
        }

        if (state.user.role === "admin") {
            navigate("/admin")
            return
        }

        if (state.user.role === "user") {
            navigate("/app")
            return
        }
    }, [])
    return (<>
        {children}
    </>)
}

export default AuthMiddleware