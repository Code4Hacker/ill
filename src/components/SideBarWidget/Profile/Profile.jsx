import React, { useState, useEffect } from 'react';
import {PeopleShortcut, Sidebar, TopBar} from '../../Home/index';
import './profile.css';
import { Link } from 'react-router-dom';
import image from '../../images/testprofile.jpg';
import testprofile from '../../images/about-bg.jpg';
import { Camera } from '@mui/icons-material';
import Posts from '../../Home/PersonInfo/PrivatePost';
import Loader from '../../loading/Loader';
import toast, { Toaster }  from 'react-hot-toast';
import axios from 'axios';
const Profile = () => {
  function roundTo(value, places){
    var power = Math.pow(10, places);
    return Math.round(value * power) / power;
   }
  const upload_profile =() => {
    document.getElementById("profile-photo").click();
  }
  const processMiniProfile = () => {
    let upload_photo_file, file, reader;
    upload_photo_file = document.getElementById("profile-photo");
    file = upload_photo_file.files[0];
    reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadstart = function(){
      console.log("Starting ...");
      toast.success('starting ...', {
        style: {
          border: '1px solid red',
          padding: '16px',
          color: 'red',
        },
        iconTheme: {
          primary: 'orange',
          secondary: '#FFFAEE',
        },
      });
    }
    reader.onload = function(){
      window.localStorage.setItem("miniProfile", reader.result);
      document.querySelector(".mini_photo").src=localStorage.miniProfile;
      document.querySelector(".top-bar .image img").src=localStorage.miniProfile;
      toast.success('Upload was Sucessiful!', {
        style: {
          border: '1px solid green',
          padding: '16px',
          color: 'green',
        },
        iconTheme: {
          primary: 'blue',
          secondary: '#FFFAEE',
        },
      });
    }
    reader.onerror = function(){
      toast.error('Opps, there was and Error During Upload!', {
        style: {
          border: '1px solid red',
          padding: '16px',
          color: 'red',
        },
        iconTheme: {
          primary: 'orange',
          secondary: '#FFFAEE',
        },
      });
    }
    
  }
  const backFix = () => {
    document.getElementById("backImg").click();
  };
  const profileBack = () => {
    let upload_photo_file, file, reader;
    upload_photo_file = document.getElementById("backImg");
    file = upload_photo_file.files[0];
    reader = new FileReader();
    reader.readAsDataURL(file);
    let sizes = file.size/1000024;
    if(sizes>1.5){
      alert("Attention! the file size Exceed, It might Cause an Error or won't load or Error on Changing another Profile if will have large size too: "+ file.name +","+roundTo(sizes,3)+"Mb\nAt least should be Below 1.5Mb");
      toast("Attention! the file size Exceed, It might Cause an Error or won't load or Error on Changing another Profile if will have large size too: "+ file.name +","+roundTo(sizes,3)+"Mb\nAt least should be Below 1.5Mb",{
        duration:6000
      });
    }
    reader.onloadstart = function(){
      toast.success('starting ...', {
        style: {
          border: '1px solid red',
          padding: '16px',
          color: 'red',
        },
        iconTheme: {
          primary: 'orange',
          secondary: '#FFFAEE',
        },
      });
    }
    reader.onload = function(){
      window.localStorage.setItem("backProfile", reader.result);
      document.querySelector(".back_photo").src=localStorage.backProfile;
      toast.success('Upload was Sucessiful!', {
        style: {
          border: '1px solid green',
          padding: '16px',
          color: 'green',
        },
        iconTheme: {
          primary: 'blue',
          secondary: '#FFFAEE',
        },
      });
    }
    reader.onerror = function(){
      toast.error('Opps, there was and Error During Upload!', {
        style: {
          border: '1px solid red',
          padding: '16px',
          color: 'red',
        },
        iconTheme: {
          primary: 'orange',
          secondary: '#FFFAEE',
        },
      });
    }
    
  }
  let [theme, setTheme] = useState('');
  let [messags, setMessags] = useState();
  const [usrinf, setUsrinf] = useState('');
  useEffect(() => {
    const phpdata = async () => {
      const res = await fetch('https://www.the-graffiti.com/index.php');
      const getthem = await res.json();
      const threeItems = getthem.slice(0,3);
      setMessags(threeItems);
    }
    phpdata();
    let username = window.localStorage.userId;
    axios.get('https://www.the-graffiti.com/userDetails.php').then(response => {
      if(response.data){
        let i = response.data[0].length;
        for(let t = 0; t<i; t++){
          if(response.data[0][t].username.toLowerCase() === username.toLowerCase()){
            setUsrinf(response.data[0][t]);
          }
        }
      }
    }).catch(error => {console.log(error);});
    if(window.localStorage.darkmode !== undefined || window.localStorage.darkmode !== null){
      // eslint-disable-next-line
      theme = window.localStorage.darkmode;
      setTheme(theme);
    }
  },[]);
  const {username, first_name, last_name, birthdate, country, email, gender, numbers } = usrinf;
  return (
    <div className={`handler profile ${theme ? 'darkmode':''}`}>
      <Toaster/>
      <Sidebar/>
      <div className="main">
            <div className="put-top" data-aos="fade-up">
              <TopBar theme={theme} setTheme={setTheme}/>
            </div>
            <div className="container">
              <div className="post_area">
                <div className="row mrg-100-b">
                 <div className="container">
                   <div className="banner">
                    <div className="backImg">
                      <button onClick={backFix}><span><Camera/></span><span>Background</span></button>
                      <input type="file" id="backImg" accept='image/*' onChange={profileBack} hidden/>
                    </div>
                    <img src={localStorage.backProfile?localStorage.backProfile:image} alt="" className='back_photo'/>
                    <div className="shadow landscape"></div>
                    <div className="profile-kit">
                      <div className="mini-profile">
                      <img src={localStorage.miniProfile?localStorage.miniProfile:image} alt="" className='mini_photo'/>
                      <div className="shadow">
                        <div className="transform-50-to-50">
                          <button onClick={upload_profile} ><Camera/><span className='small'>change</span></button>
                          <input type="file" name="" id="profile-photo" accept='image/*' onChange={processMiniProfile} hidden/>
                        </div>
                      </div>
                    </div>
                    <div className='mrg-10 gray'>No Bio</div>
                    <div className="scores margin-bottom-10px">
                      
                      <div className="title">
                        <div className="follower">
                        <span className="numbers">
                          23
                        </span>
                        <span className="small">
                          followers
                        </span>
                      </div>
                      <div className="postCounter">
                        <span className='numbers'>13</span>
                        <span className="small">
                          posts
                        </span>
                      </div>
                      </div>
                    </div>
                    </div>
                  </div>
                 </div>
                 <div className="container mrg-top-150">
                  <div className="">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="title gradient">
                            <span className="gradients">
                              About you
                            </span>
                          </div>
                          
                        </div>
                        <div className="col-xl-7 graffiti mrg-top-50">
                          <div className="mrg-10 gradient">
                            <h4 className='slim-font uppercase gradients'>Personal Information</h4>
                          <div className="location gradient">
                            <span className='bolder gradients'>Username: </span>
                            {username}
                          </div>
                          <div className="location gradient">
                            <span className='bolder gradients'>Full Name: </span>
                            {`${first_name} ${last_name}`}
                          </div>
                          <div className="location gradient">
                            <span className='bolder gradients'>Country: </span>
                            {country}
                          </div>
                           <div className="location gradient">
                            <span className='bolder gradients'>Birthdate: </span>
                            {birthdate}
                          </div>
                          <div className="location gradient">
                            <span className='bolder gradients'>Gender: </span>
                            {gender}
                          </div>
                          <div className="location gradient">
                            <span className='bolder gradients'>Email: </span>
                            {email}
                          </div>
                          <div className="location gradient">
                            <span className='bolder gradients'>Phone: </span>
                            {`+${numbers}`}
                          </div>
                          </div>
                        </div>
                        <div className="col-xl-3 graffiti mrg-top-50">
                        <div className="mrg-10">
                        <h4 className='slim-font uppercase'>Followers</h4>
                          <div className="lists profile-img">
                            {/* mapping for followers */}
                            <button>
                              <Link className='link' to={`../home`}>
                                <span className="">
                                  <img src={`${testprofile}`} alt="person" />
                                </span>
                                <span>Herman Clarke</span>
                              </Link>
                            </button>
                            <button>
                              <Link className='link' to={`../home`}>
                                <span className="">
                                  <img src={`${testprofile}`} alt="person" />
                                </span>
                                <span>Da vinc smart</span>
                              </Link>
                            </button>
                            <button>
                              <Link className='link' to={`../home`}>
                                <span className="">
                                  <img src={`${testprofile}`} alt="person" />
                                </span>
                                <span>Hellen Johnson</span>
                              </Link>
                            </button>
                            <button>
                              <Link className='link' to={`../home`}>
                                <span className="">
                                  <img src={`${testprofile}`} alt="person" />
                                </span>
                                <span>Gemini Child</span>
                              </Link>
                            </button>

                          </div>
                          <div className="more">
                            <Link className='more'>View all</Link>
                          </div>
                        </div>
                        </div>
                      </div>
                      <div className="col-md-12 mrg-100-b">
                          <div className="title gradient">
                          <span className="gradients">
                              Your Posts
                            </span>
                          </div>
                        </div>
                      <div className="row">
                        {
                          messags?.length > 0 ? messags.map((msg, id) =><Posts kit={msg} key={id}/>):<Loader/>
                        }
                        <div className="more">
                            <Link className='more' to={'../your-post'}>View all</Link>
                        </div>
                      </div>
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

export default Profile;