import React from 'react';

const Capitalize = ({ text }) => {
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return <>{capitalizeFirstLetter(text)}</>;
};

export default Capitalize;
