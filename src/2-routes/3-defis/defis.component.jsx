import DefisCard from './defis-card/defis-card.component'
import './defis.styles.scss'

const Defis = () => {
    return (
        <div className='defis'>
            <h1 className='title'>Defis</h1>
            <div className='defis-container'>
                <DefisCard defi={{name: 'Defi 1', description: 'Description du defi Description du defi Description du defi Description du defi Description du def Description du defi ', points: 5}}/>
                <DefisCard defi={{name: 'Defi 2', description: 'Description du defi Description du defi Description du defi Description du defi Description du def Description du defi ', points: 5}}/>
                <DefisCard defi={{name: 'Defi 3', description: 'Description du defi Description du defi Description du defi Description du defi Description du def Description du defi ', points: 5}}/>
                <DefisCard defi={{name: 'Defi 4', description: 'Description du defi Description du defi Description du defi Description du defi Description du def Description du defi ', points: 5}}/>
                <DefisCard defi={{name: 'Defi 5', description: 'Description du defi Description du defi Description du defi Description du defi Description du def Description du defi ', points: 5}}/>
                <DefisCard defi={{name: 'Defi 6', description: 'Description du defi Description du defi Description du defi Description du defi Description du def Description du defi ', points: 5}}/>
            </div>
        </div>
    )
}

export default Defis