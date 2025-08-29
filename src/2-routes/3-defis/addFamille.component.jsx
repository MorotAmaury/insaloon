import { useState } from "react";
import { addFamille } from "../../4-utils/firebase.utils";
import './addDefis.styles.scss'; 

export default function AddFamilleForm() {
  const [nom, setNom] = useState("");
  const [nbPersonnes, setNbPersonnes] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nom || !nbPersonnes) {
      alert("Merci de remplir tous les champs !");
      return;
    }

    try {
      await addFamille({ 
        nom, 
        nbPersonnes: parseInt(nbPersonnes, 10) || 0, 
        points: 0 // tu peux initialiser les points à 0 par défaut
      });
      setSuccessMsg("Famille ajoutée avec succès !");
      setNom("");
      setNbPersonnes("");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la famille :", error);
      alert("Erreur lors de l'ajout de la famille.");
    }
  };

  return (
    <div className="addDefi-container">
      <h2 className="subtitle">Ajouter une famille</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label className="input-title">Nom</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="input-field"
            placeholder="Nom de la famille"
          />
        </div>

        <div>
          <label className="input-title">Nombre de personnes</label>
          <input
            type="number"
            min="1"
            value={nbPersonnes}
            onChange={(e) => setNbPersonnes(e.target.value)}
            className="input-field"
            placeholder="Ex: 2"
          />
        </div>

        <button
          type="submit"
          className="submit-button"
        >
          Ajouter la famille
        </button>

        {successMsg && (
          <p className="text-green-600 font-medium mt-2">{successMsg}</p>
        )}
      </form>
    </div>
  );
}
