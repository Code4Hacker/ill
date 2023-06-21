import React, {useState, useEffect } from 'react';
import { Sidebar, Posts, TopBar, PeopleShortcut } from './Home/index';
import './home.css';
// import axios from 'axios';
import Loader from './loading/Loader';
const Home = () => {
  const [messags, setMessags] = useState();
  let [theme, setTheme] = useState('');
  
  useEffect(() => {
    const phpdata = async () => {
      const res = await fetch('https://www.the-graffiti.com/index.php');
      const getthem = await res.json();
      setMessags(getthem);
    }
    if(window.localStorage.darkmode !== undefined || window.localStorage.darkmode !== null){
      // eslint-disable-next-line
      theme = window.localStorage.darkmode;
      setTheme(theme);
    }
    phpdata();
  },[]);
  return (
    <div className={`home handler ${theme}`}>
        <Sidebar/>
        
        <div className="main">
            <div className="put-top" data-aos="fade-up">
              <TopBar theme={theme} setTheme={setTheme}/>
            </div>
            <div className="container">
              <div className="post_area">
                <div className="row mrg-100-b" data-aos="fade-up">
                  {
                    messags?.length>0?messags.map((post) => <Posts posted={post} key={post.id}/>):<Loader/>
                  }
                </div>
              </div>
            </div>
        </div>
        <PeopleShortcut/>
    </div>
  )
}

export default Home;