import React, { useState } from 'react';
import './CharacterDetails.css';

const TABS = ['Details', 'Weapon', 'Talents', 'Artifacts'];

// helper function to capitalize first letter of a string
const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const CharacterDetails = ({ character, progressData, onUpdateProgress }) => {
  // state for managing selected tab
  const [activeTab, setActiveTab] = useState('Details');

  // file path to character icon image
  const imageUrl = require(`../assets/char-icons/${character.image}`);

  // state for managing editable level field
  const [isEditingLevel, setIsEditingLevel] = useState(false);
  const [editableLevel, setEditableLevel] = useState('');

  // state for managing editable constellation field
  const [isEditingConstellation, setIsEditingConstellation] = useState(false);
  const [editableConstellation, setEditableConstellation] = useState('');

  // find progess data for selected character
  const characterProgress = progressData.find(p => p.id === String(character.id));

  // Handle saving the new level -- only 1 to 90
  const handleSaveLevel = () => {
    const newLevel = parseInt(editableLevel, 10);
    if (newLevel >= 1 && newLevel <= 90) {
      const newProgressData = progressData.map(p => 
        p.id === String(character.id) ? { ...p, level: String(newLevel) } : p
      );
      onUpdateProgress(newProgressData);
    }
    setIsEditingLevel(false);
  };

  // Handle saving the new constellation -- only 0 to 6
  const handleSaveConstellation = () => {
    const newConstellation = parseInt(editableConstellation, 10);
    if (newConstellation >= 0 && newConstellation <= 6) {
      const newProgressData = progressData.map(p => 
        p.id === String(character.id) ? { ...p, constellation: String(newConstellation) } : p
      );
      onUpdateProgress(newProgressData);
    }
    setIsEditingConstellation(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Weapon':
        return <p>Weapon information for {character.name} will be displayed here.</p>;
      case 'Talents':
        return <p>Talent information for {character.name} will be displayed here.</p>;
      case 'Artifacts':
        return <p>Artifact information for {character.name} will be displayed here.</p>;
      case 'Details':
      default:

        const regionIconUrl = require(`../assets/region-icons/${character.region}.png`);
        const elementIconUrl = require(`../assets/element-icons/${character.element}.png`);
        const weaponIconUrl = require(`../assets/weapon-type-icons/${character.weaponType}.png`);

        return (
          <div className="details-content">

            <div className="detail-item">
              <span className="detail-label">Region:</span>
              <div className="detail-value-container">
                <img src={regionIconUrl} alt={character.region} className="detail-icon" />
                <span className="detail-value">{character.region}</span>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-label">Element:</span>
              <div className="detail-value-container">
                <img src={elementIconUrl} alt={character.element} className="detail-icon" />
                <span className="detail-value">{capitalizeFirstLetter(character.element)}</span>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-label">Weapon Type:</span>
              <div className="detail-value-container">
                <img src={weaponIconUrl} alt={character.weaponType} className="detail-icon" />
                <span className="detail-value">{capitalizeFirstLetter(character.weaponType)}</span>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-label">Level:</span>
              {isEditingLevel ? (
                <input
                  type="number"
                  min="1"
                  max="90"
                  value={editableLevel}
                  onChange={(e) => setEditableLevel(e.target.value)}
                  onBlur={handleSaveLevel}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveLevel()}
                  className="detail-value-input"
                  autoFocus
                />
              ) : (
                <span 
                  className="detail-value editable" 
                  onClick={() => {
                    setEditableLevel(characterProgress ? characterProgress.level : '1');
                    setIsEditingLevel(true);
                  }}
                >
                  {characterProgress ? characterProgress.level : '1'}
                </span>
              )}
            </div>

            <div className="detail-item">
              <span className="detail-label">Constellation:</span>
              {isEditingConstellation ? (
                <input
                  type="number"
                  min="0"
                  max="6"
                  value={editableConstellation}
                  onChange={(e) => setEditableConstellation(e.target.value)}
                  onBlur={handleSaveConstellation}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveConstellation()}
                  className="detail-value-input"
                  autoFocus
                />
              ) : (
                <span 
                  className="detail-value editable" 
                  onClick={() => {
                    setEditableConstellation(characterProgress ? characterProgress.constellation : '1');
                    setIsEditingConstellation(true);
                  }}
                >
                  {characterProgress ? characterProgress.constellation : '1'}
                </span>
              )}
            </div>

          </div>
        );
    }
  };

  let backgroundStyle = {};
  if (character.quality === '5') {
    backgroundStyle.backgroundImage = `url(${require('../assets/backgrounds/5star-gold.png')})`;
  } else if (character.quality === '4') {
    backgroundStyle.backgroundImage = `url(${require('../assets/backgrounds/4star-purple.png')})`;
  }

  return (
    <div className="character-details-container">
      
      <h1 className="character-details-title">{character.name}</h1>

      <div className="details-layout">

        <div className="details-left">
          <div className="details-image-background-container" style={backgroundStyle}>
            <img src={imageUrl} alt={character.name} className="details-character-image" />
          </div>
        </div>

        <div className="details-right">

          <div className="details-tabs">
            {TABS.map(tab => (
              <div 
                key={tab}
                className={`details-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </div>
            ))}
          </div>

          <div className="details-tab-content">
            {renderTabContent()}
          </div>

        </div>

      </div>
      
    </div>
  );
};

export default CharacterDetails;