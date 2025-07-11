import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDefiById, getSoumissionsByFamille } from "../../4-utils/firebase.utils";
import './classementPage.styles.scss';
export default function DetailFamillePage() {
  const { nom } = useParams();
  const [soumissions, setSoumissions] = useState([]);
  const [defisMap, setDefisMap] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSoumissionsByFamille(nom);

      // Récupère les infos de défi manquantes
      const defiIds = [...new Set(data.map((s) => s.defiId))];
      const defiData = {};

      await Promise.all(
        defiIds.map(async (id) => {
          const defi = await getDefiById(id);
          if (defi) {
            defiData[id] = defi;
          }
        })
      );

      setDefisMap(defiData);
      setSoumissions(data);
    };

    fetchData();
  }, [nom]);

  const groupByStatus = {
    approved: [],
    pending: [],
    rejected: [],
  };

  soumissions.forEach((s) => {
    groupByStatus[s.status]?.push(s);
  });

  const formatDate = (timestamp) => {
    const date = timestamp?.toDate?.();
    return date ? date.toLocaleDateString("fr-FR") + " à " + date.toLocaleTimeString("fr-FR") : "Date inconnue";
  };

  return (
    <div className="classement-container">
      <h2 className="text-2xl font-bold mb-4">Soumissions de la famille {nom}</h2>

      {["approved", "pending", "rejected"].map((status) => (
        <div key={status} className="mb-6">
          <h3 className="text-xl font-semibold mb-2">
            {status === "approved" && "✅ Validées"}
            {status === "pending" && "⏳ En attente"}
            {status === "rejected" && "❌ Refusées"}
          </h3>

          {groupByStatus[status].length === 0 ? (
            <p className="text-gray-500 italic">Aucune soumission</p>
          ) : (
            <ul className="space-y-2">
              {groupByStatus[status].map((s) => {
                const defi = defisMap[s.defiId];
                return (
                  <li key={s.id} className="p-4 border rounded bg-white shadow">
                    <p><strong>Défi :</strong> {defi?.nom || "Inconnu"}</p>
                    <p><strong>Points :</strong> {defi?.points ?? "?"}</p>
                    <p>Fais le {formatDate(s.timestamp)}</p>
                    {s.status === "rejected" && s.rejectionReason  && (
                      <p className="text-red-600"><strong>Raison :</strong> {s.rejectionReason }</p>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}