import { useState } from "react";
import { addDefi } from "../../4-utils/firebase.utils";
import './addDefis.styles.scss'; 

export default function AddDefiForm() {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(10); // Valeur par défaut
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titre || !description || !points) {
      alert("Merci de remplir tous les champs !");
      return;
    }

    try {
      await addDefi({ titre, description, points });
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
      <h2 className="title">Ajouter un défi</h2>

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
