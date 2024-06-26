import * as React from 'react'
import { useContext } from 'react';
import './Loader.css'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { userloggedIn } from './Context/Context';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function Forgot() {
    const {userlogged,setuserLogged,userData,setuserData,url} = useContext(userloggedIn);
    const [email,setEmail] = React.useState('');
    const [loading,setLoading] = React.useState(false);
    const [emailSent,setemailSent] = React.useState(false);
    const [open,setopen] = React.useState(false);
    
    const submitform = async (event)=>{
        setLoading(true);
        event.preventDefault();
        const res = await fetch(`${url}forgot-password`,{
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({email}),
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
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Title Here</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
        <link href="assets/css/bootstrap.min.css" rel="stylesheet" />
        <link href="assets/css/all.min.css" rel="stylesheet" />
        <link href="assets/css/fontawesome.css" rel="stylesheet" />
        <link href="assets/css/owl.carousel.min.css" rel="stylesheet" />
        <link href="assets/css/nice-select.css" rel="stylesheet" />
        <link href="assets/css/default.css" rel="stylesheet" />
        <link href="assets/css/style.css" rel="stylesheet" />
        <link href="assets/css/responsive.css" rel="stylesheet" />
        <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
          <Alert severity="error" sx={{ width: '100%' }}>
            Limit reached! Please try after 10 Minutes.
          </Alert>
        </Snackbar>

        { !emailSent&& <div className="login-area forgot">
            <div className="container">
            <div className="row">
                <div className="col-lg-12">
                <div className="login-box">
                    <div className="login-title">
                    <h3>RESET PASSWORD</h3>
                    <p>Enter the email address associated with your account.</p>
                    <p>We'll send you a link to reset your password.</p>
                    </div>
                    <div className="login-form">
                    <form onSubmit={submitform} >
                        <div className="single-login-input">
                        <label htmlFor="#">Email Address</label>
                        <div className="single-input">
                            <input 
                                type="email"
                                required 
                                placeholder="Email address"
                                onChange={(e)=>{setEmail(e.target.value)}}
                                value={email}
                                />
                        </div>
                        </div>
                        <div className="login-btn">
                            <button className='flex' style={{position:'relative',width:'15.2rem'}} type={loading?'':'submit'}>
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
                    </div>
                </div>
            </div>
        }
        {/* <div style={{fontFamily: "Arial, sans-serif",fontSize:"16px",lineHeight:"1.5",color: "#333",backgroundColor: "#f7f7f7", padding: "20px"}}>
            <div class="container" style={{maxWidth:"600px",margin: "0 auto",backgroundColor: "#fff",borderRadius: "5px",boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",padding: "30px"}} >
                <div style={{fontSize: "30px",fontWeight: "bold", marginTop: "0", color: "#EF9523",textAlign: "center"}}>Autoauction.com</div>
                <h1 style={{fontSize: "22px",fontWeight: "bold",marginTop: "0", marginBottom: "20px",color: "#333",textAlign: "center"}}>Link for Resetting Password</h1>
                <p style={{margin: "0 0 10px"}}>Dear <span style={{fontWeight: "600"}}>Afaq,</span></p>
                <p>We are writing to inform you that we have received your request to reset your password. As requested, we are sending you a link to reset your password so that you can regain access to your account.</p>
                <p style={{marginBottom: "-10px"}}>Please click on the following link to reset your password:</p>
                <a href="#">kjbkbiboasnoiasnoiansoi</a>
                <p>Please note that the link will expire in 24 hours. If you do not reset your password within this timeframe, you will need to request another password reset.</p>
                <p>If you did not request a password reset or if you believe your account has been compromised, please contact our support team immediately at <span style={{color: "#0a960a",fontWeight: "600"}}>soporte@multiplataformacapital.com</span>.</p>
                <p>Thank you for using our services. We appreciate your business and are committed to providing you with the best possible user experience.</p>
                <p style={{marginBottom:'0'}} >Sincerely,</p>
                <p>Auto Auction</p>
            </div>
        </div>   */}
    </>
  )
}

export default Forgot
