import './nav.desktop.scss'

import { Fragment, useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { AuthenticationContext } from '../../3-context/1-authentication.context'



const NavD = () => {
    const {setAuthMethod } = useContext(AuthenticationContext)

    const [user, setUser] = useState(null)
    const [focusElement, setFocusElement] = useState(null)

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
            
                    </li>
                </ul>
            </nav>        
    )
}
export default NavD