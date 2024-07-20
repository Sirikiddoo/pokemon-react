import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonKaart from './components/PokemonKaart.jsx';

function App() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pokemon, setPokemon] = useState([]);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        let isMounted = true;

        const fetchPokemon = async () => {
            try {
                setLoading(true);
                const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`;
                const response = await axios.get(url);
                const pokemonList = response.data.results;

                const pokemonDetailsPromises = pokemonList.map(poke => axios.get(poke.url));
                const pokemonDetails = await Promise.all(pokemonDetailsPromises);

                if (isMounted) {
                    const detailedPokemonData = pokemonDetails.map(detail => detail.data);
                    setPokemon(detailedPokemonData);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchPokemon();

        return () => {
            isMounted = false;
        };
    }, [offset]);

    const handleNext = () => {
        setOffset(prevOffset => prevOffset + 20);
    };

    const handlePrevious = () => {
        setOffset(prevOffset => Math.max(prevOffset - 20, 0));
    };

    return (
        <div className="App">
            <article className="top-content">
                <img src={"https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"} alt={"Pokémon logo"} />
                <div className="button-container">
                    <button onClick={handlePrevious} disabled={offset === 0}>Previous</button>
                    <button onClick={handleNext}>Next</button>
                </div>
            </article>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {pokemon.length > 0 && (
                <div className="pokemon-container">
                    {pokemon.map((poke, index) => (
                        <PokemonKaart
                            key={index}
                            name={poke.name}
                            sprites={poke.sprites}
                            moves={poke.moves}
                            weight={poke.weight}
                            abilities={poke.abilities}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
