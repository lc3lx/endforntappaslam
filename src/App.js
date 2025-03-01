import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './components/AdminPage';
import UserPage from './components/UserPage';
import SinglePage from './components/SinglePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AdminPage />} />
          <Route path="/user" element={<ResidencePage />} />
          <Route path="/single" element={<PasswordResetPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
