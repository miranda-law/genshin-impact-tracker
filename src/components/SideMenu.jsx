import React from 'react';

const SideMenu = ({ onSelectPage }) => {
  return (
    <div className="side-menu">
      <h2>Genshin Impact App</h2>
      <ul>
        <li onClick={() => onSelectPage('Dashboard')}>Dashboard</li>
        <li onClick={() => onSelectPage('Characters')}>Characters</li>
        <li onClick={() => onSelectPage('Weapons')}>Weapons</li>
      </ul>
    </div>
  );
};

export default SideMenu;