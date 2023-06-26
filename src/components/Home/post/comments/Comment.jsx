import React from 'react';
import demo from '../../../images/about-bg.jpg';
const Comment = ({ input }) => {
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
          {/* <button>reply</button> */}
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi mrg-right" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Comment;