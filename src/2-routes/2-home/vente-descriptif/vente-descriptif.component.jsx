import './vente-descriptif.styles.scss' 
import './vente-descriptif.responsive.scss'
import Graph from '../../../1-components/8-disabled-element/component/graph.component'
import ColleDisabled from '../../../1-components/8-disabled-element/component/colles-disabled.component'
import PromptDisabled from '../../../1-components/8-disabled-element/component/prompt-disabled.component'
import AudioPickerDisabled from '../../../1-components/8-disabled-element/component/audio-picker-disabled.component'

import { Tab } from '../tab/tab.component'

const VenteDescriptif = () => {
    return (
        <div className='vente-descriptif'>
            <h1 className='array-title'>Pourquoi s'abonner à <span className='logo-1'>MonColleur</span> ? &#x1F447;</h1>
            <div className='why-container'>
              <div className='why-subcontainer'>
                <div className='why-title'>L’IA au service de ta réussite.</div>
                <div className='why-content'>Prépare efficacement les oraux d'HEC, grâce à des modèles d'intelligence artificielle avancés, avec un simple enregistrement audio et en deux minutes chrono.</div>
                <AudioPickerDisabled/>
              </div>
              <div className='why-container'>
                <div className='why-title'>Un outil sur-mesure.</div>
                <div className='why-content'>Pour chaque colle, reçois un compte-rendu personnalisé qui analyse en détail ta performance, avec des scores, des commentaires et des corrections.</div>
                <Graph/>
              </div>
              <div className='why-container'>
                <div className='why-title'>Pour apprendre des meilleurs.</div>
                <div className='why-content'>En consultant les centaines de colles déjà corrigées, découvre les secrets des meilleures colles. </div>
                <ColleDisabled/>
              </div>
              <div className='why-container'>
                <div className='why-title'>Pour être serein le jour J.</div>
                <div className='why-content'>Avec <span className='logo'>MonColleur</span>, fais 2 fois plus de colles que les autres et entraîne-toi en conditions réelles, en tirant un sujet aléatoirement parmi les milliers de sujets déjà tombés à l’oral d’HEC.</div>
                <PromptDisabled/>
              </div>
              <div className='why-container'>
                <div className='why-title'>Pour gagner du temps.</div>
                <div className='why-content'>Tu n'as pas le temps de t'enregistrer ? Génère instantanément un plan détaillé sur n'importe quel sujet, en quelques clics. </div>
              </div>
              <div className='why-container'>
                <div className='why-title'>Un professeur particulier, en mieux.</div>
                <div className='why-content'>Découvre les avantages de <span className='logo'>MonColleur</span> par rapport à un professeur particulier traditionnel.</div>
              </div>
            </div>
            <div className="array-container">
              <Tab/>
            </div>
            <div className='why-container'>
                <div className='why-title'>Plus de temps à perdre. &#x231B;&#xFE0F;</div>
                <div className='why-content'>N'attends plus pour progresser et rejoins <span className='logo'>MonColleur</span> !</div>
            </div>
        </div>
    )
}
export default VenteDescriptif