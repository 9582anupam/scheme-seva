import React from 'react';

const Header = ({ schemeName, schemeShortTitle }) => {
    return (
        <header className="border-b border-gray-100 pb-6">
            <h1 className="text-4xl font-bold mb-3 text-gray-900">{schemeName}</h1>
            {schemeShortTitle && (
                <p className="text-gray-500 text-lg">({schemeShortTitle})</p>
            )}
        </header>
    );
};

export default Header;
