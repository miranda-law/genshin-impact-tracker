import React, { useState } from 'react';
import characterData from '../data/characters.json';
import './Characters.css';

const WEAPON_TYPES = ['bow', 'catalyst', 'claymore', 'polearm', 'sword'];
const ELEMENT_TYPES = ['anemo', 'cryo', 'electro', 'geo', 'hydro', 'pyro'];

const Characters = ({ onSelectCharacter }) => {
  // create filters
  const [selectedWeapon, setSelectedWeapon] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleWeaponFilter = (weaponType) => {
    setSelectedWeapon(prev => (prev === weaponType ? null : weaponType));
  };
  
  const handleElementFilter = (elementType) => {
    setSelectedElement(prev => (prev === elementType ? null : elementType));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const filteredCharacters = characterData
    .filter(character => selectedWeapon ? character.weaponType.toLowerCase() === selectedWeapon : true)
    .filter(character => selectedElement ? character.element.toLowerCase() === selectedElement : true)
    .filter(character => searchTerm ? character.name.toLowerCase().includes(searchTerm.toLowerCase()) : true);

  return (
    <div>
      {/* title of page */}
      <h1>Characters</h1>

      {/* filter menus */}
      <div className="filter-menus-container">

        <div className="left-filters">

          {/* weapon filter menu */}
          <div className="weapon-filter-menu">
            {WEAPON_TYPES.map(weapon => (
              <div
                key={weapon}
                className={`filter-option ${selectedWeapon === weapon ? 'active' : ''}`}
                onClick={() => handleWeaponFilter(weapon)}
              >
                <img 
                  src={require(`../assets/weapon-type-icons/${weapon}.png`)} 
                  alt={weapon} 
                  className="filter-icon"
                />
              </div>
            ))}
          </div>

          {/* element filter menu */}
          <div className="element-filter-menu">
            {ELEMENT_TYPES.map(element => (
              <div
                key={element}
                className={`filter-option ${selectedElement === element ? 'active' : ''}`}
                onClick={() => handleElementFilter(element)}
              >
                <img 
                  src={require(`../assets/element-icons/${element}.png`)} 
                  alt={element} 
                  className="filter-icon"
                />
              </div>
            ))}
          </div>

        </div>
        
        {/* search filter */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search Characters..."
            className="search-bar"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <button onClick={clearSearch} className="clear-search-btn">
              &times;
            </button>
          )}
        </div>

      </div>
      
      {/* character grid */}
      <div className="character-grid">

        {filteredCharacters.map((character) => {

          // image urls 
          const imageUrl = require(`../assets/char-icons/${character.image}`);
          const weaponIconUrl = require(`../assets/weapon-type-icons/${character.weaponType}.png`);
          const elementIconUrl = require(`../assets/element-icons/${character.element}.png`);
          
          // dynamicaly change character background based on quality
          let backgroundStyle = {};
          if (character.quality === '5') {
            backgroundStyle.backgroundImage = `url(${require('../assets/backgrounds/5star-gold.png')})`;
          } else if (character.quality === '4') {
            backgroundStyle.backgroundImage = `url(${require('../assets/backgrounds/4star-purple.png')})`;
          }

          // character square
          return (
            <div 
              key={character.id} 
              className="character-card" 
              onClick={() => onSelectCharacter(character)}>

              <div className="weapon-type-icon">
                <img src={weaponIconUrl} alt={character.weaponType} />
              </div>
              <div className="element-type-icon">
                <img src={elementIconUrl} alt={character.element} />
              </div>

              <div className="image-background-container" style={backgroundStyle}>
                <img src={imageUrl} alt={character.name} className="character-image" />
              </div>

              <h3>{character.name}</h3>
              
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Characters;