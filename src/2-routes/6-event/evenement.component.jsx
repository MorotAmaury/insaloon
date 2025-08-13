import './evenement.styles.scss';

const evenements = [
  {
    nom: "S0",
    description: "Le premier événement de l’intégration, où tu pourras découvrir pour la première fois tes futurs amis et camarades de promotion !"
  },
  {
    nom: "Integr'INSA",
    description: "Lors de cet événement, tu seras en compétition avec les autres classes, avec pour objectif de décrocher le titre de meilleure promotion."
  },
  {
    nom: "TMS",
    description: "Tournoi Multi-Sport qui se déroule lors d’un après-midi au stade, une occasion parfaite pour rencontrer de nouvelles personnes à travers des activités originales et sportives."
  },
  {
    nom: "Outside",
    description: "Un événement en plein centre-ville de Rouen qui dure tout l’après-midi, où ton équipe affrontera d’autres groupes dans des duels épiques !"
  },
  {
    nom: "Barathon",
    description: "Une tournée des bars de Rouen, l’occasion idéale pour découvrir les lieux incontournables, s’amuser et surtout rencontrer du monde !"
  },
  {
    nom: "WEI",
    description: "Le Week-End d’Intégration : deux jours hors du temps avec toute la promo pour créer des souvenirs inoubliables."
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
          </div>
        ))}
      </div>
    </div>
  );
}
