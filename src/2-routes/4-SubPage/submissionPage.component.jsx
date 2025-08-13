import { useEffect, useState } from "react";
import { getAllDefis, getAllFamilles, submitDefiProof } from "../../4-utils/firebase.utils";
import Select from 'react-select';
import './submissionPage.styles.scss';

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
    const fetchData = async () => {
      setDefis(await getAllDefis());
      setFamilles(await getAllFamilles());
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!defiId || !videoUrl || !famille) {
      alert("Merci de remplir tous les champs obligatoires !");
      return;
    }
    if (!videoUrl.includes("drive.google.com") && !videoUrl.includes("youtu")) {
      alert("Merci d'envoyer un lien Google Drive ou YouTube valide !");
      return;
    }
    try {
      setLoading(true);
      await submitDefiProof({ defiId, videoUrl, comment, famille, visibleFor });
      setSuccessMsg("Preuve envoyée avec succès !");
      setDefiId(""); setFamille(""); setVideoUrl(""); setComment("");
    } catch (err) {
      alert("Une erreur est survenue pendant l'envoi.");
    } finally {
      setLoading(false);
    }
  };

  const defiOptions = defis.map(d => ({ value: d.id, label: d.nom }));

  return (
    <form onSubmit={handleSubmit} className="submit-defi-form">
      <h2 className="title">Soumettre une preuve de défi</h2>

      {/* Ligne 1 */}
      <div className="form-row">
        <div>
          <label>Défi :</label>
          <Select
            options={defiOptions}
            value={defiOptions.find(o => o.value === defiId) || null}
            onChange={(selected) => setDefiId(selected?.value || "")}
            placeholder="Choisis un défi"
            classNamePrefix="react-select"
          />
        </div>
      </div>

      {/* Ligne 2 */}
      <div className="form-row">
        <div>
          <label>Famille :</label>
          <select value={famille} onChange={(e) => setFamille(e.target.value)}>
            <option value="">Choisis ta famille</option>
            {familles.map(f => (
              <option key={f.id} value={f.nom}>{f.nom}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Lien de la preuve :</label>
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://drive.google.com/..."
          />
        </div>
      </div>

      {/* Ligne 3 */}
      <div className="form-row">
        <div>
          <label>Commentaire :</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={2}
          />
        </div>
      </div>

      {/* Ligne 4 */}
      <div className="form-row">
        <div>
          <label>Visible pour :</label>
          <select value={visibleFor} onChange={(e) => setVisibleFor(e.target.value)}>
            <option value="any">Respo Fille & Garçon</option>
            <option value="respo_fille">Uniquement Respo Fille</option>
            <option value="respo_garcon">Uniquement Respo Garçon</option>
          </select>
        </div>
      </div>

      {/* Footer */}
      <div className="form-footer">
        <button type="submit" disabled={loading}>
          {loading ? "Envoi en cours..." : "Soumettre"}
        </button>
        {successMsg && <p className="success">{successMsg}</p>}
        <p className="disclaimer">
          ⚠️ Il n'est absolument pas obligatoire de faire des défis.
        </p>
      </div>
    </form>
  );
}