import { Fragment, useState } from "react";
import { verifyAdminCredentials } from "../../4-utils/firebase.utils";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [identifiant, setIdentifiant] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const role = await verifyAdminCredentials(identifiant, motDePasse);

    if (role) {
      localStorage.setItem("adminRole", role);
      navigate("/admin");
    } else {
      setErreur("Identifiant ou mot de passe incorrect.");
    }
  };

  return (
    <Fragment>
    <h2 className="title">Connexion admin</h2>
    <div className="flex flex-col items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
        <input
          type="text"
          placeholder="Identifiant"
          value={identifiant}
          onChange={(e) => setIdentifiant(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          className="border p-2 w-full rounded"
        />
        {erreur && <p className="text-red-500 text-sm">{erreur}</p>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Se connecter
        </button>
      </form>
    </div>
        </Fragment>

  );
}
