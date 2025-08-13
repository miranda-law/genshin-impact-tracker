import React, { useState } from 'react';
import './CharacterDetails.css';
import DetailsTab from './DetailsTab';
import WeaponTab from './WeaponTab';
import TalentsTab from './TalentsTab';
import ArtifactsTab from './ArtifactsTab';

const TABS = ['Details', 'Weapon', 'Talents', 'Artifacts'];

const CharacterDetails = ({ character, progressData, onUpdateProgress }) => {
  // state for managing selected tab
  const [activeTab, setActiveTab] = useState('Details');

  // file path to character icon image
  const imageUrl = require(`../assets/char-icons/${character.image}`);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Weapon':
        return <WeaponTab character={character} />;
      case 'Talents':
        return <TalentsTab character={character} />;
      case 'Artifacts':
        return <ArtifactsTab character={character} />;
      case 'Details':
      default:
        return <DetailsTab character={character} progressData={progressData} onUpdateProgress={onUpdateProgress} />;
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