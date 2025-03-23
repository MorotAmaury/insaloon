import { useEffect, useState } from 'react';
import { fetchDefis } from '../../4-utils/firebase.utils';
import DefisCard from './defis-card/defis-card.component';
import './defis.styles.scss';

const Defis = () => {
  const [defis, setDefis] = useState([]);

  useEffect(() => {
    const recupDefis = async () => {
        const listeDefis = await fetchDefis()
        console.log(listeDefis);
        setDefis(listeDefis)
    }
    recupDefis()
    
}, []);

  return (
    <div className='defis'>
      <h1 className='title'>Défis</h1>
      <div className='defis-container'>
        {defis.length === 0 ? (
          <p>Chargement des défis...</p>
        ) : (
          defis?.map(defi => (
            <DefisCard key={defi.id} defi={defi} />
          ))
        )}
      </div>
    </div>
  );
};

export default Defis;
