import React, { useState } from 'react';
import SideMenu from './components/SideMenu';
import Dashboard from './components/Dashboard';
import Characters from './components/Characters';
import Weapons from './components/Weapons';

const App = () => {

  // State to keep track of the current page, default is 'Dashboard'
  const [currentPage, setCurrentPage] = useState('Dashboard');

  // Function to render the correct page based on the state
  const renderPage = () => {
    switch (currentPage) {
      case 'Characters':
        return <Characters />;
      case 'Weapons':
        return <Weapons />;
      case 'Dashboard':
      default:
        return <Dashboard />;
    }
  };
  
  return (
    <div className="app-container">
      <SideMenu onSelectPage={setCurrentPage} />
      <div className="content-area">
        {renderPage()}
      </div>
      <div className="right-panel" />
    </div>
  );

};

export default App;