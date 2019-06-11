import React from 'react';

// Components
import Logo from './Logo/Logo';
import UserArea from './UserArea/UserArea';

import './Header.css';

const Header = () => (
    <div className="header">
    <Logo />
        <h1> My App´s Name</h1>
    <UserArea />   
    </div>
);

export default Header;