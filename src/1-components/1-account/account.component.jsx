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

  const [developedState, setDevelopedState] = useState('')
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [nombreTickets, setNombreTickets] = useState(0)

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
        const nombreTickets = await getInfo(currentUser.uid, 'nombreTickets')
        setNombreTickets(nombreTickets)
        
        const infoPrenom = await getInfo(currentUser.uid, 'prenom')
        setPrenom(infoPrenom)
        
        const infoEmail = await getInfo(currentUser.uid, 'email')
        setEmail(infoEmail)

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
      
      <div className={`account-container-minimised ${developedState}`}>
        <div className='welcome'>Bienvenue {prenom} !</div>
        <div className='credits'>{nombreTickets} <i className="fa-solid fa-ticket"></i></div>
        <div className='stripe-container'>
     
        </div>
        <button className="logout-btn stripe-btn" onClick={handleDisconnect}>Se déconnecter</button>
        <div className='email'>{email}</div>
      </div>
      
      

    </div>
  )
}
export default Account