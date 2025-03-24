import './nav.desktop.scss'

import { Fragment, useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { UserContext } from '../../3-context/0-user.context'
import { AuthenticationContext } from '../../3-context/1-authentication.context'

import { useAuthListener, getUserById } from '../../4-utils/firebase.utils'

import Account from '../../1-components/1-account/account.component'

const NavD = () => {
    const { accountOn, setAccountOn, focusElement, setFocusElement } = useContext(UserContext)
    const { setAuthMethod } = useContext(AuthenticationContext)

    const [authUser, setAuthUser] = useState(null)   // Le user de l'auth (firebase auth)
    const [userData, setUserData] = useState(null)   // Le user complet de la BDD Firestore
    
    useAuthListener(setAuthUser)

    // Dès qu'on a le user connecté, on récupère sa fiche Firestore
    useEffect(() => {
        const fetchUserData = async () => {
            if (authUser) {
                const userInfo = await getUserById(authUser.uid)  // 🔥 Assure-toi que cette fonction récupère les infos de Firestore
                setUserData(userInfo)
            } else {
                setUserData(null)
            }
        }

        fetchUserData()
    }, [authUser])

    return (
        <nav className='desktopNav'>
            <Link to={'/'} className='logo' onClick={() => setFocusElement('home')}>INSALOON</Link>
            <div className={`focus-animation ${focusElement}`}></div>
            
            <ul className='nav-items'>
                {userData && (
                    <Fragment>
                        {/* ✅ Affiche l'onglet Admin que si admin est true */}
                        {userData.admin === true && (
                            <li className='item' onClick={() => setFocusElement('')}>
                                <Link to={'admin'}>Admin</Link>
                            </li>
                        )}

                        <li className='item' onClick={() => setFocusElement('')}>
                            <Link to={'defis'}>Defis</Link>
                        </li>

                        <li className='item' onClick={() => setFocusElement('')}>
                            <Link to={'classement'}>Classement</Link>
                        </li>
                    </Fragment>
                )}

                <li className='item'>
                    {authUser ? (
                        <Link onClick={() => setAccountOn(!accountOn)}>Mon Compte</Link>
                    ) : (
                        <Link
                            to={"/authentication"}
                            className="btn"
                            onClick={() => setAuthMethod("login")}
                        >
                            Se connecter
                        </Link>
                    )}
                </li>
                
                <Account />
            </ul>
        </nav>
    )
}

export default NavD
