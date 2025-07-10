import { useEffect, useState } from "react";
import { getAllDefis } from "../../4-utils/firebase.utils";
import './pageDefis.styles.scss';
export default function PageDefis() {
   const [defis, setDefis] = useState([]);

  useEffect(() => {
    const fetchDefis = async () => {
      const data = await getAllDefis();
      setDefis(data);
    };

    fetchDefis();
  }, []);

  return (
    <div className="pageDefis-container ">
      <h2 className="text-2xl font-bold mb-4">Tous les défis disponibles 🎯</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {defis.map((defi) => (
          <div key={defi.id} className="border p-4 rounded bg-yellow-50 shadow">
            <h3 className="text-xl font-bold mb-2">{defi.nom}</h3>
            <p>{defi.description}</p>
            <p className="mt-2 text-sm text-gray-600">Points : {defi.points}</p>
          </div>
        ))}
      </div>
    </div>
  );
}