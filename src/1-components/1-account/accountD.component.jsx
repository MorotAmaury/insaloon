// AccountDesktop.jsx
import { Fragment } from 'react';
import { googleSignOut } from '../../4-utils/firebase.utils';
import { useNavigate } from 'react-router-dom';
import './account.styles.scss';

const AccountDesktop = ({ currentUser, setAccountOn, nombreTickets, prenom, email }) => {
    const navigate = useNavigate();

    const handleDisconnect = () => {
        setAccountOn(false);
        googleSignOut();
        navigate('../.');
    };

    return (
        <div className="account-container">
            <div className="cross" onClick={() => setAccountOn(false)}>
                <i className="fa-solid fa-xmark"></i>
            </div>

            <div className="account-container-minimised">
                <div className="welcome">Bienvenue {prenom} !</div>
                <div className="credits">{nombreTickets} <i className="fa-solid fa-ticket"></i></div>
                <div className="stripe-container"></div>
                <button className="logout-btn stripe-btn" onClick={handleDisconnect}>Se déconnecter</button>
                <div className="email">{email}</div>
            </div>
        </div>
    );
};

export default AccountDesktop;
