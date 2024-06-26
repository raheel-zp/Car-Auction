import * as React from 'react'
import { useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { userloggedIn } from '../Context/Context';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SendEmailVerification({userData}) {
    const {userlogged,setuserLogged,setuserData,url} = useContext(userloggedIn);
    const [email,setEmail] = React.useState('');
    const [loading,setLoading] = React.useState(false);
    const [emailSent,setemailSent] = React.useState(false);
    const [open,setopen] = React.useState(false);
    const Navigate = useNavigate();
    const [loginOpen,setloginOpen] = React.useState(false);
    
    const submitform = async (event)=>{    
          if(!userlogged){
            Navigate(`/accounts/login`);
            setloginOpen(true);
            setTimeout(() => {
              setloginOpen(false);
            }, 10000);
            return;
          }
        setLoading(true);
        event.preventDefault();
        const res = await fetch(`${url}email-verify/${userData.email}`,{
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type":"application/json",
        }
        });
        const data = await res.json();
        setLoading(false);
        if(data.msg === 'success'){
            setemailSent(true);
        }else if(data.msg === 'timeout'){
            setopen(true);
            setTimeout(() => {
                setopen(false);
            }, 3000);
        }else{

        }
      }
  return (
    <>
        <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
          <Alert severity="error" sx={{ width: '100%' }}>
            Limit reached! Please try after 10 Minutes.
          </Alert>
        </Snackbar>
        <Snackbar open={loginOpen} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
          <Alert severity="error" sx={{ width: '100%' }}>
              Please Login or Register new account!
          </Alert>
        </Snackbar>
        { !emailSent&& 
        <div className="login-area forgot">
            <div className="container">
            <div className="row">
                <div className="col-lg-12">
                <div className="login-box">
                    <div className="login-title">
                    <h3>EMAIL VERIFY</h3>
                    <p>To ensure a secure and trustworthy bidding experience for all our users, we require email verification to activate your bidding privileges.</p>
                    <p>By completing this process, you will gain full access to our auction listings and be able to participate in bidding.</p>
                    </div>
                    <div className="login-form">
                    <form onSubmit={submitform} >
                        <div className="single-login-input">
                        </div>
                        <div className="login-btn">
                            <button className='flex' style={{position:'relative',width:'14rem',height:'2.5rem',fontSize:'13px'}} disabled={loading}>
                                <div>{ loading?<div class="loader-5 center" ><span></span></div>:'SEND ME THE LINK'}</div>                                    
                            </button>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>}
        { emailSent &&
            <div className="verification__area">
                <div className="verification__wrap">
                    <div className="verification__content">
                    <span><i className="far fa-paper-plane"></i></span>
                        <p>An email is on its way to <a>{email}.</a></p>
                        <p className="account__tx">In order to use your account, we must ensure that address is reachable.</p>
                        <iframe style={{height:'20rem',marginTop: '-3rem'}} src="https://embed.lottiefiles.com/animation/72126"></iframe>
                    </div>
                </div>
            </div>
        }
    </>
  )
}

export default SendEmailVerification
