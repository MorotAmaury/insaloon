import { createContext, useState } from "react";

export const MathContext = createContext({
    setFace: () => null, 
    face: 'recto', 
    setFiliere: () => null, 
    filiere: null, 
    setClasse: () => null, 
    classe: [], 
    setTheme: () => null, 
    theme: [],
    setChapitre: () => null, 
    chapitre: [], 
    setChapitreSelected: () => null, 
    chapitreSelected: [],
})

export const MathProvider = ({ children }) => {
    const [face, setFace] = useState('recto')
    const [filiere, setFiliere] = useState(null)
    const [classe, setClasse] = useState([])
    const [theme, setTheme] = useState([])
    const [chapitre, setChapitre] = useState([])
    const [chapitreSelected, setChapitreSelected] = useState([])

    const value = {face, setFace, filiere, setFiliere, classe, setClasse, theme, setTheme, chapitre, setChapitre, chapitreSelected, setChapitreSelected }
    return <MathContext.Provider value={value}>{children}</MathContext.Provider>
}