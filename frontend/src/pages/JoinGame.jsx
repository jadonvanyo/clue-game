import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css";

export default function JoinGame() {
    const [room, setRoom] = useState('');
    const navigate = useNavigate(); // Set navigate

    const handleClick = () => {
        navigate(`/room/${room}`);
    };

    return (
        <div className="form-container">
            <input
                className="form-input"
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Enter room name"
            />
            <button className="form-button" onClick={handleClick}>Join Room</button>
        </div>
    )
}