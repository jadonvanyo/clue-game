import Room from "./Room";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JoinGame() {
    const [room, setRoom] = useState('');
    const navigate = useNavigate(); // Set navigate

    const handleClick = () => {
        console.log(room);
        navigate(`/room/${room}`);
    };

    return (
        <div>
            <input
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Enter room name"
            />
            <button onClick={handleClick}>Join Room</button>
        </div>
    )
}