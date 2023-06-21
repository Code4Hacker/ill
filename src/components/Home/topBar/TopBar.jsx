import { DarkMode } from '@mui/icons-material';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Searchbar from '../searchBar/Searchbar';
import testprofile from '../../images/logo.png';
import './topbar.css';
const TopBar = ({ theme, setTheme }) => {
  useEffect(() => {
  }, []);
  return (
    <div className='top-bar'>
      <div className="float-left">
        <Link className='link' to={`../home`}>
          <span className="image">
            <img src={window.localStorage.miniProfile ? window.localStorage.miniProfile : testprofile} alt="person" />
          </span>
          <span>{window.localStorage.userId}</span>
        </Link>
      </div>
      <div className="float-right">
        <Searchbar />
        <div className="togglemode">
          <button type='button' onClick={() => {
            if (theme === 'darkmode') {
              window.localStorage.setItem('darkmode', '');
              theme = window.localStorage.darkmode;
              setTheme(theme);

            } else {
              window.localStorage.setItem('darkmode', 'darkmode');
              theme = window.localStorage.darkmode;
              setTheme(theme);
            }
          }}><DarkMode /></button>
        </div>
      </div>
    </div>
  )
}

export default TopBar;