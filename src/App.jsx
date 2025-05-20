import React, {useEffect, useState} from 'react'
import {Trans, useTranslation} from "react-i18next";
import Search from "./components/search.jsx";
import LanguageSelector from './components/languageselector.jsx';
import './components/languageselector.css';

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
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const {t} = useTranslation();

    const fetchMovies = async () => {
        try {
            let url = `${API_URL}/discover/movie?sort_by=popularity.desc`;
            let response = await fetch(url, API_OPTIONS);

            if(!response.ok) {
                setErrorMessage(t('error.generic'));
            }

            let data = await response.json();

            if(data.Response === 'False') {
                setErrorMessage(t('error.fetchMovies'));
            }

            console.log(data);
        } catch (e) {
            setErrorMessage(t('error.generic'));
            console.error(e);
        }
    };

    // On App Init
    useEffect(() => {
        fetchMovies();
    }, );

    return (
        <main>
            <div><LanguageSelector /></div>
            <div className="pattern"></div>
            <div className="wrapper">
                <header>
                    <img src="/hero.png" alt="Hero Banner"/>
                    <h1>
                        <Trans i18nKey="headline" components={{ gradient: <span className="text-gradient" /> }}/>
                    </h1>
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                </header>
                <section className="all-movies" style={{paddingTop: '20px'}}>
                    <h2>
                        <Trans i18nKey="allMovies"/>
                        {errorMessage && <p className="text-red-500">{errorMessage}</p> }
                    </h2>
                </section>
            </div>
        </main>
    )
}
export default App
