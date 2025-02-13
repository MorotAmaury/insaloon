import '../disabled.styles.scss'
import '../disabled.responsive.scss'
import '../audio-picker.styles.scss'
import { Fragment, useState } from "react";

const AudioPickerDisabled = () => {
    const [actif, setActif] = useState(false)
    const [permission, setPermission] = useState(false);

    const handleRecorderClick = async () => {
        setActif(true)
        setPermission(true)
    }
    return (
        <div className="container">
            <div className='audio-picker'>
                <div className={`${actif ? 'actif' : 'inactif'} recorder`}>
                    {!actif ? (
                        <div className='recorder-btn' onClick={handleRecorderClick}>
                            <i className="fa-solid fa-microphone"></i>
                        </div>
                    ): (
                        <Fragment>
                            {permission && (
                                <Fragment>
                                    <div className='start-recording disabled'>Lancer l'enregistrement</div>
                                    <div onClick={() => setActif(false)} className='close'>&#10005;</div>
                                </Fragment>
                            )}
                        </Fragment>

                    )}
                </div>

                <label htmlFor="audio" className={`audio ${actif ? 'hide' : ''} disabled`}>
                    <div className='audio-input '>
                        Sélectionner un fichier audio
                    </div>
                </label>
                {(
                    <input 
                        type="text" 
                        name="audio" 
                        id="audio" 
                        accept="audio/*"
                        style={{display: "none"}}
                        className=""
                    />
                )}
            </div>
        </div>
    )
}
export default AudioPickerDisabled