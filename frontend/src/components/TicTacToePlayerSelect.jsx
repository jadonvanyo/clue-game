import { useState } from 'react';

const TicTacToePlayerSelect = ({ onSelect }) => {
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    const handleSelect = (choice) => {
        setSelectedPlayer(choice);
        onSelect(choice);
    };

    return (
        <div>
            <h2>Select Your Player</h2>
            <button onClick={() => handleSelect('X')}>Play as X</button>
            <button onClick={() => handleSelect('O')}>Play as O</button>
            {selectedPlayer && <p>You selected: {selectedPlayer}</p>}
        </div>
    );
};

export default TicTacToePlayerSelect;