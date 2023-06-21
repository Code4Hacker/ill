import React, {useEffect, useState} from "react";
import jQuery from "jquery";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
const Registration = () => {
    let [theme, setTheme] = useState('');
    const [term_and_cond, setTerm_and_cond] = useState('Not Agree');
    const [gender, setGender] = useState('Not Select, Optional');
    const pressed = (e) => {
        if(e.key === 'Enter'){
            document.querySelector(".nextBtn2").click();
        }
    }
    const jqueries = () => {
        
        jQuery("#male, #female").on("click", function(){
            if(this.id === "male"){
                jQuery("#male").addClass("g_CLICKED");
                jQuery("#female").removeClass("g_CLICKED");
                setGender("Male");
            }else if(this.id === "female"){
                jQuery("#male").removeClass("g_CLICKED");
                jQuery("#female").addClass("g_CLICKED");
                setGender("Female");
            }
        });
        // window.matchMedia('(max-width: 720px)').matches
            jQuery(".nextBtn").on("click", function(){
                let usrn = document.getElementById("usrn").value.length,ft_name = document.getElementById("ft_name").value.length,lt_name = document.getElementById("lt_name").value.length,b_date = document.getElementById("b_date").value.length;
                if(usrn >2 && ft_name > 2 && lt_name > 2 && b_date > 4 ){
                    if(jQuery('.box-for-checking-if.register').height() === '312px'){
                    
                    }else{
                        jQuery(".bottome button").css({
                            'top':'calc(100% - 50%) !important'
                        });
                    }
                    jQuery(".contents.begin").addClass("animate__animated animate__fadeInRight").fadeOut({
                        duration:100,
                        easing:'linear',
                        complete:function(){
                            jQuery(".contents.end").addClass("animate__animated animate__fadeInRight animate__delay-1s").fadeIn({duration:1000});
                            jQuery(".nextBtn").fadeOut();
                            jQuery(".nextBtn.nextBtn2").text("FINISH");
                            jQuery(".nextBtn.nextBtn2").fadeIn();
                        }
                    });
                }else{
                    alert("Please Fill Each field, Correct!");
                }
            });
    }
    const [agreement, setAgreement] = useState(false);
    const handleChange = (event) => {
        setAgreement(event.target.checked);
        setTerm_and_cond("Agreed");
        jQuery(".nextBtn.nextBtn2").toggleClass("activeBtn");
    }
    const navigate = useNavigate();
    useEffect(() => {
        if(window.localStorage.darkmode !== undefined || window.localStorage.darkmode !== null){
            // eslint-disable-next-line
            theme = window.localStorage.darkmode;
            setTheme(theme);
            jqueries();
          }
    }, []);
    const onhandler = event => {
        event.preventDefault();
        let username = document.getElementById("usrn").value,
        first_name = document.getElementById("ft_name").value,
        last_name = document.getElementById("lt_name").value,
        birthdate = document.getElementById("b_date").value,
        country = document.getElementById("ctry").value,
        numbers = document.getElementById("phn").value,
        passwords = document.getElementById("psw").value,
        cpsw = document.getElementById("cpsw").value,
        email = document.getElementById("eml").value;
        // Send data to API
        if(country.length > 2 && numbers.length > 4 && email.length > 4 ){
           if(passwords === cpsw && passwords.length>1){
            axios.post('https://www.the-graffiti.com/validation.php', { username, first_name, last_name, birthdate, country, numbers, passwords, email,term_and_cond, gender })
            .then(response => {
            })
            .catch(error => {
              console.log(error);
            });
            
            let path = '/';
            navigate(path);
           }else{
            alert("password don't Match, Correct to Continue!");
           }
        }else{
            alert("Fill Details");
        }
      };
  return (
    <div className={`home ${theme ? "darkmode": ""}`} onKeyDown={pressed}>
         <div className="waves-orange"></div>
        <div className="box-for-checking-if register">
         <div className="contents end">
         <div className="title">
            <span>Graffiti.</span>
        </div>
            <div className="fill">
                <input type="text" placeholder="Country" id="ctry"/>
            </div>
            <div className="fill">
                <input type="number" placeholder="Phone Number" id="phn"/>
            </div>
            <div className="fill">
                <input type="password" placeholder="Password" id="psw"/>
            </div>
            <div className="fill">
                <input type="password" placeholder="Confirm Password" id="cpsw"/>
            </div>
            <div className="fill">
                <input type="text" placeholder="Email" id="eml"/>
            </div>
            <div className="fill text-center">
                <span>Terms and Conditions.</span>
                <input type="checkbox" onChange={handleChange}/>
            </div>
         </div>
        <div className="contents begin">
        <div className="title">
            <span>Graffiti.</span>
        </div>
        <div className="form">
            <div className="fill">
                <input type="text"  className="animate__animated animate__fadeInUp animate__delay-1s" placeholder="First Name" id="ft_name"/>
            </div>
            <div className="fill">
                <input type="text"  className="animate__animated animate__fadeInUp animate__delay-3s" placeholder="Last Name" id="lt_name"/>
            </div>
            <div className="fill">
                <input type="text"  className="animate__animated animate__fadeInUp animate__delay-5s" placeholder="Username" id="usrn"/>
            </div>
            <div className="fill">
                <input type="date"  className="animate__animated animate__fadeInUp animate__delay-5s" placeholder="Birth Date" id="b_date"/>
            </div>
            <div className="gender">
                <button className="male animate__animated animate__fadeInUp animate__delay-2s" id="male">
                    <i>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-emoji-expressionless-fill" viewBox="0 0 16 16">
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM4.5 6h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm5 0h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm-5 4h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1z"/>
                        </svg>
                    </i>
                    male
                </button>
                <button className="female animate__animated animate__fadeInRight animate__delay-3s" id="female">
                    <i>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi emoji-heart-eyes-fill" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM4.756 4.566c.763-1.424 4.02-.12.952 3.434-4.496-1.596-2.35-4.298-.952-3.434zm6.559 5.448a.5.5 0 0 1 .548.736A4.498 4.498 0 0 1 7.965 13a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .548-.736h.005l.017.005.067.015.252.055c.215.046.515.108.857.169.693.124 1.522.242 2.152.242.63 0 1.46-.118 2.152-.242a26.58 26.58 0 0 0 1.109-.224l.067-.015.017-.004.005-.002zm-.07-5.448c1.397-.864 3.543 1.838-.953 3.434-3.067-3.554.19-4.858.952-3.434z"/>
                        </svg>
                    </i>
                    female
                </button>
            </div>
            <div className="dont">
                <p><Link to={`/`} className="link">I already have an account?</Link></p>
                {/* <span className="comment">Alright reserved by Graffit 2023</span> */}
            </div>
            
        </div>
        </div>
        <div className="bottome">
        <button className="nextBtn" type="submit"><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </svg></span> NEXT</button>
            <button className="nextBtn nextBtn2" onClick={onhandler} disabled={!agreement}><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </svg></span> NEXT</button>
        </div>
    </div>
    </div>
  )
}

export default Registration;