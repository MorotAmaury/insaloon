import { createContext, useState } from "react";

export const SelectContext = createContext({
    setSelectSubject: () => null, 
    selectSubject: null, 
    setPrepa: () => null, 
    prepa: null, 
    setUserMatiere: () => null, 
    userMatiere: null, 
    setAnnee: () => null, 
    annee: null,
})

export const SelectProvider = ({ children }) => {
    const [selectSubject, setSelectSubject] = useState(null)
    const [prepa, setPrepa] = useState(null)
    const [userMatiere, setUserMatiere] = useState(null)
    const [annee, setAnnee] = useState(null)

    const value = { selectSubject, setSelectSubject, prepa, setPrepa, userMatiere, setUserMatiere, annee, setAnnee }
    return <SelectContext.Provider value={value}>{children}</SelectContext.Provider>
}