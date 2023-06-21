import { BookmarkAdd, Message, Send } from '@mui/icons-material';
import React, { useState } from 'react';
import demo from '../../images/work-4.jpg';
import '../post/post.css';
const Posts = ({ kit }) => {
    const {image, message } = kit;
    const [clicks, setClicks] = useState(false);
    const [likes, setLikes] = useState(0);
  return (
    <div className='col-xl-5 post'>
      <div className="posted_image">
        <img src={image} alt="demo" />
        <div className="shadow">
          <div className="container">
            <div className="image_tools">
              <div className="user_and_capt small">
                <span>Adam John</span>
              </div>
              <div className="iconed">
                <div className="cart">
                  <BookmarkAdd/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contents">
      <div className="description small comment ">
            {(message).substring(0, 200)}
            <span className='gray'>...</span>
        </div>
        <div className="message_and_likes">
          <div className="buttons">
          <button>
            <div className="">
              <span><Message/></span><span>{62430}</span>
            </div>
          </button>
          <div className="messages">
              <div className="message_post">
                <input type="text" placeholder='Comment to the post'/>
                <Send/>
              </div>
              <div className="messages_comment">
                <div className="post_one">
                  <div className="row">
                    <div className="col-1">
                      <img src={demo} alt="demo" />
                    </div>
                    <div className="col-10 txt">
                      <span>Hello, for sure this is a brilliant Idea</span>
                    </div>
                    <div className="col-12 flex">
                      <button>reply</button>
                      <button>like</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="buttons">
            <button onClick={() => {
                if(clicks){ 
                    setClicks(false); 
                    likes < 1?setLikes(0):setLikes(likes - 1);
                }else{  
                    setClicks(true);
                    setLikes(likes + 1);
                }}}>
                <span className={`icon ${clicks ? 'clicked':''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi mrg-right" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>
                </span>
                <span>{likes}</span></button>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Posts;