import React from 'react';
import demo from '../../../images/about-bg.jpg';
const Comment = ({input}) => {
  return (
    <div className="post_one">
      <div className="row">
        <div className="col-1">
          <img src={demo} alt="demo" />
        </div>
        <div className="col-10 txt">
          <span>{input.comments_}</span>
        </div>
        <div className="col-12 flex">
          <button>reply</button>
          <button>like</button>
        </div>
      </div>
    </div>
  )
}

export default Comment;