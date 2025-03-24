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

    const [authUser, setAuthUser] = useState(null)
    const [userData, setUserData] = useState(null)
    const [menuOpen, setMenuOpen] = useState(false)

    useAuthListener(setAuthUser)

    useEffect(() => {
        const fetchUserData = async () => {
            if (authUser) {
                const userInfo = await getUserById(authUser.uid)
                setUserData(userInfo)
            } else {
                setUserData(null)
            }
        }

        fetchUserData()
    }, [authUser])

    const handleMenuClick = () => {
        setMenuOpen(false)
    }

    return (
        <nav className='desktopNav'>
            <Link to={'/'} className='logo' onClick={() => setFocusElement('home')}>
                INSALOON
            </Link>

            {/* Menu hamburger */}
            <div
                className={`burger ${menuOpen ? 'open' : ''}`}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <div></div>
                <div></div>
                <div></div>
            </div>

            <ul className={`nav-items ${menuOpen ? 'open' : ''}`}>
                {userData && (
                    <Fragment>
                        {userData.admin === true && (
                            <li className='item' onClick={() => { setFocusElement(''); handleMenuClick() }}>
                                <Link to={'/admin'}>Admin</Link>
                            </li>
                        )}

                        <li className='item' onClick={() => { setFocusElement(''); handleMenuClick() }}>
                            <Link to={'/defis'}>Defis</Link>
                        </li>

                        <li className='item' onClick={() => { setFocusElement(''); handleMenuClick() }}>
                            <Link to={'/classement'}>Classement</Link>
                        </li>
                    </Fragment>
                )}

                <li className='item'>
                    {authUser ? (
                        <Link onClick={() => { setAccountOn(!accountOn); handleMenuClick() }}>Mon Compte</Link>
                    ) : (
                        <Link
                            to={"/authentication"}
                            className="btn"
                            onClick={() => { setAuthMethod("login"); handleMenuClick() }}
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
