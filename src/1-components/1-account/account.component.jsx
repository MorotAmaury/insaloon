import { Link, useFetcher, useNavigate } from 'react-router-dom'

import { getInfo, googleSignOut } from '../../4-utils/firebase.utils';
import './account.styles.scss'

import { Fragment, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../3-context/0-user.context';
import { PaymentContext } from '../../3-context/2-payment.context';



const Account = () => {
  const navigate = useNavigate()
 
  const {currentUser, setAccountOn, accountOn, nombrePrompt, setNombrePrompt, setFocusElement} = useContext(UserContext)
  const { isSub } = useContext(PaymentContext)

  const [portalLoading, setPortalLoading] = useState(null)
  const [developedState, setDevelopedState] = useState('')
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [prepa, setPrepa] = useState('')
  const [nom, setNom] = useState('')
  const [matiere, setMatiere] = useState('')
  const [annee, setAnnee] = useState('')

  const handleDisconnect = () => {
    setAccountOn(false)
    setFocusElement('home')
    googleSignOut() 
    navigate('../.')
  }
  document.body.style.overflow = developedState === 'expanded' ? 'hidden' : 'auto'


  useEffect(() => {
    if (currentUser) {
      
      const actuInfo = async() => {
        const nombrePrompt = await getInfo(currentUser.uid, 'nombrePrompt')
        setNombrePrompt(nombrePrompt)
        
        const infoPrenom = await getInfo(currentUser.uid, 'prenom')
        setPrenom(infoPrenom)
        
        const infoEmail = await getInfo(currentUser.uid, 'email')
        setEmail(infoEmail)

        const infoPrepa = await getInfo(currentUser.uid, 'prepa') 
        setPrepa(infoPrepa)

        const infoNom = await getInfo(currentUser.uid, 'nom') 
        setNom(infoNom)

        const infoMatiere = await getInfo(currentUser.uid, 'userMatiere') 
        setMatiere(infoMatiere)

        const infoAnnee = await getInfo(currentUser.uid, 'annee') 
        setAnnee(infoAnnee)
      }
      actuInfo()
    }
  }, [currentUser])  
  useEffect(() => {
    if (!accountOn) setDevelopedState('minimised')
  }, [accountOn])
  return (
    <div className={`account-container ${!accountOn && 'hidden'} ${developedState}`}>
      <div className={`cross ${developedState === 'expanded' && 'hide'}`} onClick={() => setAccountOn(false)}>
        <i className='fa-solid fa-xmark'></i>
      </div>
      <div onClick={() => setDevelopedState('expanded')} className={`expand ${developedState === 'expanded' && 'hide'}`}>
        <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
      </div>
      <div className={`account-container-minimised ${developedState}`}>
        <div className='welcome'>Bienvenue {prenom} !</div>
        {!isSub && <div className='credits'>Crédits restants : {nombrePrompt}</div>}
        <div className='stripe-container'>
     
        </div>
        <button className="logout-btn stripe-btn" onClick={handleDisconnect}>Se déconnecter</button>
        <div className='email'>{email}</div>
      </div>
      
      
      <div className={`account-container-expanded ${developedState}`}>
        <div onClick={() => setDevelopedState('minimised')} className={`minimise ${developedState !== 'expanded' && 'hide'}`}>
          <i className="fa-solid fa-down-left-and-up-right-to-center"></i>
        </div>
        <div className='title'>Mon Compte</div>
        <div className='main-container'>
          <div className='left-container'>
            <div className='info-container'>
              <div className='info'><span className='cadre blue'>Nom : </span> <span className='content'>{nom}</span></div>
              <div className='info'><span className='cadre blue'>Prénom : </span> <span className='content'>{prenom}</span></div>
              <div className='info'><span className='cadre blue '>e-mail : </span> <span className='content'>{email}</span></div>
            </div>
            <div className='info-container'>
              {!isSub && <div className='info'><span className='cadre orange'>Credit : </span> <span className='content'>{nombrePrompt}</span></div>}
            </div>
            <div className='info-container'>
              <div className='info'><span className='cadre red'>Prépa : </span> <span className='content'>{prepa}</span></div>
              <div className='info'><span className='cadre red'>Matière : </span> <span className='content'>{matiere}</span></div>
              <div className='info'><span className='cadre red'>Année: </span> <span className='content'>{annee}</span></div>
            </div>
          </div>
          <div className='right-container'>
            <div className='stripe-container'>
          
            </div>
            <div>OU</div>
            <button className="logout-btn stripe-btn" onClick={handleDisconnect}>Se déconnecter</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Account