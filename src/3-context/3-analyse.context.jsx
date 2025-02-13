import { createContext, useState } from "react";

export const AnalyseContext = createContext({
    setSubject: () => null,
    subject: null,
    setFetchUrl: () => null,
    fetchUrl: null,
    setMatiere: () => null,
    matiere: null, 
    setMethode: () => null,
    methode:null, 
    setEmailContext: () => null,
    emailContext: null, 
})

export const AnalyseProvider = ({children}) => {
    const [subject, setSubject] = useState(null)
    const [fetchUrl, setFetchUrl] = useState(null)
    const [emailContext, setEmailContext] = useState(null)
    const [matiere, setMatiere] = useState(null)
    const [methode, setMethode] = useState(null)
    const value = { 
        subject, 
        setSubject, 
        fetchUrl, 
        setFetchUrl, 
        matiere, 
        setMatiere,
        emailContext, 
        setEmailContext,
        methode, 
        setMethode 
    }

    return <AnalyseContext.Provider value={value}>{children}</AnalyseContext.Provider>
}