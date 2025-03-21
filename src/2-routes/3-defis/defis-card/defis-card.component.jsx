import './defis-card.styles.scss'


const DefisCard = ({defi}) => {
    const {name, description, points} = defi
    return (
        <div className='defis-card'>
            <h2 className='card-title'>{name}</h2>
            <p className='card-description'>{description}</p>
            <p className='card-reward'>{points} Tickets</p>
    </div>

    )
}

export default DefisCard