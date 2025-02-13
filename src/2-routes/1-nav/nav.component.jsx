import { Fragment, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import NavD from './nav.desktop'
const Nav = () => {
    const [isMobile, setIsMobile] = useState(false)

    const handleResize = () => {
        setIsMobile(window.innerWidth > 768 ? false : true)
    }
    
    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, []) 
    return (
        <Fragment>
            <NavD/>
            <Outlet/>
        </Fragment>
    )
}
export default Nav