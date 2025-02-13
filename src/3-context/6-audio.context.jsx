import { createContext, useState } from "react";

export const AudioContext = createContext({
    setAudioFile: () => null, 
    audioFile: null,
    setAudioDuration: () => null,
    audioDuration: null,
})

export const AudioProvider = ({children}) => {
    const [audioFile, setAudioFile] = useState(null)
    const [audioDuration, setAudioDuration] = useState(null)
    const value = { audioFile, setAudioFile, audioDuration, setAudioDuration}
    return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}