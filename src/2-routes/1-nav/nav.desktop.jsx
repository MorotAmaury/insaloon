import './nav.desktop.scss'

import { Fragment, useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { AuthenticationContext } from '../../3-context/1-authentication.context'

import { googleSignOut, useAuthListener } from '../../4-utils/firebase.utils'


const NavD = () => {
    const {setAuthMethod } = useContext(AuthenticationContext)

    const [user, setUser] = useState(null)
    const [focusElement, setFocusElement] = useState(null)
    useAuthListener(setUser)

    return (
            <nav className='desktopNav'>
                <Link to={'/'} className='logo' onClick={() => setFocusElement('home')}>MonColleur</Link>
                <div className={`focus-animation ${focusElement}`}></div>
                <ul className='nav-items'>
                    {user && (
                        <Fragment>
                            <li className='item' onClick={() => setFocusElement('analyse')}> 
                                <Link to={'analyse'}>Articles</Link></li>
                            <li className='item' onClick={() => setFocusElement('faq')}> 
                                <Link to={'faq'}>FAQ</Link>
                            </li>
                            <li className='item'>
                                MonColleur
                            </li>
                        </Fragment>
                    )}
                    <li className='item'>
                        {user ? (
                            <button className='btn' onClick={() => googleSignOut()}>Se deconnecter </button>
                        ): (
                            <Link to={"/authentication"} className="btn" onClick={() => setAuthMethod("login")}>Se connecter</Link>
                        )}
                    </li>
                </ul>
            </nav>        
    )
}
export default NavD