import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { People, ArrowLeft } from '@mui/icons-material';
import testprofile from '../../images/testprofile.jpg';
import './shortcut.css';

const PeopleShortcut = () => {
  const [show, setShow] = useState(false);
  return (
    <div className={`shortcut-people ${show ? 'expand' :'people'}`}>
        <People className='bi'/>
        <div className="lists">
            <button>
              <Link className='link' to={`../home`}>
                <span className="image">
                  <img src={`${testprofile}`} alt="person" />
                </span>
                <span>Gemini Child</span>
              </Link>
            </button>
            <button>
              <Link className='link' to={`../home`}>
                <span className="image">
                  <img src={`${testprofile}`} alt="person" />
                </span>
                <span>Herman Johnson</span>
              </Link>
            </button>
            <button>
              <Link className='link' to={`../home`}>
                <span className="image">
                  <img src={`${testprofile}`} alt="person" />
                </span>
                <span>Aden Eil</span>
              </Link>
            </button>
            
        </div>
        <div className="toggleSL" onClick={() => {show? setShow(false): setShow(true)}}>
          <ArrowLeft className={`icon-large ${show ? 'rotate-0' :'rotate-180'}`}/>
        </div>
    </div>
  )
}

export default PeopleShortcut;