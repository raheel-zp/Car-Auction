import React,{useContext, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Navbar from '../Navbar'
import SellForm from './SellForm';
import { userloggedIn } from '../Context/Context'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// import { userloggedIn } from './Context/Context';
import './SellMain.css'
import { Helmet } from 'react-helmet';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SellMain() {
  // const {url} = useContext(userloggedIn);
  const {userData,url,userlogged,setuserLogged,setuserData,getLoggedin} = useContext(userloggedIn);
  const [openSell2,setopenSell2] = useState(false);
  const [successMsg,setsuccessMsg] = useState(false);
  const [loading,setloading] = useState(false);
  const Navigate = useNavigate();
  const [open,setopen] = useState(false);
  const [images, setImages] = React.useState([]);
  const [imageURLs, setImageURLs] = React.useState([]);

  const [formdata,setformdata] = useState({
    firstName:"",
    lastName:"",
    email:"",
    phone:"",
    category:"",
    carMake:"",
    carModel:"",
    notes:"",
  })

const [imageShow, setImageShow] = useState(null);
// const [progress,setprogress] = useState(null);
const [disableSubmit,setdisableSubmit] = useState(false);

const handleImage = (e) => {
  const files = Array.from(e.target.files);
  setImages([...images, ...files]);

  const tempURLs = files.map((file) => URL.createObjectURL(file));
  setImageURLs([...imageURLs, ...tempURLs]);
}

function changeValue(event){
    const {name,value} = event.target;
    setformdata({
      ...formdata,
      [name]: value,
    });
    console.log(formdata);
}
const submitform = async (event)=>{
    event.preventDefault();
    if(!userlogged){
      Navigate(`/accounts/login`);
      // setloginOpen(true);
      // setTimeout(() => {
      //   setloginOpen(false);
      // }, 10000);
      return;
    }
    if( formdata.email==='' || formdata.firstName==='' || formdata.lastName===''){
      setopen(true);
      setTimeout(() => {
        setopen(false);
      }, 3000);
      setopenSell2(false);
      return;      
    }
    setloading(true);
    const formData = new FormData();
    formData.append('firstName', formdata.firstName);
    formData.append('lastName', formdata.lastName);
    formData.append('email', formdata.email);
    formData.append('phone', formdata.phone);
    formData.append('category', formdata.category);
    formData.append('carMake', formdata.carMake);
    formData.append('carModel', formdata.carModel);
    formData.append('notes', formdata.notes);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    const res = await fetch(`${url}sellInquiry/${userData._id}`,{
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    // console.log(data);
    setloading(false);
    if(data.msg==='success'){
      // console.log("SUCCESS");
      setImages([]);
      window.scrollTo(0,0);
      setsuccessMsg(true);
      setformdata({
          firstName:"",
          lastName:"",
          email:"",
          phone:"",
          category:"",
          carMake:"",
          carModel:"",
          notes:"",
      });
    }
    setTimeout(() => {
    }, 3000);
}
const handleClose=()=>{
  setsuccessMsg(false);
  setopenSell2(false);
}

  return (
    <>
      <Helmet>
        <title>Discover online car auctions: List free, Sell Fast!</title>
        <meta
          name='description'
          content='Looking to sell your car fast online? List your car for free and get started now! 
            Maximise your profits with Auto Auctions, register today!'
        />
        <link rel='canonical' href='/sell-with-us' />
      </Helmet>
        
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
        <link href="assets/css/tel.css" rel="stylesheet" />
        <link href="assets/css/default.css" rel="stylesheet" />
        {/* <link href="assets/css/style.css" rel="stylesheet" /> */}
        <link href="assets/css/responsive.css" rel="stylesheet" />
        <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
          <Alert severity="error" sx={{ width: '100%' }}>
            Please enter all fields!
          </Alert>
        </Snackbar>
        {/* hero-area-start */}
        <div className="hero-area" style={{backgroundImage: 'url(assets/img/bg-2.webp)'}}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="hero-fl">
                  <div className="hero-title">
                    <h3>UNLOCK YOUR CARS VALUE<span>.</span></h3>
                    <h3>LIST FREE, SELL FAST<span>.</span></h3>
                    <h3>MAXIMISE PROFIT<span>.</span></h3>
                  </div>
                  { successMsg &&
                    <div className="hero-form">
                      <div className="hero-form-containt">
                          <p><a href="#"><i className="fal fa-check"></i></a> Thank you, one of our team will soon be in touch with you to discuss
                              the next stage of the process.</p>
                          <a style={{color:'white',cursor:'pointer'}} onClick={handleClose} >SUBMIT NEW ENQUIRY</a>
                      </div>
                    </div>}
                  { !successMsg &&
                    <div className="hero-form">
                    <SellForm formdata={formdata} setformdata={setformdata} loading={loading} submitform={submitform} handleImage={handleImage}
                      changeValue={changeValue} images={images} setloading={setloading} openSell2={openSell2} setopenSell2={setopenSell2}
                      disableSubmit={disableSubmit} setdisableSubmit={setdisableSubmit}
                    />
                    </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* hero-area-end */}
        {/* how-work-area-start */}
        <div className="how-work-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="how-work-fl" style={{justifyContent:'center'}} >
                  <div className="how-work-left" style={{width: '50%'}} >
                    <div className="how-work-title">
                      <h3 className='ta_center' >HOW WE WORK</h3>
                      <p className='ta_center' >Selling with us is simple.</p>
                    </div>
                    <div className="how-work-step">
                      <div className="single-how-work-step">
                        <a href="/sell-with-us">1 <span className='fix_arrow_1' ><i className="fas fa-arrow-right" /></span></a>
                        <p>We will contact you</p>
                      </div>
                      <div className="single-how-work-step">
                        <a href="/sell-with-us">2 <span><i className="fas fa-arrow-right" /></span></a>
                        <p>Arrange photographer to come to you</p>
                      </div>
                      <div className="single-how-work-step">
                        <a href="/login">3 <span><i className="fas fa-arrow-right" /></span></a>
                        <p>We advertise professionally</p>
                      </div>
                      {/* <div className="single-how-work-step">
                        <a href="/login">4 <span><i className="fas fa-arrow-right" /></span></a>
                        <p>We will contact you</p>
                      </div> */}
                      <div className="single-how-work-step active fix_arrow_4">
                        <a href="/sell-with-us"> <img style={{borderRadius:'50%'}} src="/assets/img/i3.jpg" alt="" /> <span><i className="fas fa-arrow-right" /></span></a>
                        <p>Your car sold within 7 days of going live</p>
                      </div>
                    </div>
                  </div>
                  <div className="how-work-right" style={{display:'none'}} >
                    {/* <iframe width={1264} height={711} src="https://www.youtube.com/embed/2zsVyvdwOMA" title="Preowned Vehicles" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* how-work-area-end */}
        {/* number-area-start */}
        {/* <div className="number-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="number-title">
                  <h3>by the numbers</h3>
                </div>
                <div className="number-fl">
                  <div className="single-number">
                    <h3>$470M+</h3>
                    <p>WORTH OF LOTS SOLD</p>
                  </div>
                  <div className="single-number">
                    <h3>$470M+</h3>
                    <p>WORTH OF LOTS SOLD</p>
                  </div>
                  <div className="single-number">
                    <h3>$470M+</h3>
                    <p>WORTH OF LOTS SOLD</p>
                  </div>
                  <div className="single-number">
                    <h3>$470M+</h3>
                    <p>WORTH OF LOTS SOLD</p>
                  </div>
                  <div className="single-number">
                    <h3>$470M+</h3>
                    <p>WORTH OF LOTS SOLD</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* number-area-end */}
        {/* use-area-start */}
        <div className="use-area"  >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="use-title">
                  <h3 className='ta_center' >WHY USE US?</h3>
                </div>
                <div className="use-elem">
                  <div className="use-elem-con">
                    <div className='use-el-1' >
                      <img src="/assets/img/i3.jpg" alt="" />
                      <div className="use-text">
                        <h3>COMPLETELY FREE</h3>
                        <p>From photography to marketing, and you keep 100% of the sale price.</p>
                      </div>
                    </div>
                  </div>
                  <div className="use-elem-con">
                    <div className='use-el-1' >
                      <img src="/assets/img/i1.jpg" alt="" />
                      <div className="use-text">
                        <h3>PERSONALISED SERVICE</h3>
                        <p>Our dedicated team works closely with you throughout the process ensuring a hassle free experience.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="use-elem">
                  <div className="use-elem-con">
                    <div className='use-el-1' >
                      <img src="/assets/img/i4.jpg" alt="" />
                      <div className="use-text">
                        <h3>BEST PRICE</h3>
                        <p>Our ultimate goal is to get you the best price for your automobile. We will unlock the true market value of your car.</p>
                      </div>
                    </div>
                  </div>
                  <div className="use-elem-con">
                    <div className='use-el-1' >
                      <img src="/assets/img/i2.jpg" alt="" />
                      <div className="use-text">
                        <h3>PROFESSIONAL PHOTOGRAPHY</h3>
                        <p>We send one of our automobile photography experts to your home and offer a completely free photography session, for your collection. <br />Which we then use to professionally market your vehicle.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* use-area-end */}
        {/* want-area-start */}
        {/* <div className="want-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="want-fl">
                  <div className="want-img">
                    <img src="assets/img/w1.png" alt="" />
                  </div>
                  <div className="want-containt">
                    <div className="want-title">
                      <h3>WANT TO STAY AS HANDS-OFF AS POSSIBLE?</h3>
                      <p>Then leave it to a specialist.</p>
                    </div>
                    <div className="want-text">
                      <p>Select one of our Managed Service providers. For a fixed fee, they’ll:</p>
                      <div className="want-list">
                        <ul>
                          <li>Clean your vehicle ready <span>for sale</span></li>
                          <li>Clean your vehicle ready <span>for sale</span></li>
                          <li>Clean your vehicle ready <span>for sale</span></li>
                        </ul>
                      </div>
                      <p>Our partners can also arrange transport to a secure location.</p>
                      <p>You can discuss this when you speak to our consignment team.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* want-area-end */}
        {/* happy-area-start */}
        {/* <div className="happy-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="happy-fl">
                  <div className="happy-containt">
                    <h3>TRUSTED BY THOUSANDS OF HAPPY CUSTOMERS</h3>
                    <p>Recent sales from us and testimonials from customers who’ve sold with us.</p>
                  </div>
                  <div className="happy-item">
                    <div className="happy-single-item">
                      <img src="assets/img/h1.png" alt="" />
                      <a href="/login"><span>A$30,000</span></a>
                    </div>
                    <div className="happy-single-item">
                      <img src="assets/img/h1.png" alt="" />
                      <a href="/login"><span>A$30,000</span></a>
                    </div>
                    <div className="happy-single-item">
                      <img src="assets/img/h1.png" alt="" />
                      <a href="/login"><span>A$30,000</span></a>
                    </div>
                    <div className="happy-single-item">
                      <img src="assets/img/h1.png" alt="" />
                      <a href="/login"><span>A$30,000</span></a>
                    </div>
                    <div className="happy-single-item">
                      <img src="assets/img/h1.png" alt="" />
                      <a href="/login"><span>A$30,000</span></a>
                    </div>
                    <div className="happy-single-item">
                      <img src="assets/img/h1.png" alt="" />
                      <a href="/login"><span>A$30,000</span></a>
                    </div>
                    <div className="happy-single-item">
                      <img src="assets/img/h1.png" alt="" />
                      <a href="/login"><span>A$30,000</span></a>
                    </div>
                    <div className="happy-single-item">
                      <img src="assets/img/h1.png" alt="" />
                      <a href="/login"><span>A$30,000</span></a>
                    </div>
                  </div>
                </div>
                <div className="happy-slider owl-carousel">
                  <div className="single-happy-slider">
                    <h3>great <br /> commnuication</h3>
                    <div className="ster">
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                    </div>
                    <p>Great communication all the way <br /> through. I've been in the motor <br /> trade for 33 years and these guys <br /> know what they are doing</p>
                    <span>steve broker</span>
                  </div>
                  <div className="single-happy-slider">
                    <h3>great <br /> commnuication</h3>
                    <div className="ster">
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                    </div>
                    <p>Great communication all the way <br /> through. I've been in the motor <br /> trade for 33 years and these guys <br /> know what they are doing</p>
                    <span>steve broker</span>
                  </div>
                  <div className="single-happy-slider">
                    <h3>great <br /> commnuication</h3>
                    <div className="ster">
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                    </div>
                    <p>Great communication all the way <br /> through. I've been in the motor <br /> trade for 33 years and these guys <br /> know what they are doing</p>
                    <span>steve broker</span>
                  </div>
                  <div className="single-happy-slider">
                    <h3>great <br /> commnuication</h3>
                    <div className="ster">
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                    </div>
                    <p>Great communication all the way <br /> through. I've been in the motor <br /> trade for 33 years and these guys <br /> know what they are doing</p>
                    <span>steve broker</span>
                  </div>
                  <div className="single-happy-slider">
                    <h3>great <br /> commnuication</h3>
                    <div className="ster">
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                    </div>
                    <p>Great communication all the way <br /> through. I've been in the motor <br /> trade for 33 years and these guys <br /> know what they are doing</p>
                    <span>steve broker</span>
                  </div>
                  <div className="single-happy-slider">
                    <h3>great <br /> commnuication</h3>
                    <div className="ster">
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                    </div>
                    <p>Great communication all the way <br /> through. I've been in the motor <br /> trade for 33 years and these guys <br /> know what they are doing</p>
                    <span>steve broker</span>
                  </div>
                  <div className="single-happy-slider">
                    <h3>great <br /> commnuication</h3>
                    <div className="ster">
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                    </div>
                    <p>Great communication all the way <br /> through. I've been in the motor <br /> trade for 33 years and these guys <br /> know what they are doing</p>
                    <span>steve broker</span>
                  </div>
                  <div className="single-happy-slider">
                    <h3>great <br /> commnuication</h3>
                    <div className="ster">
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                    </div>
                    <p>Great communication all the way <br /> through. I've been in the motor <br /> trade for 33 years and these guys <br /> know what they are doing</p>
                    <span>steve broker</span>
                  </div>
                  <div className="single-happy-slider">
                    <h3>great <br /> commnuication</h3>
                    <div className="ster">
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                    </div>
                    <p>Great communication all the way <br /> through. I've been in the motor <br /> trade for 33 years and these guys <br /> know what they are doing</p>
                    <span>steve broker</span>
                  </div>
                  <div className="single-happy-slider">
                    <h3>great <br /> commnuication</h3>
                    <div className="ster">
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                      <a href="/login"><i className="fas fa-star" /></a>
                    </div>
                    <p>Great communication all the way <br /> through. I've been in the motor <br /> trade for 33 years and these guys <br /> know what they are doing</p>
                    <span>steve broker</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* happy-area-end */}
        {/* still-area-start */}
        <div className="vision_header_area">
            <div>WE GUARANTEE TO SELL YOUR CAR FOR MORE THAN WEBUYANYCAR OR <br /> WE ADD 30% TO THEIR VALUATION!*</div>
            <p className='ta_center' >
              *Terms and Conditions Apply: Provide a valid WeBuyAnyCar in-branch quote before listing, obtained within 14 days prior to listing. 
              <br />
              If the car sells for less, we'll increase their valuation by 30% and purchase the car from you after the auction.
            </p>
        </div>
        <div className="still-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="still-title">
                  <h3>STILL CURIOUS?</h3>
                </div>
                <div className="still-text">
                  <p className='ta_center' >Just fill out our quick enquiry form above, and we’ll be in touch with you within an hour (Monday-Friday) to discuss.</p>
                  <p className='ta_center' >Alternatively, view our <a href="/faqs">FAQs for sellers.</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="reating-last-btn" style={{background:'#01a3d2'}} >
          <div className="reating-last-btn-list">
            <ul>
              <li><a href="/sell-with-us">UNLOCK YOUR CARS VALUE <span className='bottom-banner-dots' >.</span> </a> </li>
              <li><a href="/sell-with-us">LIST FREE, SELL FAST <span className='bottom-banner-dots' >.</span> </a> </li>
              <li><a href="/sell-with-us">MAXIMISE PROFIT <span className='bottom-banner-dots' >.</span> </a> </li>
            </ul>
          </div>
          <a href="/sell-with-us">SELL MY CAR</a>
        </div>
        {/* still-area-end */}
    </>
  )
}

export default SellMain