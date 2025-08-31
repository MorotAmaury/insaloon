import './home.styles.scss'
import logo from '../../logo.png'
import { FaInstagram } from "react-icons/fa";
import { useEffect, useState } from 'react';

const Home = () => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const targetDate = new Date("2025-09-01T19:00:00");

    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft(null);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container flex flex-col items-center justify-center text-center">
      <h1 className="title">Bienvenue à l'INSA !</h1>
    
      <p className="title-description">
      Salut jeune PPA, Bienvenue sur le site de l'inté 2025 ! 
      <br/>
      Ce site a pour vocation de centraliser toutes les informations importantes liées à l’intégration.
Tu y retrouveras le détail des événements à venir, les horaires, les lieux, ainsi que toutes les consignes utiles pour bien profiter de chaque moment.

Il te permet aussi de découvrir et relever les défis proposés tout au long de l’inté.
En envoyant des preuves de tes réalisations, tu feras gagner des points à ta famille et participeras au classement général.
        </p>

      <div className="decompte-container">
        {timeLeft ? (
          <div className="decompte">
            <span className="decompte-part">{timeLeft.days}j</span> : <span className="decompte-part">{timeLeft.hours}h</span> 
            : <span className="decompte-part">{timeLeft.minutes}m </span>: <span className="decompte-part">{timeLeft.seconds}s</span>
          </div>
        ) : (
          <div className="text-green-600 text-xl font-semibold">C'est le jour J ! 🎉</div>
        )}
      </div>

      <footer className="footer">
        <a
          href="https://instagram.com/_insaloon_"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-700 hover:text-pink-600"
        >
          <FaInstagram className="text-xl" /> Insaloon
        </a>
        <a
          href="https://instagram.com/bdeinsarouen"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-700 hover:text-pink-600"
        >
          <FaInstagram className="text-xl" /> Bde Insa-Rouen
        </a>
      </footer>
    </div>
  );
};

export default Home;