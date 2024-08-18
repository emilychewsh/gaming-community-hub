import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function GamePage() {
    const [gameData, setGameData] = useState(null)
    
    //fetch game data from API
    useEffect(() => {
        fetch('http://localhost:4000/games')
        .then((resp) => resp.json())
        .then((data)=> {
            setGameData(data)
            console.log(data)
        })
    }, [gameData])

    
}
