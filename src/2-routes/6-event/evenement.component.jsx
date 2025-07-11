import './evenement.styles.scss';

const evenements = [
  {
    nom: "S0",
    description: "Une semaine zéro pour découvrir l’INSA, se repérer sur le campus et faire connaissance avant la rentrée officielle."
  },
  {
    nom: "Integr'INSA",
    description: "Le grand jeu d’intégration ! Un enchaînement d’épreuves loufoques pour souder ta promo et représenter ta famille."
  },
  {
    nom: "TMS",
    description: "Tournoi Multi-Sport réunissant toutes les familles pour une compétition bon enfant sur les terrains du campus."
  },
  {
    nom: "Outside",
    description: "Une journée en plein air avec des activités chill ou sportives selon ton mood. Soleil, fun et musique au programme."
  },
  {
    nom: "Barathon",
    description: "Une tournée mythique des bars de la ville dans une ambiance festive, déguisée et inoubliable."
  },
  {
    nom: "Melting Pote",
    description: "Une soirée culturelle et culinaire pour découvrir les origines et spécialités de tous les étudiants de l’INSA."
  },
  {
    nom: "Soiree Boite",
    description: "La grosse soirée en boîte organisée rien que pour vous, ambiance garantie jusqu’au bout de la nuit."
  },
  {
    nom: "WEI",
    description: "Le Week-End d’Intégration : deux jours hors du temps avec toute la promo pour des souvenirs à vie."
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
