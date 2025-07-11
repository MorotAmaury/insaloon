import { useEffect, useState } from "react";
import { addDefi, getAllCategories, isDefiNameTaken } from "../../4-utils/firebase.utils";
import './addDefis.styles.scss'; 

export default function AddDefiForm() {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(10); // Valeur par défaut
  const [successMsg, setSuccessMsg] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategorie, setSelectedCategorie] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const categorie = await getAllCategories();
      setCategories(categorie);
    };
    fetch();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titre || !description || !points || !selectedCategorie) {
      alert("Merci de remplir tous les champs !");
      return;
    }

    try {
       const exists = await isDefiNameTaken(titre);
        if (exists) {
          alert("Un défi avec ce nom existe déjà !");
          return;
        }
      await addDefi({ selectedCategorie, titre, description, points });
      setSuccessMsg("Défi ajouté avec succès !");
      setTitre("");
      setDescription("");
      setPoints(10);
    } catch (error) {
      console.error("Erreur lors de l'ajout du défi :", error);
      alert("Erreur lors de l'ajout du défi.");
    }
  };

  return (
    <div className="addDefi-container">
      <h2 className="subtitle">Ajouter un défi</h2>

          <select
      value={selectedCategorie}
      onChange={(e) => setSelectedCategorie(e.target.value)}
      className="border p-2 rounded w-full"
      required
    >
      <option value="">Sélectionne une catégorie</option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.nom}>{cat.nom}</option>
      ))}
    </select>
      <form onSubmit={handleSubmit} >
        <div>
          <label className="input-title">Titre</label>
          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            className="input-field"
            placeholder="Titre du défi"
          />
        </div>

        <div>
          <label className="input-title">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
            placeholder="Décris le défi..."
          />
        </div>

        <div>
          <label className="input-title">Points</label>
          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            className="input-field"
            min="1"
          />
        </div>

        <button
          type="submit"
          className="submit-button"
        >
          Ajouter le défi
        </button>

        {successMsg && (
          <p className="text-green-600 font-medium mt-2">{successMsg}</p>
        )}
      </form>
    </div>
  );
}
