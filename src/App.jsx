import React, {useState} from 'react'
import {Trans} from "react-i18next";
import Search from "./components/search.jsx";

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <main>
            <div className="pattern"></div>
            <div className="wrapper">
                <header>
                    <img src="public/hero.png" alt="Hero Banner"/>
                    <h1>
                        <Trans i18nKey="headline" components={{ gradient: <span className="text-gradient" /> }}/>
                    </h1>
                </header>

                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                <h1 className="text-white">{searchTerm}</h1>
            </div>
        </main>
    )
}
export default App
