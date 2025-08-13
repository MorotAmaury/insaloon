import { useEffect, useState } from "react";
import { getDefisByCategorieVisible } from "../../4-utils/firebase.utils";
import './pageDefis.styles.scss';

export default function PageDefis() {
  const [groupedDefis, setGroupedDefis] = useState([]);
  const [openCategories, setOpenCategories] = useState({}); // { categorieName: true/false }

  useEffect(() => {
    const fetchGroupedDefis = async () => {
      const data = await getDefisByCategorieVisible();
      const filtered = data.filter(group => group.defis.length > 0);
      setGroupedDefis(filtered);

      // Par défaut, ouvrir toutes les catégories
      const initialOpen = {};
      filtered.forEach(({ categorie }) => {
        initialOpen[categorie] = true;
      });
      setOpenCategories(initialOpen);
    };

    fetchGroupedDefis();
  }, []);

  const toggleCategory = (categorie) => {
    setOpenCategories(prev => ({
      ...prev,
      [categorie]: !prev[categorie]
    }));
  };

  return (
    <div className="page-defis">
      <h2 className="title">Les défis</h2>

      {groupedDefis.length === 0 && (
        <div className="no-defis">Aucun défi disponible pour le moment.</div>
      )}

      {groupedDefis.map(({ categorie, defis }) => (
        <div key={categorie} className="categorie-block">
          <div
            className="categorie-header"
            onClick={() => toggleCategory(categorie)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") toggleCategory(categorie); }}
          >
            <h3>{categorie}</h3>
            <span className={`toggle-icon ${openCategories[categorie] ? 'open' : ''}`}>
              {openCategories[categorie] ? '▲' : '▼'}
            </span>
          </div>

          {openCategories[categorie] ? (
            defis.length > 0 ? (
              <div className="defis-grid">
                {defis.map((defi) => (
                  <div key={defi.id} className="defi-card">
                    <h4 className="defi-nom">{defi.nom}</h4>
                    <p className="defi-desc">{defi.description}</p>
                    <p className="defi-points">Points : {defi.points}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-defis-categorie">Pas de défi disponible dans cette catégorie.</p>
            )
          ) : null}
        </div>
      ))}
    </div>
  );
}
