import { createContext, useState } from "react";

export const PaymentContext = createContext({
    setOptions: () => null,
    options: null,
    setIsSub: () => null, 
    isSub: null,
    setLoadingContent: () => null, 
    loadingContent: true,
    setOffre: () => null,
    offre: null, 
})

export const PaymentProvider = ({children}) => {
    const [options, setOptions] = useState(null)   
    const [loadingContent, setLoadingContent] = useState(true) 
    const [isSub, setIsSub] = useState(null)   
    const [offre, setOffre] = useState(null) 
    const value = { options, setOptions, isSub, setIsSub, loadingContent, setLoadingContent, offre, setOffre }
    return <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
}