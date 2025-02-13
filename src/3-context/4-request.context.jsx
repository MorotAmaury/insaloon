import { createContext, useState } from "react";

export const RequestContext = createContext({

    setRequestState: () => null, 
    requestState: null,
    setSource: () => null, 
    source: null,
})

export const RequestProvider = ({children}) => {
    const [requestState, setRequestState] = useState(false)
    const [source, setSource] = useState(null)
    const value = { requestState, setRequestState, source, setSource}

    return <RequestContext.Provider value={value}>{children}</RequestContext.Provider>
}