import { useEffect, useState } from "react";
import { getAllFamilles } from "../../4-utils/firebase.utils";
import './classementPage.styles.scss';
import { useNavigate } from "react-router-dom";

export default function ClassementPage() {
  const [classement, setClassement] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassement = async () => {
      const data = await getAllFamilles();
      const sorted = data
        .filter((famille) => famille.nom && typeof famille.points === "number")
        .sort((a, b) => Math.floor(b.points * b.coef) - Math.floor(a.points * a.coef));

      setClassement(sorted);
    };

    fetchClassement();
  }, []);

  const handleClick = (familleNom) => {
    navigate(`/famille/${encodeURIComponent(familleNom)}`);
  };

  // Si aucune famille, affichage de l'écran spécial
  if (classement.length === 0) {
    return (
      <div className="no-familles">
        <h2>Aucune famille disponible</h2>
        <p>Le classement n’est pas encore prêt... Revenez plus tard !</p>
      </div>
    );
  }

  return (
    <div className="classement-page">
      <h2 className="title">Classement des familles</h2>

      {/* Podium */}
      <div className="podium">
        {classement[1] && (
          <div
            className="podium-box place-2"
            onClick={() => handleClick(classement[1].nom)}
          >
            <div className="box-rank">2</div>
            <div className="box-name">{classement[1].nom}</div>
            <div className="box-points">{Math.floor(classement[1].points * classement[1].coef)} pts</div>
          </div>
        )}
        {classement[0] && (
          <div
            className="podium-box place-1"
            onClick={() => handleClick(classement[0].nom)}
          >
            <div className="box-rank">1</div>
            <div className="box-name">{classement[0].nom}</div>
            <div className="box-points">{Math.floor(classement[0].points * classement[0].coef)} pts</div>
          </div>
        )}
        {classement[2] && (
          <div
            className="podium-box place-3"
            onClick={() => handleClick(classement[2].nom)}
          >
            <div className="box-rank">3</div>
            <div className="box-name">{classement[2].nom}</div>
            <div className="box-points">{Math.floor(classement[2].points * classement[2].coef)} pts</div>
          </div>
        )}
      </div>

      {/* Autres familles */}
      <ul className="classement-container">
        {classement.slice(3).map((famille, index) => (
          <li
            key={famille.nom}
            className="classement-item"
            onClick={() => handleClick(famille.nom)}
          >
            <span className="rank">{index + 4}</span>
            <span className="name">{famille.nom}</span>
            <span className="points">{Math.floor(famille.points * famille.coef)} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
