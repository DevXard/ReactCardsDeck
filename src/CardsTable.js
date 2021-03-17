import {useState, useEffect, useRef} from 'react';
import axios from 'axios'
import Card from './Card';
import './CardsTable.css'

const CardsTable = () => {
    const [deck, setDeck] = useState({
        deckId: '',
        cards: []
    })
    const [draw, setDraw] = useState(false)
    const interval = useRef(null)

    useEffect(() => {
        const getDeck = async () => {
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/new/`)
            setDeck(data => ({...data, deckId: res.data.deck_id }))
        }
        getDeck()
    },[])
    useEffect(() => {
        const drawCard = async () => {
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deckId}/draw/?count=1`)
            if(res.data.remaining === 0) setDraw(draw => !draw)
            setDeck(data => ({deckId: data.deckId, cards: [...data.cards, ...res.data.cards]}))
        }
        
        if(draw && !interval.current) {
            interval.current = setInterval( async () => {
                await drawCard()
            },1000)
            
        }
    
        return () => {
            clearInterval(interval.current);
            interval.current = null;
        }

        
    },[draw, deck.cards, interval])
    
    const toggleDraw = () => {
        setDraw(draw => !draw)
    }
    console.log(draw)
    
    return (
        <div className="CardTable">
            {draw ? <button onClick={toggleDraw}>Stop Drawing</button> : <button onClick={toggleDraw}>Start Drawing</button>}
            
            <div className="CardsTable-card">
            {deck.cards.map(card => <Card key={`${card.code} ${card.suit}`} code={card.code} image={card.image} suit={card.suit} val={card.val} />)}
            </div>
        </div>
    )
}

export default CardsTable;

// {deck.cards.length !== 52 && <button onClick={drawCard} >Draw</button>}