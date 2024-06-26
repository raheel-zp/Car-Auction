import React from "react";
import { useState,useEffect,useContext } from "react";
import { useParams, NavLink,useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import moment from 'moment';
import { userloggedIn } from '../Context/Context'
import ImageGalleryViewer from "../ImageGalleryViewer";
import ReactMarkdown from 'react-markdown'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const images = [
  'https://res.cloudinary.com/def8v05xk/image/upload/v1689102660/rs1dsh0hbw77mzouiutu.jpg',
  'https://res.cloudinary.com/def8v05xk/image/upload/v1689015281/wkwlkwbnwtiwevwikx9t.jpg',
  'https://res.cloudinary.com/def8v05xk/image/upload/v1689015281/wkwlkwbnwtiwevwikx9t.jpg',
  'https://res.cloudinary.com/def8v05xk/image/upload/v1689015259/aiymzeseytzjwc4ouc13.jpg',
  'https://res.cloudinary.com/def8v05xk/image/upload/v1689015253/e6wibcywimjsbtk0womq.jpg',
  'https://res.cloudinary.com/def8v05xk/image/upload/v1689015235/zl5vtkdh7frcbpuvhwgv.jpg',
  'https://res.cloudinary.com/def8v05xk/image/upload/v1689015241/nn4ybuwcufxqeyrfwuwj.jpg',
  'https://res.cloudinary.com/def8v05xk/image/upload/v1689102660/rs1dsh0hbw77mzouiutu.jpg',
  'https://res.cloudinary.com/def8v05xk/image/upload/v1689015281/wkwlkwbnwtiwevwikx9t.jpg',
  'https://res.cloudinary.com/def8v05xk/image/upload/v1689015281/wkwlkwbnwtiwevwikx9t.jpg',
  'https://res.cloudinary.com/def8v05xk/image/upload/v1689015259/aiymzeseytzjwc4ouc13.jpg',
  'https://res.cloudinary.com/def8v05xk/image/upload/v1689015253/e6wibcywimjsbtk0womq.jpg',
  'https://res.cloudinary.com/def8v05xk/image/upload/v1689015235/zl5vtkdh7frcbpuvhwgv.jpg',
  'https://res.cloudinary.com/def8v05xk/image/upload/v1689015241/nn4ybuwcufxqeyrfwuwj.jpg',
  'https://res.cloudinary.com/def8v05xk/image/upload/v1689102660/rs1dsh0hbw77mzouiutu.jpg',
  'https://res.cloudinary.com/def8v05xk/image/upload/v1689015281/wkwlkwbnwtiwevwikx9t.jpg',
  'https://res.cloudinary.com/def8v05xk/image/upload/v1689015281/wkwlkwbnwtiwevwikx9t.jpg',
  'https://res.cloudinary.com/def8v05xk/image/upload/v1689015259/aiymzeseytzjwc4ouc13.jpg',
  'https://res.cloudinary.com/def8v05xk/image/upload/v1689015253/e6wibcywimjsbtk0womq.jpg',
  'https://res.cloudinary.com/def8v05xk/image/upload/v1689015235/zl5vtkdh7frcbpuvhwgv.jpg',
  'https://res.cloudinary.com/def8v05xk/image/upload/v1689015241/nn4ybuwcufxqeyrfwuwj.jpg',
  'https://res.cloudinary.com/def8v05xk/image/upload/v1689102660/rs1dsh0hbw77mzouiutu.jpg',
  'https://res.cloudinary.com/def8v05xk/image/upload/v1689015281/wkwlkwbnwtiwevwikx9t.jpg',
  'https://res.cloudinary.com/def8v05xk/image/upload/v1689015281/wkwlkwbnwtiwevwikx9t.jpg',
  'https://res.cloudinary.com/def8v05xk/image/upload/v1689015259/aiymzeseytzjwc4ouc13.jpg',
  'https://res.cloudinary.com/def8v05xk/image/upload/v1689015253/e6wibcywimjsbtk0womq.jpg',
  'https://res.cloudinary.com/def8v05xk/image/upload/v1689015235/zl5vtkdh7frcbpuvhwgv.jpg',
  'https://res.cloudinary.com/def8v05xk/image/upload/v1689015241/nn4ybuwcufxqeyrfwuwj.jpg',
]

function ProductDetailedPage() {
    const { userlogged,setuserLogged,userData,setuserData,getLoggedin,url } = useContext(userloggedIn);
    const [AuctionEndTime,setAuctionEndTime] = useState(null);
    const { title } = useParams();
    const [Product,setProduct] = useState(null);
    const [flagUrl, setFlagUrl] = useState('');
    const [remainingTime, setRemainingTime] = useState('');
    const [remDays, setRemDays] = useState('');
    const [revealExterior, setrevealExterior] = useState(false);
    const [revealInterior, setrevealInterior] = useState(false);
    const [revealMechanical, setrevealMechanical] = useState(false);
    const [revealDocuments, setrevealDocuments] = useState(false);

    const [offerAmount,setOfferAmount] = useState(0);
    const [bidLoading,setbidLoading] = useState(false);
    const [bidLimit,setbidLimit] = useState(false);
    const [open,setopen] = useState(false);
    const [open1,setopen1] = useState(false);
    const originalTitle = title.split('-').map(word => word.charAt(0) + word.slice(1)).join(' ');
    const [showGallery,setShowGallery] = useState(false);
    
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked);
    };
    const Navigate = useNavigate();
    const [loginOpen,setloginOpen] = useState(false);    
    
    const placeOffer = async ()=>{
      if(!userlogged){
        Navigate(`/accounts/login`);
        setloginOpen(true);
        setTimeout(() => {
          setloginOpen(false);
        }, 10000);
        return;
      }
      setbidLoading(true);
      if(!userData.emailVerified){
        setopenEmailVerify(true);
        setbidLoading(false);
        setTimeout(() => {
          setopenEmailVerify(false);
        }, 7000);
        return;
      }
      const res = await fetch(`${url}placeOffer`,{
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({ 
          price: offerAmount, 
          ProductId: Product._id, 
          email: userData.email, 
          username: userData.username 
        })
      });
      const data = await res.json();
      setbidLoading(false);
      if(data.msg === "success"){
        getProduct();
        setopen(true);
        setTimeout(() => {
          setopen(false);
          setopen1(false);
        }, 7000);
      }else{
        getProduct();
        setopen1(true);
        setTimeout(() => {
          setopen(false);
          setopen1(false);
        }, 7000);
        
      }
    }
    const [open11,setOpen11] = useState(false); //saved product
    const [open2,setOpen2] = useState(false); //unsaved product
    const [open3,setOpen3] = useState(false);
    const [openEmailVerify,setopenEmailVerify] = useState(false);
    const saveProduct = async ()=>{
      if(!userlogged){
        Navigate(`/accounts/login`);
        setloginOpen(true);
        setTimeout(() => {
          setloginOpen(false);
        }, 10000);
        return;
      }
      const res = await fetch(`${url}save-product/${Product._id}`,{
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
      setOpen11(true);
      getLoggedin();
      getProduct();
      setTimeout(() => {
        setOpen11(false);
        setOpen2(false);
      }, 3000);
    }else{
      setOpen2(true);
      setTimeout(() => {
        setOpen11(false);
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
      const res = await fetch(`${url}unsave-product/${Product._id}`,{
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
      getProduct();
      setTimeout(() => {
        setOpen11(false);
        setOpen2(false);
        setOpen3(false);
      }, 3000);
    }else{
      setOpen2(true);
      setTimeout(() => {
        setOpen11(false);
        setOpen2(false);
        setOpen3(false);
      }, 3000);
    }
    }
    const getProduct = async ()=>{
        // setloading(true);
        const res = await fetch(`${url}getProductByTitle/${originalTitle}`,{
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type":"application/json",
        }
        });
        const data = await res.json();
        // setloading(false);
        console.log(data.data);
        if(data.msg === 'success'){
            setProduct(data.data);
            // setOfferAmount(data.data.offers[0].price+500);
            setAuctionEndTime(new Date(Product.date).getTime() + Product.duration * 24 * 60 * 60 * 1000);
        }
    }

    const [showShareIcons,setshowShareIcons] = useState(false);
    const handleWhatsAppShare = () => {
      const url = `https://api.whatsapp.com/send?text=Check%20out%20this%20awesome%20website:%20https%3A%2F%2Fautosauctions.co.uk/products-buynow/${title}`;
      // Open a new tab with the WhatsApp share URL
      window.open(url, '_blank');
    };
    const handleFacebookShare = () => {
      const url = `https://autosauctions.co.uk/products-buynow/${title}`; // Replace with the actual URL you want to share
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  
      // Open a new tab with the Facebook share URL
      window.open(shareUrl, '_blank');
    };
    const handleTwitterShare = () => {
      const url = `https://autosauctions.co.uk/products-buynow/${title}`; // Replace with the actual URL you want to share
      const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;

      // Open a new tab with the Twitter share URL
      window.open(shareUrl, '_blank');
    };

    React.useEffect(()=>{
        getProduct();
    },[])

    useEffect(() => {
      let countdownInterval;
    
      const calculateRemainingTime = () => {
        if (Product && Product.date && Product.duration) {
          // const endTime = new Date(Product.date).getTime() + Product.duration * 24 * 60 * 60 * 1000;
          const endTime = new Date(Product.endTime).getTime();
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
        }
      };
    
      calculateRemainingTime();
    
      return () => {
        clearInterval(countdownInterval);
      };
    }, [Product]);
    
    return (
    <div>
        <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
            <Alert severity="success" sx={{ width: '100%' }}>
                Bid submitted successfully!
            </Alert>
        </Snackbar>
        <Snackbar open={open1} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
            <Alert severity="error" sx={{ width: '100%' }}>
                Please make maximum bid!
            </Alert>
        </Snackbar>
        <Snackbar open={open11} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
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
        <Snackbar open={openEmailVerify} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
          <Alert severity="warning" sx={{ width: '100%' }}>
              Please verify your email in order to place a Bid!
          </Alert>
        </Snackbar>
        <Snackbar open={loginOpen} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
          <Alert severity="error" sx={{ width: '100%' }}>
              Please Login or Register new account!
          </Alert>
        </Snackbar>
      { Product?
      <div>
        <div className="cars-slider owl-carousel d-none">
          <div className="single-slider">
            <img src="assets/img/ci1.png" alt="" />
          </div>
          <div className="single-slider">
            <img src="assets/img/ci1.png" alt="" />
          </div>
          <div className="single-slider">
            <img src="assets/img/ci1.png" alt="" />
          </div>
          <div className="single-slider">
            <img src="assets/img/ci1.png" alt="" />
          </div>
          <div className="single-slider">
            <img src="assets/img/ci1.png" alt="" />
          </div>
          <div className="single-slider">
            <img src="assets/img/ci1.png" alt="" />
          </div>
          <div className="single-slider">
            <img src="assets/img/ci1.png" alt="" />
          </div>
        </div>
        {/* bid-bar-area-start */}
        <div
          style={{position: 'fixed',
          zIndex: '100',
          backgroundColor: 'white',
          width: '100%'}}
         className="bid-bar-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="bid-bar">
                  <div className="bid-arrow" onClick={()=>{Navigate('/')}} >
                    <a href="#">
                      <i className="far fa-angle-left" />
                    </a>
                  </div>
                  <div className="bid-price">
                    <div className="single-bid-price">       
                      <h3>£{Product.price}</h3>
                      <p>BUY IT NOW PRICE</p>
                    </div>
                    <div className="single-bid-time">
                      {/* <h3> {remDays>0?<>{remDays} days</>:<>{remainingTime}</>} </h3> */}
                      <h3> {`${remDays}d ${remainingTime}`} </h3>
                      <p> {new Date(AuctionEndTime).toLocaleTimeString('en-US',{hour: 'numeric',minute: '2-digit',hour12: true,})} </p>
                    </div>
                    <div className="single-bid-time">
                      <h3>{ Product.offers? <>{Product.offers.length}</>:<>0</> }</h3>
                      <p>OFFERS</p>
                    </div>
                  </div>
                  <div className="bid-bar-btn">
                    {/* <a> */}
                      {/* <i className="fal fa-bookmark" /> */}
                      { userData.saved && Array.isArray(userData.saved) && userData.saved.includes(Product._id)?
                        <>
                          <a onClick={unSaveProduct} style={{cursor:'pointer'}}>
                            <svg style={{height:'1rem',marginRight:'10px',cursor:'pointer',fill:'#15158e'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/></svg>
                            SAVED
                          </a>
                        </>:<>
                          <a onClick={saveProduct} style={{cursor:'pointer'}} >
                            <svg  style={{height:'1rem',marginRight:'10px',cursor:'pointer',fill:'#15158e'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"/></svg>
                            SAVE
                          </a>
                        </>
                      }
                    {/* </a> */}
                    <a onClick={()=>{setshowShareIcons(!showShareIcons)}} style={{position:'relative',cursor:'pointer'}}>
                      <i className="far fa-share-alt" />                      
                      SHARE
                      { showShareIcons &&
                        <div className="share_con">
                          <svg onClick={handleWhatsAppShare} style={{fill: '#25D366'}} height="1.6em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
                          <svg onClick={handleFacebookShare} style={{fill: '#3b5998'}} height="1.6em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg>
                          <svg onClick={handleTwitterShare} style={{fill: "#00acee"}} height="1.6em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/></svg>
                        </div>
                      }
                    </a>
                    <a 
                      data-bs-toggle="modal"
                      href="#exampleModalToggle"
                      role="button"
                      className="bid-place-btn">
                      MAKE AN OFFER
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{height:'88px'}}></div>
        {/* bid-bar-area-end */}
        {/* car-info-gallary-area-start */}
        { showGallery? (<ImageGalleryViewer images={images} showGallery={showGallery} setShowGallery={setShowGallery} />) : (<></>) }
        <div className="car-info-gallary-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="car-info-gallary-fl">
                  <div className="car-info-gallary-left">
                    <a onClick={()=>{setShowGallery(true)}} style={{cursor:'pointer'}}>
                      <img src={Product.thumbnail} alt="" />
                    </a>
                  </div>
                  <div onClick={()=>{setShowGallery(true)}} style={{cursor:'pointer'}} className="car-info-gallary-right">
                    <div className="single-car-info-gallary-img">
                      <a>
                        <img src={Product.exteriorImages[0]} alt="" />
                      </a>
                    </div>
                    <div className="single-car-info-gallary-img">
                      <a>
                        <img src={Product.exteriorImages[1]} alt="" />
                      </a>
                    </div>
                    <div className="single-car-info-gallary-img">
                      <a>
                        <img src={Product.interiorImages[0]} alt="" />
                      </a>
                    </div>
                    <div className="single-car-info-gallary-img">
                      <a>
                        <img src={Product.interiorImages[1]} alt="" />
                      </a>
                    </div>
                    <div className="single-car-info-gallary-img">
                      <a>
                        <img src={Product.mechanicalImages[0]} alt="" />
                      </a>
                    </div>
                    <div className="single-car-info-gallary-img">
                      <a>
                        <img src={Product.mechanicalImages[1]} alt="" />
                      </a>
                    </div>
                    <div className="single-car-info-gallary-img">
                      <a>
                        <img src={Product.documentsImages[0]} alt="" />
                      </a>
                    </div>
                    <div className="single-car-info-gallary-img">
                      <img src={Product.documentsImages[1]} alt="" />
                      <div className="single-car-info-gallary-view">
                        <a style={{color:'white'}} >                        
                          VIEW ALL PHOTOS
                          <span>({Product.exteriorImages.length+Product.interiorImages.length+Product.mechanicalImages.length+Product.documentsImages.length})</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* car-info-gallary-area-end */}
        {/* car-info-area-start */}
        <div className="car-info-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="car-info-fl">
                  <div className="car-info-left">
                    <div className="car-info-title">
                      <h3>
                        {Product.originalTitle}
                      </h3>
                    </div>
                    <div className="car-info-top">
                      <div className="car-info-top-left">
                        <a href="#">
                          <i className="fas fa-globe-europe" />
                        </a>
                        <select className="custom_select">
                          <option data-display="English">English</option>
                          {/* <option value={1}>Coming Soon</option> */}
                          {/* <option value={2}>Another option</option>
                          <option value={3} disabled>
                            A disabled option
                          </option>
                          <option value={4}>Potato</option> */}
                        </select>
                      </div>
                      <div className="car-info-top-right">
                        { userData.saved && Array.isArray(userData.saved) && userData.saved.includes(Product._id)?
                          <>
                          <a onClick={unSaveProduct} style={{cursor:'pointer'}}>
                            <svg style={{height:'1rem',marginRight:'10px',cursor:'pointer',fill:'#01A3D2'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/></svg>
                            {Product.saved}
                          </a>
                          </>:<>
                          <a onClick={saveProduct} style={{cursor:'pointer'}} >
                            <svg  style={{height:'1rem',marginRight:'10px',cursor:'pointer',fill:'#01A3D2'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"/></svg>
                            {Product.saved}
                          </a>
                          </>
                        }
                        <a href="#">
                          <i className="far fa-eye" />
                          {Product.views}
                        </a>
                      </div>
                    </div>
                    <div className="car-info-single-right-box d-none">
                      <div className="car-info-over-title">
                        <h3>CAR OVERVIEW</h3>
                      </div>
                      <div className="car-info-over-list">
                        <ul>
                          <li>
                            <a href="#">
                              <i className="far fa-tachometer-alt-fast" />
                              38,119 Km
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="far fa-tachometer-alt-fast" />
                              38,119 Km
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="far fa-tachometer-alt-fast" />
                              38,119 Km
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="far fa-tachometer-alt-fast" />
                              38,119 Km
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="far fa-tachometer-alt-fast" />
                              38,119 Km
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="far fa-tachometer-alt-fast" />
                              38,119 Km
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="far fa-tachometer-alt-fast" />
                              38,119 Km
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="car-info-over-list-containt">
                        <h3>BUYER'S PREMIUM</h3>
                        <p>
                          5.5% + VAT (Minimum £550.00 + VAT) For Buyers
                        </p>
                      </div>
                      <div className="car-info-over-title">
                        <h3>LOT OVERVIEW</h3>
                      </div>
                      <div className="car-info-over-list">
                        <ul>
                          <li>
                            <a href="#">
                              <i className="far fa-tachometer-alt-fast" />
                              38,119 Km
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="far fa-tachometer-alt-fast" />
                              38,119 Km
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="far fa-tachometer-alt-fast" />
                              38,119 Km
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="car-info-over-title">
                        <h3>MANAGED PARTNER</h3>
                      </div>
                      <div className="car-info-over-list">
                        <ul>
                          <li>
                            <a href="#">
                              <i className="far fa-tachometer-alt-fast" />
                              38,119 Km
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="car-info-over-btn">
                        <a href="#">COMMENTS</a>
                      </div>
                    </div>
                    <div className="car-info-containt">
                      <div className="car-info-containt-title">
                        <h3>KEY FACTS</h3>
                      </div>
                      <div className="car-info-containt-text">
                        <ul>
                          { Product.keyFactors.map((val,ind)=>{
                            return(<>
                              <li> <ReactMarkdown>{val.text}</ReactMarkdown> </li>
                            </>)
                          })
                          }
                        </ul>
                      </div>
                    </div>
                    <div className="car-info-containt">
                      <div className="car-info-containt-title">
                        <h3>EQUIPMENT AND FEATURES</h3>
                      </div>
                      <div className="car-info-containt-text">
                        <ul>
                          { Product.equipmenatAndFeatures.map((val,ind)=>{
                            return(<>
                              <li> <ReactMarkdown>{val.text}</ReactMarkdown> </li>
                            </>)
                          })
                          }                          
                        </ul>
                      </div>
                    </div>
                    <div className="car-info-containt">
                      <div className="car-info-containt-title">
                        <h3>CONDITION</h3>
                      </div>
                      <div className="car-info-containt-text">
                        <ul>
                          { Product.condition.map((val,ind)=>{
                            return(<>
                              <li> <ReactMarkdown>{val.text}</ReactMarkdown> </li>
                            </>)
                          })
                          } 
                        </ul>
                      </div>
                    </div>
                    <div className="car-info-containt">
                      <div className="car-info-containt-title">
                        <h3>SERVICE HISTORY</h3>
                      </div>
                      <div className="car-info-containt-text">
                        <ul>
                          { Product.serviceHistory.map((val,ind)=>{
                            return(<>
                              <li> <ReactMarkdown>{val.text}</ReactMarkdown> </li>
                            </>)
                          })
                          } 
                        </ul>
                      </div>
                    </div>
                    <div className="car-info-containt">
                      <div className="car-info-containt-title">
                        <h3>SUMMARY</h3>
                      </div>
                      <div className="car-info-containt-text">
                        <p> <ReactMarkdown>{Product.summary}</ReactMarkdown> </p>
                      </div>
                    </div>
                    <div className="car-info-video">
                      <iframe
                        width={1264}
                        height={711}
                        src="https://www.youtube.com/embed/NMThdHhrLoM"
                        title="BUGATTI CHIRON Pur Sport: ‘C’ the Drift"
                        frameBorder={0}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                    <div className="car-info-explor">
                      <div className="car-info-explor-title">
                        <h3>
                          EXTERIOR <span>({Product.exteriorImages.length})</span>
                        </h3>
                      </div>
                      <div className="car-info-explof-fl">                        
                        {/* { Product.exteriorImages.slice(0, 8).map((val,ind)=>{
                          return(<>
                            <div className="single-car-info-explor">
                              <a href="#">
                                <img src={val.text} alt="" />
                              </a>
                            </div>
                          </>)
                          })
                        }   */}
                        {revealExterior
                          ? Product.exteriorImages.map((image, index) => (
                            <div className="single-car-info-explor">
                              <a href="#" key={index}>
                                <img src={image} alt="" />
                              </a>
                            </div>
                            ))
                          : Product.exteriorImages.slice(0, 8).map((image, index) => (
                            <div className="single-car-info-explor">
                              <a href="#" key={index}>
                                <img src={image} alt="" />
                              </a>
                            </div>
                          ))}                 
                      </div>
                      <div className="car-info-explore-mob d-none">
                        <div className="car-info-explof-slider owl-carousel">
                          <div className="single-car-info-explor">
                          <a href="#">
                            <img src={Product.exteriorImages[0]} alt="" />
                          </a>
                          </div>
                          <div className="single-car-info-explor">
                            <a href="#">
                              <img src="assets/img/ci2.png" alt="" />
                            </a>
                          </div>
                          <div className="single-car-info-explor">
                            <a href="#">
                              <img src="assets/img/ci2.png" alt="" />
                            </a>
                          </div>
                          <div className="single-car-info-explor">
                            <a href="#">
                              <img src="assets/img/ci2.png" alt="" />
                            </a>
                          </div>
                          <div className="single-car-info-explor">
                            <a href="#">
                              <img src="assets/img/ci2.png" alt="" />
                            </a>
                          </div>
                          <div className="single-car-info-explor">
                            <a href="#">
                              <img src="assets/img/ci2.png" alt="" />
                            </a>
                          </div>
                          <div className="single-car-info-explor">
                            <a href="#">
                              <img src="assets/img/ci2.png" alt="" />
                            </a>
                          </div>
                          <div className="single-car-info-explor">
                            <a href="#">
                              <img src="assets/img/ci2.png" alt="" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="car-info-explor-showmore">
                        <a style={{cursor:'pointer',color:'#2fbdac'}} onClick={()=>{setrevealExterior(!revealExterior)}}>
                          {revealExterior?<>SHOW LESS</>:<>SHOW ALL</>}
                          <i className="far fa-angle-down" />
                        </a>
                      </div>
                    </div>
                    <div className="car-info-explor">
                      <div className="car-info-explor-title">
                        <h3>
                          INTERIOR <span>({Product.interiorImages.length})</span>
                        </h3>
                      </div>
                      <div className="car-info-explof-fl">
                        {revealInterior
                          ? Product.interiorImages.map((image, index) => (
                            <div className="single-car-info-explor">
                              <a href="#" key={index}>
                                <img src={image} alt="" />
                              </a>
                            </div>
                            ))
                          : Product.interiorImages.slice(0, 8).map((image, index) => (
                            <div className="single-car-info-explor">
                              <a href="#" key={index}>
                                <img src={image} alt="" />
                              </a>
                            </div>
                        ))}                                                                                                                   
                      </div>
                      <div className="car-info-explore-mob d-none">
                        <div className="car-info-explof-slider owl-carousel">
                          <div className="single-car-info-explor">
                            <a href="#">
                              <img src="assets/img/ci2.png" alt="" />
                            </a>
                          </div>
                          <div className="single-car-info-explor">
                            <a href="#">
                              <img src="assets/img/ci2.png" alt="" />
                            </a>
                          </div>
                          <div className="single-car-info-explor">
                            <a href="#">
                              <img src="assets/img/ci2.png" alt="" />
                            </a>
                          </div>
                          <div className="single-car-info-explor">
                            <a href="#">
                              <img src="assets/img/ci2.png" alt="" />
                            </a>
                          </div>
                          <div className="single-car-info-explor">
                            <a href="#">
                              <img src="assets/img/ci2.png" alt="" />
                            </a>
                          </div>
                          <div className="single-car-info-explor">
                            <a href="#">
                              <img src="assets/img/ci2.png" alt="" />
                            </a>
                          </div>
                          <div className="single-car-info-explor">
                            <a href="#">
                              <img src="assets/img/ci2.png" alt="" />
                            </a>
                          </div>
                          <div className="single-car-info-explor">
                            <a href="#">
                              <img src="assets/img/ci2.png" alt="" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="car-info-explor-showmore">
                        <a style={{cursor:'pointer',color:'#2fbdac'}} onClick={()=>{setrevealInterior(!revealInterior)}}>
                          {revealInterior?<>SHOW LESS</>:<>SHOW ALL</>}
                          <i className="far fa-angle-down" />
                        </a>
                      </div>
                    </div>
                    <div className="car-info-explor">
                      <div className="car-info-explor-title">
                        <h3>
                          MECHANICAL <span>({Product.mechanicalImages.length})</span>
                        </h3>
                      </div>
                      <div className="car-info-explof-fl">
                        {revealMechanical
                          ? Product.mechanicalImages.map((image, index) => (
                            <div className="single-car-info-explor">
                              <a href="#" key={index}>
                                <img src={image} alt="" />
                              </a>
                            </div>
                            ))
                          : Product.mechanicalImages.slice(0, 8).map((image, index) => (
                            <div className="single-car-info-explor">
                              <a href="#" key={index}>
                                <img src={image} alt="" />
                              </a>
                            </div>
                        ))}
                      </div>                  
                      {/* <div className="car-info-explore-mob d-none">
                        <div className="car-info-explof-slider owl-carousel">
                          <div className="single-car-info-explor">
                            <a href="#">
                              <img src="assets/img/ci2.png" alt="" />
                            </a>
                          </div>
                          <div className="single-car-info-explor">
                            <a href="#">
                              <img src="assets/img/ci2.png" alt="" />
                            </a>
                          </div>
                          <div className="single-car-info-explor">
                            <a href="#">
                              <img src="assets/img/ci2.png" alt="" />
                            </a>
                          </div>
                          <div className="single-car-info-explor">
                            <a href="#">
                              <img src="assets/img/ci2.png" alt="" />
                            </a>
                          </div>
                          <div className="single-car-info-explor">
                            <a href="#">
                              <img src="assets/img/ci2.png" alt="" />
                            </a>
                          </div>
                          <div className="single-car-info-explor">
                            <a href="#">
                              <img src="assets/img/ci2.png" alt="" />
                            </a>
                          </div>
                          <div className="single-car-info-explor">
                            <a href="#">
                              <img src="assets/img/ci2.png" alt="" />
                            </a>
                          </div>
                          <div className="single-car-info-explor">
                            <a href="#">
                              <img src="assets/img/ci2.png" alt="" />
                            </a>
                          </div>
                        </div>
                      </div> */}
                      <div className="car-info-explor-showmore">
                        <a style={{cursor:'pointer',color:'#2fbdac'}} onClick={()=>{setrevealMechanical(!revealMechanical)}}>
                          {revealMechanical?<>SHOW LESS</>:<>SHOW ALL</>}
                          <i className="far fa-angle-down" />
                        </a>
                      </div>
                    </div>
                    <div className="car-info-explor">
                      <div className="car-info-explor-title">
                        <h3>
                          DOCUMENT <span>({Product.documentsImages.length})</span>
                        </h3>
                      </div>
                      <div className="car-info-explof-fl">
                        {revealDocuments
                          ? Product.documentsImages.map((image, index) => (
                            <div className="single-car-info-explor">
                              <a href="#" key={index}>
                                <img src={image} alt="" />
                              </a>
                            </div>
                            ))
                          : Product.documentsImages.slice(0, 8).map((image, index) => (
                            <div className="single-car-info-explor">
                              <a href="#" key={index}>
                                <img src={image} alt="" />
                              </a>
                            </div>
                        ))}                        
                      </div>
                      <div className="car-info-explore-mob d-none">
                        <div className="car-info-explof-slider owl-carousel">
                          <div className="single-car-info-explor">
                            <a href="#">
                              <img src="assets/img/ci2.png" alt="" />
                            </a>
                          </div>
                          <div className="single-car-info-explor">
                            <a href="#">
                              <img src="assets/img/ci2.png" alt="" />
                            </a>
                          </div>
                          <div className="single-car-info-explor">
                            <a href="#">
                              <img src="assets/img/ci2.png" alt="" />
                            </a>
                          </div>
                          <div className="single-car-info-explor">
                            <a href="#">
                              <img src="assets/img/ci2.png" alt="" />
                            </a>
                          </div>
                          <div className="single-car-info-explor">
                            <a href="#">
                              <img src="assets/img/ci2.png" alt="" />
                            </a>
                          </div>
                          <div className="single-car-info-explor">
                            <a href="#">
                              <img src="assets/img/ci2.png" alt="" />
                            </a>
                          </div>
                          <div className="single-car-info-explor">
                            <a href="#">
                              <img src="assets/img/ci2.png" alt="" />
                            </a>
                          </div>
                          <div className="single-car-info-explor">
                            <a href="#">
                              <img src="assets/img/ci2.png" alt="" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="car-info-explor-showmore">
                        <a style={{cursor:'pointer',color:'#2fbdac'}} onClick={()=>{setrevealDocuments(!revealDocuments)}}>
                          {revealDocuments?<>SHOW LESS</>:<>SHOW ALL</>}
                          <i className="far fa-angle-down" />
                        </a>
                      </div>
                    </div>
                    <div className="car-info-post-box">
                      <div className="car-info-post-top">
                        <h3>POST A COMMENT</h3>
                        <span>
                          Seller: <span>CohenCars</span>
                        </span>
                        <textarea
                          name
                          id
                          cols={30}
                          rows={10}
                          defaultValue={""}
                        />
                        <button type="submit">LOGIN TO COMMENT</button>
                      </div>
                      <div className="car-info-post-last">
                        <div className="car-info-post-last-title">
                          <h3>PREVIOUS QUESTIONS</h3>
                        </div>
                        <div className="car-info-post-list">
                          <div className="single-car-info-post-list">
                            <div className="car-info-post-list-icon">
                              <a href="#">
                                <i className="fal fa-comment-alt-lines" />
                              </a>
                            </div>
                            <div className="car-info-post-list-text">
                              <p>It has the Stradale kit refit to it</p>
                              <span>by CohenCars 2 days ago</span>
                            </div>
                          </div>
                          <div className="single-car-info-post-list">
                            <div className="car-info-post-list-icon">
                              <a href="#">
                                <i className="fal fa-comment-alt-lines" />
                              </a>
                            </div>
                            <div className="car-info-post-list-text">
                              <p>
                                Hi, <br />
                                Is the front bumper original? <br />
                                It seems that the exhaust pipes are at different
                                heights. Is the exhaust system and its <br />{" "}
                                supports all good? <br />
                                Regards
                              </p>
                              <span>by CohenCars 2 days ago</span>
                            </div>
                          </div>
                          <div className="single-car-info-post-list">
                            <div className="car-info-post-list-icon">
                              <a href="#">
                                <i className="fal fa-comment-alt-lines" />
                              </a>
                            </div>
                            <div className="car-info-post-list-text">
                              <p>
                                Hi, <br />
                                Is the front bumper original? <br />
                                It seems that the exhaust pipes are at different
                                heights. Is the exhaust system and its <br />{" "}
                                supports all good? <br />
                                Regards
                              </p>
                              <span>by CohenCars 2 days ago</span>
                            </div>
                          </div>
                          <div className="single-car-info-post-list">
                            <div className="car-info-post-list-icon">
                              <a href="#">
                                <i className="fal fa-comment-alt-lines" />
                              </a>
                            </div>
                            <div className="car-info-post-list-text">
                              <p>
                                Hi, <br />
                                Is the front bumper original? <br />
                                It seems that the exhaust pipes are at different
                                heights. Is the exhaust system and its <br />{" "}
                                supports all good? <br />
                                Regards
                              </p>
                              <span>by CohenCars 2 days ago</span>
                            </div>
                          </div>
                          <div className="single-car-info-post-list">
                            <div className="car-info-post-list-icon">
                              <a href="#">
                                <i className="fal fa-comment-alt-lines" />
                              </a>
                            </div>
                            <div className="car-info-post-list-text">
                              <p>
                                Hi, <br />
                                Is the front bumper original? <br />
                                It seems that the exhaust pipes are at different
                                heights. Is the exhaust system and its <br />{" "}
                                supports all good? <br />
                                Regards
                              </p>
                              <span>by CohenCars 2 days ago</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="car-info-right">
                    <div className="car-info-single-right-box ss">
                      <div className="car-info-over-title">
                        <h3>CAR OVERVIEW</h3>
                      </div>
                      <div className="car-info-over-list">
                      <ul>
                          <li >
                            <a style={{fontWeight: '600',display:'flex',alignContent:'center'}}>
                              <div style={{height:'2.2rem',width:'2.7rem'}} >
                                <img style={{height:'2.2rem'}} src="/assets/img/odometer.png" />
                              </div>
                              <div style={{display:'flex',alignItems:'center'}} >{Product.OdometerReading} {Product.unit}</div>
                            </a>
                          </li>
                          <li >
                            <a style={{fontWeight: '600',display:'flex',alignContent:'center'}}>
                              <div style={{height:'2.2rem',width:'2.7rem'}} >
                                <img style={{height:'2.2rem'}} src="/assets/img/transmission.png" />
                              </div>
                              <div style={{display:'flex',alignItems:'center'}} >{Product.TransmissionType==='auto'?'Automatic':Product.TransmissionType}</div>
                            </a>
                          </li>
                          <li >
                            <a style={{fontWeight: '600',display:'flex',alignContent:'center'}}>
                              <div style={{height:'2.2rem',width:'2.7rem'}} >
                                <img style={{height:'1.7rem'}} src="/assets/img/side.png" />
                              </div>
                              <div style={{display:'flex',alignItems:'center'}} >{Product.side==='left'? <>LHD</>:<>RHD</> }</div>
                            </a>
                          </li>
                          <li >
                            <a style={{fontWeight: '600',display:'flex',alignContent:'center'}}>
                              <div style={{height:'2.2rem',width:'2.7rem'}} >
                                <img style={{height:'2.2rem',marginLeft:'2px'}} src="/assets/img/color.png" />
                              </div>
                              <div style={{display:'flex',alignItems:'center'}} >{Product.color }</div>
                            </a>
                          </li>
                          <li >
                            <a style={{fontWeight: '600',display:'flex',alignContent:'center'}}>
                              <div style={{height:'2.2rem',width:'2.7rem'}} >
                                <img style={{height:'2.2rem'}} src="/assets/img/engine.png" />
                              </div>
                              <div style={{display:'flex',alignItems:'center'}} >{Product.EngineDisplacement }</div>
                            </a>
                          </li>
                          <li >
                            <a style={{fontWeight: '600',display:'flex',alignContent:'center'}}>
                              <div style={{height:'2.2rem',width:'2.7rem',display:'flex',alignItems:'center',paddingLeft:'3px',fontWeight: '800'}} >
                                VIN
                              </div>
                              <div style={{display:'flex',alignItems:'center'}} >{Product.VIN }</div>
                            </a>
                          </li>
                          <li >
                            <a style={{fontWeight: '600',display:'flex',alignContent:'center'}}>
                              <div style={{height:'2.2rem',width:'2.7rem'}} >
                                <img style={{height:'2.2rem'}} src="/assets/img/interiorColor.png" />
                              </div>
                              <div style={{display:'flex',alignItems:'center'}} >{Product.ModelNumber }</div>
                            </a>
                          </li>
                          {/* <li >
                            <a style={{fontWeight: '600',display:'flex',alignContent:'center'}}>
                              <div style={{height:'2.2rem',width:'2.7rem'}} >
                                <img style={{height:'2.2rem'}} src="/assets/img/odometer.png" />
                              </div>
                              <div style={{display:'flex',alignItems:'center'}} >{Product.lotNumber }</div>
                            </a>
                          </li> */}
                        </ul>
                      </div>
                      <div className="car-info-over-list-containt">
                        <h3>BUYER'S PREMIUM</h3>
                        <p>
                          5.5% + VAT (Minimum £550.00 + VAT) For Buyers
                        </p>
                      </div>
                      <div className="car-info-over-title">
                        <h3>LOT OVERVIEW</h3>
                      </div>
                      <div className="car-info-over-list">
                        <ul>
                          <li>
                            <a style={{fontWeight: '600'}} href="#">
                              <i className="far fa-tachometer-alt-fast" />
                              {Product.saleType==='private'?<>Private Sale</>:<>Public Sale</>}
                            </a>
                          </li>
                          <li>
                            <a style={{fontWeight: '600'}} href="#">
                              <i className="far fa-tachometer-alt-fast" />
                              {Product.country}
                            </a>
                          </li>                          
                        </ul>
                      </div>
                      {/* <div className="car-info-over-title">
                        <h3>MANAGED PARTNER</h3>
                      </div>
                      <div className="car-info-over-list">
                        <ul>
                          <li>
                            <a href="#">
                              <i className="far fa-tachometer-alt-fast" />
                              38,119 Km
                            </a>
                          </li>
                        </ul>
                      </div> */}
                      <div className="car-info-over-btn">
                        <a href="#">COMMENTS</a>
                      </div>
                    </div>
                    <div className="car-info-single-right-box">
                      <div className="scrolls">
                        <div className="car-scroll-info scrollbar-1">
                          <div className="car-info-over-title">
                            <h3>OFFERS HISTORY</h3>
                          </div>
                          <div className="car-info-history">                            
                            { Product.offers &&  Product.offers.map((val,ind)=>{
                              return(<>
                                <div className="single-car-info-his">
                                  <div className="car-info-his-icon">
                                    <a >
                                      <i className="fas fa-arrow-alt-circle-up" />
                                    </a>
                                  </div>
                                  <div className="car-info-his-text">
                                    <h3>£{val.price}</h3>
                                    <p>{val.username}</p>
                                    <span>{moment(val.date).fromNow()}</span>
                                  </div>
                                </div>
                              </>)
                            })
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="car-info-single-right-box">
                      <div className="car-info-over-title">
                        <h3>STAY INFORMED</h3>
                      </div>
                      <div className="car-info-over-list bb">
                        <p>Receive emails about similar auctions</p>
                      </div>
                      <div className="car-info-over-btn">
                        <a href="#">SUBSCRIBE</a>
                      </div>
                    </div>

                    {/* <div className="car-info-post-box d-none">
                      <div className="car-info-post-top">
                        <h3>POST A COMMENT</h3>
                        <span>
                          Seller: <span>CohenCars</span>
                        </span>
                        <textarea
                          name
                          id
                          cols={30}
                          rows={10}
                          defaultValue={""}
                        />
                        <button type="submit">LOGIN TO COMMENT</button>
                      </div>
                      <div className="car-info-post-last">
                        <div className="car-info-post-last-title">
                          <h3>PREVIOUS QUESTIONS</h3>
                        </div>
                        <div className="car-info-post-list">
                          <div className="single-car-info-post-list">
                            <div className="car-info-post-list-icon">
                              <a href="#">
                                <i className="fal fa-comment-alt-lines" />
                              </a>
                            </div>
                            <div className="car-info-post-list-text">
                              <p>It has the Stradale kit refit to it</p>
                              <span>by CohenCars 2 days ago</span>
                            </div>
                          </div>
                          <div className="single-car-info-post-list">
                            <div className="car-info-post-list-icon">
                              <a href="#">
                                <i className="fal fa-comment-alt-lines" />
                              </a>
                            </div>
                            <div className="car-info-post-list-text">
                              <p>
                                Hi, <br />
                                Is the front bumper original? <br />
                                It seems that the exhaust pipes are at different
                                heights. Is the exhaust system and its <br />{" "}
                                supports all good? <br />
                                Regards
                              </p>
                              <span>by CohenCars 2 days ago</span>
                            </div>
                          </div>
                          <div className="single-car-info-post-list">
                            <div className="car-info-post-list-icon">
                              <a href="#">
                                <i className="fal fa-comment-alt-lines" />
                              </a>
                            </div>
                            <div className="car-info-post-list-text">
                              <p>
                                Hi, <br />
                                Is the front bumper original? <br />
                                It seems that the exhaust pipes are at different
                                heights. Is the exhaust system and its <br />{" "}
                                supports all good? <br />
                                Regards
                              </p>
                              <span>by CohenCars 2 days ago</span>
                            </div>
                          </div>
                          <div className="single-car-info-post-list">
                            <div className="car-info-post-list-icon">
                              <a href="#">
                                <i className="fal fa-comment-alt-lines" />
                              </a>
                            </div>
                            <div className="car-info-post-list-text">
                              <p>
                                Hi, <br />
                                Is the front bumper original? <br />
                                It seems that the exhaust pipes are at different
                                heights. Is the exhaust system and its <br />{" "}
                                supports all good? <br />
                                Regards
                              </p>
                              <span>by CohenCars 2 days ago</span>
                            </div>
                          </div>
                          <div className="single-car-info-post-list">
                            <div className="car-info-post-list-icon">
                              <a href="#">
                                <i className="fal fa-comment-alt-lines" />
                              </a>
                            </div>
                            <div className="car-info-post-list-text">
                              <p>
                                Hi, <br />
                                Is the front bumper original? <br />
                                It seems that the exhaust pipes are at different
                                heights. Is the exhaust system and its <br />{" "}
                                supports all good? <br />
                                Regards
                              </p>
                              <span>by CohenCars 2 days ago</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* car-info-area-end */}
        {/* reating-last-btn-start */}
        <div className="reating-last-btn">
          <div className="reating-last-btn-list">
            <ul>
              <li>
                <a href="/sell-with-us">ADVERTISE FOR FREE<span >.</span></a>
              </li>
              <li>
                <a href="/sell-with-us">SELL FOR FREE<span >.</span></a>
              </li>
              <li>
                <a href="/sell-with-us">STRESS FREE<span >.</span></a>
              </li>
            </ul>
          </div>
          <a href="/sell-with-us">SELL WITH US</a>
        </div>
        {/* reating-last-btn-end */}
        {/* buy-sing-area-start */}
        {/* <div className="buy-sing-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title">
                  <h3>SIGN UP TO OUR DAILY BRIEFING</h3>
                </div>
                <div className="buy-sing-fl">
                  <div className="single-buy-sing">
                    <label htmlFor="#">Email address</label>
                    <input type="text" placeholder="Email address" />
                  </div>
                  <div className="single-buy-sing">
                    <label htmlFor="#" className="custom_select">Where do you live?</label>
                    <select>
                      <option data-display="United States">
                        United States
                      </option>
                      <option value={1}>Some option</option>
                      <option value={2}>Another option</option>
                      <option value={3} disabled>
                        A disabled option
                      </option>
                      <option value={4}>Potato</option>
                    </select>
                  </div>
                  <div className="single-buy-btn">
                    <button type="submit">SUBSCRIBE</button>
                  </div>
                </div>
                <div className="buy-sing-last-text">
                  <p>
                    By signing up, you agree to autoauctions.com’s{" "}
                    <a href="#">Privacy Policy</a> and{" "}
                    <a href="#">Terms and Condition</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* buy-sing-area-end */}
        <div
          className="modal fade"
          id="exampleModalToggle"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel"
          tabIndex={-1}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="far fa-times" />
                </button>
              </div>
              <div className="bid-pop">
                <div className="bid-pop-top">
                  <div className="single-bid-top-item">
                    {/* <h3>£0</h3> */}
                    {Product.offers && Product.offers.length > 0 && (
                      <h3>£ {Product.offers[0].price}</h3>
                    )}
                    <p>CURRENT OFFER</p>
                  </div>
                  <div className="single-bid-top-item">
                    <h3>{`${remDays}d ${remainingTime}`}</h3>
                    <p>EXPIRE TIME</p>
                  </div>
                  <div className="single-bid-top-item">
                    <h3>{Product.offers.length}</h3>
                    <p>OFFERS</p>
                  </div>
                </div>
                <div className="bid-pop-top-title">
                  <div className="bid-pop-top-title-img">
                    <img src={Product.thumbnail} alt="" />
                  </div>
                  <div className="bid-pop-top-title-text">
                    <h3>
                      { Product.originalTitle }
                    </h3>
                    <div className="bid-pop-top-title-text-btn">
                        { userData.saved && Array.isArray(userData.saved) && userData.saved.includes(Product._id)?
                          <>
                          <a onClick={unSaveProduct} style={{cursor:'pointer'}}>
                            <svg style={{height:'1rem',marginRight:'10px',cursor:'pointer',fill:'#01A3D2'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/></svg>
                            {Product.saved}
                          </a>
                          </>:<>
                          <a onClick={saveProduct} style={{cursor:'pointer'}} >
                            <svg  style={{height:'1rem',marginRight:'10px',cursor:'pointer',fill:'#01A3D2'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"/></svg>
                            {Product.saved}
                          </a>
                          </>
                        }
                      <a href="#">
                        <i className="far fa-eye" />
                        {Product.views}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="bid-pop-top-titles">
                  <h3>OFFERS HISTORY</h3>
                </div>
                <div className="bid-pop-his" style={{height:'24rem',overflowY: 'scroll'}}>
                  { Product.offers && Product.offers.map((val,ind)=>{
                    return(<>
                      <div className="bid-pop-his-item">
                        <div className="bid-pop-his-item-icon">
                          <a href="#">
                            <i className="fas fa-arrow-alt-circle-up" />
                          </a>
                        </div>
                        <div className="bid-pop-his-item-text">
                          <h3>£{val.price}</h3>
                          <span>{val.username}</span>
                          <p>{moment(val.date).fromNow()}</p>
                        </div>
                      </div> 
                    </>)
                  })
                  }                
                </div>
                <div className="bid-po-btn">
                  <a
                    href="#"
                    className="live-place"
                    data-bs-target="#exampleModalToggle2"
                    data-bs-toggle="modal"
                    data-bs-dismiss="modal"
                  >
                    PLACE AN OFFER
                  </a>
                  {/* <a >Place max bid</a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="exampleModalToggle2"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel2"
          tabIndex={-1}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="bid-con-pop">
                { !userData.emailVerified &&
                  <div className="bids__top" style={{marginBottom:'1rem',borderRadius:'13px'}} >
                    <p><i className="fas fa-envelope" />Your email has not been verified.</p>
                    <NavLink target="_blank" to="/email-verification">Click to verify</NavLink>
                  </div>
                }
                <div className="bid-con--title">
                  <h3>CONFIRM YOUR OFFER</h3>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <i className="far fa-times" />
                  </button>
                </div>
                <div className="bid-con-text">
                  <p>
                    You agree to purchase if your bid meets or exceeds the
                    reserve price.. We may pre-authorise your payment card for
                    the buyer's premium (no payment will be taken).
                  </p>
                  <p>
                    If you win the auction, you agree to pay a fee of £3,780
                    (including VAT) to Collecting Cars UK Ltd.
                  </p>
                  {/* <h3>Current highest bid is £{Product.offers ? Product.offers[0].price : 0}</h3> */}
                  {Product.offers && Product.offers.length > 0 && (
                      <h3>Current highest Offer is £{Product.offers[0].price}</h3>
                  )}
                  <TextField
                    label="Place highest offer"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '20ch' }}
                    value={offerAmount}
                    onChange={(e)=>{setOfferAmount(e.target.value)}}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">£</InputAdornment>,
                    }}
                  />
                  <div className="single-login-check">
                    <label className="containers">
                      I agree to the <a href="#">Terms and Conditions</a>
                      <input  type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/>
                      <span className="checkmark" />
                    </label>
                  </div>
                </div>
                <div className="bid-con-btn">
                  <button className="confirm-bid-btn flex" style={{position:'relative',width:'6.4rem'}} onClick={placeOffer} disabled={!isChecked}> 
                    { bidLoading? <div class="loader-2 center" ><span></span></div> :'CONFIRM' }
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="minimum-popup">
          <div className="minimum-pop-title">
            <h3>Minimum: £155,000</h3>
            <a href="#">Cancel</a>
          </div>
          <div className="minimum-pop-input">
            <input type="text" placeholder="Enter your bid" />
            <a href="#">Place live bid</a>
          </div>
        </div>
        </div>
      : <></>
      }
    </div>
  );
}

export default ProductDetailedPage;
