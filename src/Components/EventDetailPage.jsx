import React, {useContext} from 'react'
import { useParams, NavLink } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { userloggedIn } from './Context/Context';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function EventDetailPage() {
    const {userlogged,setuserLogged,userData,setuserData,url} = useContext(userloggedIn);
    const { title } = useParams();
    const [Events,setEvents] = React.useState('');
    const [OtherEvents,setOtherEvents] = React.useState([]);
    const [loading,setloading] = React.useState(false);
    const [loading2,setloading2] = React.useState(false);
    //Form data
    const [name,setname] = React.useState('');
    const [email,setemail] = React.useState('');
    const [phone,setphone] = React.useState('');
    const [vehicle,setvehicle] = React.useState('');
    const [registration,setregistration] = React.useState('');
    const [instagram,setinstagram] = React.useState('');
    const [notes,setnotes] = React.useState('');
    const [image,setimage] = React.useState(null);
    // success message snackbar
    const [open,setopen] = React.useState(false);
    // failure message snackbar
    const [open1,setopen1] = React.useState(false);
    // dublicate message snackbar
    const [open2,setopen2] = React.useState(false);

    const submitform = async (event)=>{
        event.preventDefault();
        setloading2(true);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        // formData.append('description', description);
        formData.append('phone', phone );
        formData.append('vehicle', vehicle );
        formData.append('registration', registration );
        formData.append('instagram', instagram );
        formData.append('notes', notes );
        formData.append('image', image);

        const res = await fetch(`${url}eventRegistry/${Events._id}`,{
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          // console.log(data);
          setloading2(false);
          if(data.msg==='success'){
            setopen(true);
            window.scrollTo(0,0);            
            setname('');
            setemail('');
            setphone('');
            setregistration('');
            setinstagram('');
            setnotes('');
            setvehicle('');
            setTimeout(() => {
                setopen(false);
                setopen2(false);
                setopen1(false);
            }, 3000);
        }else if(data.msg==='dublicate'){
              setopen2(true);
              setTimeout(() => {
                  setopen(false);
                  setopen1(false);
                  setopen2(false);
              }, 3000);            
            }else{
            setopen1(true);
            setTimeout(() => {
                setopen(false);
                setopen1(false);
                setopen2(false);
            }, 3000);
          }
        }

    // console.log(title);
    const originalTitle = title.split('-').map(word => word.charAt(0) + word.slice(1)).join(' ');
    // console.log(originalTitle);
    const getEventsByTitle = async ()=>{
        setloading(true);
        const res = await fetch(`${url}getEventsByTitle/${originalTitle}`,{
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type":"application/json",
        }
        });
        const data = await res.json();
        setloading(false);
        if(data.msg === 'success'){
            setEvents(data.data);
            setOtherEvents(data.otherEvents);
        }
    }
    React.useEffect(()=>{
        getEventsByTitle();
    },[])
  return (
    <>
        <div className="event-banner" style={{backgroundImage: 'url(/assets/img/h1.png)'}}>
          <div className="event-banner-text">
            <h3>AUTO AUCTIONS EVENTS</h3>
            <img src="/assets/img/ev-icon.png" alt="" />
          </div>
        </div>
        <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
            <Alert severity="success" sx={{ width: '100%' }}>
                Thank you! Registered Successfully!
            </Alert>
        </Snackbar>
        <Snackbar open={open1} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
            <Alert severity="error" sx={{ width: '100%' }}>
                There is an error!
            </Alert>
        </Snackbar>
        <Snackbar open={open2} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
            <Alert severity="error" sx={{ width: '100%' }}>
                User already Registered!
            </Alert>
        </Snackbar>
        { Events?(
        <div className="event-det-area">
            <div className="container">
                <div className="row">
                <div className="col-lg-12">
                    <div className="event-det-fl">
                    <div className="event-det-blog">
                        <h3 style={{textTransform:'uppercase',fontWeight:'bold'}}>{Events.title}</h3>
                        <img style={{width:'100%'}} src={Events.images[0]} alt="" />
                        <p> {Events.para1} </p>
                        <img style={{width:'100%'}} src={Events.images[1]} alt="" />
                        <p> {Events.para2} </p>
                        <img style={{width:'100%'}} src={Events.images[2]} alt="" />
                        <p> {Events.para3} </p>
                        <img style={{width:'100%'}} src={Events.images[3]} alt="" />
                        <p> {Event.para4} </p>
                        <a><i className="far fa-share-alt" />Share</a>
                    </div>
                    <div className="event-foem">
                        <div className="event-form-title">
                        <h3>JOIN US AT THE EVENT</h3>
                        </div>

                        <form onSubmit={submitform} encType="multipart/form-data" >
                            <div className="event-form-input">
                                <label htmlFor="#">Full Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Your Full name"
                                    name='name'
                                    required
                                    autoCorrect='false'
                                    onChange={(e)=>{setname(e.target.value)}}
                                    value={name}
                                />
                            </div>
                            <div className="event-form-input">
                                <label htmlFor="#">Email address</label>
                                <input 
                                    type="email" 
                                    placeholder="Your Email address"
                                    name='email'
                                    required
                                    autoCorrect='false'
                                    onChange={(e)=>{setemail(e.target.value)}}
                                    value={email}                                        
                                    />
                            </div>
                            <div className="event-form-input">
                                <div className="hero-form-fls">
                                <div className="single-form-item">
                                    <label htmlFor="#">Phone Number</label>
                                    <div className="single-input">
                                    <input 
                                        id="phone"
                                        type="tel"
                                        name='phone'
                                        required
                                        value={phone}
                                        autoCorrect='false'
                                        onChange={(e)=>{setphone(e.target.value)}}
                                        />
                                    <span id="valid-msg" className="hide">Valid</span>
                                    <span id="error-msg" className="hide">Invalid number</span>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="event-form-input">
                                <label htmlFor="#">Your vehicle</label>
                                <input 
                                    type="text" 
                                    placeholder="Your vehicle"
                                    name='vehicle'
                                    value={vehicle}
                                    autoCorrect='false'
                                    onChange={(e)=>{setvehicle(e.target.value)}}
                                    />
                            </div>
                            <div className="event-form-input">
                                <label htmlFor="#">What is your vehicle's license plate or registration?</label>
                                <input 
                                    type="text" 
                                    placeholder="Your Answer..."
                                    name='registration'
                                    autoCorrect='false'
                                    required
                                    value={registration}
                                    onChange={(e)=>{setregistration(e.target.value)}}
                                    />
                            </div>
                            <div className="event-form-input">
                                <label htmlFor="#">Do you have an image of the vehicle? (optional)</label>
                                <div className="event-form-brow">
                                <label htmlFor="fileButton1" style={{cursor:'pointer',width: "8rem",display: "flex",justifyContent: "center",border: "1px solid #bebebe",backgroundColor: "whitesmoke"}} >
                                    <a>Choose File</a>
                                </label>
                                <input 
                                    type="file" 
                                    id="fileButton1"
                                    name='image'
                                    onChange={(e)=>{setimage(e.target.files[0])}}
                                    />
                                </div>
                            </div>
                            <div className="event-form-input">
                                <label htmlFor="#">If you have one, what is your Instagram handle? (We'd love to share
                                pictures of your car!) (optional)</label>
                                <input 
                                    type="text" 
                                    placeholder="Your Answer..."
                                    name="instagram"
                                    autoCorrect='false'
                                    onChange={(e)=>{setinstagram(e.target.value)}}
                                    />
                            </div>
                            <div className="event-form-input">
                                <label htmlFor="#">Notes (optional)</label>
                                <textarea 
                                    name='notes'
                                    autoCorrect='false'
                                    onChange={(e)=>{setnotes(e.target.value)}}
                                    id
                                    cols={30}
                                    rows={10}
                                    defaultValue={""} />
                            </div>
                            <div className="event-form-input">
                                <label className="containers">I confirm that I have read and agree to the event rules.
                                <input type="checkbox" />
                                <span className="checkmark" />
                                </label>
                            </div>
                            <div className="event-form-input">
                                <p>By registering to attend you are indicating that you would like to receive news,
                                offers and promotions from Collecting Cars and you agree to our <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy.</a></p>
                                <p>You can unsubscribe at any time.</p>
                            </div>
                            <div className="event-form-btn">
                                <button disabled={loading2} type="submit"> {loading2?"SUBMITTING":"SUBMIT"} </button>
                            </div>
                        </form>

                    </div>
                    </div>
                    <div className="event-prv">
                    <NavLink to='/events' ><i className="far fa-chevron-left" />ALL EVENTS</NavLink>
                    </div>
                </div>
                </div>
            </div>
        </div>
        ):(<></>)
        }
        {/* event-more-area-start */}
        { !loading &&
        <div className="event-more-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="event-more-title">
                  <h3>More Events</h3>
                </div>
                <div className="event-fl">
                {
                    OtherEvents.map((val,ind)=>{
                        return(<>
                        <div className="single-event">
                            <NavLink to={`/events/${val.title.split(' ').join('-')}`} target="_blank" >
                                <div className="event-img">
                                <img src={val.images[0]} alt="" />
                                </div>
                                <div className="event-text">
                                <h3 style={{height:"3rem",overflow:"hidden"}} > {val.title} </h3>
                                <a>Read More</a>
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
        {/* event-more-area-end */}
    </>
  )
}

export default EventDetailPage
