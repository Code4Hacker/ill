import React, { useEffect, useState } from 'react';
import { PeopleShortcut, Posts, Sidebar, TopBar } from '../../Home/index';
import './customerPosts.css';
import { AddAPhoto } from '@mui/icons-material';
import AddPost from '../../PostAdd/AddPost';
import jQuery from 'jquery';
import axios from 'axios';
import image from '../../images/testprofile.jpg';
import Loader from '../../loading/Loader';
import { Toaster } from 'react-hot-toast';
const CustomerPost = () => {
  const [messags, setMessags] = useState([]);
  const [user, setUser] = useState("");
  var [theme, setTheme] = useState();
  const showPoster = () => {
    jQuery(".addPost").on("click", function () {
      jQuery(".shadow.addpost").fadeIn({
        duration: 400,
        easing: 'linear'
      });
    });
  }
  useEffect(() => {
    let username = window.localStorage.userId;
    axios.get('https://www.the-graffiti.com/userDetails.php').then(response => {
      if (response.data) {
        let i = response.data[0].length;
        for (let t = 0; t < i; t++) {
          if (response.data[0][t].username.toLowerCase() === username.toLowerCase()) {
            setUser(response.data[0][t].id);
            if (response.data[0][t].id !== undefined) {
              // phpdata(response.data[0][t].id);
              axios.get("https://www.the-graffiti.com/index.php").then(
                response => {
                  let filteredObjects = response.data.filter(obj => obj.userID === user);
                  if (filteredObjects) {
                    setMessags(filteredObjects);
                  }

                }
              ).catch(error => { console.log(error) });
            }
          }
        }
      }
    }).catch(error => { console.log(error); });
    // const phpdata = async (theid) => {
    //   const res = await fetch('https://www.the-graffiti.com/index.php');
    //   const getthem = await res.json();
    //   let i = getthem.length;
    //   if(user !== undefined){
    //     for(let t = 0; t < i; t++){
    //       if(getthem[t].userID === user ){
    //         console.log(getthem[i])
    //       }
    //     }
    //   }
    //   console.log(getthem[1].userID);

    // }
    setTimeout(() => {
      // phpdata();
    }, 3000);
    showPoster();
    if (window.localStorage.darkmode !== undefined || window.localStorage.darkmode !== null) {
      // eslint-disable-next-line
      theme = window.localStorage.darkmode;
      setTheme(theme);
    }
  }, [user]);
  return (
    <div className={`handler your-posts ${theme ? 'darkmode' : ''}`}>
      <Toaster />
      <Sidebar />
      <AddPost />
      <div className="main">
        <div className="addPost iconed">
          <AddAPhoto />
        </div>
        <div className="put-top" data-aos="fade-up">
          <TopBar theme={theme} setTheme={setTheme} />
        </div>
        <div className="container">
          <div className="post_area">
            <div className="row mrg-100-b">
              <div className="container">
                <div className="banner">
                  <img src={localStorage.backProfile ? localStorage.backProfile : image} alt="" className='back_photo' />
                  <div className="shadow landscape"></div>
                  <div className="profile-kit">
                    <div className="mini-profile">
                      <div className="post_counter gradients">
                        <span className='title'>{messags?.length > 0 ? messags?.length : '0'}</span>
                        <span className=''>posts</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row" style={{
                marginBottom: '140px'
              }}>
                {
                  messags ? messags.map((post) => <Posts posted={post} key={post.id} />) : <Loader />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <PeopleShortcut />
    </div>
  )
}

export default CustomerPost;