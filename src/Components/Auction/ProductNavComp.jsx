import React from 'react'
import { useState,useEffect,useContext } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import CountryFlag from '../CountryFlag';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { userloggedIn } from '../Context/Context'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ProductNavComp({val}) {
    const { userlogged,setuserLogged,userData,setuserData,getLoggedin,url } = useContext(userloggedIn);
    const title = val.title;
    const formattedTitle = title.split(' ').join('-');
    const [flagUrl, setFlagUrl] = useState('');
    const [remainingTime, setRemainingTime] = useState('');
    const [remDays, setRemDays] = useState('');

    const [open1,setOpen1] = useState(false);
    const [open2,setOpen2] = useState(false);
    const [open3,setOpen3] = useState(false);
    const Navigate = useNavigate();
    const [loginOpen,setloginOpen] = useState(false);
    const saveProduct = async ()=>{
      if(!userlogged){
        Navigate(`/accounts/login`);
        setloginOpen(true);
        setTimeout(() => {
          setloginOpen(false);
        }, 10000);
        return;
      }
      const res = await fetch(`${url}save-product/${val._id}`,{
      method: "POST",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify({
        userId: userData._id
      })
        });
    const data = await res.json();
    if(data.msg==='success'){
      setOpen1(true);
      getLoggedin();
      setTimeout(() => {
        setOpen1(false);
        setOpen2(false);
      }, 3000);
    }else{
      setOpen2(true);
      setTimeout(() => {
        setOpen1(false);
        setOpen2(false);
      }, 3000);
    }
    }

    const unSaveProduct = async ()=>{
      if(!userlogged){
        Navigate(`/accounts/login`);
        setloginOpen(true);
        setTimeout(() => {
          setloginOpen(false);
        }, 10000);
        return;
      }
      const res = await fetch(`${url}unsave-product/${val._id}`,{
      method: "POST",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify({
        userId: userData._id
      })
        });
    const data = await res.json();
    if(data.msg==='success'){
      setOpen3(true);
      getLoggedin();
      setTimeout(() => {
        setOpen1(false);
        setOpen2(false);
        setOpen3(false);
      }, 3000);
    }else{
      setOpen2(true);
      setTimeout(() => {
        setOpen1(false);
        setOpen2(false);
        setOpen3(false);
      }, 3000);
    }
    }

    useEffect(() => {
      const fetchFlag = async () => {
        try {
          const response = await fetch(`https://restcountries.com/v2/name/${val.country}`);
          const data = await response.json();
          const flagImageUrl = data[0].flags.svg; // Assuming the API provides the flag image URL in the "flags.svg" property
          setFlagUrl(flagImageUrl);
        } catch (error) {
          console.error('Error fetching flag:', error);
        }
      };
  
      fetchFlag();
    }, [val.country]);
    
    // useEffect(() => {
    //     let countdownInterval;

        // const calculateRemainingTime = () => {
        //   const endTime = new Date(val.date).getTime() + val.duration * 24 * 60 * 60 * 1000;
        //   countdownInterval = setInterval(() => {
        //     const currentTime = new Date().getTime();
        //     const remainingMilliseconds = Math.max(0, endTime - currentTime);
    
        //     const remainingSeconds = Math.floor(remainingMilliseconds / 1000) % 60;
        //     const remainingMinutes = Math.floor(remainingMilliseconds / 1000 / 60) % 60;
        //     const remainingHours = Math.floor((remainingMilliseconds / 1000 / 60 / 60) % 24);
        //     const remainingDays = Math.floor(remainingMilliseconds / 1000 / 60 / 60 / 24);
    
        //     setRemainingTime(`${remainingHours}: ${remainingMinutes}: ${remainingSeconds}`);
        //     setRemDays(remainingDays);
    
        //     if (remainingMilliseconds === 0) {
        //       clearInterval(countdownInterval);
        //     }
        //   }, 1000);
        // };
    
    //     calculateRemainingTime();
    
    //     return () => {
    //       clearInterval(countdownInterval);
    //     };
    // }, [val.date, val.duration]);
    
    //
    useEffect(() => {
      let countdownInterval;
    
      const calculateRemainingTime = () => {
        // const endTime = new Date(val.date).getTime() + val.duration * 24 * 60 * 60 * 1000;
          const endTime = new Date(val.endTime).getTime();
          countdownInterval = setInterval(() => {
          const currentTime = new Date().getTime();
          const remainingMilliseconds = Math.max(0, endTime - currentTime);
    
          const remainingSeconds = Math.floor((remainingMilliseconds / 1000) % 60);
          const remainingMinutes = Math.floor((remainingMilliseconds / 1000 / 60) % 60);
          const remainingHours = Math.floor((remainingMilliseconds / 1000 / 60 / 60) % 24);
          const remainingDays = Math.floor(remainingMilliseconds / 1000 / 60 / 60 / 24);
    
          const formattedRemainingTime = `${remainingHours
            .toString()
            .padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
            
          setRemainingTime(formattedRemainingTime);
            setRemDays(remainingDays);
          if (remainingMilliseconds === 0) {
            clearInterval(countdownInterval);
          }
        }, 1000);
      };
    
      calculateRemainingTime();
    
      return () => {
        clearInterval(countdownInterval);
      };
    }, [val.date, val.duration]);
    
  return (
    <>
        <Snackbar open={open1} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
          <Alert severity="success" sx={{ width: '100%' }}>
              Saved successfully!
          </Alert>
        </Snackbar>
        <Snackbar open={open3} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
          <Alert severity="success" sx={{ width: '100%' }}>
              Unsaved successfully!
          </Alert>
        </Snackbar>
        <Snackbar open={open2} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
          <Alert severity="success" sx={{ width: '100%' }}>
              Already Saved!
          </Alert>
        </Snackbar>
        <Snackbar open={loginOpen} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
          <Alert severity="error" sx={{ width: '100%' }}>
              Please Login or Register new account!
          </Alert>
        </Snackbar>
        <div className="single-blog">
            <NavLink to={`/products/${formattedTitle}`} target="_blank" >
              <div className="blog-img">
                <a ><img src={val.thumbnail} alt="" style={{borderRadius:'6px'}} /></a>
                <div className="blog-time">
                  <a className={remDays>0?'flex':''} style={{color:'black',width:remDays>0?'5.7rem':'6.7rem',fontSize: '16px',fontWeight: '600'}} >                
                      { remDays>0?<>
                          {remDays} days
                      </>:<>
                          {remainingTime}
                      </>
                      }
                  </a>
                  <a  className="blog-time-doler"> 
                  {   
                    val.category==='auction'? <>£{val.bids && val.bids.length>0 ? val.bids[0].price : 0}</>:
                    val.category==='buynow'?<>£{val.price}</>:
                    val.category==='comingsoon'?<></>:<></>
                  } </a>
                </div>
              </div>
            </NavLink>
            <div className="blog-top-fl">
              <span>{val.bids.length} Bids</span>
              <div className="blog-shear">
                  { userData.saved && userData.saved.length>0 && userData.saved.includes(val._id)?
                    <>
                      <svg onClick={unSaveProduct} style={{height:'1.5rem',cursor:'pointer',fill:'#15158e'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/></svg>
                      {/* <svg style={{height:'1.5rem',cursor:'pointer',fill:'blue'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"/></svg>                   */}
                    </>:<>
                      <svg onClick={saveProduct} style={{height:'1.5rem',cursor:'pointer',fill:'#15158e'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"/></svg>
                    </>
                  }
              </div>
            </div>
            <NavLink to={`/products/${formattedTitle}`} target="_blank" >
            <div className="blog-text">
              <h3 style={{height:'3rem'}} >{val.originalTitle}</h3>
              {/* <p> {val.summary} </p> */}
            </div>
            <div className="blog-text-last">
              <a style={{color:'black'}} ><i className="fas fa-steering-wheel" /> {val.side==='left'?<>LHD</>:val.side==='right'?<>RHD</>:<>CENTER</>  } </a>
              <a style={{color:'black'}} ><img src={flagUrl} style={{height:'1.2rem'}} alt="" /> {val.country} </a>
            </div>
            </NavLink>
        </div>
    </>
  )
}

export default ProductNavComp
