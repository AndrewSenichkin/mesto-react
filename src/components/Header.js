import React from 'react';
import logo from '../image/Vector-mesto.svg';

function Header() {
    return (
    <header className="header">
        <img className="header__logo" src={logo} alt="Место-России"/>
    </header>
    );
}

export default Header;