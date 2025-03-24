import { useEffect, useState } from 'react';
import './classement.styles.scss'
import { getClassemement } from '../../4-utils/firebase.utils';
import Etoile from '../../1-components/3-etoile/etoile.component';

const Classement = () => {
  const [users, setUsers] = useState([]);
  
    
    useEffect(() => {
      const fetchData = async () => {
        const userList = await getClassemement();
        setUsers(userList);
        console.log(userList);
        
        for (let index = 0; index < userList.length; index++) {
            const element = userList[index];
            element.classement = index + 1;
            console.log(userList[index], index + 1);
            
        }
      }
      fetchData()
    }, []);

    return (
      <div className="classement-container">  
      <div className='podium'>
        <div className='second'>
            <Etoile text={users[1]?.classement} couleur='silver'/>
            <p className='name'>{users[1]?.prenom}</p>
            <p className='name'>{users[1]?.nom}</p>
            <p className='tickets'><i className='fa-solid fa-ticket'></i> {users[1]?.nombreTickets}</p>
        </div>
        <div className='first'>
            <Etoile text={users[0]?.classement} couleur='gold'/>
            <p className='name'>{users[0]?.prenom}</p>
            <p className='name'>{users[0]?.nom}</p>
            <p className='tickets'><i className='fa-solid fa-ticket'></i> {users[0]?.nombreTickets}</p>
        </div>
        <div className='third'>
            <Etoile text='3' couleur='#cd7f32'/>
            <p className='name'>{users[2]?.prenom}</p>
            <p className='name'>{users[2]?.nom}</p>
            <p className='tickets'><i className='fa-solid fa-ticket'></i> {users[2]?.nombreTickets}</p>
        </div>
      </div>
      <div className="user-card-container">
        {users.slice(3).map(user => (
          <div key={user.id} className="user-card">
            <div className='info'>
                <Etoile text={user.classement}/>
                <p> {user.prenom || 'N/A'}</p>
                <p>{user.nom || 'N/A'}</p>
            </div>
            <p className='ticket'><i className='fa-solid fa-ticket'></i> {user.nombreTickets || 0}</p>
          
          </div>
        ))}
      
      </div>
    </div> 
    );
}

export default Classement;