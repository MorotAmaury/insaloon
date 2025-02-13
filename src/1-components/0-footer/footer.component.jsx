import './footer.styles.scss'

import CGU from '../../0-data/CGU.pdf'
import CGV from '../../0-data/CGV.pdf'

const Footer = () => {
    return (
        <footer>
            <div className='content'>
                <span>MonColleur.fr &copy; 2024</span> |
                <a href={CGU} target='_blank' rel='noreferrer'> CGU </a> |
                <a href={CGV} target='_blank' rel='noreferrer'> CGV </a>
            </div>
        </footer>
    )
}

export default Footer