import React, { useState, useEffect } from 'react';
import SideMenu from './components/SideMenu';
import Dashboard from './components/Dashboard';
import Characters from './components/Characters';
import Weapons from './components/Weapons';
import CharacterDetails from './components/CharacterDetails';

const App = () => {

  // State to keep track of the current page, default is 'Dashboard'
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [progressData, setProgressData] = useState([]);

  // Load progress data when app starts
  useEffect(() => {
    const loadProgress = async () => {
      const data = await window.electronAPI.getProgress();
      setProgressData(data);
    };
    loadProgress();
  }, []);

  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character);
  };

  const handleGoBack = () => {
    setSelectedCharacter(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedCharacter(null); // Clear selected character when changing pages
  };

  //  Update progress state and save to file
  const handleUpdateProgress = async (newProgress) => {
    setProgressData(newProgress);
    await window.electronAPI.saveProgress(newProgress);
  };

  // Function to render the correct page based on the state
  const renderContent = () => {
    if (selectedCharacter) {
      return (
        <CharacterDetails 
          character={selectedCharacter} 
          progressData={progressData}
          onUpdateProgress={handleUpdateProgress}
        />
      );
    }

    switch (currentPage) {
      case 'Characters':
        return <Characters onSelectCharacter={handleSelectCharacter} />;
      case 'Weapons':
        return <Weapons />;
      case 'Dashboard':
      default:
        return <Dashboard />;
    }
  };
  
  return (
    <div className="app-container">
      <SideMenu onSelectPage={handlePageChange} />
      <div className="content-area">
        {renderContent()}
      </div>
    </div>
  );

};

export default App;