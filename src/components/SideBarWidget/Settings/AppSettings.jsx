import React, { useState, useEffect  } from 'react';
import { PeopleShortcut, Sidebar, TopBar } from '../../Home/index';
import './setting.css';

const AppSettings = () => {
  let [theme, setTheme] = useState();
  useEffect(() => {
    if(window.localStorage.darkmode !== undefined || window.localStorage.darkmode !== null){
      
    // eslint-disable-next-line
      theme = window.localStorage.darkmode;
      setTheme(theme);
    }
  },[])
  return (
    <div className={`handler settings ${theme ? "darkmode": ''}`}>
      <Sidebar/>
      <div className="main">
            <div className="put-top" data-aos="fade-up">
              <TopBar theme={theme} setTheme={setTheme}/>
            </div>
            <div className="container">
              <div className="post_area">
                <div className="row mrg-100-b">
                   <div className="col-md-12">
                    <div className="title">settings</div>
                   </div>
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col-xl-5 graffiti">
                      <div className="title gradient">
                        <span className="gradients">profile</span>
                      </div>
                      <div className="tool tools">
                        <div className="fill">
                          <span className='gradients'>Username</span>
                          <input type="text" placeholder='CHANGE'/>   
                        </div>
                        <div className="fill">
                          <span className='gradients'>Bio</span>
                          <input type="text" placeholder='CHANGE'/>   
                        </div>
                        <div className="fill">
                          <span className='gradients'>Password</span>
                          <input type="text" placeholder='CHANGE'/>   
                        </div>
                        <div className="button"><button>Done</button></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <PeopleShortcut/>
    </div>
  )
}

export default AppSettings;