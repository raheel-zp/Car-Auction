import React from 'react'
import {NavLink} from 'react-router-dom'
import { useContext } from 'react';
import { userloggedIn } from './Context/Context';

function Events() {
    const {userlogged,setuserLogged,userData,setuserData,url} = useContext(userloggedIn);
    const [Events,setEvents] = React.useState([]);
    const [EventsLoading,setEventsLoading] = React.useState(false);
  
    const allEvents = async ()=>{
        setEventsLoading(true);
        const res = await fetch(`${url}allEvents`,{
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type":"application/json",
          "authToken": localStorage.getItem("authToken"),
        }
        });
        const data = await res.json();
        if(data.msg === 'success'){
          setEvents(data.data);
        }
        setEventsLoading(false);
    }
      // allEvents();
    React.useEffect(()=>{
      allEvents();
    },[]);
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
        <link href="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.9/css/intlTelInput.css" rel="stylesheet" media="screen" />
        <link href="assets/css/all.min.css" rel="stylesheet" />
        <link href="assets/css/fontawesome.css" rel="stylesheet" />
        <link href="assets/css/owl.carousel.min.css" rel="stylesheet" />
        <link href="assets/css/nice-select.css" rel="stylesheet" />
        <link href="assets/css/default.css" rel="stylesheet" />
        <link href="assets/css/style.css" rel="stylesheet" />
        <link href="assets/css/responsive.css" rel="stylesheet" />

        <div className="event-banner" style={{backgroundImage: 'url(assets/img/h1.png)'}}>
            <div className="event-banner-text">
            <h3>AUTO AUCTIONS EVENTS</h3>
            <img src="assets/img/ev-icon.png" alt="" />
            </div>
        </div>
        {/* event-banner-end */}
        {/* event-area-start */}
        { EventsLoading &&
            <div style={{height:'20rem',position: "relative"}} className='flex'>
                <div class="loader-5-colored center" ><span></span></div>
            </div>
        }
        {  Events.length === 0 &&
            <div className="flex_wrap" style={{position:'relative',height:'20rem',display: "flex",justifyContent: "center",alignItems: "center",zIndex:'-1',width:"100%",}}>
                {/* <iframe style={{height:'13rem'}} src="https://embed.lottiefiles.com/animation/93121"></iframe> */}
                <iframe style={{height:'13rem'}} src="https://embed.lottiefiles.com/animation/134394"></iframe>
            </div>
        }
        { !EventsLoading && Events.length !== 0 &&
        <div className="event-area">
            <div className="container">
            <div className="row">
                <div className="col-lg-12">
                <div className="event-fl">                                                          
                    {
                        Events.map((val,ind)=>{
                            return(<>
                                <div className="single-event">
                                    <NavLink to={`/events/${val.title.split(' ').join('-')}`} target="_blank" >
                                        <div className="event-img">
                                            <img src={val.images[0]} alt=""/>
                                        </div>
                                        <div className="event-text">
                                            <h3 style={{height:"3rem",overflow:"hidden",textTransform:'uppercase'}}>{val.title}</h3>
                                            <a style={{color:'black'}} >Read More</a>
                                        </div>
                                    </NavLink>
                                </div>
                            </>)
                        })
                    }
                </div>
                </div>
            </div>
            </div>
        </div>
        }
    </>
  )
}

export default Events
