import * as React from 'react';
// import Skeleton from '@mui/material/Skeleton';
// import Stack from '@mui/material/Stack';
// import HomeSkeleton from './HomeSkeleton
import { useContext,useState } from 'react';
import Navbar from './Navbar';
import { Helmet } from 'react-helmet'
import HomeCategory from './Auction/HomeCategory';
import BuyNowCategory from './BuyNow/BuyNowCategory';
import ComingSoonCategory from './ComingSoon/ComingSoonCategory';
import SoldCategory from './Sold/SoldCategory';
import { userloggedIn } from './Context/Context';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './LoaderBlack.css'
import { NavLink } from 'react-router-dom';
import './Respons.css'

function Home() {
  const {userlogged,setuserLogged,userData,setuserData,url} = useContext(userloggedIn);
  const [HomeProducts,setHomeProducts] = React.useState([]);
  const [Live,setLive] = React.useState([]);
  const [DealNow,setDealNow] = React.useState([]);
  const [ComingSoon,setComingSoon] = React.useState([]);
  const [Sold,setSold] = React.useState([]);
  const [globalActive,setglobalActive] = useState(true);
  const [TransmissionType,setTransmissionType] = useState('');
  const [ProductssellerType,setProductssellerType] = useState('');
  const [ProductsSide,setProductsSide] = useState('');
  const [Model,setModel] = useState('');
  const [showFilters,setshowFilters] = useState(false);
  const [IsMobile, setIsMobile] = useState(false);

  // const setProductsSide = async (side) =>{
  //   setLive(HomeProducts.filter((product) => product.side === side && product.category === 'auction'));
  //   setDealNow(HomeProducts.filter((product) => product.side === side && product.category === 'buynow'));
  //   setComingSoon(HomeProducts.filter((product) => product.side === side && product.category === 'comingsoon'));
  //   setSold(HomeProducts.filter((product) => product.side === side && product.category === 'sold'));
  // }
  // const setProductssellerType = async (side) =>{
  //   setLive(HomeProducts.filter((product) => product.saleType === side && product.category === 'auction'));
  //   setDealNow(HomeProducts.filter((product) => product.saleType === side && product.category === 'buynow'));
  //   setComingSoon(HomeProducts.filter((product) => product.saleType === side && product.category === 'comingsoon'));
  //   setSold(HomeProducts.filter((product) => product.saleType === side && product.category === 'sold'));
  // }
  const setProductTransmissionType = async (value) =>{
    setLive(HomeProducts.filter((product) => product.TransmissionType === value && product.category === 'auction'));
    setDealNow(HomeProducts.filter((product) => product.TransmissionType === value && product.category === 'buynow'));
    setComingSoon(HomeProducts.filter((product) => product.TransmissionType === value && product.category === 'comingsoon'));
    setSold(HomeProducts.filter((product) => product.TransmissionType === value && product.category === 'sold'));
  }
  const setLocationProducts = async (country) =>{
    setLive(HomeProducts.filter((product) => product.country === country && product.category === 'auction'));
    setDealNow(HomeProducts.filter((product) => product.country === country && product.category === 'buynow'));
    setComingSoon(HomeProducts.filter((product) => product.country === country && product.category === 'comingsoon'));
    setSold(HomeProducts.filter((product) => product.country === country && product.category === 'sold'));
  }
  // const setModelProducts = async (model) =>{
  //   setLive(HomeProducts.filter((product) => product.carModel === model && product.category === 'auction'));
  //   setDealNow(HomeProducts.filter((product) => product.carModel === model && product.category === 'buynow'));
  //   setComingSoon(HomeProducts.filter((product) => product.carModel === model && product.category === 'comingsoon'));
  //   setSold(HomeProducts.filter((product) => product.carModel === model && product.category === 'sold'));
  // }
  const resetsetLocationProducts = async () =>{
    setLive(HomeProducts.filter((product) => product.category === 'auction'));
    setDealNow(HomeProducts.filter((product) => product.category === 'buynow'));
    setComingSoon(HomeProducts.filter((product) => product.category === 'comingsoon'));
    setSold(HomeProducts.filter((product) => product.category === 'sold'));
  }
  const changeTransmission = async (e)=>{
    // e)=>{if(e.target.checked){setTransmissionType('auto')}
    if(e.target.checked){
      if(e.target.name==='auto'){
        setTransmissionType('auto');
        setProductTransmissionType('auto');
      }
      if(e.target.name==='manual'){
        setTransmissionType('manual');
        setProductTransmissionType('manual');
      }
      if(e.target.name==='semiAutomatic'){
        setTransmissionType('semiAutomatic');
        setProductTransmissionType('semiAutomatic');
      }
      if(e.target.name==='CVT'){
        setTransmissionType('CVT');
        setProductTransmissionType('CVT');
      }
      if(e.target.name==='DTC'){
        setTransmissionType('DTC');
        setProductTransmissionType('DTC');
      }
    }
    filterProducts();
  }
  const handleFilterClick = ()=>{
    setshowFilters(!showFilters);
    allHomeProducts();
  }
  const clearFilter = ()=>{
    setTransmissionType('');
    setProductssellerType('');
    setProductsSide('');
    setModel('');
    allHomeProducts();
  }
  const filterProducts = () => {
    // console.log(Model);
    // console.log(TransmissionType);
    // console.log(ProductssellerType);
    // console.log(ProductsSide);
    const filteredProducts = HomeProducts.filter((product) => {
      if (Model && product.carModel !== Model ) {
        return false;
      }
      if (TransmissionType && product.TransmissionType !== TransmissionType ) {
        return false;
      }
      if (ProductssellerType && product.saleType !== ProductssellerType ) {
        return false;
      }
      if (ProductsSide && product.side !== ProductsSide ) {
        return false;
      }
      return true;
    });
    console.log(filteredProducts);
    setLive(filteredProducts.filter((product) => product.category === 'auction'));
    setDealNow(filteredProducts.filter((product) => product.category === 'buynow'));
    setComingSoon(filteredProducts.filter((product) => product.category === 'comingsoon'));
    setSold(filteredProducts.filter((product) => product.category === 'sold'));
    // setHomeProducts(filteredProducts);
  };
  const showHomeProducts = ()=>{
    // console.log(HomeProducts);
  }
  const allHomeProducts = async ()=>{
    // setarticlesLoading(true);
    const res = await fetch(`${url}allHomeProducts`,{
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type":"application/json",
      "authToken": localStorage.getItem("authToken"),
    }
    });
    const data = await res.json();
    if(data.msg === 'success'){
        // console.log(data.data);
      // setHomeProducts(data.data);
      const liveProducts = data.data.filter((product) => product.category === 'auction');
      const dealNowProducts = data.data.filter((product) => product.category === 'buynow');
      const comingsoon = data.comingsoon;
      const sold = data.sold;
      // Update state variables
      setLive(liveProducts);
      setDealNow(dealNowProducts);
      setComingSoon(data.comingsoon);
      setSold(data.sold);
      // Combine filtered arrays and set HomeProducts
      setHomeProducts([...liveProducts, ...dealNowProducts, ...comingsoon, ...sold]);
    }
  }
  React.useEffect(()=>{
    filterProducts();
  },[TransmissionType,Model,ProductssellerType,ProductsSide]);
  React.useEffect(() => {  
    setIsMobile(window.innerWidth < 767);
  }, []);
  // allArticles();
React.useEffect(()=>{
  allHomeProducts();
},[]);

  return (
    <>
      <Helmet>
        <title>Sell my car for free: Start your success journey today!</title>
        <meta
          name='description'
          content='Explore the extraordinary ways to sell your car for free and experience a hassle-free process. 
          Get started on the journey now!'
        />
        <link rel='canonical' href='/' />
      </Helmet>
          <div className="hero-banner-area">
            <div className="container" style={{maxWidth: '100%'}} >
              <div className="row">
                <div className="col-lg-12" style={{position:'relative',padding:'0'}} >
                  <div className="hero-banner" style={{backgroundImage: 'url(assets/img/bg-11-optimized.webp)',backgroundPosition: 'center 70%'}}>
                    <h3 >UNLOCK YOUR CARS VALUE<span style={{color:'rgb(1, 163, 210)'}} >.</span><br />
                      LIST FREE, SELL FAST<span style={{color:'rgb(1, 163, 210)'}} >.<br /></span >MAXIMISE PROFIT<span style={{color:'rgb(1, 163, 210)'}} >.</span></h3>
                    {/* <p>STRESS FREE</p> */}
                  </div>
                  <NavLink to='/sell-with-us' className='sell-btn-con' >
                    <div className='sell-home-btn' >Sell My Car</div>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          {/* hero-banner-area-end */}
          {/* blog-area-start */}
          <div className="blog-area">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                { showFilters &&
                  <div className="filter_opened">
                    <div className="fo_elem">
                      <div className="fo_elem_txt" onClick={showHomeProducts} >Transmission Type</div>
                      <div className="fo_elem_option">
                        <input type="checkbox" style={{height:'1rem',width:'1rem'}} checked={TransmissionType === 'auto'} onChange={changeTransmission} name="auto" id="" />
                        <div className="fo_e_txt">Automatic</div>
                      </div>
                      <div className="fo_elem_option">
                        <input type="checkbox" style={{height:'1rem',width:'1rem'}} checked={TransmissionType === 'manual'} onChange={changeTransmission} name="manual" id="" />
                        <div className="fo_e_txt">Manual</div>
                      </div>
                      <div className="fo_elem_option">
                        <input type="checkbox" style={{height:'1rem',width:'1rem'}} checked={TransmissionType === 'semiAutomatic'} onChange={changeTransmission} name="semiAutomatic" id="" />
                        <div className="fo_e_txt">Semi-Automatic</div>
                      </div>
                      <div className="fo_elem_option">
                        <input type="checkbox" style={{height:'1rem',width:'1rem'}} checked={TransmissionType === 'CVT'} onChange={changeTransmission} name="CVT" id="" />
                        <div className="fo_e_txt">CVT (Continuously Variable)</div>
                      </div>
                      <div className="fo_elem_option">
                        <input type="checkbox" style={{height:'1rem',width:'1rem'}} checked={TransmissionType === 'DTC'} onChange={changeTransmission} name="DTC" id="" />
                        <div className="fo_e_txt">DTC Dual-Clutch</div>
                      </div>                      
                    </div>
                    <div className="fo_elem">
                      <div className="fo_elem_txt" onClick={filterProducts} >Seller Type</div>
                      <div className="fo_elem_option">
                        <input type="checkbox" onChange={(e)=>{if(e.target.checked){setProductssellerType('private')}else{setProductssellerType('public')}}} style={{height:'1rem',width:'1rem'}} name="" id="" />
                        <div className="fo_e_txt">Private</div>
                      </div>
                    </div>
                    <div className="fo_elem">
                      <div className="fo_elem_txt" onClick={allHomeProducts} >Car Model</div>
                      <div className="fo_elem_option">
                            {/* <FormControl sx={{ m: 1, minWidth: 190 }}>
                                <InputLabel id="demo-simple-select-helper-label">Country</InputLabel>
                                <Select
                                  labelId="demo-simple-select-helper-label"
                                  id="demo-simple-select-helper"
                                  label="Country"
                                  onChange={(e)=>{setLocationProducts(e.target.value)}}
                                  // style={{height:'2.5rem'}}
                                >
                                <MenuItem value="">Select Country</MenuItem>
                                <MenuItem value="Afghanistan">Afghanistan</MenuItem>
                                <MenuItem value="Åland Islands">Åland Islands</MenuItem>
                                <MenuItem value="Albania">Albania</MenuItem>
                                <MenuItem value="Algeria">Algeria</MenuItem>
                                <MenuItem value="American Samoa">American Samoa</MenuItem>
                                <MenuItem value="Andorra">Andorra</MenuItem>
                                <MenuItem value="Angola">Angola</MenuItem>
                                <MenuItem value="Anguilla">Anguilla</MenuItem>
                                <MenuItem value="Antarctica">Antarctica</MenuItem>
                                <MenuItem value="Antigua and Barbuda">Antigua and Barbuda</MenuItem>
                                <MenuItem value="Argentina">Argentina</MenuItem>
                                <MenuItem value="Armenia">Armenia</MenuItem>
                                <MenuItem value="Aruba">Aruba</MenuItem>
                                <MenuItem value="Australia">Australia</MenuItem>
                                <MenuItem value="Austria">Austria</MenuItem>
                                <MenuItem value="Azerbaijan">Azerbaijan</MenuItem>
                                <MenuItem value="Bahamas">Bahamas</MenuItem>
                                <MenuItem value="Bahrain">Bahrain</MenuItem>
                                <MenuItem value="Bangladesh">Bangladesh</MenuItem>
                                <MenuItem value="Barbados">Barbados</MenuItem>
                                <MenuItem value="Belarus">Belarus</MenuItem>
                                <MenuItem value="Belgium">Belgium</MenuItem>
                                <MenuItem value="Belize">Belize</MenuItem>
                                <MenuItem value="Benin">Benin</MenuItem>
                                <MenuItem value="Bermuda">Bermuda</MenuItem>
                                <MenuItem value="Bhutan">Bhutan</MenuItem>
                                <MenuItem value="Bolivia">Bolivia</MenuItem>
                                <MenuItem value="Bosnia and Herzegovina">
                                Bosnia and Herzegovina
                                </MenuItem>
                                <MenuItem value="Botswana">Botswana</MenuItem>
                                <MenuItem value="Bouvet Island">Bouvet Island</MenuItem>
                                <MenuItem value="Brazil">Brazil</MenuItem>
                                <MenuItem value="British Indian Ocean Territory">
                                British Indian Ocean Territory
                                </MenuItem>
                                <MenuItem value="Brunei Darussalam">Brunei Darussalam</MenuItem>
                                <MenuItem value="Bulgaria">Bulgaria</MenuItem>
                                <MenuItem value="Burkina Faso">Burkina Faso</MenuItem>
                                <MenuItem value="Burundi">Burundi</MenuItem>
                                <MenuItem value="Cambodia">Cambodia</MenuItem>
                                <MenuItem value="Cameroon">Cameroon</MenuItem>
                                <MenuItem value="Canada">Canada</MenuItem>
                                <MenuItem value="Cape Verde">Cape Verde</MenuItem>
                                <MenuItem value="Cayman Islands">Cayman Islands</MenuItem>
                                <MenuItem value="Central African Republic">
                                Central African Republic
                                </MenuItem>
                                <MenuItem value="Chad">Chad</MenuItem>
                                <MenuItem value="Chile">Chile</MenuItem>
                                <MenuItem value="China">China</MenuItem>
                                <MenuItem value="Christmas Island">Christmas Island</MenuItem>
                                <MenuItem value="Cocos (Keeling) Islands">
                                Cocos (Keeling) Islands
                                </MenuItem>
                                <MenuItem value="Colombia">Colombia</MenuItem>
                                <MenuItem value="Comoros">Comoros</MenuItem>
                                <MenuItem value="Congo">Congo</MenuItem>
                                <MenuItem value="Congo, The Democratic Republic of The">
                                Congo, The Democratic Republic of The
                                </MenuItem>
                                <MenuItem value="Cook Islands">Cook Islands</MenuItem>
                                <MenuItem value="Costa Rica">Costa Rica</MenuItem>
                                <MenuItem value="Cote D'ivoire">Cote D'ivoire</MenuItem>
                                <MenuItem value="Croatia">Croatia</MenuItem>
                                <MenuItem value="Cuba">Cuba</MenuItem>
                                <MenuItem value="Cyprus">Cyprus</MenuItem>
                                <MenuItem value="Czech Republic">Czech Republic</MenuItem>
                                <MenuItem value="Denmark">Denmark</MenuItem>
                                <MenuItem value="Djibouti">Djibouti</MenuItem>
                                <MenuItem value="Dominica">Dominica</MenuItem>
                                <MenuItem value="Dominican Republic">Dominican Republic</MenuItem>
                                <MenuItem value="Ecuador">Ecuador</MenuItem>
                                <MenuItem value="Egypt">Egypt</MenuItem>
                                <MenuItem value="El Salvador">El Salvador</MenuItem>
                                <MenuItem value="Equatorial Guinea">Equatorial Guinea</MenuItem>
                                <MenuItem value="Eritrea">Eritrea</MenuItem>
                                <MenuItem value="Estonia">Estonia</MenuItem>
                                <MenuItem value="Ethiopia">Ethiopia</MenuItem>
                                <MenuItem value="Falkland Islands (Malvinas)">
                                Falkland Islands (Malvinas)
                                </MenuItem>
                                <MenuItem value="Faroe Islands">Faroe Islands</MenuItem>
                                <MenuItem value="Fiji">Fiji</MenuItem>
                                <MenuItem value="Finland">Finland</MenuItem>
                                <MenuItem value="France">France</MenuItem>
                                <MenuItem value="French Guiana">French Guiana</MenuItem>
                                <MenuItem value="French Polynesia">French Polynesia</MenuItem>
                                <MenuItem value="French Southern Territories">
                                French Southern Territories
                                </MenuItem>
                                <MenuItem value="Gabon">Gabon</MenuItem>
                                <MenuItem value="Gambia">Gambia</MenuItem>
                                <MenuItem value="Georgia">Georgia</MenuItem>
                                <MenuItem value="Germany">Germany</MenuItem>
                                <MenuItem value="Ghana">Ghana</MenuItem>
                                <MenuItem value="Gibraltar">Gibraltar</MenuItem>
                                <MenuItem value="Greece">Greece</MenuItem>
                                <MenuItem value="Greenland">Greenland</MenuItem>
                                <MenuItem value="Grenada">Grenada</MenuItem>
                                <MenuItem value="Guadeloupe">Guadeloupe</MenuItem>
                                <MenuItem value="Guam">Guam</MenuItem>
                                <MenuItem value="Guatemala">Guatemala</MenuItem>
                                <MenuItem value="Guernsey">Guernsey</MenuItem>
                                <MenuItem value="Guinea">Guinea</MenuItem>
                                <MenuItem value="Guinea-bissau">Guinea-bissau</MenuItem>
                                <MenuItem value="Guyana">Guyana</MenuItem>
                                <MenuItem value="Haiti">Haiti</MenuItem>
                                <MenuItem value="Heard Island and Mcdonald Islands">
                                Heard Island and Mcdonald Islands
                                </MenuItem>
                                <MenuItem value="Holy See (Vatican City State)">
                                Holy See (Vatican City State)
                                </MenuItem>
                                <MenuItem value="Honduras">Honduras</MenuItem>
                                <MenuItem value="Hong Kong">Hong Kong</MenuItem>
                                <MenuItem value="Hungary">Hungary</MenuItem>
                                <MenuItem value="Iceland">Iceland</MenuItem>
                                <MenuItem value="India">India</MenuItem>
                                <MenuItem value="Indonesia">Indonesia</MenuItem>
                                <MenuItem value="Iran, Islamic Republic of">
                                Iran, Islamic Republic of
                                </MenuItem>
                                <MenuItem value="Iraq">Iraq</MenuItem>
                                <MenuItem value="Ireland">Ireland</MenuItem>
                                <MenuItem value="Isle of Man">Isle of Man</MenuItem>
                                <MenuItem value="Israel">Israel</MenuItem>
                                <MenuItem value="Italy">Italy</MenuItem>
                                <MenuItem value="Jamaica">Jamaica</MenuItem>
                                <MenuItem value="Japan">Japan</MenuItem>
                                <MenuItem value="Jersey">Jersey</MenuItem>
                                <MenuItem value="Jordan">Jordan</MenuItem>
                                <MenuItem value="Kazakhstan">Kazakhstan</MenuItem>
                                <MenuItem value="Kenya">Kenya</MenuItem>
                                <MenuItem value="Kiribati">Kiribati</MenuItem>
                                <MenuItem value="Korea, Democratic People's Republic of">
                                Korea, Democratic People's Republic of
                                </MenuItem>
                                <MenuItem value="Korea, Republic of">Korea, Republic of</MenuItem>
                                <MenuItem value="Kuwait">Kuwait</MenuItem>
                                <MenuItem value="Kyrgyzstan">Kyrgyzstan</MenuItem>
                                <MenuItem value="Lao People's Democratic Republic">
                                Lao People's Democratic Republic
                                </MenuItem>
                                <MenuItem value="Latvia">Latvia</MenuItem>
                                <MenuItem value="Lebanon">Lebanon</MenuItem>
                                <MenuItem value="Lesotho">Lesotho</MenuItem>
                                <MenuItem value="Liberia">Liberia</MenuItem>
                                <MenuItem value="Libyan Arab Jamahiriya">
                                Libyan Arab Jamahiriya
                                </MenuItem>
                                <MenuItem value="Liechtenstein">Liechtenstein</MenuItem>
                                <MenuItem value="Lithuania">Lithuania</MenuItem>
                                <MenuItem value="Luxembourg">Luxembourg</MenuItem>
                                <MenuItem value="Macao">Macao</MenuItem>
                                <MenuItem value="Macedonia, The Former Yugoslav Republic of">
                                Macedonia, The Former Yugoslav Republic of
                                </MenuItem>
                                <MenuItem value="Madagascar">Madagascar</MenuItem>
                                <MenuItem value="Malawi">Malawi</MenuItem>
                                <MenuItem value="Malaysia">Malaysia</MenuItem>
                                <MenuItem value="Maldives">Maldives</MenuItem>
                                <MenuItem value="Mali">Mali</MenuItem>
                                <MenuItem value="Malta">Malta</MenuItem>
                                <MenuItem value="Marshall Islands">Marshall Islands</MenuItem>
                                <MenuItem value="Martinique">Martinique</MenuItem>
                                <MenuItem value="Mauritania">Mauritania</MenuItem>
                                <MenuItem value="Mauritius">Mauritius</MenuItem>
                                <MenuItem value="Mayotte">Mayotte</MenuItem>
                                <MenuItem value="Mexico">Mexico</MenuItem>
                                <MenuItem value="Micronesia, Federated States of">
                                Micronesia, Federated States of
                                </MenuItem>
                                <MenuItem value="Moldova, Republic of">Moldova, Republic of</MenuItem>
                                <MenuItem value="Monaco">Monaco</MenuItem>
                                <MenuItem value="Mongolia">Mongolia</MenuItem>
                                <MenuItem value="Montenegro">Montenegro</MenuItem>
                                <MenuItem value="Montserrat">Montserrat</MenuItem>
                                <MenuItem value="Morocco">Morocco</MenuItem>
                                <MenuItem value="Mozambique">Mozambique</MenuItem>
                                <MenuItem value="Myanmar">Myanmar</MenuItem>
                                <MenuItem value="Namibia">Namibia</MenuItem>
                                <MenuItem value="Nauru">Nauru</MenuItem>
                                <MenuItem value="Nepal">Nepal</MenuItem>
                                <MenuItem value="Netherlands">Netherlands</MenuItem>
                                <MenuItem value="Netherlands Antilles">Netherlands Antilles</MenuItem>
                                <MenuItem value="New Caledonia">New Caledonia</MenuItem>
                                <MenuItem value="New Zealand">New Zealand</MenuItem>
                                <MenuItem value="Nicaragua">Nicaragua</MenuItem>
                                <MenuItem value="Niger">Niger</MenuItem>
                                <MenuItem value="Nigeria">Nigeria</MenuItem>
                                <MenuItem value="Niue">Niue</MenuItem>
                                <MenuItem value="Norfolk Island">Norfolk Island</MenuItem>
                                <MenuItem value="Northern Mariana Islands">
                                Northern Mariana Islands
                                </MenuItem>
                                <MenuItem value="Norway">Norway</MenuItem>
                                <MenuItem value="Oman">Oman</MenuItem>
                                <MenuItem value="Pakistan">Pakistan</MenuItem>
                                <MenuItem value="Palau">Palau</MenuItem>
                                <MenuItem value="Palestinian Territory, Occupied">
                                Palestinian Territory, Occupied
                                </MenuItem>
                                <MenuItem value="Panama">Panama</MenuItem>
                                <MenuItem value="Papua New Guinea">Papua New Guinea</MenuItem>
                                <MenuItem value="Paraguay">Paraguay</MenuItem>
                                <MenuItem value="Peru">Peru</MenuItem>
                                <MenuItem value="Philippines">Philippines</MenuItem>
                                <MenuItem value="Pitcairn">Pitcairn</MenuItem>
                                <MenuItem value="Poland">Poland</MenuItem>
                                <MenuItem value="Portugal">Portugal</MenuItem>
                                <MenuItem value="Puerto Rico">Puerto Rico</MenuItem>
                                <MenuItem value="Qatar">Qatar</MenuItem>
                                <MenuItem value="Reunion">Reunion</MenuItem>
                                <MenuItem value="Romania">Romania</MenuItem>
                                <MenuItem value="Russian Federation">Russian Federation</MenuItem>
                                <MenuItem value="Rwanda">Rwanda</MenuItem>
                                <MenuItem value="Saint Helena">Saint Helena</MenuItem>
                                <MenuItem value="Saint Kitts and Nevis">Saint Kitts and Nevis</MenuItem>
                                <MenuItem value="Saint Lucia">Saint Lucia</MenuItem>
                                <MenuItem value="Saint Pierre and Miquelon">
                                Saint Pierre and Miquelon
                                </MenuItem>
                                <MenuItem value="Saint Vincent and The Grenadines">
                                Saint Vincent and The Grenadines
                                </MenuItem>
                                <MenuItem value="Samoa">Samoa</MenuItem>
                                <MenuItem value="San Marino">San Marino</MenuItem>
                                <MenuItem value="Sao Tome and Principe">Sao Tome and Principe</MenuItem>
                                <MenuItem value="Saudi Arabia">Saudi Arabia</MenuItem>
                                <MenuItem value="Senegal">Senegal</MenuItem>
                                <MenuItem value="Serbia">Serbia</MenuItem>
                                <MenuItem value="Seychelles">Seychelles</MenuItem>
                                <MenuItem value="Sierra Leone">Sierra Leone</MenuItem>
                                <MenuItem value="Singapore">Singapore</MenuItem>
                                <MenuItem value="Slovakia">Slovakia</MenuItem>
                                <MenuItem value="Slovenia">Slovenia</MenuItem>
                                <MenuItem value="Solomon Islands">Solomon Islands</MenuItem>
                                <MenuItem value="Somalia">Somalia</MenuItem>
                                <MenuItem value="South Africa">South Africa</MenuItem>
                                <MenuItem value="South Georgia and The South Sandwich Islands">
                                South Georgia and The South Sandwich Islands
                                </MenuItem>
                                <MenuItem value="Spain">Spain</MenuItem>
                                <MenuItem value="Sri Lanka">Sri Lanka</MenuItem>
                                <MenuItem value="Sudan">Sudan</MenuItem>
                                <MenuItem value="Suriname">Suriname</MenuItem>
                                <MenuItem value="Svalbard and Jan Mayen">
                                Svalbard and Jan Mayen
                                </MenuItem>
                                <MenuItem value="Swaziland">Swaziland</MenuItem>
                                <MenuItem value="Sweden">Sweden</MenuItem>
                                <MenuItem value="Switzerland">Switzerland</MenuItem>
                                <MenuItem value="Syrian Arab Republic">Syrian Arab Republic</MenuItem>
                                <MenuItem value="Taiwan">Taiwan</MenuItem>
                                <MenuItem value="Tajikistan">Tajikistan</MenuItem>
                                <MenuItem value="Tanzania, United Republic of">
                                Tanzania, United Republic of
                                </MenuItem>
                                <MenuItem value="Thailand">Thailand</MenuItem>
                                <MenuItem value="Timor-leste">Timor-leste</MenuItem>
                                <MenuItem value="Togo">Togo</MenuItem>
                                <MenuItem value="Tokelau">Tokelau</MenuItem>
                                <MenuItem value="Tonga">Tonga</MenuItem>
                                <MenuItem value="Trinidad and Tobago">Trinidad and Tobago</MenuItem>
                                <MenuItem value="Tunisia">Tunisia</MenuItem>
                                <MenuItem value="Turkey">Turkey</MenuItem>
                                <MenuItem value="Turkmenistan">Turkmenistan</MenuItem>
                                <MenuItem value="Turks and Caicos Islands">
                                Turks and Caicos Islands
                                </MenuItem>
                                <MenuItem value="Tuvalu">Tuvalu</MenuItem>
                                <MenuItem value="Uganda">Uganda</MenuItem>
                                <MenuItem value="Ukraine">Ukraine</MenuItem>
                                <MenuItem value="United Arab Emirates">United Arab Emirates</MenuItem>
                                <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                                <MenuItem value="United States">United States</MenuItem>
                                <MenuItem value="United States Minor Outlying Islands">
                                United States Minor Outlying Islands
                                </MenuItem>
                                <MenuItem value="Uruguay">Uruguay</MenuItem>
                                <MenuItem value="Uzbekistan">Uzbekistan</MenuItem>
                                <MenuItem value="Vanuatu">Vanuatu</MenuItem>
                                <MenuItem value="Venezuela">Venezuela</MenuItem>
                                <MenuItem value="Viet Nam">Viet Nam</MenuItem>
                                <MenuItem value="Virgin Islands, British">
                                Virgin Islands, British
                                </MenuItem>
                                <MenuItem value="Virgin Islands, U.S.">Virgin Islands, U.S.</MenuItem>
                                <MenuItem value="Wallis and Futuna">Wallis and Futuna</MenuItem>
                                <MenuItem value="Western Sahara">Western Sahara</MenuItem>
                                <MenuItem value="Yemen">Yemen</MenuItem>
                                <MenuItem value="Zambia">Zambia</MenuItem>
                                <MenuItem value="Zimbabwe">Zimbabwe</MenuItem>
                                </Select>
                            </FormControl> */}
                            <FormControl sx={{ m: 1, minWidth: 190 }}>
                                <InputLabel id="demo-simple-select-helper-label">Car Model</InputLabel>
                                <Select
                                  labelId="demo-simple-select-helper-label"
                                  id="demo-simple-select-helper"
                                  label="Country"
                                  onChange={(e)=>{setModel(e.target.value)}}
                                  // style={{height:'2.5rem'}}
                                >
                                <MenuItem value="">SELECT</MenuItem>
                                <MenuItem value="ALFA ROMEO">ALFA ROMEO</MenuItem>
                                <MenuItem value="ASTON MARTIN">ASTON MARTIN</MenuItem>
                                <MenuItem value="AUDI">AUDI</MenuItem>
                                <MenuItem value="BENTLEY">BENTLEY</MenuItem>
                                <MenuItem value="BMW">BMW</MenuItem>
                                <MenuItem value="CITROEN">CITROEN</MenuItem>
                                <MenuItem value="CORVETTE">CORVETTE</MenuItem>
                                <MenuItem value="DODGE">DODGE</MenuItem>
                                <MenuItem value="FERRARI">FERRARI</MenuItem>
                                <MenuItem value="FIAT">FIAT</MenuItem>
                                <MenuItem value="FORD">FORD</MenuItem>
                                <MenuItem value="GENESIS">GENESIS</MenuItem>
                                <MenuItem value="HONDA">HONDA</MenuItem>
                                <MenuItem value="HYUNDAI">HYUNDAI</MenuItem>
                                <MenuItem value="INFINITI">INFINITI</MenuItem>
                                <MenuItem value="ISUZU">ISUZU</MenuItem>
                                <MenuItem value="JAGUAR">JAGUAR</MenuItem>
                                <MenuItem value="JEEP">JEEP</MenuItem>
                                <MenuItem value="KIA">KIA</MenuItem>
                                <MenuItem value="LAMBORGHINI">LAMBORGHINI</MenuItem>
                                <MenuItem value="LAND ROVER">LAND ROVER</MenuItem>
                                <MenuItem value="LEXUS">LEXUS</MenuItem>
                                <MenuItem value="LOTUS">LOTUS</MenuItem>
                                <MenuItem value="MASERATI">MASERATI</MenuItem>
                                <MenuItem value="MAZDA">MAZDA</MenuItem>
                                <MenuItem value="MCLAREN">MCLAREN</MenuItem>
                                <MenuItem value="MERCEDES-BENZ">MERCEDES-BENZ</MenuItem>
                                <MenuItem value="MG">MG</MenuItem>
                                <MenuItem value="MINI">MINI</MenuItem>
                                <MenuItem value="MITSUBISHI">MITSUBISHI</MenuItem>
                                <MenuItem value="MORGAN">MORGAN</MenuItem>
                                <MenuItem value="NISSAN">NISSAN</MenuItem>
                                <MenuItem value="PEUGEOT">PEUGEOT</MenuItem>
                                <MenuItem value="POLESTAR">POLESTAR</MenuItem>
                                <MenuItem value="PORSCHE">PORSCHE</MenuItem>
                                <MenuItem value="RENAULT">RENAULT</MenuItem>
                                <MenuItem value="ROLLS-ROYCE">ROLLS-ROYCE</MenuItem>
                                <MenuItem value="SEAT">SEAT</MenuItem>
                                <MenuItem value="SKODA">SKODA</MenuItem>
                                <MenuItem value="SMART">SMART</MenuItem>
                                <MenuItem value="SUBARU">SUBARU</MenuItem>
                                <MenuItem value="SUZUKI">SUZUKI</MenuItem>
                                <MenuItem value="TESLA">TESLA</MenuItem>
                                <MenuItem value="TOYOTA">TOYOTA</MenuItem>
                                <MenuItem value="VAUXHALL">VAUXHALL</MenuItem>
                                <MenuItem value="VOLKSWAGEN">VOLKSWAGEN</MenuItem>
                                <MenuItem value="VOLVO">VOLVO</MenuItem>
                                
                                </Select>
                            </FormControl>
                      </div>
                    </div>
                    <div className="fo_elem">
                      <div className="fo_elem_txt">Choose Side</div>
                      <div className="fo_elem_option">
                        <input type="checkbox" checked={ProductsSide === 'left'} onChange={(e)=>{if(e.target.checked){setProductsSide('left')}}} style={{height:'1rem',width:'1rem'}} name="" id="" />
                        <div className="fo_e_txt">Left</div>
                      </div>
                      <div className="fo_elem_option">
                        <input type="checkbox" checked={ProductsSide === 'right'} onChange={(e)=>{if(e.target.checked){setProductsSide('right')}}} style={{height:'1rem',width:'1rem'}} name="" id="" />
                        <div className="fo_e_txt">Right</div>
                      </div>
                    </div>
                  </div>
                }
                <div style={{display:'flex',justifyContent:'end',alignItems:'center',margin:'0 20px 10px 0'}} >
                  { showFilters && <a className='clear-filter-btn' onClick={clearFilter} >Clear</a>}
                </div>
                  <div className="blog-top" style={{display: 'grid',gridTemplateColumns: '33.33% 33.33% 33.33%'}} >
                    <a className="blog-top-search" style={{width: '94%',height: IsMobile?'25px':''}} >
                      <input type="text" placeholder="Search..." />
                      <a ><i className="fal fa-search" /></a>
                    </a>
                      {/* <div onClick={handleFilterClick} style={{cursor:'pointer'}} className="blog-top-felter"></div> */}
                    <a className='global-link2' style={{height: IsMobile?'25px':''}} onClick={handleFilterClick}><i className="fal fa-filter" />FILTER</a>
                    <a className='global-link2' style={{height: IsMobile?'25px':''}} ><i className="far fa-bookmark" />SAVED</a>
                    {/* <div className='b_top_right'> */}
                        {/* <a className='global-link2' ><i className="fal fa-filter" />FILTER</a> */}
                        {/* <a className='global-link2' ><i className="far fa-bookmark" />SAVED</a> */}
                      {/* <div className="blog-filer-right">
                        <a style={{cursor:'pointer'}} onClick={()=>{resetsetLocationProducts()}} className="global">
                          <svg xmlns="http://www.w3.org/2000/svg" height="1rem" viewBox="0 0 512 512"><path d="M57.7 193l9.4 16.4c8.3 14.5 21.9 25.2 38 29.8L163 255.7c17.2 4.9 29 20.6 29 38.5v39.9c0 11 6.2 21 16 25.9s16 14.9 16 25.9v39c0 15.6 14.9 26.9 29.9 22.6c16.1-4.6 28.6-17.5 32.7-33.8l2.8-11.2c4.2-16.9 15.2-31.4 30.3-40l8.1-4.6c15-8.5 24.2-24.5 24.2-41.7v-8.3c0-12.7-5.1-24.9-14.1-33.9l-3.9-3.9c-9-9-21.2-14.1-33.9-14.1H257c-11.1 0-22.1-2.9-31.8-8.4l-34.5-19.7c-4.3-2.5-7.6-6.5-9.2-11.2c-3.2-9.6 1.1-20 10.2-24.5l5.9-3c6.6-3.3 14.3-3.9 21.3-1.5l23.2 7.7c8.2 2.7 17.2-.4 21.9-7.5c4.7-7 4.2-16.3-1.2-22.8l-13.6-16.3c-10-12-9.9-29.5 .3-41.3l15.7-18.3c8.8-10.3 10.2-25 3.5-36.7l-2.4-4.2c-3.5-.2-6.9-.3-10.4-.3C163.1 48 84.4 108.9 57.7 193zM464 256c0-36.8-9.6-71.4-26.4-101.5L412 164.8c-15.7 6.3-23.8 23.8-18.5 39.8l16.9 50.7c3.5 10.4 12 18.3 22.6 20.9l29.1 7.3c1.2-9 1.8-18.2 1.8-27.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>
                          <span style={{marginLeft:'7px'}} >Global</span></a>
                        <a style={{cursor:'pointer',padding:'0 5px',marginRight: '0'}} onClick={() => setLocationProducts('United Kingdom')} className="flg__bt"><img className='flg_img' src="/assets/img/flag-uk.png" alt="" /></a>
                      </div> */}
                    {/* </div> */}
                    {/* <div className='b_top_right'>
                      <div onClick={handleFilterClick} style={{cursor:'pointer'}} className="blog-top-felter">
                        { showFilters && <a className='clear-filter-btn' onClick={clearFilter} >Clear</a>}
                        <a className='global-link2' ><i className="fal fa-filter" />FILTER</a>
                      </div>
                      <div className="blog-filer-right">
                        <a style={{cursor:'pointer'}} onClick={()=>{resetsetLocationProducts()}} className="global">
                          <svg xmlns="http://www.w3.org/2000/svg" height="1rem" viewBox="0 0 512 512"><path d="M57.7 193l9.4 16.4c8.3 14.5 21.9 25.2 38 29.8L163 255.7c17.2 4.9 29 20.6 29 38.5v39.9c0 11 6.2 21 16 25.9s16 14.9 16 25.9v39c0 15.6 14.9 26.9 29.9 22.6c16.1-4.6 28.6-17.5 32.7-33.8l2.8-11.2c4.2-16.9 15.2-31.4 30.3-40l8.1-4.6c15-8.5 24.2-24.5 24.2-41.7v-8.3c0-12.7-5.1-24.9-14.1-33.9l-3.9-3.9c-9-9-21.2-14.1-33.9-14.1H257c-11.1 0-22.1-2.9-31.8-8.4l-34.5-19.7c-4.3-2.5-7.6-6.5-9.2-11.2c-3.2-9.6 1.1-20 10.2-24.5l5.9-3c6.6-3.3 14.3-3.9 21.3-1.5l23.2 7.7c8.2 2.7 17.2-.4 21.9-7.5c4.7-7 4.2-16.3-1.2-22.8l-13.6-16.3c-10-12-9.9-29.5 .3-41.3l15.7-18.3c8.8-10.3 10.2-25 3.5-36.7l-2.4-4.2c-3.5-.2-6.9-.3-10.4-.3C163.1 48 84.4 108.9 57.7 193zM464 256c0-36.8-9.6-71.4-26.4-101.5L412 164.8c-15.7 6.3-23.8 23.8-18.5 39.8l16.9 50.7c3.5 10.4 12 18.3 22.6 20.9l29.1 7.3c1.2-9 1.8-18.2 1.8-27.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>
                          <span style={{marginLeft:'7px'}} >Global</span></a>
                        <a style={{cursor:'pointer',padding:'0 5px',marginRight: '0'}} onClick={() => setLocationProducts('United Kingdom')} className="flg__bt"><img className='flg_img' src="/assets/img/flag-uk.png" alt="" /></a>
                      </div>
                    </div> */}
                  </div>
                  <div className="blog-flter-fl">
                    <div className="blog-flter-btn___tab">
                      <div className="global__tab__menu">
                        <nav>
                          <div className="nav global-tabs" id="nav-tab" style={{display:'grid',gridTemplateColumns:'33.33% 33.33% 33.33%'}} role="tablist">
                            <button className="global-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Auction ({ Live.length>0?<>{Live.length}</>:<>0</>}) </button>
                            {/* <button className="global-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">DEAL NOW ({ DealNow.length>0?<>{DealNow.length}</>:<>0</>}) </button> */}
                            <button className="global-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">coming soon ({ ComingSoon.length>0?<>{ComingSoon.length}</>:<>0</>}) </button>
                            <button className="global-link" id="nav-contact-tabglobal" data-bs-toggle="tab" data-bs-target="#nav-contactglobal" type="button" role="tab" aria-controls="nav-contactglobal" aria-selected="false">SOLD ({ Sold.length>0?<>{Sold.length}</>:<>0</>})</button>
                          </div>
                        </nav>
                      </div>                      
                      {/* <div className="blog-filer-right">
                        <a style={{cursor:'pointer'}} onClick={()=>{resetsetLocationProducts()}} className="global">
                          <svg xmlns="http://www.w3.org/2000/svg" height="1rem" style={{marginRight:'7px'}} viewBox="0 0 512 512"><path d="M57.7 193l9.4 16.4c8.3 14.5 21.9 25.2 38 29.8L163 255.7c17.2 4.9 29 20.6 29 38.5v39.9c0 11 6.2 21 16 25.9s16 14.9 16 25.9v39c0 15.6 14.9 26.9 29.9 22.6c16.1-4.6 28.6-17.5 32.7-33.8l2.8-11.2c4.2-16.9 15.2-31.4 30.3-40l8.1-4.6c15-8.5 24.2-24.5 24.2-41.7v-8.3c0-12.7-5.1-24.9-14.1-33.9l-3.9-3.9c-9-9-21.2-14.1-33.9-14.1H257c-11.1 0-22.1-2.9-31.8-8.4l-34.5-19.7c-4.3-2.5-7.6-6.5-9.2-11.2c-3.2-9.6 1.1-20 10.2-24.5l5.9-3c6.6-3.3 14.3-3.9 21.3-1.5l23.2 7.7c8.2 2.7 17.2-.4 21.9-7.5c4.7-7 4.2-16.3-1.2-22.8l-13.6-16.3c-10-12-9.9-29.5 .3-41.3l15.7-18.3c8.8-10.3 10.2-25 3.5-36.7l-2.4-4.2c-3.5-.2-6.9-.3-10.4-.3C163.1 48 84.4 108.9 57.7 193zM464 256c0-36.8-9.6-71.4-26.4-101.5L412 164.8c-15.7 6.3-23.8 23.8-18.5 39.8l16.9 50.7c3.5 10.4 12 18.3 22.6 20.9l29.1 7.3c1.2-9 1.8-18.2 1.8-27.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>
                          <span>Global</span></a>
                        <a style={{cursor:'pointer',padding:'0 5px',marginRight: '0'}} onClick={() => setLocationProducts('United Kingdom')} className="flg__bt"><img className='flg_img' src="/assets/img/flag-uk.png" alt="" /></a>
                      </div> */}
                    </div>                    
                    <div className="global__tab__menu">
                      <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                          <HomeCategory Products={Live} allHomeProducts={allHomeProducts} />
                        </div>
                        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                          <BuyNowCategory Products={DealNow} />
                        </div>
                        <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                          <ComingSoonCategory Products={ComingSoon} />
                        </div>
                        <div className="tab-pane fade" id="nav-contactglobal" role="tabpanel" aria-labelledby="nav-contact-tabglobal">
                          <SoldCategory Products={Sold} />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="blog-navigation">
                    <a href="/"><i className="far fa-angle-double-left" /></a>
                    <a href="/"><i className="far fa-angle-left" /></a>
                    <span>1 of 8</span>
                    <a href="/"><i className="far fa-angle-right" /></a>
                    <a href="/"><i className="far fa-angle-double-right" /></a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          {/* blog-area-end */}
          {/* reating-bar-start */}
          {/* <div className="reation-bar">
            <div className="footer-reate">
              <h3>Excellent</h3>
              <div className="ster">
                <a href="/"><i className="fas fa-star" /></a>
                <a href="/"><i className="fas fa-star" /></a>
                <a href="/"><i className="fas fa-star" /></a>
                <a href="/"><i className="fas fa-star" /></a>
                <a href="/"><i className="fas fa-star" /></a>
              </div>
              <p>614 reviews</p>
            </div>
          </div> */}
          {/* reating-bar-end */}
          {/* buy-sing-area-start */}
          {/* <div className="buy-sing-area">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-title">
                    <h3>SIGN UP TO OUR DAILY BRIEFING</h3>
                  </div>
                  <div className="buy-sing-fl dd">
                    <div className="single-buy-sing">
                      <label htmlFor="#">Email address</label>
                      <input type="text" placeholder="Email address" />
                    </div>
                    <div className="single-buy-sing">
                      <label htmlFor="#">Where do you live?</label>
                      <select>
                        <option data-display="United States">United States</option>
                        <option value={1}>Some option</option>
                        <option value={2}>Another option</option>
                        <option value={3} disabled>A disabled option</option>
                        <option value={4}>Potato</option>
                      </select>
                    </div>
                    <div className="single-buy-btn">
                      <button type="submit">SUBSCRIBE</button>
                    </div>
                  </div>
                  <div className="buy-sing-last-text">
                    <p>By signing up, you agree to autoauctions.com’s <a href="/">Privacy
                        Policy</a> and <a href="/">Terms and Condition</a>.</p>
                  </div>
                  <div className="bye__sing__mobile dd">
                    <h2>Thank you for <br />
                      joining in</h2>
                    <p><span><i className="fas fa-check-circle" /></span>You’re subscribed to email updates, we’ll be
                      in touch soon!</p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* buy-sing-area-end */}
          {/* counter-area-start */}
          {/* <div className="counter-area" style={{backgroundImage: 'url(assets/img/ed-img.png)'}}>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-title">
                    <h3>WHY COLLECTING CARS?</h3>
                  </div>
                  <div className="counter-fl">
                    <div className="single-counter">
                      <div className="slingle-counter-kk">
                        <span className="counter">90</span>
                        <span>K+</span>
                      </div>
                      <p>REGISTERED MEMBERS</p>
                    </div>
                    <div className="single-counter">
                      <div className="slingle-counter-kk">
                        <span className="counter">500</span>
                        <span>K+</span>
                      </div>
                      <p>REGISTERED MEMBERS</p>
                    </div>
                    <div className="single-counter">
                      <div className="slingle-counter-kk">
                        <span className="counter">24</span>
                        <span>/</span>
                        <span className="counter">7</span>
                      </div>
                      <p>REGISTERED MEMBERS</p>
                    </div>
                    <div className="single-counter">
                      <div className="slingle-counter-kk">
                        <span className="counter">100</span>
                        <span>%</span>
                      </div>
                      <p>REGISTERED MEMBERS</p>
                    </div>
                    <div className="single-counter">
                      <div className="slingle-counter-kk">
                        <span className="counter">10,500</span>
                        <span>+</span>
                      </div>
                      <p>REGISTERED MEMBERS</p>
                    </div>
                    <div className="single-counter">
                      <div className="slingle-counter-kk">
                        <span>$</span>
                        <span className="counter">470</span>
                        <span>M+</span>
                      </div>
                      <p>REGISTERED MEMBERS</p>
                    </div>
                    <div className="single-counter">
                      <div className="slingle-counter-kk">
                        <span className="counter">400</span>
                        <span>+</span>
                      </div>
                      <p>REGISTERED MEMBERS</p>
                    </div>
                    <div className="single-counter">
                      <div className="slingle-counter-kk">
                        <span className="counter">7</span>
                      </div>
                      <p>REGISTERED MEMBERS</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* counter-area-end */}
          {/* reating-area-start */}
          {/* <div className="reating-area">
            <div className="section-title">
              <h3>TRUSTED BY OVER 5,000 HAPPY CUSTOMERS</h3>
            </div>
            <div className="reating-fl">
              <div className="reating-slider owl-carousel">
                <div className="single-reating">
                  <div className="reating-top-text">
                    <h3>Ross Baigent</h3>
                    <div className="ster">
                      <a href="/"><i className="fas fa-star" /></a>
                      <a href="/"><i className="fas fa-star" /></a>
                      <a href="/"><i className="fas fa-star" /></a>
                      <a href="/"><i className="fas fa-star" /></a>
                      <a href="/"><i className="fas fa-star" /></a>
                    </div>
                    <p>Absolutely superb way to sell</p>
                  </div>
                  <div className="reating-last-text">
                    <p>Great photographer. Staff really helpful and easy to deal with. Auction was so easy. Alerts
                      on phone when questions asked. Final auction was brilliant. I can’t recommend enough - great
                      product.</p>
                  </div>
                </div>
                <div className="single-reating">
                  <div className="reating-top-text">
                    <h3>Ross Baigent</h3>
                    <div className="ster">
                      <a href="/"><i className="fas fa-star" /></a>
                      <a href="/"><i className="fas fa-star" /></a>
                      <a href="/"><i className="fas fa-star" /></a>
                      <a href="/"><i className="fas fa-star" /></a>
                      <a href="/"><i className="fas fa-star" /></a>
                    </div>
                    <p>Absolutely superb way to sell</p>
                  </div>
                  <div className="reating-last-text">
                    <p>Great photographer. Staff really helpful and easy to deal with. Auction was so easy. Alerts
                      on phone when questions asked. Final auction was brilliant. I can’t recommend enough - great
                      product.</p>
                  </div>
                </div>
                <div className="single-reating">
                  <div className="reating-top-text">
                    <h3>Ross Baigent</h3>
                    <div className="ster">
                      <a href="/"><i className="fas fa-star" /></a>
                      <a href="/"><i className="fas fa-star" /></a>
                      <a href="/"><i className="fas fa-star" /></a>
                      <a href="/"><i className="fas fa-star" /></a>
                      <a href="/"><i className="fas fa-star" /></a>
                    </div>
                    <p>Absolutely superb way to sell</p>
                  </div>
                  <div className="reating-last-text">
                    <p>Great photographer. Staff really helpful and easy to deal with. Auction was so easy. Alerts
                      on phone when questions asked. Final auction was brilliant. I can’t recommend enough - great
                      product.</p>
                  </div>
                </div>
                <div className="single-reating">
                  <div className="reating-top-text">
                    <h3>Ross Baigent</h3>
                    <div className="ster">
                      <a href="/"><i className="fas fa-star" /></a>
                      <a href="/"><i className="fas fa-star" /></a>
                      <a href="/"><i className="fas fa-star" /></a>
                      <a href="/"><i className="fas fa-star" /></a>
                      <a href="/"><i className="fas fa-star" /></a>
                    </div>
                    <p>Absolutely superb way to sell</p>
                  </div>
                  <div className="reating-last-text">
                    <p>Great photographer. Staff really helpful and easy to deal with. Auction was so easy. Alerts
                      on phone when questions asked. Final auction was brilliant. I can’t recommend enough - great
                      product.</p>
                  </div>
                </div>
                <div className="single-reating">
                  <div className="reating-top-text">
                    <h3>Ross Baigent</h3>
                    <div className="ster">
                      <a href="/"><i className="fas fa-star" /></a>
                      <a href="/"><i className="fas fa-star" /></a>
                      <a href="/"><i className="fas fa-star" /></a>
                      <a href="/"><i className="fas fa-star" /></a>
                      <a href="/"><i className="fas fa-star" /></a>
                    </div>
                    <p>Absolutely superb way to sell</p>
                  </div>
                  <div className="reating-last-text">
                    <p>Great photographer. Staff really helpful and easy to deal with. Auction was so easy. Alerts
                      on phone when questions asked. Final auction was brilliant. I can’t recommend enough - great
                      product.</p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* reating-area-end */}
          {/* reating-last-btn-start */}
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
          <div className="use-area"  >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="use-title use-title2">
                  <h3 className='ta_center' >WHO WE ARE?</h3>
                </div>
                <div className="use-text">
                  <p className='ta_center' >
                          Welcome to Auto Auctions, the U.K.’s best online car auction platform, where our passion is to create a win-win for those 
                    <br/> looking to buy or sell a car in the U.K. With industry experience spanning over 25 years in the automotive industry, 
                    <br/> we've revolutionized the traditional car buying and selling process for online car auctions.
                  </p>
                </div>
                <div className="use-title use-title2 mt_2rem">
                  <h3 className='ta_center mb_1rem' >WHY US?</h3>
                </div>
                <div className="use-text mb_2rem">
                  <p className='ta_center' >
                    <div className="use-text">
                      <h3 className='title_col' >Expertise and Trust:</h3>
                      <p>Tired of being low balled by online valuation sites or facing steep prices at traditional dealerships? 
                        <br />  We offer a transparent, fair marketplace for our customers.</p>
                    </div>
                  </p>
                </div>
                <div className="use-text mb_1rem">
                  <p className='ta_center' >
                    <div className="use-text">
                      <h3>For Sellers in the U.K.:</h3>
                    </div>
                  </p>
                </div>
                <div className="use-elem2">
                  <div className="use-elem-con">
                    <div className='use-el-1' >
                      {/* <img src="/assets/img/i3.jpg" alt="" /> */}
                      <div className="use-text">
                        <h3 className='title_col' >Free Listing Services: </h3>
                        <p>List your car with us at no cost. We believe in providing value without hidden fees. Its fast, free and fair:</p>
                      </div>
                    </div>
                  </div>
                  <div className="use-elem-con">
                    <div className='use-el-1' >
                      {/* <img src="/assets/img/i1.jpg" alt="" /> */}
                      <div className="use-text">
                        <h3 className='title_col' >Professional Photography Included:</h3>
                        <p>Our team of professional photographers will capture your car in the best light, ensuring your listing stands out.</p>
                      </div>
                    </div>
                  </div>
                  <div className="use-elem-con">
                    <div className='use-el-1' >
                      {/* <img src="/assets/img/i1.jpg" alt="" /> */}
                      <div className="use-text">
                        <h3 className='title_col' >Swift Sales:</h3>
                        <p>Aim to sell your car within 7 days. Our efficient auction platform is 
                            designed to connect you with serious buyers quickly.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex_center mb_1rem' >
                </div>
                <div className="use-text mb_1rem">
                  <p className='ta_center' >
                    <div className="use-text">
                      <h3>For Buyers in the U.K.:</h3>
                    </div>
                  </p>
                </div>
                <div className="use-elem2">
                  <div className="use-elem-con">
                    <div className='use-el-1' >
                      {/* <img src="/assets/img/i4.jpg" alt="" /> */}
                      <div className="use-text">
                        <h3 className='title_col'>INSPECTION:</h3>
                        <p>Every car listed undergoes a thorough inspection by our professional photographers, 
                          ensuring detailed and honest listings. Plus, with our HPI clear guarantee, you buy with confidence.</p>
                      </div>
                    </div>
                  </div>
                  <div className="use-elem-con">
                    <div className='use-el-1' >
                      {/* <img src="/assets/img/i2.jpg" alt="" /> */}
                      <div className="use-text">
                        <h3 className='title_col' >Additional Perks:</h3>
                        <p>Most of our cars comes with a 12-month warranty as an add on. Need financing? 
                            Our in-house experts are ready to assist.</p>
                      </div>
                    </div>
                  </div>
                  <div className='use-elem-con' >
                    <div className='use-el-1' >
                      {/* <img src="/assets/img/i2.jpg" alt="" /> */}
                      <div className="use-text">
                        <h3 className='title_col' >Committed to the U.K. Market:</h3>
                        <p>Our services are specifically tailored to meet the needs of the U.K. automotive market, 
                          making us the top choice for local buyers and sellers.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex_center mt_1rem">
                </div>
              </div>
            </div>
          </div>
        </div>
          {/* reating-last-btn-end */}
          {/* recent-area-start */}
          {/* <div className="recent-area">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="recent-title">
                    <h3>RECENT FEATURES</h3>
                  </div>
                  <div className="recent-fl">
                    <div className="single-recent">
                      <div className="recent-img">
                        <img src="assets/img/r1.png" alt="" />
                      </div>
                      <div className="recent-text">
                        <h3>6 OF THE BEST KIDS’ CARS SOLD ON COLLECTING CARS</h3>
                        <p>The most impressive ‘half-scale’ heroes, including beautifully engineered and
                          charming tributes to iconic machines.</p>
                      </div>
                    </div>
                    <div className="single-recent">
                      <div className="recent-img">
                        <img src="assets/img/r1.png" alt="" />
                      </div>
                      <div className="recent-text">
                        <h3>6 OF THE BEST KIDS’ CARS SOLD ON COLLECTING CARS</h3>
                        <p>The most impressive ‘half-scale’ heroes, including beautifully engineered and
                          charming tributes to iconic machines.</p>
                      </div>
                    </div>
                    <div className="single-recent">
                      <div className="recent-img">
                        <img src="assets/img/r1.png" alt="" />
                      </div>
                      <div className="recent-text">
                        <h3>6 OF THE BEST KIDS’ CARS SOLD ON COLLECTING CARS</h3>
                        <p>The most impressive ‘half-scale’ heroes, including beautifully engineered and
                          charming tributes to iconic machines.</p>
                      </div>
                    </div>
                    <div className="single-recent">
                      <div className="recent-img">
                        <img src="assets/img/r1.png" alt="" />
                      </div>
                      <div className="recent-text">
                        <h3>6 OF THE BEST KIDS’ CARS SOLD ON COLLECTING CARS</h3>
                        <p>The most impressive ‘half-scale’ heroes, including beautifully engineered and
                          charming tributes to iconic machines.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* recent-area-end */}          
          {/* jQuery first, then Popper.js, then Bootstrap JS */}
    </>
  )
}
export default Home