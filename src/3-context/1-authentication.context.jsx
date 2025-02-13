import { createContext, useState } from "react";

export const AuthenticationContext = createContext({
    setAuthMethod: () => null,
    authMethod: null,
})

export const AuthenticationProvider = ({children}) => {
    // par defaut on va sur la page de connexion
    const [authMethod, setAuthMethod ] = useState("")
    const value = { authMethod, setAuthMethod}
    return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>
}