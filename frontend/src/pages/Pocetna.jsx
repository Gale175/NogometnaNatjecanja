import React from 'react';
import nogometnaPozadina from '../assets/nogometna_pozadina.jpeg';
import '../App.css';


export default function Pocetna() {
    const backgroundStyle = {
        backgroundImage: `url(${nogometnaPozadina})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '80vh',
        width: '84vw'
    };

    return (
        <div style={backgroundStyle}>
            <p style={{ color: 'white', fontSize: '25px' }}>
                Dobrodošli na moju aplikaciju
            </p>
            <p style={{ color: 'white', fontSize: '15px' }}>
                ⚽️ za nogometne sladokusce! ⚽️
            </p>
        </div>
    );
}