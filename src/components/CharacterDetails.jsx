import React, { useState } from 'react';

const TABS = ['Details', 'Weapon', 'Talents', 'Artifacts'];

const CharacterDetails = ({ character, onGoBack }) => {
  const [activeTab, setActiveTab] = useState('Details');
  const imageUrl = require(`../assets/char-icons/${character.image}`);

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
        return <p>General details for {character.name} will be displayed here.</p>;
    }
  };


  return (
    <div className="character-details-container">
      
      <h1 className="character-details-title">{character.name}</h1>

      <div className="details-layout">

        <div className="details-left">
          <img src={imageUrl} alt={character.name} className="details-character-image" />
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

      <button onClick={onGoBack} className="back-button">&larr; Back to Characters</button>
      
    </div>
  );
};

export default CharacterDetails;