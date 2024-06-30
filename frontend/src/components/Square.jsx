import { useState } from "react";
import "../styles/Square.css"

export default function Square({value, onSquareClick}) {
    return <button 
            className="square"
            onClick={onSquareClick}
        >
            {value}
        </button>;
}