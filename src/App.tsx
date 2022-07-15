import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import Reset from './components/Login/Reset';
import Dashboard from './components/Dashboard';


const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
