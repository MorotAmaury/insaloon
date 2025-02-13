import './faq.styles.scss';
import './faq.responsive.scss'

import { useRef, useState } from 'react';


import Footer from '../../1-components/0-footer/footer.component'

import amaury from './image/amaury.jpg'
import matthieu from './image/matthieu.png'

const defaultFormFields = {
    "user_email" : '', 
    "message" : '',
}

const Faq = () => {
    const form = useRef()

    const [formField, setFormField] = useState(defaultFormFields)


    const handleChange = (event) => {
        const {name, value } = event.target 
        setFormField({...formField, [name]:value})
    }

    return (
        <div className='about'>
            <h1 className='title'>F.A.Q.</h1>
            <div className='question-container'>
                <div className='question'>
                    <div className='question-title'>"Une erreur s'est produite", que faire ?</div>
                    <div className='question-answer'>Si vous rencontrez ce message lorsque vous essayez de faire analyser votre fichier audio, c'est très probablement parce qu'il est trop volumineux. Pas de panique ! Il suffit de convertir votre fichier audio en MP3, puis de le compresser sur <a href="https://www.freeconvert.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', fontStyle: "italic" }}>freeconvert.com</a> par exemple. </div>
                </div>
                <div className='question'>
                    <div className='question-title'>Qui a accès aux colles que je fais ?</div>
                    <div className='question-answer'>Seuls les abonnés ont accès aux colles des autres utilisateurs. Néanmoins, vos colles restent anonymes : personne ne peut savoir qui est l'auteur d'une colle de "La Bibliothèque".</div>
                </div>
                <div className='question'>
                    <div className='question-title'>Est-ce que MonColleur conserve l'audio de mes colles ?</div>
                    <div className='question-answer'> Non, nous sommes particulièrement attachés à la protection de vos données personnelles. C'est pourquoi votre audio n'est conservé que le temps de le transcrire et n'est jamais enregistré sur nos serveurs.</div>
                </div>
                <div className='question'>
                    <div className='question-title'>Comment fonctionne l'IA de MonColleur ?</div>
                    <div className='question-answer'> MonColleur s'appuie sur les modèles d'intelligence artificielle les plus avancés du marché (Whisper Large et GPT4-Omni), spécialement paramétrés pour les colles.</div>
                </div>
                <div className='question'>
                    <div className='question-title'>Qui sommes-nous ?</div>
                    <div className='nous-container'>
                        <div className='nous'>
                            <img src={matthieu} alt="paysage de la maise" />
                            <h1>Matthieu Humbert</h1>
                            <h2>Étudiant à HEC Paris</h2>
                            <div className="icon-container">
                                <a className='icon-item' target="_blank" rel="noreferrer" href='https://www.linkedin.com/in/matthieu-humbert-17ba2027b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app '>
                                    <i className="fa-brands fa-linkedin icon"></i>
                                </a>
                                <a className='icon-item' target="_blank" rel="noreferrer" href='https://github.com/matthieu-humbert'>
                                    <i className="fa-brands fa-github icon"></i>                
                                </a>
                        </div>
                        </div>
                        <div className='nous'>
                            <img src={amaury} alt="paysage de la maise" />
                            <h1>Amaury Morot</h1>
                            <h2>Développeur web</h2>
                            <div className='icon-container'>
                                <a className='icon-item' target="_blank" rel="noreferrer" href='https://github.com/MorotAmaury'>
                                    <i className="fa-brands fa-github icon"></i>                
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
             
            </div>
            <Footer/>
        </div>
    )
}
export default Faq