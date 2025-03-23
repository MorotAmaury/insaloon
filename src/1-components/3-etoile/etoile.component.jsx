import './etoile.styles.scss'

const Etoile = ({text, couleur}) => {
    return (
    <div className='etoile'>
            <svg width="100" height="100" viewBox="0 0 300 300">
            
            <polygon 
            points="150,20 
                    180,100 
                    270,100 
                    200,160 
                    230,250 
                    150,200 
                    70,250 
                    100,160 
                    30,100 
                    120,100"
            fill={couleur || 'white'}
            stroke="black" 
            stroke-width="1" 
            stroke-linejoin="round"
            filter="drop-shadow(2px 4px 4px rgba(0,0,0,0.4))"
            />

            <circle cx="150" cy="20" r="12" fill={couleur || 'white'} stroke="black" stroke-width="1" />
            <circle cx="270" cy="100" r="12" fill={couleur || 'white'} stroke="black" stroke-width="1" />
            <circle cx="230" cy="250" r="12" fill={couleur || 'white'} stroke="black" stroke-width="1" />
            <circle cx="70" cy="250" r="12" fill={couleur || 'white'} stroke="black" stroke-width="1" />
            <circle cx="30" cy="100" r="12" fill={couleur || 'white'} stroke="black" stroke-width="1" />

            <text x="150" y="155" text-anchor="middle" fill="#333" font-family="Courier New, monospace" font-weight="bold" font-size="50">{text}</text>

        </svg>
      </div>
    
    )
}

export default Etoile;