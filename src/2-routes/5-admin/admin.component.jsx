import React, { useEffect, useState } from 'react';
import { fetchUsers, incrementNombreTickets, addDefi } from '../../4-utils/firebase.utils';
import './admin.styles.scss';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // States pour le formulaire de défi
  const [defiName, setDefiName] = useState('');
  const [defiDescription, setDefiDescription] = useState('');
  const [defiPoints, setDefiPoints] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const userList = await fetchUsers();
      setUsers(userList);
    }
    fetchData();
  }, []);

  const filteredUsers = users.filter(user => {
    const fullName = `${user.prenom || ''} ${user.nom || ''}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

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

  const handleAddDefi = async (e) => {
    e.preventDefault();

    if (!defiName || defiPoints <= 0) {
      setMessage('Veuillez remplir tous les champs correctement.');
      return;
    }

    const newDefi = {
      name: defiName,
      description: defiDescription,
      points: parseInt(defiPoints)
    };

    const success = await addDefi(newDefi);

    if (success) {
      setMessage('Défi ajouté avec succès !');
      setDefiName('');
      setDefiDescription('');
      setDefiPoints(0);
    } else {
      setMessage('Erreur lors de l\'ajout du défi.');
    }
  };

  return (
    <div className="admin">
      <h2>Liste des utilisateurs</h2>

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
            <div
              className='add'
              onClick={() => handleIncrementTickets(user.id, user.nombreTickets || 0, 2)}
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
