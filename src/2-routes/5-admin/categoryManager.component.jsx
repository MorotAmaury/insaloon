import { useEffect, useState } from "react";
import { addCategorie, getAllCategories, toggleCategorieVisibility } from "../../4-utils/firebase.utils";

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [newNom, setNewNom] = useState("");

  const fetchCategories = async () => {
    const data = await getAllCategories();
    setCategories(data);
  };

  const handleAdd = async () => {
    if (!newNom.trim()) return;
    await addCategorie(newNom.trim());
    setNewNom("");
    fetchCategories();
  };

  const handleToggle = async (id, visible) => {
    await toggleCategorieVisibility(id, visible);
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold mb-3">Gestion des catégories</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Nom de la catégorie"
          value={newNom}
          onChange={(e) => setNewNom(e.target.value)}
          className="border px-3 py-1 rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          Ajouter
        </button>
      </div>

      <ul>
        {categories.map((cat) => (
          <li key={cat.id} className="flex justify-between items-center py-1">
            <span>{cat.nom}</span>
            <label className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Visible</span>
              <input
                type="checkbox"
                checked={cat.visible}
                onChange={() => handleToggle(cat.id, cat.visible)}
              />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

