import React,{useState,useContext} from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom'
import Navbar from './Navbar';
import { userloggedIn } from './Context/Context';

function Register() {
    const {userlogged,setuserLogged,userData,setuserData,url} = useContext(userloggedIn);
    const Navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const [agreed,setagreed] = useState(false);
    const [showPassword,setshowPassword,] = useState(false);
    // window.scrollTo(0, 0);
    const SignUpSchema = Yup.object({
      firstName: Yup.string().min(2).max(20).required("Field required"),
      lastName: Yup.string().min(2).max(20).required("Field required"),
      username: Yup.string().min(2).max(20).required("Field required"),
      email: Yup.string().required("Field required"),
      password: Yup.string().min(8).max(50).required("Field required").matches(/[A-Z]/, 'Must contain one uppercase').matches(/(\d)/, 'Must contain one number'),
      //confirmpassword: Yup.string().oneOf([Yup.ref("password"),null],"Passwords not matching").required("Please enter your Password"),
    });
    const initialValue = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    }
    const [alreadyRegistered,setAlreadyRegistered] = useState(false);
    const [registeredSuccessfully,setRegisteredSuccessfully] = useState(false);
  
    const {values, errors, touched, handleChange, handleBlur, handleSubmit} = useFormik({
      initialValues: initialValue,
      validationSchema: SignUpSchema,
      onSubmit: (values)=>{
        setLoading(true);
            console.log(values);
            const submitform = async () => {
              const res = await fetch(`${url}signup`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              });
              const data = await res.json();
            //   console.log(data);
              setLoading(false);
              if(data.msg === 'User Already Registered'){
                window.scrollTo(0,0);
                  console.log(data);
                  setAlreadyRegistered(true);
                  setRegisteredSuccessfully(false);
                  
                  setTimeout(() => {
                      setAlreadyRegistered(false);
                      setRegisteredSuccessfully(false);
                  }, 5000);
              }
              if(data.msg==='User Registered Successfuly.'){
                  // setuserLogged(true);
                //window.scrollTo(0,0);
                  localStorage.setItem("authToken",data.authToken);
                  setAlreadyRegistered(false);
                  setRegisteredSuccessfully(true);
                  Navigate('/accounts/login');
                  setTimeout(() => {
                    setAlreadyRegistered(false);
                    setRegisteredSuccessfully(false);
                }, 5000);
              }
            };
            submitform();
      },
      });
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
            
            <div className="login-area register">
                <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                    <div className="login-box" style={{position:'relative'}}>
                        { registeredSuccessfully &&
                            <div className='sign_up_success_msg'>
                                User Registered Successfully
                            </div>
                        }
                        { alreadyRegistered &&
                            <div className='sign_up_already_exist_msg'>
                                Email already Registered
                            </div>
                        }
                        <div className="reg-top-text text-center">
                        <h3>Already registered?</h3>
                        <NavLink to='/accounts/login' >Login Here</NavLink>
                        </div>
                        <div className="login-title">
                            <h3>register</h3>
                            <p>Create an account to watch auctions, to bid or to sell.</p>
                        </div>
                        <div className="login-form">
                        <form onSubmit={handleSubmit}>
                            <div className="single-reg-fl">
                            <div className="single-login-input">
                                <label htmlFor="#">First Name</label>
                                <div className="single-input">
                                <input type="text" 
                                    placeholder
                                    autoCorrect="false"
                                    id="firstName"
                                    name="firstName"
                                    autoComplete="off"
                                    spellCheck='false'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.firstName}
                                     />
                                <div className="error_para">{errors.firstName && touched.firstName ? errors.firstName:null}</div>
                                </div>
                            </div>
                            <div className="single-login-input">
                                <label htmlFor="#">Last Name</label>
                                <div className="single-input">                                
                                <input type="text" 
                                    placeholder 
                                    autoCorrect="false"
                                    id="lastName"
                                    name="lastName"
                                    autoComplete="off"
                                    spellCheck='false'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.lastName}    
                                    />
                                <div className="error_para">{errors.lastName && touched.lastName ? errors.lastName:null}</div>
                                </div>
                            </div>
                            </div>
                            <div className="single-login-input">
                            <label htmlFor="#">Email Address</label>
                            <div className="single-input">
                                <input type="email" 
                                    autoCorrect="false"
                                    id="email"
                                    name="email"
                                    autoComplete="off"
                                    spellCheck='false'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    placeholder 
                                    />
                                    <div className="error_para">{errors.email && touched.email ? errors.email:null}</div>
                            </div>
                            </div>
                            <div className="single-login-input">
                            <label htmlFor="#">Choose a Username</label>
                            <div className="single-input">
                                <input type="text" 
                                    autoCorrect="false"
                                    id="username"
                                    name="username"
                                    autoComplete="off"
                                    spellCheck='false'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.username}
                                    placeholder />
                                <div className="error_para">{errors.username && touched.username ? errors.username:null}</div>
                            </div>
                            </div>
                            <div className="single-login-input">
                            <label htmlFor="#">Password</label>
                            <div className="single-input">
                                <input type={showPassword?"text":"password"} 
                                    autoCorrect="false"
                                    id="password"
                                    name="password"
                                    autoComplete="off"
                                    spellCheck='false'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    placeholder="Password" />
                                <div className="error_para">{errors.password && touched.password ? errors.password:null}</div>
                            </div>
                            <div className="login-forget fls">
                                <a href="#">Minimum of 8 characters</a>
                                { !showPassword &&
                                    <a style={{cursor:'pointer'}} onClick={()=>{setshowPassword(true)}} >Show Password</a>
                                }
                                { showPassword &&
                                    <a style={{cursor:'pointer'}} onClick={()=>{setshowPassword(false)}} >Hide Password</a>
                                }
                            </div>
                            </div>
                            <div className="single-login-check fls">
                            <label className="containers">I agree to the applicable <a href="/terms-and-conditions">Terms and Conditions</a>
                                <p>I acknowledge that my personal data will be collected and processed in accordance with our <a href="/privacy-policy">Privacy Policy</a> and <a href="/cookie-policy">Cookie Policy</a>.</p>
                                <input 
                                    type="checkbox"
                                    checked={agreed} 
                                    onChange={()=>{setagreed(!agreed)}}
                                />
                                <span className="checkmark" />
                            </label>
                            </div>
                            <div className="login-btn">
                                <button disabled={loading || !agreed} type="submit" > { loading?
                                  'Submitting':'Register'}
                                </button>
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </>
   )
}

export default Register
