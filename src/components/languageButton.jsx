import React, {useState} from 'react';
import {useDebounce} from 'react-use'
import i18n from 'i18next';

const LanguageButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const languages = [
        {name: 'English', code: "en", flag: "uk-flag.png"},
        {name: 'Greek', code: "gr", flag: "gr-flag.png"}
    ];
    const currentLang = languages.find(lang => lang.code === selectedLanguage);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const selectLanguage = (lang) => {
        setSelectedLanguage(lang);
        setIsOpen(false);
    };

    useDebounce(() => {
        if (selectedLanguage) {
            i18n.changeLanguage(selectedLanguage);
        }
    }, 200, [selectedLanguage]);

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className="px-4 py-2 bg-blue-900 text-white rounded-lg shadow hover:bg-blue-950 transition"
            >
                <img src={currentLang.flag} alt={currentLang.name} className="w-8 h-8 rounded-full" />
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-2 w-40 bg-blue-900 border border-blue-950 rounded-lg shadow-lg">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => selectLanguage(lang.code)}
                            className="block w-full text-left px-4 py-3 hover:bg-blue-950"
                        >
                            <img src={lang.flag} alt={lang.name} className="w-6 h-6 rounded-full"></img>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageButton;
