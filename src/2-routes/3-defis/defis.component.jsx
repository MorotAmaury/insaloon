import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../4-utils/firebase.utils';
import { fetchDefis, fetchUserById } from '../../4-utils/firebase.utils';
import DefisCard from './defis-card/defis-card.component';
import './defis.styles.scss';

const Defis = () => {
  const [defis, setDefis] = useState([]);
  const [userId, setUserId] = useState(null);
  const [defisValider, setDefisValider] = useState([]);

  // 🔑 Auth listener pour récupérer l'user ID
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('Utilisateur connecté:', user.uid);
        setUserId(user.uid);
      } else {
        console.log('Aucun utilisateur connecté');
        setUserId(null);
      }
    });

    return () => unsubscribe(); // Clean up
  }, []);

  // 📥 Récupération des défis et données user (défis validés)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const defisData = await fetchDefis();
        setDefis(defisData);

        if (userId) {
          const userData = await fetchUserById(userId);
          setDefisValider(userData?.defisValider || []);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  return (
    <div className='defis'>
      <h1 className='title'>Défis</h1>

      {!userId && <p className="error-message">Veuillez vous connecter pour voir vos défis.</p>}

      <div className='defis-container'>
        {defis.map(defi => (
          <DefisCard
            key={defi.id}
            defi={defi}
            valider={defisValider.includes(defi.id)}
          />
        ))}
      
      </div>
    </div>
  );
};

export default Defis;
