import AudioPickerDisabled from './audio-picker-disabled.component'
import '../disabled.styles.scss'
import '../prompt.styles.scss'
const PromptDisabled = () => {
    // pour pas avoir la big erreur dans la console
    const handleChange = () => {
        return
    }
    return (
        <div className='prompt-disabled'>
            <div className='prompt-title'>HGG</div>
            <form className="form">
                <input 
                    placeholder='Titre du sujet de colle'
                    className='input'
                    type="text" 
                    name="subject" 
                    value={"Relocaliser l'économie : une utopie ?"}
                    onChange={handleChange}
                    required
                />
                <AudioPickerDisabled />

                <div className='submit-btn disabled'> Lancer l'évaluation</div>      
            </form>
        </div>
    )
}

export default PromptDisabled