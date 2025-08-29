import { useEffect, useState } from "react";
import { getDefis, updateDefi } from "../../4-utils/firebase.utils";

export default function EditDefiForm() {
  const [defis, setDefis] = useState([]);
  const [selectedDefiId, setSelectedDefiId] = useState("");
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    points: 0,
  });

  // Charger les défis
  useEffect(() => {
    async function fetchDefis() {
      const defs = await getDefis();
      setDefis(defs);
    }
    fetchDefis();
  }, []);

  // Pré-remplir le formulaire quand on choisit un défi
  useEffect(() => {
    if (!selectedDefiId) return;
    const defi = defis.find((d) => d.id === selectedDefiId);
    if (defi) {
      setFormData({
        nom: defi.nom || "",
        description: defi.description || "",
        points: defi.points || 0,
      });
    }
  }, [selectedDefiId, defis]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "points" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDefiId) {
      alert("Sélectionnez un défi à modifier !");
      return;
    }
    await updateDefi(selectedDefiId, formData);
    alert("Défi mis à jour !");
  };

  return (
    <div className="edit-defi-form border p-4 rounded shadow bg-white">
      <h2 className="text-lg font-bold mb-2">Modifier un défi</h2>

      <select
        value={selectedDefiId}
        onChange={(e) => setSelectedDefiId(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      >
        <option value="">-- Sélectionnez un défi --</option>
        {defis.map((d) => (
          <option key={d.id} value={d.id}>
            {d.nom}
          </option>
        ))}
      </select>

      {selectedDefiId && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Nom du défi"
            className="border p-2 rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 rounded"
          />
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
