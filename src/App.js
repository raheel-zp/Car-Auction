import React,{useState,useEffect} from 'react'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import Favicon from "react-favicon";
import './App.css';
import './css/style.css'
import './css/default.css'
import './css/fontawesome.css'
import './css/meanmenu.css'
import './css/nice-select.css'
import './css/responsive.css'
import './css/slick.css'
import './css/tel.css'
import './Components/Animations.css'
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import SellMain from './Components/Sell/SellMain';
import Articles from './Components/Article/Articles';
import ArticleDetailPage from './Components/Article/ArticleDetailPage';
import Events from './Components/Events';
import About from './Components/About';
import Register from './Components/Register';
import Mantain from './Mantain';
import Login from './Components/Login';
import Faqs from './Components/Faqs';
import Forgot from './Components/Forgot';
import ResetPasswordLink from './Components/ResetPasswordLink';
import ManagedServices from './Components/ManagedServices';
import PressCutting from './Components/PressCutting';
import Shipping from './Components/Shipping';
import Mybids from './Components/Mybids';
import ScrollToTop from './Components/ScrollToTop';
import ConsignmentPage from './Components/ConsignmentPage';
//Admin
import PermanentDrawerLeft from './Components/Admin/PermanentDrawerLeft';
import { userloggedIn } from './Components/Context/Context';
import AdminHome from './Components/Admin/AdminHome';
import EventDetailPage from './Components/EventDetailPage';
import ProductDetailedPage from './Components/Auction/ProductDetailedPage';
import ProductDetailedPageBuyNow from './Components/BuyNow/ProductDetailedPageBuyNow';
import ProductDetailedPageComingSoon from './Components/ComingSoon/ProductDetailedPageComingSoon';
import SendEmailVerification from './Components/email verify/SendEmailVerification';
import EmailVerified from './EmailVerified';
import ProductDetailedPageSold from './Components/Sold/ProductDetailedPageSold';
import CookiePolicy from './Components/CookiePolicy';
import PrivacyPolicy from './Components/PrivacyPolicy';
import PostingRules from './Components/PostingRules';
import TermsConditions from './Components/TermsConditions';
import OurVision from './Components/OurVision';
import WhyUs from './Components/WhyUs';
import AboutUs from './Components/AboutUs';
import OurVisionNav from './Components/OurVisionNav';
import WhatsappBtn from './Components/WhatsappBtn';

window.scrollTo(0,0);

function App() {
  const [userlogged,setuserLogged] = useState(null);
  // const [userlogged,setuserLogged] = useState(true);
  const [adminLogged,setAdminLogged] = useState(false);
  const [userData,setuserData] = useState({});
  const [url,seturl] = useState('https://server.auto-auctions.co/'); //AutoAuction aws server
  // const [url,seturl] = useState('/');
  const [commentAdmin,setcommentAdmin] = useState('sami.mahfouz@live.co.uk');
  // const [commentAdmin,setcommentAdmin] = useState('afaqwebdev@gmail.com');
  const [myBidsLive,setmyBidsLive] = useState([]);
  const [myBidsExpired,setmyBidsExpired] = useState([]);
  const [myBidsSold,setmyBidsSold] = useState([]);
  const Navigate = useNavigate();
  
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
        window.location.reload('/');
      }
    }
  }
  const getLoggedin = async ()=>{
      const res = await fetch(`${url}isloggedin`,{
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type":"application/json",
        "authToken": localStorage.getItem("authToken"),
      }
    });
    const data = await res.json();
    console.log(data.data);
    if(data.msg === "loggedin"){
      setuserLogged(true);
      // console.log(data.data);
      setuserData(data.data);
      // console.log(userData);
    }else if(data.msg === 'admin'){
      setuserLogged(true);
      setuserData(data.data);
      setAdminLogged(true);
      Navigate('/admin');
    }
    else{
      // console.log("USER NOT LOGGED");
      setuserLogged(false);
      setAdminLogged(false);
      setuserData({});
    }
    console.log(userData);
  }
  useEffect(()=>{
    getLoggedin();
    // allArticles();
  },[])
  const getmyBids = async ()=> {
    const res = await fetch(`${url}myBidsData`,{
      method: "POST",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify({
        myBids: userData.myBids,
      })
    })
    const data = await res.json();
    if(data.msg==='success'){
      console.log(data.products);
      const myBidsLiveNow = data.products.filter((product) => product.category === 'auction');
      const myBidsExpire = data.products.filter((product) => product.category === 'expired');
      const sold = data.products.filter((product) => product.category === 'sold' && product.winner === userData.email);
      setmyBidsLive(myBidsLiveNow);
      setmyBidsExpired(myBidsExpire);
      setmyBidsSold(sold);
    }
  }
  useEffect(()=>{
    getmyBids();

  },[userData])

  return (
    <userloggedIn.Provider value={{userlogged,setuserLogged,userData,setuserData,getLoggedin,url,commentAdmin,myBidsLive,myBidsExpired,myBidsSold}}>
    <div className="App">
      <Favicon url="/favicon2.png" />
      <Navbar />
      {/* <div onClick={getmyBids} >getmyBids</div> */}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/sell-with-us' element={<SellMain/>} />
        <Route path='/articles' element={<Articles />} />
        <Route path='/articles/:title' element={<ArticleDetailPage />} />
        <Route path='/events/:title' element={<EventDetailPage />} />
        <Route path='/products/:title' element={<ProductDetailedPage />} />
        <Route path='/products-buynow/:title' element={<ProductDetailedPageBuyNow />} />
        <Route path='/products-comingsoon/:title' element={<ProductDetailedPageComingSoon/>} />
        <Route path='/products-sold/:title' element={<ProductDetailedPageSold/>} />
        <Route path='/events' element={<Events/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/faqs' element={<Faqs/>} />
        <Route path='/cookie-policy' element={<CookiePolicy/>} />
        <Route path='/privacy-policy' element={<PrivacyPolicy/>} />
        {/* <Route path='/posting-rules' element={<PostingRules/>} /> */}
        <Route path='/our-vision' element={<About/>} />
        {/* <Route path='/our-vision' element={<OurVision/>} /> */}
        <Route path='/why-us' element={<WhyUs/>} />
        <Route path='/about-us' element={<AboutUs/>} />
        <Route path='/terms-and-conditions' element={<TermsConditions/>} />
        {/* <Route path='/managed-services' element={<ManagedServices/>} /> */}
        {/* <Route path='/press-cutting' element={<PressCutting/>} /> */}
        {/* <Route path='/shipping' element={<Shipping/>} /> */}
        <Route path='/reset-password-link/:token' element={<ResetPasswordLink/>} />
        {/* <Route path='/admin' element={<AdminHome/>} /> */}
        <Route path='/consignment-form/:token' element={<ConsignmentPage/>} />
        <Route path='*' element={<Home/>} />
        { adminLogged && <Route path='/admin' element={<AdminHome/>} />}
        { userlogged? (<>
          <Route path='/account/bids' element={<Mybids getLoggedin={getLoggedin}/>}/>
          <Route path='/email-verification' element={<SendEmailVerification userData={userData} />}/>
          <Route path='/verify-email/:token' element={<EmailVerified />}/>
        </>):(<>
          <Route path='/forgot-password' element={<Forgot/>} />
          <Route path='/accounts/register' element={<Register/>} />
          <Route path='/accounts/login' element={<Login/>} />
        </>)
        }
      </Routes>
      { !adminLogged && <Footer/>}
      <Mantain/>
      {/* <ScrollToTop /> */}
      {!adminLogged && <WhatsappBtn /> }
    </div>
    </userloggedIn.Provider>
  );
}
export default App;