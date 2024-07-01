import "./PokemonKaart.css";
import React from 'react';
import Capitalize from "../helpers/Capitalize.jsx";

const PokemonKaart = ({ name, sprites, moves, weight, abilities }) => {
    return (
        <div className="pokemon-kaart">
            <h2><Capitalize text={name} /></h2>
            {sprites && <img src={sprites.front_default} alt={name} />}
            <p>Moves: {moves.length}</p>
            <p>Weight: {weight}</p>
            <p>Abilities:</p>
            <ul>
                {abilities && abilities.map((ability, index) => (
                    <li key={index}>{ability.ability.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default PokemonKaart;
