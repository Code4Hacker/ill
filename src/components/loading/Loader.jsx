import React, { useEffect } from 'react';
import './loader.css';
import jQuery from "jquery";
const Loader = () => {
  const endloader = () => {
    setTimeout(() => {
      jQuery(".loader").fadeOut({
        duration:1000,
        easing:'linear',
        complete: function(){
          jQuery(".error_log").fadeIn({
            duration:1000,
            easing:'linear'
          });
        }
      });
    }, 6000);
  }
  useEffect(() => { endloader()},[]);
  return (
    <div style={{textAlign:'center',justifyContent:'center', alignItems:'center',justifyItems:'center',position:'relative'}}>
      <div className="error_log">
            <p className="">Oops, Connection Error or Try to reload the Page</p>
        </div>
        <div className="loader" style={{
            width:'35px',
            height:'35px',
            border:'4px solid red',
            borderTopColor:'rgb(6,15,46)',
            borderLeftColor:"rgb(230,163,39)",
            borderBottomColor:'rgb(245,245,245)',
            borderRadius:'50px',
            position:'relative',
            marginLeft:"calc(100% - 50%)"
        }}>
          
        </div>
    </div>
  )
}

export default Loader;