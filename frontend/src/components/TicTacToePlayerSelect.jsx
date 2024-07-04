import { useState } from 'react';

const TicTacToePlayerSelect = ({ onSelect, playerX, playerO }) => {
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    const handleSelect = (choice) => {
        setSelectedPlayer(choice);
        onSelect(choice);
    };

    return (
        <div>
            <h2>Select Your Player</h2>
            <button onClick={() => handleSelect('X')} disabled={playerX}>Play as X</button>
            <button onClick={() => handleSelect('O')} disabled={playerO}>Play as O</button>
            {playerX && <p>X: {playerX}</p>}
            {playerO && <p>O: {playerO}</p>}
        </div>
    );
};

export default TicTacToePlayerSelect;