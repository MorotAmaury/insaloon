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
        .sort((a, b) => b.points - a.points);

      setClassement(sorted);
    };

    fetchClassement();
  }, []);

  const handleClick = (familleNom) => {
    navigate(`/famille/${encodeURIComponent(familleNom)}`);
  };

  return (
    <div className="">
      <h2 className="title">Classement des familles</h2>
      <ul className="classement-container">
        {classement.map((famille, index) => (
          <li
            key={famille.nom}
            className="element p-4 border rounded bg-white shadow hover:bg-gray-100 cursor-pointer"
            onClick={() => handleClick(famille.nom)}
          >
            <span className="font-bold text-lg">{index + 1}. {famille.nom}</span>
            <span className="float-right text-green-600 font-semibold">{famille.points} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
}