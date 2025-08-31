import { useEffect, useState } from "react";
import { getFamilles, updateFamille } from "../../4-utils/firebase.utils";

export default function EditFamilleForm() {
  const [familles, setFamilles] = useState([]);
  const [selectedFamilleId, setSelectedFamilleId] = useState("");
  const [formData, setFormData] = useState({
    nom: "",
    nbPersonnes: 0,
    points: 0,
  });

  // Charger les familles
  useEffect(() => {
    async function fetchFamilles() {
      const fams = await getFamilles();
      setFamilles(fams);
    }
    fetchFamilles();
  }, []);

  // Pré-remplir le formulaire quand on choisit une famille
  useEffect(() => {
    if (!selectedFamilleId) return;
    const famille = familles.find((f) => f.id === selectedFamilleId);
    if (famille) {
      setFormData({
        nom: famille.nom || "",
        nbPersonnes: famille.nbPersonnes || 0,
        points: famille.points || 0,
      });
    }
  }, [selectedFamilleId, familles]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "nbPersonnes" || name === "points" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFamilleId) {
      alert("Sélectionnez une famille à modifier !");
      return;
    }
    await updateFamille(selectedFamilleId, formData);
    alert("Famille mise à jour !");
  };

  return (
    <div className="edit-famille-form border p-4 rounded shadow bg-white">
      <h2 className="text-lg font-bold mb-2">Modifier une famille</h2>

      <select
        value={selectedFamilleId}
        onChange={(e) => setSelectedFamilleId(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      >
        <option value="">-- Sélectionnez une famille --</option>
        {familles.map((f) => (
          <option key={f.id} value={f.id}>
            {f.nom}
          </option>
        ))}
      </select>

      {selectedFamilleId && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="email"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Nom de la famille"
            className="border p-2 rounded"
          />
          <div>Nombre de personne: </div>
          <input
            type="number"
            name="nbPersonnes"
            value={formData.nbPersonnes}
            onChange={handleChange}
            placeholder="Nombre de personnes"
            className="border p-2 rounded"
          />
        <div>Points : </div>
          <input
            type="number"
            name="points"
            value={formData.points}
            onChange={handleChange}
            placeholder="Points"
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
          >
            Sauvegarder
          </button>
        </form>
      )}
    </div>
  );
}
