import './nav.desktop.scss'

import { Link } from 'react-router-dom'



import logo from '../../logo.png'
const NavD = () => {

    const role = localStorage.getItem("adminRole");

    return (
        <nav className='desktopNav'>
            <Link to={'/'} className='logo' >
                 <img src={logo} className='logo' alt='logo'/>
            </Link>

            <ul className='nav-items'>
                <li className='item'><Link to={'/evenement'}>Evenement</Link></li>
                <li className='item'><Link to={'/defis'}>Defis</Link></li>
                <li className='item'><Link to={'/classement'}>Classement</Link></li>
                { role && <li className='item'><Link to={'/admin'}>admins</Link></li>}
                <li className='item'><Link to={'/submission'}><button className='btn'>Soumettre defis</button></Link></li>
            </ul>
           

            
        
        </nav>
    )
}

export default NavD
