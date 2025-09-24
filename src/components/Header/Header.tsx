import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { NavLink } from 'react-router-dom';
import SHLogo from '../SHLogo/SHLogo';

import styles from './Header.module.scss';

const Header: React.FC = () => {

  return (
    <header className={styles.headerWrapper}>
      <div className={styles.logoWrapper}>
        <SHLogo className={styles.headerLogo} />
        <div className={styles.iconsWrapper}>
          <NavLink to="/list" className={({ isActive }) => (isActive ? 'active' : '')}>
            <PersonIcon color="secondary" fontSize='large' />
          </NavLink>
        </div>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/list" className={({ isActive }) => (isActive ? 'active' : '')}>
              My list
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;