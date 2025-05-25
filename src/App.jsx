import React, {useEffect, useState} from 'react'
import {useDebounce} from 'react-use'
import {Trans, useTranslation} from "react-i18next";
import Search from "./components/search.jsx";
import Spinner from "./components/spinner.jsx";
import MovieCard from "./components/movieCard.jsx";
import Platform from "./components/platform.jsx";
import LanguageButton from "./components/languageButton.jsx";
import {getTrendingMovies, updateSearchCount} from "./appwrite.js";

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
    const [trendingMovies, setTrendingMovies] = useState([]);
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

            if(query !== '' && data.results.length > 0){
                await updateSearchCount(query, data.results[0]);
            }

        } catch (e) {
            setErrorMessage(t('error.generic'));
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const loadTrendingMovies = async () => {
        try {
            let movies = await getTrendingMovies();
            setTrendingMovies(movies);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    // Run On-App init
    useEffect(() => {
        fetchMovies(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    useEffect(() => {
        loadTrendingMovies();
    }, [])

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
                {trendingMovies.length > 0 && <section className="trending">
                    <h2>
                        <Trans i18nKey="trending"/>
                    </h2>
                    <ul className="movie-list">
                        {trendingMovies.map((movie, index) => (
                            <li key={movie.$id}>
                                {index === 0 ?
                                    <p className="text-yellow-100">{index + 1}</p>
                                    : index === 1 ?
                                    <p className="text-gray-500">{index + 1}</p>
                                    : index === 2 ?
                                    <p className="text-amber-900">{index + 1}</p>
                                : <p className="text-gray-900" >{index + 1}</p>}
                                <img style={{marginLeft: '10px'}} src={movie.poster_url} alt={movie.title}/>
                            </li>
                        ))}
                    </ul>
                </section>}

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
