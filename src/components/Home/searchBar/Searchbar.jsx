import { Search } from '@mui/icons-material';
import React from 'react';
import './search.css';

const Searchbar = () => {
  return (
    <div className='search-box'>
      <input type="text" placeholder='Search Graffiti'/>
      <Search/>
    </div>
  )
}

export default Searchbar;