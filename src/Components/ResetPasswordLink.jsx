import * as React from 'react'
import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ResetPasswordLink.css'
import { userloggedIn } from './Context/Context';

function ResetPasswordLink() {
    const {userlogged,setuserLogged,userData,setuserData,url} = useContext(userloggedIn);
    const [newPassword,setNewPassword] = React.useState('');
    const [confirmPassword,setConfirmPassword] = React.useState('');
    const [showPass1,setshowPass1] = React.useState(false);
    const [showPass2,setshowPass2] = React.useState(false);
    const [loading,setLoading] = React.useState(false);
    const [error,seterror] = React.useState(null);
    const [successmsg,setsuccessmsg] = React.useState(null);
    const { token } = useParams();
    const Navigate = useNavigate();
    
    const submitform = async (event)=>{
        setLoading(true);
        event.preventDefault();
        if(newPassword===confirmPassword){
            if(newPassword.length >= 8){
                const res = await fetch(`${url}reset-password-link/${token}`,{
                    method: "POST",
                    headers: {
                      "Content-Type" : "application/json"
                    },
                    body: JSON.stringify({newPassword}),
                    });
                    const data = await res.json();
                    setLoading(false);
                    setsuccessmsg(null);
                    seterror(null);
                    if(data.msg==='success'){
                        setsuccessmsg('Password changed Successfully!');
                        setNewPassword('');
                        setConfirmPassword('');
                        setTimeout(() => {
                            Navigate('/accounts/login')
                        }, 2000);
                    }else if(data.msg==='timeout'){
                        seterror('Limit reached! Try after 10 minutes');
                    }else{                        
                      seterror('Link has been expired to try later!');
                    }
            }else{
                setLoading(false);
                seterror('Password should contain 8 characters.');
                setTimeout(() => {
                    seterror(null);
                }, 15000);
            }
        }else{
            setLoading(false);
            seterror('Passwords are not Matching!');
            setTimeout(() => {
                seterror(null);
            }, 15000);
        }
      }
    return (
    <>
        <div className="my__detials__box">
            <form onSubmit={submitform}  style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',marginBottom: "7rem"}}>
                <div className="setials__single" style={{margin:'0px auto',marginTop:'2rem',fontWeight:'500'}} ><h3>RESET PASSWORD</h3></div>
                <div className="setials__single" style={{margin:'20px auto'}}>
                    <label htmlFor="#">New Password</label>
                    <input 
                        type={showPass1?'text':'password'}
                        placeholder
                        required
                        name='password'
                        value={newPassword}
                        onChange={(e)=>{setNewPassword(e.target.value)}}    
                        />
                    <div className="pass__btm">
                    <a className="shown">Minimum of 8 characters</a>
                    <a style={{cursor:'pointer'}} onClick={()=>{setshowPass1(!showPass1)}} > { showPass1?'Hide Password':'Show Password' } </a>
                    </div>
                </div>
                <div className="setials__single" style={{margin:'20px auto'}}>
                    <label htmlFor="#">Confirm New Password</label>
                    <input 
                        type={showPass2?'text':'password'}
                        placeholder
                        required
                        name='confirmpassword'
                        value={confirmPassword}
                        onChange={(e)=>{setConfirmPassword(e.target.value)}} 
                        />
                    <div className="pass__btm">
                    <a className="shown">Minimum of 8 characters</a>
                    <a style={{cursor:'pointer'}} onClick={()=>{setshowPass2(!showPass2)}} > { showPass2?'Hide Password':'Show Password' } </a>
                    </div>
                </div>
                <div className="setials__single" style={{margin:'0px auto',height:'1rem',color:'#d04141'}} >
                    { error &&
                        error
                    }
                </div>
                <div className="setials__single" style={{margin:'0px auto',height:'1rem',color:'green'}} >
                    { successmsg &&
                        successmsg
                    }
                </div>
                <button type={loading?'':'submit'} className='rpl-sub-btn' >{loading?'UPDATING':'UPDATE'}</button>
            </form>
        </div>
    </>
  )
}

export default ResetPasswordLink
