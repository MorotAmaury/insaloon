import './evenement.styles.scss';

const evenements = [
  {
    nom: "S0",
    description: "Le premier événement de l’intégration, où tu pourras découvrir pour la première fois tes futurs amis et camarades de promotion !",
    date: "Du 1 au 4 septembre"
  },
  {
    nom: "Integr'INSA",
    description: "Lors de cet événement, tu seras en compétition avec les autres classes, avec pour objectif de décrocher le titre de meilleure promotion.",
    date: "5 septembre"
  },
  {
    nom: "TMS",
    description: "Tournoi Multi-Sport qui se déroule lors d’un après-midi au stade, une occasion parfaite pour rencontrer de nouvelles personnes à travers des activités originales et sportives.",
    date: "11 septembre"
  },
  {
    nom: "Outside",
    description: "Un événement en plein centre-ville de Rouen qui dure tout l’après-midi, où ton équipe affrontera d’autres groupes dans des duels épiques !",
    date: "13 septembre"
  },
  {
    nom: "Battle Cook",
    description: "Tu aimes cuisiner ? Te challenger ? alors le battleCook est fais pour toi !",
    date: "17 septembre"
  },
  {
    nom: "Rodeo",
    description: "Une initiation à l’équitation toute l’après-midi !",
    date: "18 septembre"
  },
  {
    nom: "Barathon",
    description: "Une tournée des bars de Rouen, l’occasion idéale pour découvrir les lieux incontournables, s’amuser et surtout rencontrer du monde !",
    date: "19 septembre"
  },
  {
    nom: "Soirée Boite",
    description: "Rendez-vous le 26 septembre pour la boite d'inté !",
    date: "26 septembre"
  },
  {
    nom: "WEI",
    description: "Le Week-End d’Intégration : deux jours hors du temps avec toute la promo pour créer des souvenirs inoubliables.",
    date: "4 et 5 octobre"
  }
];


export default function Evenements() {
  return (
    <div className="evenements-container">
      <h2 className="title">Les Événements de l'Inté</h2>
      <div className="events-list">
        {evenements.map((event, index) => (
          <div key={event.nom} className={`event-block ${index % 2 === 0 ? 'left' : 'right'}`}>
            <h3 className="event-title">{event.nom}</h3>
            <p className="event-desc">{event.description}</p>
            <p className='event-date'>{event.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
