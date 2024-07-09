import { useState } from "react";
import "../styles/Square.css"

export default function Square({value, onSquareClick}) {
    return (
        <button 
            className={value ? `square ${value}` : "square"}
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}