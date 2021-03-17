import {useState, useEffect} from 'react'

import './Card.css'
const Card = ({code, image, suit, val}) => {
    const [degree, setDegree] = useState(0)
    useEffect( () => {
        // get random degreas from 0 to 60
        const degreas = Math.floor(Math.random() * 60)
        
        
        setDegree(degreas - 60)
    },[])
    return (
        <div className="Card">
            <img style={{transform: `rotate(${degree}deg)`}} alt={code} src={image} />
        </div>
    )
}

export default Card;