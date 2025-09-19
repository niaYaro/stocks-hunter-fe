import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About';
import Auth from './pages/Auth/Auth';
import './index.scss';
import logo from './assets/SH_logo.png';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <header>
        <img src={logo} alt="logo" />
        <h1>Stocks Hunter</h1>
      </header>
      <nav>
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
              My list
            </NavLink>
          </li>
          <li>
            <NavLink to="/auth" className={({ isActive }) => (isActive ? 'active' : '')}>
              Auth
            </NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <footer>Footer content</footer>
    </BrowserRouter>
  );
};

export default App;