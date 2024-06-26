import React,{useContext, useState,useRef, useEffect} from 'react'
import { NavLink,useLocation,useNavigate } from 'react-router-dom'
import './Mybids.css'

import { userloggedIn } from './Context/Context'
import MydetailsForm from './Mybids/MyDetails/MydetailsForm';
import SavedComp from './Mybids/Watching/SavedComp';
import Billing from './Mybids/Billing/Billing';
import MyBidsLiveComp from './Mybids/MyBidsLiveComp';
import MyBidsExpiredComp from './Mybids/MyBidsExpiredComp';
import MyBidsWon from './Mybids/MyBidsWon';

function Mybids({getLoggedin}) {
    const { userlogged,setuserLogged,userData,setuserData,myBidsLive,myBidsExpired,myBidsSold } = useContext(userloggedIn);
    // console.log(userData);
    const billingbtn = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [tab,setTab] = useState('bids');
    const { activeTab } = location.state || { activeTab: "bids" };
    
    useEffect(()=>{
        if(activeTab==='billing'){
            setTab('billing');
        }
    },[])

  return (
    <> 
    <div className='my_info' >
        <div className="my_info_con">
            <div className='my_info_co_title' >MY ACCOUNT</div>
            <div className='my_info_item'>
                <div className="my_info_left">
                    <div className="mfl_circle">
                        <h2 style={{color:'white',margin:'0',fontSize:'1.7rem'}} >{userData.firstName.charAt(0)+userData.lastName.charAt(0)}</h2>
                    </div>
                </div>
                <div className="my_info_right">
                    <h1 style={{fontSize: "1.5rem",margin:'0',fontWeight:'700',height:'2.5rem',marginTop: "7px"}}>{userData.username}</h1>
                    <div style={{fontSize: "15px",fontWeight: "500",height:'2.5rem'}} >Member since {new Date(userData.RegisteredDate).toLocaleString('en-US', { month: 'long', year: 'numeric' })}</div>
                </div>
            </div>
        </div>

    </div>
    <div className="bids__area">
        <div className="bids__wrap">
        <div className="bids_tab">
            <ul className="nav bids-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
                <button className={`bids-link ${tab==='bids'?'active':''}`} id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">MY BIDS</button>
            </li>
            <li className="nav-item" role="presentation">
                <button className={`bids-link ${tab==='watching'?'active':''}`} id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">WATCHING</button>
            </li>
            <li className="nav-item" role="presentation">
                <button className={`bids-link ${tab==='listing'?'active':''}`} id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">MY LISTINGS</button>
            </li>
            <li className="nav-item" role="presentation">
                <button className={`bids-link ${tab==='details'?'active':''}`} id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact1" type="button" role="tab" aria-controls="contact1" aria-selected="false">MY DETAILS</button>
            </li>
            <li className="nav-item" role="presentation">
                <button className={`bids-link ${tab==='billing'?'active':''}`} id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact2" type="button" role="tab" aria-controls="contact2" aria-selected="false">BILLING</button>
            </li>
            </ul>
            <div className="tab-content" id="myTabContent">
            <div className={`tab-pane fade ${tab==='bids'?'show active':''}`} id="home" role="tabpanel" aria-labelledby="home-tab">
                <div className="bids__inner">
                { !userData.emailVerified &&
                    <div className="bids__top">
                        <p><i className="fas fa-envelope" />Your email has not been verified.</p>
                        <NavLink to="/email-verification">Click to verify</NavLink>
                    </div>
                }
                { userData.emailVerified && !userData.stripeVerified &&
                    <div className="bids__top">
                        <p><i className="fas fa-envelope" />You have not added any card in Billing.</p>
                        <a onClick={()=>{setTab('billing')}} style={{color:'black',textDecoration:'underline'}} >Click to add</a>
                    </div>
                }
                {/* <div className="bids__live">
                    <div className="bids__live__sisngle">
                    <h2>LIVE <span>(0)</span></h2>
                    <span>View<i className="fas fa-caret-right" /></span>
                    </div>
                    <div className="bids__live__sisngle">
                    <h2>WON <span>(0)</span></h2>
                    </div>
                    <div className="bids__live__sisngle">
                    <h2>LOST <span>(0)</span></h2>
                    </div>
                </div> */}
                <div className="detials__clps">
                    <div className="accordion" id="accordionExample">
                    <div className="detials-item">
                        <h2 className="detials-header" id="headingOne">
                        <button className="detials-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                            <h3>LIVE</h3>
                            <p>View<i className="fas fa-caret-right" /></p>
                        </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                { myBidsLive &&
                                    myBidsLive.map((product)=>{
                                        return(<>
                                            <MyBidsLiveComp product={product} userData={userData} />
                                        </>)
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="detials-item">
                        <h2 className="detials-header" id="headingTwo">
                        <button className="detials-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            <h3>WON</h3>
                            <p>View<i className="fas fa-caret-right" /></p>
                        </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                { myBidsSold &&
                                    myBidsSold.map((product)=>{
                                        return(<>
                                            <MyBidsWon product={product} userData={userData} />
                                        </>)
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="detials-item">
                        <h2 className="detials-header" id="headingThree">
                        <button className="detials-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            <h3>ENDED</h3>
                            <p>View<i className="fas fa-caret-right" /></p>
                        </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                { myBidsExpired &&
                                    myBidsExpired.map((product)=>{
                                        return(<>
                                            <MyBidsExpiredComp product={product} userData={userData} />
                                        </>)
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div className={`tab-pane fade ${tab==='watching'?'show active':''}`} id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <div className="bids__inner">
                { !userData.emailVerified &&
                    <div className="bids__top">
                        <p><i className="fas fa-envelope" />Your email has not been verified.</p>
                        <NavLink to="/email-verification">Click to verify</NavLink>
                    </div>
                }
                { userData.emailVerified && !userData.stripeVerified &&
                    <div className="bids__top">
                        <p><i className="fas fa-envelope" />You have not added any card in Billing.</p>
                        <a onClick={()=>{setTab('billing')}} style={{color:'black',textDecoration:'underline'}} >Click to add</a>
                    </div>
                }
                <div className="bids__car-detials">
                    { userData.saved.length>0 ?<>
                            {
                                userData.saved.map((val,ind)=>{
                                    return(
                                        <>
                                            <SavedComp val={val} ind={ind}/>
                                        </>
                                    )
                                })
                            }
                        </>:<>

                        </>
                    }
                    {/* <div className="bids__car__single">
                    <div className="bids__car__img">
                        <img src="assets/img/bids-page-img/c1.png" alt="" />
                    </div>
                    <div className="bids__car__content">
                        <h5>2022 PORSCHE 911 (992) GT3 TOURING '70 YEARS PORSCHE AUSTRALIA EDITION' 763 KM</h5>
                        <p>One of just 26 examples built specifically for the Australian market.</p>
                    </div>
                    <div className="bids__Car_status">
                        <div className="bids__car__single__status">
                        <p>Status</p>
                        <span>Sold</span>
                        </div>
                        <div className="bids__car__single__status">
                        <p>Status</p>
                        <span>Sold</span>
                        </div>
                        <div className="bids__car__single__status">
                        <p>Status</p>
                        <span>Sold</span>
                        </div>
                        <div className="bids__car__single__status">
                        <p>Status</p>
                        <span>Sold</span>
                        </div>
                    </div>
                    </div>
                    <div className="bids__car__single">
                    <div className="bids__car__img">
                        <img src="assets/img/bids-page-img/c1.png" alt="" />
                    </div>
                    <div className="bids__car__content">
                        <h5>2022 PORSCHE 911 (992) GT3 TOURING '70 YEARS PORSCHE AUSTRALIA EDITION' 763 KM</h5>
                        <p>One of just 26 examples built specifically for the Australian market.</p>
                    </div>
                    <div className="bids__Car_status">
                        <div className="bids__car__single__status">
                        <p>Status</p>
                        <span>Sold</span>
                        </div>
                        <div className="bids__car__single__status">
                        <p>Status</p>
                        <span>Sold</span>
                        </div>
                        <div className="bids__car__single__status">
                        <p>Status</p>
                        <span>Sold</span>
                        </div>
                        <div className="bids__car__single__status">
                        <p>Status</p>
                        <span>Sold</span>
                        </div>
                    </div>
                    </div>
                    <div className="bids__car__single last-bids">
                    <div className="bids__car__img">
                        <img src="assets/img/bids-page-img/c1.png" alt="" />
                    </div>
                    <div className="bids__car__content">
                        <h5>2022 PORSCHE 911 (992) GT3 TOURING '70 YEARS PORSCHE AUSTRALIA EDITION' 763 KM</h5>
                        <p>One of just 26 examples built specifically for the Australian market.</p>
                    </div>
                    <div className="bids__Car_status">
                        <div className="bids__car__single__status">
                        <p>Status</p>
                        <span>Sold</span>
                        </div>
                        <div className="bids__car__single__status">
                        <p>Status</p>
                        <span>Sold</span>
                        </div>
                        <div className="bids__car__single__status">
                        <p>Status</p>
                        <span>Sold</span>
                        </div>
                        <div className="bids__car__single__status">
                        <p>Status</p>
                        <span>Sold</span>
                        </div>
                    </div>
                    </div> */}
                </div>
                </div>
            </div>
            <div className={`tab-pane fade ${tab==='listing'?'show active':''}`} id="contact" role="tabpanel" aria-labelledby="contact-tab">
                <div className="bids__inner bids__bdr">
                <div className="bids__contact">
                    <p>Do you have a vehicle or automobilia that you'd like to consign? <br />Please contact us today.</p>
                    <a href="/sell-with-us">CONTACT US</a>
                </div>
                </div>
            </div>
            <div className={`tab-pane fade ${tab==='details'?'show active':''}`} id="contact1" role="tabpanel" aria-labelledby="contact-tab">
                <div className="bids__inner">
                { !userData.emailVerified &&
                    <div className="bids__top">
                        <p><i className="fas fa-envelope" />Your email has not been verified.</p>
                        <NavLink to="/email-verification">Click to verify</NavLink>
                    </div>
                }
                { userData.emailVerified && !userData.stripeVerified &&
                    <div className="bids__top">
                        <p><i className="fas fa-envelope" />You have not added any card in Billing.</p>
                        <a onClick={()=>{setTab('billing')}} style={{color:'black',textDecoration:'underline'}}>Click to add</a>
                    </div>
                }
                <div className="detials__clps">
                    <div className="accordion" id="accordionExample">
                    <div className="detials-item">
                        <h2 className="detials-header" id="headingOne">
                        <button className="detials-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                            <h3>My Details</h3>
                            <p>View<i className="fas fa-caret-right" /></p>
                        </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <div className="my__detials__box">
                                <MydetailsForm userData={userData} getLoggedin={getLoggedin} />
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="detials-item">
                        <h2 className="detials-header" id="headingTwo">
                        <button className="detials-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            <h3>Password</h3>
                            <p>View<i className="fas fa-caret-right" /></p>
                        </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <div className="my__detials__box">
                            <form action="#">
                                <div className="detials__fx">
                                <div className="setials__single">
                                    <label htmlFor="#">Current Password</label>
                                    <input type="password" placeholder />
                                    <div className="pass__btm">
                                    <a href="/login">Forgot your Password?</a>
                                    <a href="/login" className="shown">Show Password</a>
                                    </div>
                                </div>
                                <div className="setials__single">
                                    <label htmlFor="#">New Password</label>
                                    <input type="password" placeholder />
                                    <div className="pass__btm">
                                    <a href="/login" className="shown">Minimum of 8 characters</a>
                                    <a href="/login" className="shown">Show Password</a>
                                    </div>
                                </div>
                                </div>
                                <a href="/login" className="update-btn update-bg">Update</a>
                            </form>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="detials-item">
                        <h2 className="detials-header" id="headingThree">
                        <button className="detials-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            <h3>Email Subscriptions</h3>
                            <p>View<i className="fas fa-caret-right" /></p>
                        </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <div className="mail__confirm">
                            <div className="mail__chk__ct">
                                <h6>Would you like to receive the daily email briefing?</h6>
                                <div className="mail__confrm-check">
                                <p className="onoff"><input type="checkbox" defaultValue={1} id="checkboxID" /><label htmlFor="checkboxID" /></p>
                                </div>
                            </div>
                            {/* <div className="mail__chk__ct">
                                <h6>Would you like to receive the daily email briefing?</h6>
                                <div className="mail__confrm-check">
                                <p className="onoff"><input type="checkbox" defaultValue={1} id="checkboxID2" /><label htmlFor="checkboxID2" /></p>
                                </div>
                            </div>
                            <div className="mail__chk__ct">
                                <h6>Would you like to receive the daily email briefing?</h6>
                                <div className="mail__confrm-check">
                                <p className="onoff"><input type="checkbox" defaultValue={1} id="checkboxID3" /><label htmlFor="checkboxID3" /></p>
                                </div>
                            </div>
                            <div className="mail__chk__ct ct-mail-last">
                                <h6>Would you like to receive the daily email briefing?</h6>
                                <div className="mail__confrm-check">
                                <p className="onoff"><input type="checkbox" defaultValue={1} id="checkboxID4" /><label htmlFor="checkboxID4" /></p>
                                </div>
                            </div> */}
                            <a href="/login" className="update-btn">Update</a>
                            </div>
                        </div>
                        </div>
                    </div>
                    {/* <div className="detials-item">
                        <h2 className="detials-header" id="headingThree">
                        <button className="detials-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree1" aria-expanded="false" aria-controls="collapseThree">
                            <h3>My Details</h3>
                            <p>View<i className="fas fa-caret-right" /></p>
                        </button>
                        </h2>
                        <div id="collapseThree1" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <div className="mail__confirm">
                            <div className="mail__chk__ct">
                                <h6>Would you like to receive the daily email briefing?</h6>
                                <div className="mail__confrm-check">
                                <p className="onoff"><input type="checkbox" defaultValue={1} id="checkboxID6" /><label htmlFor="checkboxID6" /></p>
                                </div>
                            </div>
                            <div className="mail__chk__ct">
                                <h6>Would you like to receive the daily email briefing?</h6>
                                <div className="mail__confrm-check">
                                <p className="onoff"><input type="checkbox" defaultValue={1} id="checkboxID5" /><label htmlFor="checkboxID5" /></p>
                                </div>
                            </div>
                            <a href="/login" className="update-btn">Update</a>
                            </div>
                        </div>
                        </div>
                    </div> */}
                    </div>
                </div>
                </div>
            </div>
            <div className={`tab-pane fade ${tab==='billing'?'show active':''}`} id="contact2" role="tabpanel" aria-labelledby="contact-tab">
                <div className="bids__inner">
                    { !userData.emailVerified &&
                        <div className="bids__top">
                            <p><i className="fas fa-envelope" />Your email has not been verified.</p>
                            <NavLink to="/email-verification">Click to verify</NavLink>
                        </div>
                    }
                    { userData.emailVerified && !userData.stripeVerified &&
                        <div className="bids__top">
                            <p><i className="fas fa-envelope" />You have not added any card in Billing.</p>
                            <a onClick={()=>{setTab('billing')}} style={{color:'black',textDecoration:'underline'}}>Click to add</a>
                        </div>
                    }
                    <Billing />      
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>   
    </>

  )
}

export default Mybids
