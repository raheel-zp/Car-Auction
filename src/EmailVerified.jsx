import React, {useEffect, useState} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import { userloggedIn } from './Components/Context/Context';
import { useContext } from 'react';

function EmailVerified() {
  const {userlogged,setuserLogged,userData,setuserData,url} = useContext(userloggedIn);
    const navigate = useNavigate();
    const [verified,setVerified] = useState(false);
    const {token} = useParams();

    const verifyEmail = async ()=>{
        const res = await fetch(`${url}email-verify-on-visit/${token}`,{
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type":"application/json",
        }
      });
      const data = await res.json();

      if(data.msg === "success"){
        setVerified(true);
      }else{
        // navigate('/');
        window.location.href = '/'
      }
    }
    useEffect(()=>{
        verifyEmail();
    },[])

  return (
    <>
        <div style={{height:'40rem',display:'flex',justifyContent:'center',flexDirection: 'column',alignItems:'center'}}>
            {  verified?
                <>
                    <h4 style={{marginBottom: '1rem',fontSize: '25px',color: '#5815b5'}} > Your email has been verified successfully!</h4>
                    <iframe style={{height:'13rem'}} src="https://embed.lottiefiles.com/animation/131068"></iframe>
                </>:
                <>
                    <div class="loader-5-colored center" ><span></span></div>
                </>
            }
        </div> 
    </>
  )
}

export default EmailVerified
