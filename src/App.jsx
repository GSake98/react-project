import React, {useEffect, useState} from 'react'
import {useDebounce} from 'react-use'
import {Trans, useTranslation} from "react-i18next";
import Search from "./components/search.jsx";
import Spinner from "./components/spinner.jsx";
import MovieCard from "./components/movieCard.jsx";
import Platform from "./components/platform.jsx";
import LanguageButton from "./components/languageButton.jsx";

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    }
}

const App = () => {
    const {t} = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    useDebounce(() =>
        setDebouncedSearchTerm(searchTerm), 500, [searchTerm]
    );

    const fetchMovies = async (query = '') => {
        setLoading(true);
        setErrorMessage('');
        try {
            let url = query
            ?`${API_URL}/search/movie?query=${encodeURIComponent(query)}`
            :`${API_URL}/discover/movie?sort_by=popularity.desc`;
            let response = await fetch(url, API_OPTIONS);

            if(!response.ok) {
                setErrorMessage(t('error.generic'));
            }

            let data = await response.json();

            if(data.Response === 'False') {
                setErrorMessage(t('error.fetchMovies'));
                setMovieList([]);
                return;
            }

            setMovieList(data.results || []);

        } catch (e) {
            setErrorMessage(t('error.generic'));
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    // Run On-App init
    useEffect(() => {
        fetchMovies(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    return (
        <main>
            <Platform />
            <div className="pattern"></div>
            <div className="wrapper">
                <LanguageButton></LanguageButton>
                <header>
                    <img src="/hero.png" alt="Hero Banner"/>
                    <h1>
                        <Trans i18nKey="headline" components={{ gradient: <span className="text-gradient" /> }}/>
                    </h1>
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                </header>
                <section className="all-movies" style={{marginTop: '30px'}}>
                    <h2>
                        <Trans i18nKey="allMovies"/>
                        {errorMessage && <p className="text-red-500">{errorMessage}</p> }
                    </h2>
                    {loading ? (
                        <Spinner />
                        ) : errorMessage ? (
                            <p className="text-red-500">{errorMessage}</p>
                        ) : <ul className="movie-list" style={{marginTop: '50px'}}>
                        {movieList.map((movie) => (
                            <MovieCard key={movie.id} movie={movie}/>
                    ))}</ul>
                    }
                </section>
            </div>
        </main>
    )
}
export default App
