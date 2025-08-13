import React, { useState } from 'react';

// helper function to capitalize first letter of a string
const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const DetailsTab = ({ character, progressData, onUpdateProgress }) => {
  // state for managing editable level field
  const [isEditingLevel, setIsEditingLevel] = useState(false);
  const [editableLevel, setEditableLevel] = useState('');
  
  // state for managing editable constellation field
  const [isEditingConstellation, setIsEditingConstellation] = useState(false);
  const [editableConstellation, setEditableConstellation] = useState('');

  // find progress data for selected character
  const characterProgress = progressData.find(p => p.id === String(character.id));

  // handle saving the new level -- only 1 to 90
  const handleSaveLevel = () => {
    const newLevel = parseInt(editableLevel, 10);
    if (newLevel >= 1 && newLevel <= 90) {
      let newProgressData;
      if (characterProgress) {
        newProgressData = progressData.map(p => 
          p.id === String(character.id) ? { ...p, level: String(newLevel) } : p
        );
      } 
      onUpdateProgress(newProgressData);
    }
    setIsEditingLevel(false);
  };

  // handle saving the new constellation -- only 0 to 6
  const handleSaveConstellation = () => {
    const newConstellation = parseInt(editableConstellation, 10);
    if (newConstellation >= 0 && newConstellation <= 6) {
      let newProgressData;
      if (characterProgress) {
        newProgressData = progressData.map(p => 
          p.id === String(character.id) ? { ...p, constellation: String(newConstellation) } : p
        );
      } 
      onUpdateProgress(newProgressData);
    }
    setIsEditingConstellation(false);
  };

  // icon urls
  const regionIconUrl = require(`../assets/region-icons/${character.region}.png`);
  const elementIconUrl = require(`../assets/element-icons/${character.element}.png`);
  const weaponIconUrl = require(`../assets/weapon-type-icons/${character.weaponType}.png`);

  return (
    <div className="details-content">

      {/* region line */}
      <div className="detail-item">
        <span className="detail-label">Region:</span>
        <div className="detail-value-container">
          <img src={regionIconUrl} alt={character.region} className="detail-icon" />
          <span className="detail-value">{character.region}</span>
        </div>
      </div>

      {/* element line */}
      <div className="detail-item">
        <span className="detail-label">Element:</span>
        <div className="detail-value-container">
          <img src={elementIconUrl} alt={character.element} className="detail-icon" />
          <span className="detail-value">{capitalizeFirstLetter(character.element)}</span>
        </div>
      </div>

      {/* weapon type line */}
      <div className="detail-item">
        <span className="detail-label">Weapon Type:</span>
        <div className="detail-value-container">
          <img src={weaponIconUrl} alt={character.weaponType} className="detail-icon" />
          <span className="detail-value">{capitalizeFirstLetter(character.weaponType)}</span>
        </div>
      </div>

      {/* editable level line */}
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
      
      {/* editable constellation line */}
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
};

export default DetailsTab;