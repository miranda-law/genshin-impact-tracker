import React from 'react';
import characterData from '../data/characters.json';

const Characters = () => {
  return (
    <div>
      <h1>Characters</h1>

      <div className="character-grid">

        {characterData.map((character) => {

          const imageUrl = require(`../assets/char-icons/${character.image}`);
          const weaponIconUrl = require(`../assets/weapon-type-icons/${character.weaponType}.png`);
          const elementIconUrl = require(`../assets/element-icons/${character.element}.png`);

          let backgroundStyle = {};
          
          // dynamicaly change character background based on quality
          if (character.quality === '5') {
            backgroundStyle.backgroundImage = `url(${require('../assets/backgrounds/5star-gold.png')})`;
          } else if (character.quality === '4') {
            backgroundStyle.backgroundImage = `url(${require('../assets/backgrounds/4star-purple.png')})`;
          }


          return (
            <div 
              key={character.id} className="character-card">

              <img src={weaponIconUrl} alt={character.weaponType} className="weapon-type-icon" />
              <img src={elementIconUrl} alt={character.element} className="element-type-icon" />

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