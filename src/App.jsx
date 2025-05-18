import React from 'react'
import {useTranslation} from "react-i18next";

const App = () => {
    const {t} = useTranslation();

    return (
        <main>
            <div className="pattern"></div>
            <div className="wrapper">
                <header>
                    <h1>{t('headline')}</h1>
                </header>
            </div>
        </main>
    )
}
export default App
