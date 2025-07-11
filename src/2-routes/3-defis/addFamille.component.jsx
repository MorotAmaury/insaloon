import { useState } from "react";
import { addDefi, addFamille } from "../../4-utils/firebase.utils";
import './addDefis.styles.scss'; 

export default function AddFamilleForm() {
  const [nom, setNom] = useState("");
  
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nom ) {
      alert("Merci de remplir tous les champs !");
      return;
    }

    try {
      await addFamille({ nom });
      setSuccessMsg("Famille ajouté avec succès !");
      setNom("");
    } catch (error) {
      console.error("Erreur lors de l'ajout du défi :", error);
      alert("Erreur lors de l'ajout du défi.");
    }
  };

  return (
    <div className="addDefi-container">
      <h2 className="subtitle">Ajouter une famille</h2>

      <form onSubmit={handleSubmit} >
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
