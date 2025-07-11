import { useEffect, useState } from "react";
import { getAllDefis, getDefisByCategorieVisible } from "../../4-utils/firebase.utils";
import './pageDefis.styles.scss';
export default function PageDefis() {
  const [groupedDefis, setGroupedDefis] = useState([]);

  useEffect(() => {
    const fetchGroupedDefis = async () => {
      const data = await getDefisByCategorieVisible();
      setGroupedDefis(data);
       // Filtrer les catégories qui ont au moins un défi
      const filtered = data.filter(group => group.defis.length > 0);
      setGroupedDefis(filtered);
    };

    fetchGroupedDefis();
    console.log(groupedDefis);
    
  }, []);

 return (
    <div>
      <h2 className="title">Les défis</h2>

      {
        groupedDefis.map(({ categorie, defis }) => (
          <div key={categorie} className="mb-8">
            <h3 className="text-2xl font-bold mb-3">{categorie}</h3>
            <div className="pageDefis-container grid md:grid-cols-2 gap-4">
              {defis.map((defi) => (
                <div key={defi.id} className="border p-4 rounded bg-yellow-50 shadow">
                  <h4 className="text-xl font-bold mb-2">{defi.nom}</h4>
                  <p>{defi.description}</p>
                  <p className="mt-2 text-sm text-gray-600">Points : {defi.points}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      }
    </div>
  );
}