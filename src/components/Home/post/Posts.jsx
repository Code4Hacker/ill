import { Bookmark, Message, Send } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jQuery from 'jquery';
import demo from '../../images/work-4.jpg';
import './post.css';
import Comment from './comments/Comment';
const Posts = ({ posted }) => {
  const { image, message, comment_count, likes, userID } = posted;
  const [clicks, setClicks] = useState(false);
  const [like, setLike] = useState(0);
  const [comments_, setComments_] = useState('');
  const [allmsg, setAllmsg] = useState([]);
  const [num, setNum] = useState(0);
  const [postedUser, setPostedUser] = useState("");
  const [text, setText] = useState(message.length < 210 ? message : (message).substring(0, 210) + " ... Continue");
  const phpdata = async () => {
    var formdata = new FormData();

    formdata.append("messageId", posted.id);
    formdata.append("comments_", comments_.replace(/'/g, "\\'"));
    console.log(comments_, "POSTEDID::", posted.id)

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://www.the-graffiti.com/cmt.php", requestOptions)
      .then(response => response.text())
      .then(result =>
        axios.get('https://www.the-graffiti.com/cmt.php')
          .then(response => {
            setAllmsg(response.data);
          })
          .catch(error => {
            console.log(error);
          })
      )
      .catch(error => console.log('error', error));
    setComments_('');
  }
  const closingMsg = () => {
    jQuery(".msg_holder").fadeOut({
      easing: 'linear',
      duration: 500
    })
  }
  const OpenMsg = () => {
    jQuery(".msg_holder").fadeIn({
      easing: 'linear',
      duration: 500
    })
  }
  useEffect(() => {
    const allComments = async () => {
      const res = await fetch('https://www.the-graffiti.com/cmt.php');
      const getthem = await res.json();
      setAllmsg(getthem);
    }
    allComments();
    jQuery(".msg_holder").fadeOut({
      easing: 'linear',
      duration: 100
    });
    const user = async () => {
      axios.get('https://www.the-graffiti.com/userDetails.php').then(response => {
        console.log(response.data);
        if (response.data) {
          let i = response.data[0].length;
          for (let t = 0; t < i; t++) {
            if(response.data[0][t].id === userID){
              setPostedUser(response.data[0][t].username);
            }
          }
        }
      }).catch(error => { console.log(error); });
    }
    user();
  }, [userID]);
  const fullview = () => {
    if (num === 0) { setText(message); setNum(1); } else if (num === 1) { setText((message).substring(0, 210) + " ... Continue"); setNum(0); } else { setNum(0); }
  }
  return (
    <div className='col-xl-5 post'>
      <div className="posted_image">
        <img src={image ? image : demo} alt="" />
        <div className="shadow">
          <div className="container">
            <div className="image_tools">
              <div className="iconed">
                <div className="cart">
                  <span className='comment'>{postedUser}</span><Bookmark />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contents">
        <div className="description small comment " style={{
          margin: '10px'
        }} onClick={fullview}>
          <div style={{
            fontStyle:'italic',
            fontWeight:'bold'
          }} className='gradients'><span style={{
            fontWeight:'400'
          }}>Posted By</span> {postedUser}</div>
          {text}
        </div>
        <div className="message_and_likes">
          <div className="buttons">
            <button onClick={OpenMsg}>
              <div className="">
                <span><Message /></span><span>{comment_count}</span>
              </div>
            </button>

          </div>
          <div className="buttons">
            <button onClick={() => {
              if (clicks) {
                setClicks(false);
                like < 1 ? setLike(0) : setLike(like - 1);
              } else {
                setClicks(true);
                setLike(like + 1);
              }
            }}>
              <span className={`icon ${clicks ? 'clicked' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi mrg-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                </svg>
              </span>
              <span>{likes}</span></button>
          </div>
        </div>

      </div>
      <div className="msg_holder message_and_likes">

        <div className="messages">
          <div className="closerOne" onClick={closingMsg}>
            <span>close</span>
          </div>
          <div className="message_post">
            <input type="text" placeholder='Comment to the post' className="texts" value={comments_} onChange={(e) => { setComments_(e.target.value) }} />
            <button onClick={phpdata}><Send /></button>
          </div>
          <div className="messages_comment comments_">
            {
              allmsg !== undefined || allmsg.length > 0 ? allmsg.map((i, k) => i.messageId === posted.id ? <Comment input={i} key={k} /> : '') : ''
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Posts;