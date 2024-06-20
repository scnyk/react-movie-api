import React from 'react';
import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';


//  key = c208b8ff

import './App.css';
// import SearchIcon from './search.svg';


const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=c208b8ff'

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        searchMovies('');
    },[]);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search)        
    }

    return(
        <div className="app">
            <h1>React Movie API Project</h1>
            <div className="search">
                <input 
                    placeholder="Search for Movies..."
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                    onKeyDown={(e)=> {
                        if (e.key === "Enter") {
                            alert("entered");
                            searchMovies(searchTerm);
                        }
                    }}
                />
                <img src="https://raw.githubusercontent.com/gist/adrianhajdin/997a8cdf94234e889fa47be89a4759f1/raw/f13e5a9a0d1e299696aa4a0fe3a0026fa2a387f7/search.svg"
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>
            {
                movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie)=>(
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No Movies Found</h2>
                    </div>
                )

            }
            
        </div>
    )
}

export default App;