import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
    };
    return (
        <div className="language-selector">
            <select onChange={ changeLanguage} value={i18n.language}>
                <option value="en">English</option>
                <option value="gr">Ελληνικά</option>
            </select>
        </div>
    );
};

export default LanguageSelector;