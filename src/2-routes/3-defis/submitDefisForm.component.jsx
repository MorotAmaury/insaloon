import { useEffect, useState } from "react";
import { getAllDefis, getAllFamilles, submitDefiProof } from "../../4-utils/firebase.utils";
import Select from 'react-select';


export default function SubmitDefiForm() {
  const [defiId, setDefiId] = useState("");
  const [famille, setFamille] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [visibleFor, setVisibleFor] = useState("any");

    const [defis, setDefis] = useState([]);
    const [familles, setFamilles] = useState([]);
    useEffect(() => {
      
      const fetchDefis = async () => {
        const listeDefis = await getAllDefis();
        setDefis(listeDefis);
        const listeFamilles = await getAllFamilles(); 
        setFamilles(listeFamilles);
      };
      fetchDefis();
    }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!defiId || !videoUrl || !famille) {
      alert("Merci de remplir tous les champs obligatoires !");
      return;
    }

    // Vérification du lien vidéo
    const valid = videoUrl.includes("drive.google.com") || videoUrl.includes("youtu");
    if (!valid) {
      alert("Merci d'envoyer un lien Google Drive ou YouTube valide !");
      return;
    }

    try {
      setLoading(true);
      console.log(famille, "familleId");
      
      await submitDefiProof({
        defiId,
        videoUrl,
        comment,
        famille,
        visibleFor,
      });

      setSuccessMsg("Preuve envoyée avec succès !");
      setDefiId("");
      setFamille("");
      setVideoUrl("");
      setComment("");
    } catch (err) {
      console.error("Erreur lors de la soumission :", err);
      alert("Une erreur est survenue pendant l'envoi.");
    } finally {
      setLoading(false);
    }

  };
  const defiOptions = defis.map((d) => ({
    value: d.id,
    label: d.nom,
  }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded bg-white">
      <h2 className="text-xl font-bold">Soumettre une preuve de défi</h2>

     <label className="block font-semibold">Défi :</label>
    <Select
      options={defiOptions}
      value={defiOptions.find(option => option.value === defiId) || null}
      onChange={(selected) => setDefiId(selected?.value || "")}
      placeholder="Choisis un défi"
      className="react-select-container"
      classNamePrefix="react-select"
    />

<label className="block font-semibold">Famille :</label>
     <select
        value={famille}
        onChange={(e) => setFamille(e.target.value)}
        className="w-full border p-2 rounded"
        required
      >
        <option value="">Choisis ta famille</option>
        {familles.map((f) => (
          <option key={f.id} value={f.nom}>
            {f.nom}
          </option>
        ))}
      </select>
      <label className="block font-semibold">Lien de la preuve (Drive ou YouTube) :</label>
      <input
        type="url"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="https://drive.google.com/..."
        className="w-full border p-2 rounded"
        required
      />

      <label className="block font-semibold">Commentaire (optionnel) :</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border p-2 rounded"
        rows={3}
      />

      <label className="block font-semibold">Visible pour :</label>
      <select
        value={visibleFor}
        onChange={(e) => setVisibleFor(e.target.value)}
        className="w-full border p-2 rounded"
        required
      >
        <option value="any">Respo Fille & Garçon</option>
        <option value="respo_fille">Uniquement Respo Fille</option>
        <option value="respo_garcon">Uniquement Respo Garçon</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Envoi en cours..." : "Soumettre"}
      </button>

      {successMsg && <p className="text-green-700 mt-2">{successMsg}</p>}
    </form>
  );
}
