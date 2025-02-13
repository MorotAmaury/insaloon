import './home.styles.scss'
import './home.responsive.scss'

import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserContext } from '../../3-context/0-user.context'
import { AuthenticationContext } from '../../3-context/1-authentication.context'
import { PaymentContext } from '../../3-context/2-payment.context'

import Footer from '../../1-components/0-footer/footer.component'
import VenteDescriptif from './vente-descriptif/vente-descriptif.component'
const Home = () => {
    const navigate = useNavigate()

    const { currentUser } = useContext(UserContext)
    const { setAuthMethod } = useContext(AuthenticationContext)
    const { isSub } = useContext(PaymentContext)
    
    const handleClick = async () => {
        if(!currentUser)
        {
            // pour aller sur la page d'inscription et pas de connection
            setAuthMethod("login")
            navigate('/authentication')
        }
        else if (!isSub) 
        {
            window.scrollTo({top: 0});
            navigate('/vente')
        }
        else navigate('/analyse')
    }
    return (
        <div className={`home ${document.querySelector('.hide') ? 'test' : ''}`}>
            <h1 className='home-title'>Grâce à l'<span className='ia-color'>IA</span>, un <span className='ia-color'>colleur</span> rien que pour vous.</h1>
            <div className='subtitle'>
                Disponible partout, tout le temps et sur tous les sujets. Avec MonColleur, n'ayez pas peur de viser 20/20 aux oraux des écoles de commerce. 
            </div>
            
            <div className='discover-title'>Un outil <span className='ia-color'>innovant</span>, à votre service. &#x1F447;</div>
            <div className='video-container'>
                <iframe 
                    className='video'
                    src="https://www.youtube.com/embed/jgOok1BsbFs" 
                    title="YouTube video player" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                />
            </div>
            <div className='separateur'></div>
            <VenteDescriptif/>
            <button onClick={handleClick} className='logcall-button'>Rejoindre</button>
            <Footer/>
        </div>
    )
}
export default Home