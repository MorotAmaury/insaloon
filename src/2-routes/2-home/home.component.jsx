import './home.styles.scss'
import logo from '../../logo .png'
const Home = () => {
    return (
        <div className='home-container'>
            <h1 className='title'>Bienvenue sur INSALOON</h1>
            <img src={logo} className='logo' alt='logo'/>
        </div>
    );
}

export default Home;