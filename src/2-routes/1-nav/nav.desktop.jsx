import './nav.desktop.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import logo from '../../logo.png'

const NavD = () => {
  const role = localStorage.getItem("adminRole");
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  return (
    <nav className="desktopNav">
      <Link to="/" className="logo" onClick={closeMenu}>
        <img src={logo} alt="logo" />
      </Link>

      {/* Menu Desktop */}
      <ul className="nav-items">
        <li className="item"><Link to="/evenement">Evenement</Link></li>
        <li className="item"><Link to="/defis">Defis</Link></li>
        <li className="item"><Link to="/classement">Classement</Link></li>
        {role && <li className="item"><Link to="/admin">Admins</Link></li>}
        <li className="item">
          <Link to="/submission"><button className="btn">Soumettre defis</button></Link>
        </li>
      </ul>

      {/* Burger Icon */}
      <div className={`burger ${open ? "open" : ""}`} onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Menu Mobile */}
      {open && (
        <ul className="nav-items mobile">
          <li className="item" onClick={closeMenu}><Link to="/evenement">Evenement</Link></li>
          <li className="item" onClick={closeMenu}><Link to="/defis">Defis</Link></li>
          <li className="item" onClick={closeMenu}><Link to="/classement">Classement</Link></li>
          {role && <li className="item" onClick={closeMenu}><Link to="/admin">Admins</Link></li>}
          <li className="item" onClick={closeMenu}>
            <Link to="/submission"><button className="btn">Soumettre defis</button></Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavD;
