import React,{ useEffect, useState } from 'react';
import { PeopleShortcut, Posts, Sidebar, TopBar } from '../../Home/index';
import './customerPosts.css';
import { AddAPhoto } from '@mui/icons-material';
import AddPost from '../../PostAdd/AddPost';
import jQuery from 'jquery';
import image from '../../images/testprofile.jpg';
import Loader from '../../loading/Loader';
const CustomerPost = () => {
  const [messags, setMessags] = useState();
  var [theme, setTheme] = useState();
  const showPoster = () => {
    jQuery(".addPost").on("click",function(){
      jQuery(".shadow.addpost").fadeIn({
        duration:400,
        easing:'linear'
      });
    });
  }
  useEffect(() => {
    const phpdata = async () => {
      const res = await fetch('https://www.the-graffiti.com/index.php');
      const getthem = await res.json();
      setMessags(getthem);
      console.log(getthem);
    }
    phpdata();
    showPoster();
    if(window.localStorage.darkmode !== undefined || window.localStorage.darkmode !== null){
      // eslint-disable-next-line
      theme = window.localStorage.darkmode;
      setTheme(theme);
    }
  },[]);
  return (
    <div className={`handler your-posts ${theme ? 'darkmode': ''}`}>
      <Sidebar/>
      <AddPost/>
      <div className="main">
           <div className="addPost iconed">
              <AddAPhoto/>
            </div>
            <div className="put-top" data-aos="fade-up">
              <TopBar theme={theme} setTheme={setTheme}/>
            </div>
            <div className="container">
              <div className="post_area">
                <div className="row mrg-100-b">
                <div className="container">
                   <div className="banner">
                    <img src={localStorage.backProfile?localStorage.backProfile:image} alt="" className='back_photo'/>
                    <div className="shadow landscape"></div>
                    <div className="profile-kit">
                      <div className="mini-profile">
                        <div className="post_counter gradients">
                          <span className='title'>{messags?.length > 0 ? messags?.length:'0'}</span>
                          <span className=''>posts</span>
                        </div>
                      </div>
                    </div>
                  </div>
                 </div>
                </div>
                <div className="container">
                  <div className="row">
                  {
                    messags?messags.map((post) => <Posts posted={post} key={post.id}/>):<Loader/>
                  }
                  </div>
                </div>
              </div>
            </div>
        </div>
        <PeopleShortcut/>
    </div>
  )
}

export default CustomerPost;