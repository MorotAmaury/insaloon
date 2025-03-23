import './defis-card.styles.scss';
import imageUrl from '../cowboy.png';
const DefisCard = ({ defi }) => {
  const { name,  points } = defi;

  return (
    <div className='defis-card valider'>
      <div className='defis-card-header'>
        <h2>{name}</h2>
      </div>

      <div className='defis-card-image'>
        <img
          src={imageUrl}
          alt='Défi illustration'
        />
      </div>

      <div className='defis-card-footer'>
        <p className='prime'>{points} <i className='fa-solid fa-ticket'></i></p>
      </div>
      <div className='complete'>Fais 0 fois !</div>
    </div>
  );
};

export default DefisCard;
