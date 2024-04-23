import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainScreen from './screens/MainScreen'; 

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
