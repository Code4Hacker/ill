import { Close } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './addpost.css';
import jQuery from 'jquery';
import { toast } from 'react-hot-toast';
const AddPost = () => {
  const [image, setImage] = useState([]);
  const [msg, setMsg] = useState('');
  const [usrinf, setUsrinf] = useState('');
  const [msgs, setMsgs] = useState([]);
  const fileclicker = () => {
    document.getElementById("post").click();
  }
  const newpost = () => {
    let file, reader, input;
    input = document.getElementById("post");
    file = input.files[0];
    reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadstart = function () {
      toast.success('Loading Upload ...', {
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
    reader.onload = function () {
      setImage(this.result);
    }
    reader.onloadend = function () {
    }
    reader.onerror = function () {
      toast.success('Opps, there was and Error During Upload', {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });

    }
    for (let i = 0; i < file.length; i++) {
         const element = file[i];
         reader = new FileReader();
         reader.readAsDataURL(element);
         reader.onloadstart = function(){
          toast.success('Loading Upload ...', {
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
             let image = document.createElement("img");
             image.setAttribute("src", this.result);
             document.querySelector(".image_posting").append(image);
             toast.success('Done: "+file.length+"Posts Added ...', {
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
         reader.onloadend = function(){
             setImage(this.result);
         }
         reader.onerror = function(){
             toast.success('Opps, there was and Error During Upload!', {
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


  }
  const showPoster = () => {
    jQuery(".clear").on("click", function () {
      jQuery(".shadow.addpost").fadeOut({
        duration: 400,
        easing: 'linear'
      });
    });
  }
  useEffect(() => {
    showPoster();
    let username = window.localStorage.userId;
    axios.get('https://www.the-graffiti.com/userDetails.php').then(response => {
      if (response.data) {
        let i = response.data[0].length;
        for (let t = 0; t < i; t++) {
          if (response.data[0][t].username.toLowerCase() === username.toLowerCase()) {
            setUsrinf(response.data[0][t].id);
            console.log(response.data[0][t].id);
          }
        }
      }
    }).catch(error => { console.log(error); });
  });
  const handleSubmit = event => {
    event.preventDefault();
    // Send data to API
    let message = msg.replace(/'/g, "\\'");

    setMsg((msg.replace(/'/g, "\\'")));
    console.log(message)
    axios.post('https://www.the-graffiti.com/index.php', { image, message, usrinf })
      .then(response => {
        // Refresh msgs
        console.log(msg)
        axios.get('https://www.the-graffiti.com/index.php')
          .then(response => {
            setMsgs(response.data);
            console.log(msgs);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });

    // Clear form fields
    setImage('');
    setMsg('');
  };
  return (
    <div className="shadow addpost">
      <div className="boxed tool tools graffiti transform-50-to-50">
        <div className="col-xl-12" style={{ margin: '20px', marginLeft: 0, marginRight: 0 }}>
          <div className="title gradient">
            <span className='gradients'>add post</span>
          </div>
        </div>
        <div className="counter_new_post gradients" style={{ textAlign: "center", textTransform: 'uppercase' }}>
        </div>
        <div className="image_posting">
          <img src={image} alt="" />
        </div>
        <textarea style={{ margin: '10px', width: "95%" }} placeholder="Description" value={msg} onChange={event => setMsg(event.target.value)} />
        <div className="button">
          <input type="file" name="" id="post" onChange={newpost} hidden multiple accept='image/*' />
          <button style={{ width: '200px' }} onClick={fileclicker}>select photo</button>
        </div>
        <div className="button">
          <button onClick={handleSubmit}>post</button>
        </div>
        <div className="clear">
          <Close className="icon" />
        </div>
      </div>
    </div>
  )
}

export default AddPost;