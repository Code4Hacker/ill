import { Bookmark, Message, Send } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import demo from '../../images/work-4.jpg';
import './post.css';
import Comment from './comments/Comment';
const Posts = ({ posted }) => {
  const { image, message, comment_count, likes } = posted;
  const [clicks, setClicks] = useState(false);
  const [like, setLike] = useState(0);
  const [comments, setComments] = useState('');

  // smartguy

  const [comment_, setComment_] = useState([]);
  const [messag, setMessag] = useState([]);
  const onhandler = event => {
    event.preventDefault();

    // Send data to API
    // axios.post('https://www.the-graffiti.com/cmt.php', { comments, messageId })
    //   .then(response => {


    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });

    //   // Clear form fields
    //   setComments('');

  };
  useEffect(() => {
    const phpdata = async () => {
      const res = await fetch('https://www.the-graffiti.com/cmt.php');
      const getthem = await res.json();
      setComment_(getthem);
      for (let index = 0; index < getthem.length; index++) {
        if (getthem[index].messageId === posted.id) {
          setMessag(getthem[index]);
        }
      }
    }
    phpdata();
      // eslint-disable-next-line
  }, [messag]);
  return (
    <div className='col-xl-5 post'>
      <div className="posted_image">
        <img src={image ? image : demo} alt="" />
        <div className="shadow">
          <div className="container">
            <div className="image_tools">
              <div className="iconed">
                <div className="cart">
                  <Bookmark />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contents">
        <div className="description small comment ">
          {(message).substring(0, 150)}
          <span className='gray'>...</span>
        </div>
        <div className="message_and_likes">
          <div className="buttons">
            <button>
              <div className="">
                <span><Message /></span><span>{comment_count}</span>
              </div>
            </button>
            <div className="messages">
              <div className="message_post">
                <input type="text" placeholder='Comment to the post' className="texts" value={comments} onChange={(e) => { setComments(e.target.value) }} />
                <button onClick={onhandler}><Send /></button>
              </div>
              <div className="messages_comment comments">
                {
                  comment_ !== undefined || comment_.length > 0 ? comment_.map((i, k) => i.messageId === posted.id ? <Comment input={i} key={k} /> : '') : ''
                }
              </div>
            </div>
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
    </div>
  )
}

export default Posts;