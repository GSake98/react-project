import React from 'react'
import {useTranslation} from "react-i18next";

const MovieCard = ({movie: {title, vote_average, vote_count, poster_path, release_date, original_language}}) => {
    const {t} = useTranslation();
    return (
        original_language === 'en' &&
        <div className="movie-card">
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'} alt={title}/>
            <div className="mt-4">
                <h3>{title}</h3>
                <div className="content">
                    <div className="rating">
                        <img src="/star.svg" alt="star" />
                        <p>{vote_average ? vote_average.toFixed(1) + ' ': 'N/A '}
                            {'(' + vote_count + ')' + ' ' + (t('votes'))} </p>
                    </div>

                    <span>•</span>
                    <p className="lang"> {original_language} </p>
                    <span>•</span>
                    <p className="year"> {release_date.split('-')[0]} </p>
                </div>
            </div>
        </div>
    )
}
export default MovieCard
