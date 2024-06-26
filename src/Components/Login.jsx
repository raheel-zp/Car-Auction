import React,{useEffect,useState,useContext} from 'react'
import { BrowserRouter as Router, NavLink,useNavigate} from 'react-router-dom';
import { userloggedIn } from './Context/Context';
// const {userlogged,setuserLogged,userData,setuserData,url} = useContext(userloggedIn);

function Login() {
  const homeapi = async ()=>{
    const res = await fetch(`${url}/home`,{
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type":"application/json",
      }
      });
      const data = await res.json();
      if(data.msg === 'success'){
        // Navigate('/');
        console.log("HOME");
      }
  }
  const {userlogged,setuserLogged,userData,setuserData,url} = useContext(userloggedIn);
  const [loading,setLoading] = useState(false);
  const [toggleEye,setToggleEye] = useState(false);
  //const Navigate = useNavigate;
  window.scrollTo(0, 0);
  const [formdata,setformdata] = useState({
    email:"",
    password:"",
  })
  function changeValue(event){
    const {name,value} = event.target;
    setformdata({
      ...formdata,
      [name]: value,
    });
  }
  const [errorTrigger,setErrorTrigger] = useState(false);
  const [error,setError] = useState(null);
  const Navigate = useNavigate();
  
  const submitform = async (event)=>{
    setLoading(true);
    event.preventDefault();
    const res = await fetch(`${url}login`,{
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(formdata),
    });
    const data = await res.json();
    // console.log(data);
    setLoading(false);
    if(data.msg === "Invalid Credentials"){
      setError(data.msg)
      setErrorTrigger(true);
    }else if(data.msg === 'success'){
      // Logged in Successfully
      setuserLogged(true);
      localStorage.setItem("authToken",data.authToken);
      //window.location.reload();
      console.log(data.user);
      setuserData(data.user);
      if(data.user.email==='admin@gmail.com'){
        Navigate('/admin');
      }else{
        Navigate('/account/bids');
      }
      // window.location.href = "/"
    }else{}
    setTimeout(() => {
      setErrorTrigger(false);
    }, 3000);
  }
  useEffect(()=>{
    // homeapi();
  },[])
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
        <div className="login-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="login-box" style={{position:'relative',padding:'50px 48px'}}>
                  { errorTrigger &&
                  <div className='sign_up_already_exist_msg'>
                      { error }
                  </div>
                  }
                  <div className="login-title">
                    <h3>welcome back</h3>
                    <p>Please sign in to your account.</p>
                  </div>
                  <div className="login-form">
                    <form onSubmit={submitform}>
                      <div className="single-login-input">
                        <label htmlFor="email">Email Address</label>
                        <div className="single-input">
                          <input 
                            type="email" 
                            placeholder="Email address"
                            required
                            id='email'
                            name='email'
                            onChange={changeValue}
                            value={formdata.email}                            
                            />
                        </div>
                      </div>
                      <div className="single-login-input">
                        <label htmlFor="id_password">Password</label>
                        <div className="single-input">
                          <input 
                            type={toggleEye?'text':'password'}
                            placeholder="Password" 
                            name="password" 
                            autoComplete="current-password"
                            required
                            id="id_password"
                            onChange={changeValue} 
                            value={formdata.password}
                            />
                          <a> 
                            { toggleEye?<>
                              <svg onClick={()=>{setToggleEye(false)}} style={{cursor:'pointer'}} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/></svg>
                            </>:<>
                              <svg onClick={()=>{setToggleEye(true)}} style={{cursor:'pointer'}} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z"/></svg>
                            </>
                            }
                          </a>
                        </div>
                        <div className="login-forget">
                          <NavLink to='/forgot-password'>Forgot your Password?</NavLink>
                        </div>
                      </div>
                      <div className="single-login-check">
                        <label className="containers">Keep me signed in
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                      </div>
                      <div className="login-btn">
                        <button disabled={loading} type="submit" > { loading?
                          'logging':'login'}
                        </button>
                      </div>
                      {/* <div className="login-btn">
                          <button disabled={!loading} type="submit" > { !loading?
                            <div class="loader-5-colored" style={{margin:'auto'}} ><span></span></div>:'login'}
                          </button>                        
                      </div> */}
                      <div className="login-text">
                        <p>Don't have an account yet?</p>
                      </div>
                      <div className="login-last-reg">
                        <NavLink to='/accounts/register' >Register Here</NavLink>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* login-area-end */}
        {/* footer-area-start */}
        {/* <div className="footer-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="footer-fl">
                  <div className="single-footer-wedget">
                    <div className="wedget-title">
                      <h3>Buy</h3>
                    </div>
                    <div className="wedget-item">
                      <ul>
                        <li><a href="/login">Live Auctions</a></li>
                        <li><a href="/login">Deal Now</a></li>
                        <li><a href="/login">Coming Soon</a></li>
                        <li><a href="/login">Recently Sold</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="single-footer-wedget">
                    <div className="wedget-title">
                      <h3>Sell</h3>
                    </div>
                    <div className="wedget-item">
                      <ul>
                        <li><a href="/login">Sell with us</a></li>
                        <li><a href="/login">Shipping</a></li>
                        <li><a href="/login">Managed Service</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="single-footer-wedget">
                    <div className="wedget-title">
                      <h3>News &amp; Events</h3>
                    </div>
                    <div className="wedget-item">
                      <ul>
                        <li><a href="/login">Articles</a></li>
                        <li><a href="/login">Podcasts</a></li>
                        <li><a href="/login">Events</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="single-footer-wedget">
                    <div className="wedget-title">
                      <h3>About</h3>
                    </div>
                    <div className="wedget-item">
                      <ul>
                        <li><a href="/login">Our Journey</a></li>
                        <li><a href="/login">Careers</a></li>
                        <li><a href="/login">Press Cuttings</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="single-footer-wedget">
                    <div className="wedget-title">
                      <h3>Support</h3>
                    </div>
                    <div className="wedget-item">
                      <ul>
                        <li><a href="/login">Help &amp; FAQs</a></li>
                        <li><a href="/login">Contact Us</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="single-footer-wedget">
                    <div className="wedget-title">
                      <h3>Legal</h3>
                    </div>
                    <div className="wedget-item">
                      <ul>
                        <li><a href="/login">Imprint</a></li>
                        <li><a href="/login">Privacy Policy</a></li>
                        <li><a href="/login">Terms &amp; Conditions</a></li>
                        <li><a href="/login">Posting Rules</a></li>
                        <li><a href="/login">Cookie Policy</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="single-footer-wedget">
                    <div className="wedget-title">
                      <h3>Settings</h3>
                    </div>
                    <div className="wedget-item">
                      <div className="footer-select">
                        <select>
                          <option data-display="English (EN)">English (EN)</option>
                          <option value={1}>Some option</option>
                          <option value={2}>Another option</option>
                          <option value={3} disabled>A disabled option</option>
                          <option value={4}>Potato</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="footer-copy">
                  <div className="copy">
                    <p>autoauction © CopyRight 2023</p>
                  </div>
                  <div className="footer-reate">
                    <h3>Excellent</h3>
                    <div className="ster">
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="far fa-star" /></a>
                    </div>
                    <p>614 reviews</p>
                  </div>
                  <div className="footer-socail">
                    <a href="/login"><i className="fab fa-youtube" /></a>
                    <a href="/login"><i className="fab fa-instagram" /></a>
                    <a href="/login"><i className="fab fa-facebook-f" /></a>
                    <a href="/login"><i className="fab fa-twitter" /></a>
                    <a href="/login"><i className="fab fa-instagram" /></a>
                    <a href="/login"><i className="fab fa-linkedin-in" /></a>
                    <a href="/login"><i className="fab fa-pinterest-p" /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* footer-area-end */}
        {/* jQuery first, then Popper.js, then Bootstrap JS */}
      </>
    );
}

export default Login
