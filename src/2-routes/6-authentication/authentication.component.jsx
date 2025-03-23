import './authentication.styles.scss'
import './authentication.responsive.scss'
import { Fragment, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthenticationContext } from '../../3-context/1-authentication.context'

import SignInForm from './sign-in-form/sign-in-form.component'
import SignUpForm from './sign-up-form/sign-up-form.component'

const Authentication = () => {
    const { authMethod, setAuthMethod } = useContext(AuthenticationContext)

    // responsive 
    const [isMobile, setIsMobile] = useState(false)
    const handleResize = () => {
        // setIsMobile(window.innerWidth > 768 ? false : true)
    }

    useEffect(() => {
        if (authMethod === '') setAuthMethod('login')

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, []) 


    return (
        <div className='authentication-container'>
        {
            authMethod === "login" ? (
                <Fragment>
                    <SignInForm/>
                    <p className='login-signup login'>Vous n'avez pas encore de compte ? 
                        <span onClick={() => setAuthMethod("signup")}>S'inscire</span>
                    </p>
                </Fragment>
                ) : authMethod === 'signup' && (
                <Fragment> 
                    <SignUpForm/>
                    <p className='login-signup'>Vous êtes déjà inscrit ?  
                        <span onClick={() => setAuthMethod('login')}>Se connecter</span>
                    </p>
                </Fragment>
            )}
        </div>
    )
}
export default Authentication