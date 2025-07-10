import { useEffect, useState } from "react";
import { getAllFamilles } from "../../4-utils/firebase.utils";

export default function ClassementPage() {
  const [classement, setClassement] = useState([]);

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

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Classement des familles 🏆</h2>
      <ul className="space-y-2">
        {classement.map((famille, index) => (
          <li key={famille.nom} className="p-4 border rounded bg-white shadow">
            <span className="font-bold text-lg">{index + 1}. {famille.nom}</span>
            <span className="float-right text-green-600 font-semibold">{famille.points} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
}