import React, { useEffect, useState } from 'react';
import { fetchUsers, incrementNombreTickets, addDefi, getDefiById, getInfo, fetchDefis, updateUserDefisAndTickets, incrementNombreFinisDefi, fetchUserById, auth } from '../../4-utils/firebase.utils';
import './admin.styles.scss';
import { onAuthStateChanged } from 'firebase/auth';

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userChecked, setUserChecked] = useState(false); // pour ne rien afficher tant que la vérif est pas finie
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [defis, setDefis] = useState([]);

  // States pour le formulaire de défi
  const [defiName, setDefiName] = useState('');
  const [defiPoints, setDefiPoints] = useState(0);
  const [message, setMessage] = useState('');

  // 🔑 Vérification si l'user est admin
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await fetchUserById(user.uid);

        if (userData && userData.admin === true) {
          setIsAdmin(true);
          fetchAllData();
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }

      setUserChecked(true);
    });

    return () => unsubscribe();
  }, []);
    // 📥 Récupération users + defis si admin
    const fetchAllData = async () => {
      const userList = await fetchUsers();
      setUsers(userList);
  
      const defisList = await fetchDefis();
      setDefis(defisList);
    };
  // Filtrage des utilisateurs en fonction de la recherche
  const filteredUsers = users.filter(user => {
    const fullName = `${user.prenom || ''} ${user.nom || ''}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  // Fonction pour ajouter des tickets
  const handleIncrementTickets = async (userId, currentTickets, montant) => {
    const success = await incrementNombreTickets(userId, currentTickets, montant);

    if (success) {
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId
            ? { ...user, nombreTickets: (user.nombreTickets || 0) + montant }
            : user
        )
      );
    }
  };

  // Fonction pour ajouter les points d'un défi spécifique à un utilisateur
  const handleAddPointsToDefi = async (userId, defiId) => {
    try {
      const user = users.find(u => u.id === userId);
      if (!user) {
        alert('Utilisateur non trouvé.');
        return;
      }
  
      const defisValider = user.defisValider || [];
  
      if (defisValider.includes(defiId)) {
        alert('Ce défi a déjà été validé par cet utilisateur.');
        return;
      }
  
      const defi = defis.find(d => d.id === defiId);
      if (!defi) {
        alert('Défi non trouvé.');
        return;
      }
  
      const points = defi.points || 0;
      const updatedDefisValider = [...defisValider, defiId];
      const updatedNombreTickets = (user.nombreTickets || 0) + points;
  
      // 1. Met à jour l'utilisateur (tickets + defisValider)
      const success = await updateUserDefisAndTickets(userId, updatedNombreTickets, updatedDefisValider);
  
      if (success) {
        // 2. Incrémente nombreFinis du défi
        const defiUpdated = await incrementNombreFinisDefi(defiId);
  
        if (defiUpdated) {
          setUsers(prevUsers =>
            prevUsers.map(u =>
              u.id === userId
                ? { ...u, nombreTickets: updatedNombreTickets, defisValider: updatedDefisValider }
                : u
            )
          );
  
          setDefis(prevDefis =>
            prevDefis.map(d =>
              d.id === defiId
                ? { ...d, nombreFinis: (d.nombreFinis || 0) + 1 }
                : d
            )
          );
  
          alert(`Défi "${defi.name}" validé pour ${user.prenom || user.nom}!`);
        } else {
          alert('Erreur lors de la mise à jour du défi.');
        }
      } else {
        alert('Erreur lors de la validation du défi.');
      }
  
    } catch (error) {
      console.error('Erreur dans handleAddPointsToDefi :', error);
    }
  };
  

  // Fonction pour ajouter un défi
  const handleAddDefi = async (e) => {
    e.preventDefault();

    if (!defiName || defiPoints <= 0) {
      alert('Veuillez remplir tous les champs correctement.');
      return;
    }

    const newDefi = {
      name: defiName,
      points: parseInt(defiPoints),
    };

    const success = await addDefi(newDefi);

    if (success) {
      setMessage('Défi ajouté avec succès !');
      setDefiName('');
      setDefiPoints(0);
    } else {
      setMessage('Erreur lors de l\'ajout du défi.');
    }
  };
// ⏳ Ne rien afficher tant que la vérif est pas finie
if (!userChecked) {
  return <div className="loading">Vérification des droits...</div>;
}

if (!isAdmin) {
  return <div className="access-denied">Accès refusé. Réservé aux admins.</div>;
}
  return (
    <div className="admin">
      <h2>Liste des utilisateurs</h2>
      
 {/* 🔥 Liste des Défis à gauche */}
 <div className="defis-sidebar">
        <h3>Liste des Défis</h3>
        <ul>
          {defis.map(defi => (
            <li key={defi.id}>
              <strong>ID:</strong> {defi.id} | <strong>{defi.name}</strong>
            </li>
          ))}
        </ul>
      </div>

      <input
        type="text"
        placeholder="Rechercher par nom ou prénom..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="userlist-list">
        {filteredUsers.map(user => (
          <div key={user.id} className="userlist-card">
            <p><strong>Prénom :</strong> {user.prenom || 'N/A'}</p>
            <p><strong>Nom :</strong> {user.nom || 'N/A'}</p>
            <p><strong>Nombre de Tickets :</strong> {user.nombreTickets || 0}</p>
            <p>Defi valider : {user.defisValider?.map((defis) => <span>{defis}|</span>)}</p>

            {/* Bouton + qui demande l'ID du défi */}
            <div
              className="add"
              onClick={() => {
                const id = parseInt(prompt('Entrez l\'ID du défi :'));
                if (id) {
                    handleAddPointsToDefi(user.id, id); // Ajoute directement les points du défi à l'utilisateur
                }
              }}
            >
              +
            </div>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <p>Aucun utilisateur trouvé.</p>
        )}
      </div>

      <hr />

      {/* Formulaire d'ajout de défi */}
      <div className="add-defi-form">
        <h2>Ajouter un nouveau défi</h2>

        <form onSubmit={handleAddDefi}>
          <input
            type="text"
            placeholder="Nom du défi"
            value={defiName}
            onChange={(e) => setDefiName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Points"
            value={defiPoints}
            onChange={(e) => setDefiPoints(e.target.value)}
            min="1"
          />

     
          <button type="submit">Ajouter le défi</button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Admin;
