import './nav.desktop.scss'

import { Fragment, useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { UserContext } from '../../3-context/0-user.context'
import { AuthenticationContext } from '../../3-context/1-authentication.context'

import { useAuthListener } from '../../4-utils/firebase.utils'

import Account from '../../1-components/1-account/account.component'
const NavD = () => {
    const {accountOn, setAccountOn, focusElement, setFocusElement } = useContext(UserContext)
    const {setAuthMethod } = useContext(AuthenticationContext)

    const [user, setUser] = useState(null)
    useAuthListener(setUser)
    
    return (
            <nav className='desktopNav'>
                <Link to={'/'} className='logo' onClick={() => setFocusElement('home')}>INSA'LOON</Link>
                <div className={`focus-animation ${focusElement}`}></div>
                <ul className='nav-items'>
                    {user && (
                        <Fragment>
                            <li className='item' onClick={() => setFocusElement('analyse')}>
                                <Link to={'defis'}>Defis</Link>
                            </li>
                            <li className='item' onClick={() => setFocusElement('colles')}> 
                                <Link to={'classement'}>Classement</Link>
                            </li>         
                       
                
                        </Fragment>
                    )}
                    <li className='item'>
                        {user ? (
                            <Link onClick={() => setAccountOn(!accountOn)}>Mon Compte</Link>
                        ): (
                            <Link to={"/authentication"} className="btn" onClick={() => setAuthMethod("login")}>Se connecter</Link>
                        )}
                    </li>
                    <Account/>
                    </ul>
            </nav>        
    )
}
export default NavD