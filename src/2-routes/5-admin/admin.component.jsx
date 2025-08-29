import { Fragment, useEffect, useState } from "react";
import {
  getPendingSubmissions,
  approveSubmission,
  refuseSubmission,
  getDefis,
  
} from "../../4-utils/firebase.utils";
import AddDefiForm from "../3-defis/addDefis.component";
import EditDefiForm from "../3-defis/editDefis.component";
import './admin.styles.scss';
import AddFamilleForm from "../3-defis/addFamille.component";
import CategoryManager from "./categoryManager.component";

export default function AdminValidationPage() {
  const [submissions, setSubmissions] = useState([]);
  const [defis, setDefis] = useState([]);
  const [reason, setReason] = useState({}); // id soumission => raison
  const role = localStorage.getItem("adminRole");
  console.log(role);
  
  useEffect(() => {
    async function fetchData() {
      const subs = await getPendingSubmissions();
      const filteredSubs = subs.filter((proof) => {
        return (
          proof.visibleFor === "any" || proof.visibleFor === role
        );
      });
      setSubmissions(filteredSubs);

      const defs = await getDefis();
      setDefis(defs);
    }
    fetchData();
  }, []);

  const handleApprove = async (id, defiId) => {
    const defi = defis.find((d) => d.id === defiId);
    if (!defi) {
      alert("Défi introuvable");
      return;
    }
    await approveSubmission(id, defi.points);
    setSubmissions((subs) => subs.filter((s) => s.id !== id));
  };
  const defiIdtoName = (defiId) => {
    return defis.find((d) => d.id === defiId)?.nom || "Défi inconnu";
  }
  const handleRefuse = async (id) => {
    if (!reason[id] || reason[id].trim() === "") {
      alert("Merci de saisir une raison du refus.");
      return;
    }
    await refuseSubmission(id, reason[id]);
    setSubmissions((subs) => subs.filter((s) => s.id !== id));
  };

  return (
    <Fragment>
    <div className="addForm-container">
          <AddDefiForm/>
          <AddFamilleForm/>
          <EditDefiForm/> 
    </div>
    <div className="category-manager">
      <CategoryManager />
    </div>
    <div className="submission-container"> 

      <h1 className="submission-title">Validation des soumissions</h1>

      {submissions.length === 0 && <p>Aucune soumission en attente.</p>}

      {submissions.map((sub) => (
        <div key={sub.id} className="border p-4 rounded bg-white shadow">
          <p>
            <strong>Famille :</strong> {sub.famille}
          </p>
          <p>
            <strong>Défi :</strong> {defiIdtoName(sub.defiId)}
          </p>
          <p>
            <strong>Commentaire :</strong> {sub.comment || "-"}
          </p>
          <p>
            <strong>Vidéo :</strong>{" "}
            <a href={sub.videoUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">
              Voir la vidéo
            </a>
          </p>

          <div className="mt-4 flex gap-4">
            <button
              onClick={() => handleApprove(sub.id, sub.defiId)}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Valider
            </button>

            <div>
              <input
                type="text"
                placeholder="Raison du refus"
                value={reason[sub.id] || ""}
                onChange={(e) =>
                  setReason((r) => ({ ...r, [sub.id]: e.target.value }))
                }
                className="border p-1 rounded mr-2"
              />
              <button
                onClick={() => handleRefuse(sub.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Refuser
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </Fragment>

  );
}
