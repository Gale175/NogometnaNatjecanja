
export default function Pocetna() {
    const backgroundStyle = {
        backgroundImage: 'url(/nogometna_pozadina.jpeg)',
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