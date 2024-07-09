import "../styles/TicTacToePlayerSelect.css"

const TicTacToePlayerSelect = ({ onSelect, playerX, playerO }) => {

    const handleSelect = (choice) => {
        onSelect(choice);
    };

    return (
        <div className="player-select-container">
            <h2>Select Your Player</h2>
            <div className="player-button-container">
                <button className="x-button" onClick={() => handleSelect('X')} disabled={playerX}>Play as X</button>
                <button className="o-button" onClick={() => handleSelect('O')} disabled={playerO}>Play as O</button>
            </div>
            {playerX && <p>Player "X": {playerX}</p>}
            {playerO && <p>Player "O": {playerO}</p>}
        </div>
    );
};

export default TicTacToePlayerSelect;