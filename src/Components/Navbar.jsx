import React,{useContext,useEffect,useState} from 'react'
import './Navbar.css'
// import {NavLink} from 'react-router-dom'
import { BrowserRouter as Router, NavLink, useNavigate } from 'react-router-dom';
import { userloggedIn } from './Context/Context'

function Navbar() {
  const Navigate = useNavigate();
  const { userlogged,setuserLogged,url } = useContext(userloggedIn);
  const logout =async ()=>{
    const res = await fetch(`${url}logout`,{
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type":"application/json",
        "authToken": localStorage.getItem("authToken"),
      }
    });
    const data = await res.json();
    if(data){
      if(data.msg === "loggedOut"){
        localStorage.removeItem("authToken");
        setuserLogged(false);
        Navigate('/accounts/login');
      }
    }
  }
  // useEffect(()=>{
  //   const getLoggedin = async ()=>{
  //     const res = await fetch('/isloggedin',{
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type":"application/json",
  //         "authToken": localStorage.getItem("authToken"),
  //       }
  //     });
  //     const data = await res.json();
  //     // console.log(data);
  //     if(data.msg === "loggedin"){
  //       // setuserLogged(true);
  //       console.log("USER LOGGED");
  //     }else{
  //       console.log("USER NOT LOGGED");
  //       // setuserLogged(false);
  //     }
  //   }
  //   getLoggedin();
  // },[])
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
          <div className="overlay" />
          <div className="offcanva nav_slider">
            <div className='slider_head'>
              <div>
                <a href="/"><img style={{margin: '0 0.7rem',height:'4.5rem'}} src="/assets/img/site-logo.png" alt="" /></a>
              </div>
              <div className="cross">
                <a><svg style={{fill:'white'}} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg></a>
              </div>
            </div>
            <div className='slider-btn'>              
              { userlogged ?
                (<>
                  <a className='slider-btn1' style={{color:'white'}} href='/account/bids'>Accounts</a>
                  <a className='slider-btn2' style={{color:'white'}} onClick={()=>{logout()}}>Logout</a>
                </>):
                (<>
                  <a className='slider-btn1' style={{color:'white'}} href='/accounts/login'>Log in</a>
                  <a className='slider-btn2' style={{color:'white'}} href='/accounts/register'>Register</a>
                </>)
              }
            </div>
            <div className="offcanva--menu" style={{padding:'0'}} >
            <ul>
              <li> <a href='/'>Buy</a> </li>
              <li> <a href='/sell-with-us'>Sell</a> </li>
              <li> <a href='/articles'>News</a> </li>
              {/* <li> <NavLink to='/events'>Events</NavLink> </li> */}
              <li> <a href='/our-vision'>Our Vision</a> </li>
            </ul>
            </div>
          </div>

          <div style={{height: '83.33px'}}></div>
          {/* header-area-start */}          
          <div style={{position:'fixed',top:'0',width:'100%',
            backgroundColor:'white',
            boxShadow: isScrolling ? '0 -7px 14px 0px rgba(0,0,0,0.5)' : 'none',
            backgroundColor: isScrolling ? 'rgb(250 250 250 / 98%)' : 'white',
            backdropFilter: isScrolling ? 'blur(5px)' : '',
          }} className="header-area">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="header-fl">
                    <div className="site-logo">
                      <a href="/"><img className='nav-logo-height' style={{height:'5.2rem'}} src="/assets/img/site-logo.png" alt="" /></a>
                    </div>
                    <div className="bars">
                      <a><i className="fa fa-bars h25px" aria-hidden="true" /></a>
                    </div>
                    <div className="header-menu">
                      <ul>
                        <li> <NavLink to='/' onClick={()=>{window.scrollTo(0, 0)}} >Buy</NavLink> </li>
                        <li> <NavLink to='/sell-with-us' onClick={()=>{window.scrollTo(0, 0)}}> Sell</NavLink> </li>
                        <li> <NavLink to='/articles' onClick={()=>{window.scrollTo(0, 0)}}>News</NavLink> </li>
                        {/* <li> <NavLink to='/events'>Events</NavLink> </li> */}
                        <li> <NavLink to='/our-vision' onClick={()=>{window.scrollTo(0, 0)}} >Our Vision</NavLink> </li>
                        {/* <li> <NavLink to='/about'>About</NavLink> </li> */}
                      </ul>
                      <div className="header-btn">
                        { userlogged ?
                          (<>
                            <div className='btn-register' style={{cursor:'pointer'}} onClick={()=>{logout()}} >Logout</div>
                            <NavLink className='login' to='/account/bids' onClick={()=>{window.scrollTo(0, 0)}} >Account</NavLink>
                          </>):
                          (<>
                            <NavLink className='btn-register' to='/accounts/register' onClick={()=>{window.scrollTo(0, 0)}} >Register</NavLink>
                            <NavLink className='login' to='/accounts/login' onClick={()=>{window.scrollTo(0, 0)}} >Login</NavLink>
                          </>)
                        }
                        {/* <a className="login">Login</a> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* header-area-end */}
          {/* hero-banner-area-start */}
    </>
  )
}

export default Navbar
