import * as React from 'react';
import { useState,useContext,useEffect } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { userloggedIn } from '../Context/Context';
import moment from 'moment';

import './Admin.css'
import ChargeBox from './ChargeBox';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function ProductBox({fetchAllProducts,val,ind}) {
    const {userlogged,setuserLogged,userData,setuserData,url} = useContext(userloggedIn);
    // console.log(val);
  const pattern = /^[a-zA-Z0-9 ]*$/;
  const [title,settitle] = React.useState(val.title);
  const [originalTitle,setoriginalTitle] = React.useState(val.originalTitle);
  const [userEmail,setuserEmail] = React.useState(val.userEmail);
  const [sendLoading,setSendLoading] = React.useState(false);
  const [sendLoading2,setSendLoading2] = React.useState(false);
  const [sendLoading3,setSendLoading3] = React.useState(false);
  const [formdata,setformdata] = useState({
      category: '',
      auctionEnd: '',
      summary:'',
      description:'',
  })
  const [category,setcategory] = useState(val.category);
  const [duration,setduration] = useState(val.duration); //duration
  const [startPrice,setstartPrice] = useState(val.startPrice); //auction price
  const [price,setprice] = useState(val.price); //auction price    
  const [side,setside] = useState(val.side);
  const [country,setcountry] = useState(val.country);
  const [OdometerReading,setOdometerReading] = useState(val.OdometerReading);
  const [unit,setunit] = useState(val.unit);
  const [TransmissionType,setTransmissionType] = useState(val.TransmissionType);
  const [color,setcolor] = useState(val.color);
  const [EngineDisplacement,setEngineDisplacement] = useState(val.EngineDisplacement);
  const [carModel,setCarModel] = useState(val.carModel);
  const [VIN,setVIN] = useState(val.VIN);
  const [ModelNumber,setModelNumber] = useState(val.ModelNumber);
  // Lot Overview
  const [lotNumber,setlotNumber] = useState(val.lotNumber);
  const [saleType,setSaleType] = useState(val.saleType);
  
  const [summary,setsummary] = useState(val.summary);
  const [youtubeLink,setyoutubeLink] = useState(val.youtubeLink);
  const [metaTitle,setmetaTitle] = React.useState(val.metaTitle);
  const [metaDescription,setmetaDescription] = React.useState(val.metaDescription);
  const [metaKeywords,setmetaKeywords] = React.useState(val.metaKeywords);
  // Thumbnail Image
  const [image, setImage] = React.useState({url: val.thumbnail, new: false});
  const [imageURL, setImageURL] = React.useState({url: val.thumbnail, new: false});

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageURL({ url: URL.createObjectURL(file), new: true });
    // const tempURLs = files.map((file) => ({ url: URL.createObjectURL(file), new: true }));
    // setImageURLs1([...imageURLs1, ...tempURLs]);
  };
  // Exterior Images
    const [images1, setImages1] = useState([]);
    const [imageURLs1, setImageURLs1] = useState([]);
    const [Images1ToBeDeleted,setImages1ToBeDeleted] = useState([]);
    const handleImage1 = (e) => {
        const files = Array.from(e.target.files);
        setImages1([...images1, ...files]);
        
        const tempURLs = files.map((file) => ({ url: URL.createObjectURL(file), new: true }));
        setImageURLs1([...imageURLs1, ...tempURLs]);
    }
    const DeleteImage1 = (val,index) => {
        // console.log(val);
        if(val.new === false){
            setImages1ToBeDeleted((prev) => [...prev, val.url]);
        }
        
        const updatedImages = [...images1];
        updatedImages.splice(index, 1);
        setImages1(updatedImages);
        
        const updatedImagesUrls = [...imageURLs1];
        updatedImagesUrls.splice(index, 1);
        setImageURLs1(updatedImagesUrls);
    };

  const showImages = ()=> {
    console.log(image);
    console.log(imageURL);
    // console.log(images1);
    // console.log(imageURLs1);
    // console.log(Images1ToBeDeleted);
  }
  // Interior Images
  const [images2, setImages2] = React.useState(val.interiorImages);
  const [imageURLs2, setImageURLs2] = React.useState(val.interiorImages);
  const [Images2ToBeDeleted,setImages2ToBeDeleted] = useState([]);
  const handleImage2 = (e) => {
      const files = Array.from(e.target.files);
      setImages2([...images2, ...files]);

      const tempURLs = files.map((file) => URL.createObjectURL(file));
      setImageURLs2([...imageURLs2, ...tempURLs]);
  }
  const DeleteImage2 = (val,index) => {
    // console.log(val);
    if(val.new === false){
        setImages2ToBeDeleted((prev) => [...prev, val.url]);
    }
    
    const updatedImages = [...images2];
    updatedImages.splice(index, 1);
    setImages2(updatedImages);
    
    const updatedImagesUrls = [...imageURLs2];
    updatedImagesUrls.splice(index, 1);
    setImageURLs2(updatedImagesUrls);
};
  // Mechanical Images
  const [images3, setImages3] = React.useState(val.mechanicalImages);
  const [imageURLs3, setImageURLs3] = React.useState(val.mechanicalImages);
  const [Images3ToBeDeleted,setImages3ToBeDeleted] = useState([]);
  const handleImage3 = (e) => {
      const files = Array.from(e.target.files);
      setImages3([...images3, ...files]);

      const tempURLs = files.map((file) => URL.createObjectURL(file));
      setImageURLs3([...imageURLs3, ...tempURLs]);
  }
    const DeleteImage3 = (val,index) => {
        // console.log(val);
        if(val.new === false){
            setImages3ToBeDeleted((prev) => [...prev, val.url]);
        }
        
        const updatedImages = [...images3];
        updatedImages.splice(index, 1);
        setImages3(updatedImages);
        
        const updatedImagesUrls = [...imageURLs3];
        updatedImagesUrls.splice(index, 1);
        setImageURLs3(updatedImagesUrls);
    };
 // Documents Images
  const [images4, setImages4] = React.useState(val.documentsImages);
  const [imageURLs4, setImageURLs4] = React.useState(val.documentsImages);
  const [Images4ToBeDeleted,setImages4ToBeDeleted] = useState([]);
  const handleImage4 = (e) => {
      const files = Array.from(e.target.files);
      setImages4([...images4, ...files]);

      const tempURLs = files.map((file) => URL.createObjectURL(file));
      setImageURLs4([...imageURLs4, ...tempURLs]);
  }
  const DeleteImage4 = (val,index) => {
    // console.log(val);
    if(val.new === false){
        setImages4ToBeDeleted((prev) => [...prev, val.url]);
    }
    
    const updatedImages = [...images4];
    updatedImages.splice(index, 1);
    setImages4(updatedImages);
    
    const updatedImagesUrls = [...imageURLs4];
    updatedImagesUrls.splice(index, 1);
    setImageURLs4(updatedImagesUrls);
};
  useEffect(() => {
    // const image = val.thumbnail.map((url) => ({ url, new: false }));
    // setImage(image);
    // setImageURL(image);

    const image1 = val.exteriorImages.map((url) => ({ url, new: false }));
    setImages1(image1);
    setImageURLs1(image1);

    const image2 = val.interiorImages.map((url) => ({ url, new: false }));
    setImages2(image2);
    setImageURLs2(image2);
    
    const image3 = val.mechanicalImages.map((url) => ({ url, new: false }));
    setImages3(image3);
    setImageURLs3(image3);
    
    const image4 = val.documentsImages.map((url) => ({ url, new: false }));
    setImages4(image4);
    setImageURLs4(image4);

  }, [val]);

  function changeSide(event){
      const { name, checked } = event.target;
      if (checked) {
          setside(name);
      }
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

  const [open1,setopen1] = React.useState(false);
  // Error message
  const [open2,setopen2] = React.useState(false);
  // No image error
  const [open3,setopen3] = React.useState(false);
  // Title symbol error
  const [open4,setopen4] = React.useState(false);
  const [open5,setopen5] = React.useState(false);
  const [open6,setopen6] = React.useState(false);
  function handleopen4(){
      setopen4(true);
      setTimeout(() => {
          setopen4(false);
      }, 3000);
  }  
  // For storing key facts
  const [bulletPoints, setBulletPoints] = useState(val.keyFactors); // Store bullet points in state
//   const handleChange = (index, event) => {
//     const updatedBulletPoints = [...bulletPoints];
//     updatedBulletPoints[index] = event.target.value;
//     setBulletPoints(updatedBulletPoints);
//   };
//   const handleAddBulletPoint = () => {
//     setBulletPoints([...bulletPoints, '']);
//   };
const handleChange = (index, event) => {
    const updatedBulletPoints = [...bulletPoints];
    updatedBulletPoints[index].text = event.target.value;
    setBulletPoints(updatedBulletPoints);  
};
const handleAddBulletPoint = () => {
    setBulletPoints([...bulletPoints, { text: '', split: true }]);
};     
  const handleRemoveBulletPoint = (index) => {
    const updatedBulletPoints = [...bulletPoints];
    updatedBulletPoints.splice(index, 1);
    setBulletPoints(updatedBulletPoints);
  };
  // For EQUIPMENT AND FEATURES  
  const [bulletPoints2, setBulletPoints2] = useState(val.equipmenatAndFeatures); // Store bullet points in state
  const handleChange2 = (index, event) => {
    const updatedBulletPoints = [...bulletPoints2];
    updatedBulletPoints[index].text = event.target.value;
    setBulletPoints2(updatedBulletPoints);  
};
const handleAddBulletPoint2 = () => {
    setBulletPoints2([...bulletPoints2, { text: '', split: true }]);
};
  //   const handleChange2 = (index, event) => {
//     const updatedBulletPoints = [...bulletPoints2];
//     updatedBulletPoints[index] = event.target.value;
//     setBulletPoints2(updatedBulletPoints);
//   //   console.log(bulletPoints);
//   };
//   const handleAddBulletPoint2 = () => {
//     setBulletPoints2([...bulletPoints2, '']);
//   };
  const handleRemoveBulletPoint2 = (index) => {
    const updatedBulletPoints = [...bulletPoints2];
    updatedBulletPoints.splice(index, 1);
    setBulletPoints2(updatedBulletPoints);
  };
  // For Condition  
  const [bulletPoints3, setBulletPoints3] = useState(val.condition); // Store bullet points in state
  const handleChange3 = (index, event) => {
    const updatedBulletPoints = [...bulletPoints3];
    updatedBulletPoints[index].text = event.target.value;
    setBulletPoints3(updatedBulletPoints);  
};
const handleAddBulletPoint3 = () => {
    setBulletPoints3([...bulletPoints3, { text: '', split: true }]);
};
//   const handleChange3 = (index, event) => {
//     const updatedBulletPoints = [...bulletPoints3];
//     updatedBulletPoints[index] = event.target.value;
//     setBulletPoints3(updatedBulletPoints);
//   //   console.log(bulletPoints);
//   };
//   const handleAddBulletPoint3 = () => {
//     setBulletPoints3([...bulletPoints3, '']);
//   };
  const handleRemoveBulletPoint3 = (index) => {
    const updatedBulletPoints = [...bulletPoints3];
    updatedBulletPoints.splice(index, 1);
    setBulletPoints3(updatedBulletPoints);
  };
  // For Service History  
  const [bulletPoints4, setBulletPoints4] = useState(val.serviceHistory); // Store bullet points in state
  const handleChange4 = (index, event) => {
    const updatedBulletPoints = [...bulletPoints4];
    updatedBulletPoints[index].text = event.target.value;
    setBulletPoints4(updatedBulletPoints);  
};
const handleAddBulletPoint4 = () => {
    setBulletPoints4([...bulletPoints4, { text: '', split: true }]);
};
//   const handleChange4 = (index, event) => {
//     const updatedBulletPoints = [...bulletPoints4];
//     updatedBulletPoints[index] = event.target.value;
//     setBulletPoints4(updatedBulletPoints);
//   //   console.log(bulletPoints);
//   };
//   const handleAddBulletPoint4 = () => {
//     setBulletPoints4([...bulletPoints4, '']);
//   };
  const handleRemoveBulletPoint4 = (index) => {
    const updatedBulletPoints = [...bulletPoints4];
    updatedBulletPoints.splice(index, 1);
    setBulletPoints4(updatedBulletPoints);
  };
  const [remainingTime, setRemainingTime] = useState('');
  const [remDays, setRemDays] = useState('');

  function changeValue(event){
      const {name,value} = event.target;
      setformdata({
        ...formdata,
        [name]: value,
      });
      console.log(formdata);
  }
  const getType = (element) => {
        if (element instanceof File) {
          return 'file';
        } else if (typeof element === 'object') {
          return 'object';
        } else {
          return 'unknown';
        }
    }
  const submitform = async (event)=>{
      event.preventDefault();
      if(!image || images1.length === 0 || images2.length === 0 || images3.length === 0 || images4.length === 0 ) {
          setopen3(true);
          setTimeout(() => {
              setopen3(false);            
          }, 3000);
          return;
      }
      setSendLoading(true);
      const formData = new FormData();                
      formData.append('title', title );
      formData.append('originalTitle', originalTitle );
      formData.append('userEmail', userEmail );
      formData.append('category', category );
      formData.append('keyFactors', JSON.stringify(bulletPoints) );
      formData.append('equipmenatAndFeatures', JSON.stringify(bulletPoints2) );
      formData.append('condition', JSON.stringify(bulletPoints3) );
      formData.append('serviceHistory', JSON.stringify(bulletPoints4) );
      formData.append('duration', duration );
      formData.append('startPrice', startPrice );
      formData.append('price', price );
      formData.append('side', side );
      formData.append('country', country );
      formData.append('OdometerReading', OdometerReading );
      formData.append('unit', unit );
      formData.append('TransmissionType', TransmissionType );
      formData.append('color', color );
      formData.append('EngineDisplacement', EngineDisplacement );
      formData.append('carModel', carModel );
      formData.append('VIN', VIN );
      formData.append('ModelNumber', ModelNumber );
      formData.append('lotNumber', lotNumber );
      formData.append('saleType', saleType );
      formData.append('summary', summary );
      formData.append('youtubeLink', youtubeLink );
      formData.append('metaTitle', metaTitle);
      formData.append('metaDescription', metaDescription);
      formData.append('metaKeywords', metaKeywords);
      if(getType(image)==='object'){
            formData.append('thumbnailLink', image.url);
        }else{
            formData.append('image', image );
            formData.append('ImageToBeDeleted', val.thumbnail );
      }
      let Images1Links = [];
      for (let i = 0; i < images1.length; i++) {  
        if(getType(images1[i])==='file'){
            formData.append('images1', images1[i]);
            // console.log(images1[i]);
        }else{
            Images1Links.push(images1[i].url);
            // console.log(images1[i]);
        }
    }
      formData.append('images1Rem', JSON.stringify(Images1Links));
      formData.append('Images1ToBeDeleted', JSON.stringify(Images1ToBeDeleted));
      // console.log(Images1Links);
      
      let Images2Links = [];
        for (let i = 0; i < images2.length; i++) {  
            if(getType(images2[i])==='file'){
                formData.append('images2', images2[i]);
                // console.log(images1[i]);
            }else{
                Images2Links.push(images2[i].url);
                // console.log(images1[i]);
            }
        }
        formData.append('images2Rem', JSON.stringify(Images2Links));
        formData.append('Images2ToBeDeleted', JSON.stringify(Images2ToBeDeleted));
      
        let Images3Links = [];
        for (let i = 0; i < images3.length; i++) {  
            if(getType(images3[i])==='file'){
                formData.append('images3', images3[i]);
                // console.log(images1[i]);
            }else{
                Images3Links.push(images3[i].url);
                // console.log(images1[i]);
            }
        }
        formData.append('images3Rem', JSON.stringify(Images3Links));
        formData.append('Images3ToBeDeleted', JSON.stringify(Images3ToBeDeleted));

        let Images4Links = [];
        for (let i = 0; i < images4.length; i++) {  
            if(getType(images4[i])==='file'){
                formData.append('images4', images4[i]);
                // console.log(images1[i]);
            }else{
                Images4Links.push(images4[i].url);
                // console.log(images1[i]);
            }
        }
        formData.append('images4Rem', JSON.stringify(Images4Links));
        formData.append('Images4ToBeDeleted', JSON.stringify(Images4ToBeDeleted));

      const res = await fetch(`${url}UpdateProduct/${val._id}`, {
      method: 'POST',
      body: formData
      });
      
      setSendLoading(false);
      const data = await res.json();
      if(data.msg==='success'){
          setopen2(false);
          setopen1(true);
          setOpen(false);
          fetchAllProducts();
          setImages1ToBeDeleted([]);
          setTimeout(() => {
              setopen2(false);
              setopen1(false);
          }, 3000);
      }else{
          setopen1(false)
          setopen2(true);
          setTimeout(() => {
              setopen1(false);
              setopen2(false);
          }, 3000);
      }
  }
  const [soldPrice,setsoldPrice] = useState(0);
  const markAsSoldById = async () =>{
    setSendLoading2(true);
    const res = await fetch(`${url}markAsSoldById/${val._id}`,{
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          "authToken": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({price:soldPrice}),
    });
    const data = await res.json();
    setSendLoading2(false);
    if(data.msg === 'success'){
        setopen5(true);
        fetchAllProducts();
        setTimeout(() => {
            setopen5(false);
        }, 5000);
    }else{
        setopen2(true);
        setTimeout(() => {
            setopen2(false);
        }, 5000);
    }
  }
  const [extendDays,setextendDays] = useState(0);
  const extendProductDays = async () =>{
    setSendLoading3(true);
    const res = await fetch(`${url}extendProductDays/${val._id}`,{
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          "authToken": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({days:extendDays}),
    });
    const data = await res.json();
    setSendLoading3(false);
    if(data.msg === 'success'){
        setopen6(true);
        setTimeout(() => {
            setopen6(false);
        }, 5000);
    }else{
        setopen2(true);
        setTimeout(() => {
            setopen2(false);
        }, 5000);
    }
  }

  useEffect(() => {
    let countdownInterval;
  
    const calculateRemainingTime = () => {
    //   const endTime = new Date(val.date).getTime() + val.duration * 24 * 60 * 60 * 1000;
        const endTime = new Date(val.endTime).getTime();
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
    };
  
    calculateRemainingTime();
  
    return () => {
      clearInterval(countdownInterval);
    };
  }, [val.date, val.duration]);

  return (
    <>
        <div className='enquiry_box' onClick={handleOpen} >
            <div className="enquiry_img" style={{backgroundImage: `url(${val.thumbnail})`}} ></div>
            <div className='e_box_bottom' >
                <div className="e_carMake" style={{height:'2rem'}} ><span style={{fontWeight:'600',textTransform: "uppercase"}} >Title: </span>{val.originalTitle}</div>
                <div className="e_notes" style={{height:'4rem',textTransform: 'lowercase',color: '#000000b5'}} ><span style={{fontWeight:'600',textTransform: "uppercase",color:'black'}} >Description:</span> {val.summary} </div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}} >
                    <div style={{color:'black',fontSize: '14px',fontWeight: '600'}} >
                        { 
                            val.category==='auction'?
                                val.bids.length > 1 ? `Max Bid: $${val.bids[0].price}` : `Price: $${val.startPrice}` 
                            : val.category === 'buynow'? 
                                val.offers.length > 0 ? `Max Offer: $${val.offers[0].price}` : `Price: $${val.price}` 
                            : val.category === 'expired'?
                                val.offers.length>0 ? `Max Offer: $${ val.offers[0].price }` : `Max Bid: $${val.bids[0].price}`
                            : <></>
                        }
                    </div>
                    <a style={{color:'black',fontSize: '14px',color: '#2866b6',fontWeight: '600'}} >                
                        { remDays>0?<>
                            {remDays} days
                        </>:<>
                            {remainingTime}
                        </>
                        }
                    </a>
                </div>
                <div style={{color:"#136c13",fontWeight:"500",height:'1rem'}} >{val.userEmail}</div>
                <div className="e_time">
                    <div style={{color:"#136c13",fontWeight:"500"}} >{val.category}</div>
                    <div>{new Date(val.date).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                </div>
            </div>
        </div>
            <Snackbar open={open1} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
                <Alert severity="success" sx={{ width: '100%' }}>
                    Product updated successfully!
                </Alert>
            </Snackbar>
            <Snackbar open={open2} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
            <Alert severity="error" sx={{ width: '100%' }}>
                Updating Failed!
            </Alert>
            </Snackbar>
            <Snackbar open={open3} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
            <Alert severity="error" sx={{ width: '100%' }}>
                Please select atleast 1 image for each category!
            </Alert>
            </Snackbar>
            <Snackbar open={open4} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
            <Alert severity="error" sx={{ width: '100%' }}>
                Title cannot contains symbols, special characters!
            </Alert>
            </Snackbar>
            <Snackbar open={open5} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
            <Alert severity="success" sx={{ width: '100%' }}>
                Marked as Sold
            </Alert>
            </Snackbar>
            <Snackbar open={open6} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
            <Alert severity="success" sx={{ width: '100%' }}>
                Time extended successfully!
            </Alert>
            </Snackbar>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{ style: { width: "100%", height: "100%" } }}
                maxWidth="200px"
            >
            <div style={{backgroundColor: "#eaeaea24"}} >
                <div style={{padding: "1rem"}} >
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '96%' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={submitform}
                    encType="multipart/form-data"
                    >
                    <div className="cons_dialog_header" onClick={showImages} >
                    <div className="flex" style={{justifyContent:'space-between'}} >
                        <div style={{display:'flex',alignItems:'center'}} >
                            <input
                                id="outlined-textarea"
                                label="Days"
                                placeholder="Enter Days"
                                type='Number'
                                onChange={(e)=>{setextendDays(e.target.value)}}
                                style={{width:'6rem',height:'2rem',outline:'none',borderRadius: '6px',fontSize: '10px'}}
                                /> 
                            <Button onClick={extendProductDays} style={{margin:'0 8px',color:'white',backgroundColor:'green',fontSize: '12px',height: '2rem'}} disabled={sendLoading3 || extendDays<=0} variant="contained" endIcon={!sendLoading3&&<SendIcon />}>
                                {sendLoading3?<div class="loader-5 center" ><span></span></div>:<>Extend Time</>}
                            </Button>
                            <div style={{fontSize: '20px',color: '#2866b6',fontWeight:'600',marginLeft:'0.5rem'}} >{`${remDays}d ${remainingTime}`}</div>
                        </div>
                        <div>
                            <input
                                id="outlined-textarea"
                                label="Sold Price"
                                placeholder="Enter Sold Price"
                                type='Number'
                                onChange={(e)=>{setsoldPrice(e.target.value)}}
                                style={{width:'8rem',height:'2rem',outline:'none',borderRadius: '6px',fontSize: '11px'}}
                                /> 
                            <Button onClick={markAsSoldById} style={{margin:'0 8px',color:'white',backgroundColor:'green',width: "10rem",fontSize: '12px',height: '2rem'}} disabled={sendLoading2 || soldPrice===0} variant="contained" endIcon={!sendLoading2&&<SendIcon />}>
                                {sendLoading2?<div class="loader-5 center" ><span></span></div>:<>Mark as Sold</>}
                            </Button>
                            <Button type='submit' style={{margin:'0 8px',color:'white',backgroundColor:'green',width: "7rem",fontSize: '12px',height: '2rem'}} disabled={sendLoading} variant="contained" endIcon={!sendLoading&&<SendIcon />}>
                                {sendLoading?<div class="loader-5 center" ><span></span></div>:<>Update</>}
                            </Button>
                            <Button  onClick={()=>{handleClose()}} variant="contained" style={{width:'2rem'}}>
                                <svg style={{height:'1.3rem',fill:'white'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                            </Button>
                        </div>
                    </div>
                    </div>
                    <div style={{display:'grid',gridTemplateColumns:'33% 33% 33%'}} >
                        <div>                            
                            <TextField
                                id="outlined-textarea"
                                label="Title"
                                placeholder="Enter Title"
                                multiline
                                value={title}
                                onChange={(e) => {
                                    if (pattern.test(e.target.value)) {
                                        settitle(e.target.value.toLowerCase());
                                    }else{
                                        handleopen4();
                                    }
                                }}
                            />                            
                            <TextField
                                id="outlined-textarea"
                                label="Original Title"
                                placeholder="Enter Original Title"
                                multiline
                                value={originalTitle}
                                onChange={(e) => {setoriginalTitle(e.target.value)}}
                                />                            
                                <TextField
                                id="outlined-textarea"
                                label="User email"
                                placeholder="Enter user email"
                                type='email'
                                value={userEmail}
                                onChange={(e)=>{setuserEmail(e.target.value)}}
                            />                            
                            {/* Key facts section */}
                            <div style={{margin:'6px 8px 0px 8px',display:'flex',justifyContent:'space-between',height:'1.5rem'}} >
                                <h5 style={{fontSize:'16px',fontWeight:'600'}} >KEY FACTS</h5>
                                <div onClick={handleAddBulletPoint} style={{cursor:'pointer',marginRight: '2.4rem',fontSize: '14px',border: '1px solid #befebe',backgroundColor: '#d5ffd5',padding: '1px 6px',height: '1.5rem',borderRadius: '6px'}} >
                                    Add new line
                                </div>
                            </div>
                            {bulletPoints.map((bulletPoint, index) => (
                                <div style={{margin:'6px 8px 0px 8px'}} key={index}>
                                    <div style={{display:'flex',alignItems:'center'}} >
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label={`Line ${index+1}`}
                                            type="text"
                                            multiline
                                            maxRows={3}
                                            value={bulletPoint.text}
                                            onChange={(event) => handleChange(index, event)}
                                    />
                                    <div onClick={() => handleRemoveBulletPoint(index)} className='flex' style={{cursor:'pointer',height: '1.8rem',width: '1.8rem',borderRadius: '50%',border: '1px solid #c5c5c5',backgroundColor: "whitesmoke"}} >
                                        <svg style={{margin:'0 5px',fill:'#ce4040'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
                                    </div>
                                    </div>
                                </div>
                            ))}
                            {/* Equipments and features section */}
                            <div style={{margin:'6px 8px 0px 8px',display:'flex',justifyContent:'space-between',height:'1.5rem'}} >
                                <h5 style={{fontSize:'16px',fontWeight:'600'}} >EQUIPMENT AND FEATURES</h5>
                                <div onClick={handleAddBulletPoint2} style={{cursor:'pointer',marginRight: '2.4rem',fontSize: '14px',border: '1px solid #befebe',backgroundColor: '#d5ffd5',padding: '1px 6px',height: '1.5rem',borderRadius: '6px'}} >
                                    Add new line
                                </div>
                            </div>
                            {bulletPoints2.map((bulletPoint, index) => (
                                <div style={{margin:'6px 8px 0px 8px'}} key={index}>
                                    <div style={{display:'flex',alignItems:'center'}} >
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label={`Line ${index+1}`}
                                            type="text"
                                            multiline
                                            maxRows={4}
                                            value={bulletPoint.text}
                                            onChange={(event) => handleChange2(index, event)}
                                    />
                                    <div onClick={() => handleRemoveBulletPoint2(index)} className='flex' style={{cursor:'pointer',height: '1.8rem',width: '1.8rem',borderRadius: '50%',border: '1px solid #c5c5c5',backgroundColor: "whitesmoke"}} >
                                        <svg style={{margin:'0 5px',fill:'#ce4040'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
                                    </div>
                                    </div>
                                </div>
                            ))}
                            {/* Condition section */}
                            <div style={{margin:'6px 8px 0px 8px',display:'flex',justifyContent:'space-between',height:'1.5rem'}} >
                                <h5 style={{fontSize:'16px',fontWeight:'600'}} >CONDITION</h5>
                                <div onClick={handleAddBulletPoint3} style={{cursor:'pointer',marginRight: '2.4rem',fontSize: '14px',border: '1px solid #befebe',backgroundColor: '#d5ffd5',padding: '1px 6px',height: '1.5rem',borderRadius: '6px'}} >
                                    Add new line
                                </div>
                            </div>
                            {bulletPoints3.map((bulletPoint, index) => (
                                <div style={{margin:'6px 8px 0px 8px'}} key={index}>
                                    <div style={{display:'flex',alignItems:'center'}} >
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label={`Line ${index+1}`}
                                            type="text"
                                            multiline
                                            maxRows={4}
                                            value={bulletPoint.text}
                                            onChange={(event) => handleChange3(index, event)}
                                    />
                                    <div onClick={() => handleRemoveBulletPoint3(index)} className='flex' style={{cursor:'pointer',height: '1.8rem',width: '1.8rem',borderRadius: '50%',border: '1px solid #c5c5c5',backgroundColor: "whitesmoke"}} >
                                        <svg style={{margin:'0 5px',fill:'#ce4040'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
                                    </div>
                                    </div>
                                </div>
                            ))}
                            {/* Service History section */}
                            <div style={{margin:'6px 8px 0px 8px',display:'flex',justifyContent:'space-between',height:'1.5rem'}} >
                                <h5 style={{fontSize:'16px',fontWeight:'600'}} >SERVICE HISTORY</h5>
                                <div onClick={handleAddBulletPoint4} style={{cursor:'pointer',marginRight: '2.4rem',fontSize: '14px',border: '1px solid #befebe',backgroundColor: '#d5ffd5',padding: '1px 6px',height: '1.5rem',borderRadius: '6px'}} >
                                    Add new line
                                </div>
                            </div>
                            {bulletPoints4.map((bulletPoint, index) => (
                                <div style={{margin:'6px 8px 0px 8px'}} key={index}>
                                    <div style={{display:'flex',alignItems:'center'}} >
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label={`Line ${index+1}`}
                                            type="text"
                                            multiline
                                            maxRows={4}
                                            value={bulletPoint.text}
                                            onChange={(event) => handleChange4(index, event)}
                                        />
                                        <div onClick={() => handleRemoveBulletPoint4(index)} className='flex' style={{cursor:'pointer',height: '1.8rem',width: '1.8rem',borderRadius: '50%',border: '1px solid #c5c5c5',backgroundColor: "whitesmoke"}} >
                                            <svg style={{margin:'0 5px',fill:'#ce4040'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div style={{margin:'6px 8px 0px 8px',display:'flex',justifyContent:'space-between',height:'1.5rem'}} >
                                <h5 style={{fontSize:'16px',fontWeight:'600'}} >SUMMARY</h5>                                
                            </div>
                            <TextField
                                id="outlined-textarea"
                                label="Summary"
                                multiline
                                maxRows={4}
                                type='text'
                                value={summary}
                                onChange={(e)=>{setsummary(e.target.value)}}                                
                            />
                        </div>
                        <div >
                            <FormControl sx={{ m: 1, minWidth: 160 }}>
                                <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={category}
                                    label="category"
                                    onChange={(e)=>{setcategory(e.target.value)}}
                                > 
                                <MenuItem value={'auction'}>Auction</MenuItem>
                                <MenuItem value={'buynow'}>Buy Now</MenuItem>
                                <MenuItem value={'comingsoon'}>Coming Soon</MenuItem>
                                <MenuItem value={'sold'}>Sold</MenuItem>
                                <MenuItem value={'expired'}>Expired</MenuItem>
                                </Select>
                            </FormControl>
                            { category==='auction' &&
                                <TextField
                                    id="outlined-textarea"
                                    label="Start price"
                                    placeholder="Enter start price"
                                    multiline
                                    type='Number'
                                    value={startPrice}
                                    disabled={category!=='auction'}
                                    onChange={(e)=>{setstartPrice(e.target.value)}}
                                    style={{width:'10rem'}}
                                />
                            }
                            { category==='buynow' &&
                                <TextField
                                    id="outlined-textarea"
                                    label="Price"
                                    placeholder="Enter price"
                                    multiline
                                    type='Number'
                                    value={price}
                                    disabled={category!=='buynow'}
                                    onChange={(e)=>{setprice(e.target.value)}}
                                    style={{width:'10rem'}}
                                />
                            }
                            { category==='auction' &&
                                <>
                                <div style={{margin:'6px 8px 0px 8px',display:'flex',justifyContent:'space-between',height:'1.5rem'}} >
                                    <h5 style={{fontSize:'16px',fontWeight:'600'}} >AUCTION DURATION (DAYS)</h5>                                
                                </div>
                                    <TextField
                                        id="outlined-textarea"
                                        label="Days"
                                        placeholder="Number of days"
                                        multiline
                                        type='Number'
                                        value={duration}
                                        disabled={category!=='auction'}
                                        onChange={(e)=>{setduration(e.target.value)}}
                                        style={{width:'10rem'}}
                                    />
                                </>
                            }
                            <FormControl sx={{ m: 1, minWidth: 160 }}>
                                <InputLabel id="demo-simple-select-helper-label">Country</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    label="Country"
                                    value={country}
                                    onChange={(e)=>{setcountry(e.target.value)}}                                    
                                > 
                                {/* <MenuItem value="">Select Country</MenuItem> */}
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
                            </FormControl>
                            <div style={{margin:'6px 8px 0px 8px',display:'flex',justifyContent:'space-between',height:'1.5rem'}} >
                                <h5 style={{fontSize:'16px',fontWeight:'600'}} >BIKE OVERVIEW</h5>                                
                            </div>
                            <TextField
                                id="outlined-textarea"
                                label="Odometer Reading"
                                multiline
                                type='Number'
                                value={OdometerReading}
                                onChange={(e)=>{setOdometerReading(e.target.value)}}
                                style={{width:'10rem'}}
                            />
                            <FormControl sx={{ m: 1, minWidth: 160 }}>
                                <InputLabel id="demo-simple-select-helper-label">Unit</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={unit}
                                    label="Unit"
                                    onChange={(e)=>{setunit(e.target.value)}}
                                > 
                                <MenuItem value={'miles'}>Miles (mi)</MenuItem>
                                <MenuItem value={'kilometers'}>Kilometers (km)</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 160 }}>
                                <InputLabel id="demo-simple-select-helper-label">Transmission Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={TransmissionType}
                                    label="Transmission Type"
                                    onChange={(e)=>{setTransmissionType(e.target.value)}}
                                > 
                                <MenuItem value={'auto'}>Auto</MenuItem>
                                <MenuItem value={'manual'}>Manual</MenuItem>
                                <MenuItem value={'semiAutomatic'}>Semi-Automatic</MenuItem>
                                <MenuItem value={'CVT'}>CVT (Continuously Variable)</MenuItem>
                                <MenuItem value={'DTC'}>DTC Dual-Clutch</MenuItem>                        
                                </Select>
                            </FormControl>
                            <TextField
                                id="outlined-textarea"
                                label="Color"
                                multiline
                                type='text'
                                value={color}
                                onChange={(e)=>{setcolor(e.target.value)}}
                                style={{width:'10rem'}}
                            />
                            <TextField
                                id="outlined-textarea"
                                label="Engine Displacement"
                                multiline
                                type='number'
                                value={EngineDisplacement}
                                onChange={(e)=>{setEngineDisplacement(e.target.value)}}
                                style={{width:'10rem'}}
                            />
                            <FormControl sx={{ m: 1, minWidth: 190 }}>
                                <InputLabel id="demo-simple-select-helper-label">Car Model</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    label="Car Model"
                                    value={carModel}
                                    onChange={(e)=>{setCarModel(e.target.value)}}
                                    style={{width:'10rem'}}
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
                            <TextField
                                id="outlined-textarea"
                                label="VIN"
                                multiline
                                type='text'
                                value={VIN}
                                onChange={(e)=>{setVIN(e.target.value)}}
                                style={{width:'10rem'}}
                            />
                            <TextField
                                id="outlined-textarea"
                                label="Interior Color"
                                multiline
                                type='text'
                                value={ModelNumber}
                                onChange={(e)=>{setModelNumber(e.target.value)}}
                                style={{width:'10rem'}}
                            />
                            <div className="check__single__inp" style={{margin:'6px 8px 0px 8px'}} >
                                <label htmlFor="#">Which side does the driver sit?</label>
                                <div className="info__yes">
                                <div className="new" style={{display:'flex',justifyContent:'space-between',width:'21rem'}} >
                                    {/* <form> */}
                                    <div className="form-group">
                                        <input 
                                            type="checkbox"
                                            id="html1"
                                            name='left'
                                            onChange={changeSide}
                                            checked={side==='left'?true:false}
                                            />
                                        <label htmlFor="html1">LHD</label>
                                    </div>
                                    <div className="form-group">
                                        <input 
                                            type="checkbox" 
                                            id="css2" 
                                            name='right'
                                            onChange={changeSide}
                                            checked={side==='right'?true:false}
                                            />
                                        <label htmlFor="css2">RHD</label>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            name='central'
                                            type="checkbox"
                                            id="javascript" 
                                            onChange={changeSide}
                                            checked={side==='central'?true:false}
                                            />
                                        <label htmlFor="javascript">Central</label>
                                    </div>
                                    {/* </form> */}
                                </div>
                                </div>
                            </div>
                            <div style={{margin:'6px 8px 0px 8px',display:'flex',justifyContent:'space-between',height:'1.5rem'}} >
                                <h5 style={{fontSize:'16px',fontWeight:'600'}} >LOT OVERVIEW</h5>                                
                            </div>
                            <TextField
                                id="outlined-textarea"
                                label="Lot Number"
                                multiline
                                type='Number'
                                value={lotNumber}
                                onChange={(e)=>{setlotNumber(e.target.value)}}
                                style={{width:'10rem'}}
                            />
                            <FormControl sx={{ m: 1, minWidth: 160 }}>
                                <InputLabel id="demo-simple-select-helper-label">Sale Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={saleType}
                                    label="Sale Type"
                                    onChange={(e)=>{setSaleType(e.target.value)}}
                                > 
                                <MenuItem value={'private'}>Private</MenuItem>
                                <MenuItem value={'public'}>Public</MenuItem>
                                </Select>
                            </FormControl>                            
                            <div style={{margin:'6px 8px 0px 8px',display:'flex',justifyContent:'space-between',height:'1.5rem'}} >
                                <h5 style={{fontSize:'16px',fontWeight:'600'}} >YOUTUBE LINK</h5>                                
                            </div>
                            <TextField
                                id="outlined-textarea"
                                label="Youtube Link"
                                multiline
                                maxRows={4}
                                type='text'
                                value={youtubeLink}
                                onChange={(e)=>{setyoutubeLink(e.target.value)}}                                
                            />
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Meta Headline"
                                multiline
                                maxRows={4}
                                value={metaTitle}
                                onChange={(e)=>{setmetaTitle(e.target.value)}}
                            />
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Meta Description"
                                multiline
                                maxRows={4}
                                value={metaDescription}
                                onChange={(e)=>{setmetaDescription(e.target.value)}}
                            />
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Meta Keywords"
                                multiline
                                maxRows={4}
                                value={metaKeywords}
                                onChange={(e)=>{setmetaKeywords(e.target.value)}}
                            />
                        </div>
                        <div>
                            { val.category === 'expired' &&
                                <>
                                <div className="car-info-single-right-box" style={{background:'#fcfcfc'}} >
                                    <div className="scrolls">
                                        <div className="car-scroll-info scrollbar-1">
                                          <div className="car-info-over-title">
                                            <h3>BIDS HISTORY</h3>
                                          </div>
                                          <div className="car-info-history">                            
                                            {  val.bids.map((val2,ind)=>{
                                              return(<>
                                                <ChargeBox ProductId={val._id} title={originalTitle} fetchAllProducts={fetchAllProducts} val={val2} product={val} />
                                              </>)
                                            })
                                            }
                                          </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="car-info-single-right-box" style={{background:'#fcfcfc'}} >
                                <div className="scrolls">
                                    <div className="car-scroll-info scrollbar-1">
                                      <div className="car-info-over-title">
                                        <h3>OFFERS HISTORY</h3>
                                      </div>
                                      <div className="car-info-history">                            
                                        {  val.offers.map((val,ind)=>{
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
                                </>
                            }
                            <div style={{margin:'6px 8px 0px 8px',display:'flex',justifyContent:'space-between',height:'1.5rem'}} >
                                <h5 style={{fontSize:'16px',fontWeight:'600'}} >UPLOAD THUMBNAIL</h5>                                
                            </div>
                            <div style={{display:'flex'}} >
                                <IconButton disabled={false} color="primary" aria-label="upload picture" style={{marginLeft:'5px'}} component="label">
                                    <input
                                        hidden
                                        accept="image/*" 
                                        type="file"
                                        onChange={handleImage}                            
                                        />
                                    <PhotoCamera />
                                </IconButton>
                                {imageURL && (
                                  <div style={{position:'relative'}} >
                                    <img
                                      style={{ height: "2.5rem", margin: "3px 3px", borderRadius: "9px" }}
                                      src={imageURL.url}
                                      alt="Uploaded Image"
                                    />
                                    {/* <svg style={{position:'absolute',top:'4px',right:'4px',fill:'white', cursor:'pointer'}} xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg> */}
                                  </div>
                                )}
                            </div>
                            <div style={{margin:'6px 8px 0px 8px',display:'flex',justifyContent:'space-between',height:'1.5rem'}} >
                                <h5 style={{fontSize:'16px',fontWeight:'600'}} >EXTERIOR IMAGES</h5>                                
                            </div>
                            <div style={{display:'flex',flexWrap:'wrap'}} >
                                <IconButton disabled={false} color="primary" aria-label="upload picture" style={{marginLeft:'5px'}} component="label">
                                    <input 
                                        hidden 
                                        accept="image/*" 
                                        multiple
                                        type="file"
                                        onChange={handleImage1}
                                        />
                                    <PhotoCamera />
                                </IconButton>
                                {imageURLs1.map((val, index) => (
                                    <div style={{position:'relative'}} >
                                        <img 
                                            style={{height:"2.5rem",margin:"3px 3px",borderRadius:"9px"}} 
                                            key={index} src={val.url} alt={`Image ${index + 1}`} 
                                        />
                                        { images1 && images1.length>1 &&
                                            <svg onClick={()=>{DeleteImage1(val,index)}} style={{position:'absolute',top:'4px',right:'4px',fill:'white', cursor:'pointer'}} xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
                                        }
                                    </div>
                                ))}
                            </div>
                            <div style={{margin:'6px 8px 0px 8px',display:'flex',justifyContent:'space-between',height:'1.5rem'}} >
                                <h5 style={{fontSize:'16px',fontWeight:'600'}} >INTERIOR IMAGES</h5>                                
                            </div>
                            <div style={{display:'flex',flexWrap:'wrap'}} >
                                <IconButton disabled={false} color="primary" aria-label="upload picture" style={{marginLeft:'5px'}} component="label">
                                    <input 
                                        hidden 
                                        accept="image/*" 
                                        multiple
                                        type="file"
                                        onChange={handleImage2}                            
                                        />
                                    <PhotoCamera />
                                </IconButton>
                                {imageURLs2.map((val, index) => (
                                    <div style={{position:'relative'}} >
                                        <img 
                                            style={{height:"2.5rem",margin:"3px 3px",borderRadius:"9px"}} 
                                            key={index} src={val.url} alt={`Image ${index + 1}`} 
                                        />
                                        { images2 && images2.length>1 &&
                                            <svg onClick={()=>{DeleteImage2(val,index)}} style={{position:'absolute',top:'4px',right:'4px',fill:'white', cursor:'pointer'}} xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
                                        }
                                    </div>
                                ))}
                            </div>
                            <div style={{margin:'6px 8px 0px 8px',display:'flex',justifyContent:'space-between',height:'1.5rem'}} >
                                <h5 style={{fontSize:'16px',fontWeight:'600'}} >MECHANICAL IMAGES</h5>                                
                            </div>
                            <div style={{display:'flex',flexWrap:'wrap'}} >
                                <IconButton disabled={false} color="primary" aria-label="upload picture" style={{marginLeft:'5px'}} component="label">
                                    <input
                                        hidden
                                        accept="image/*"
                                        multiple
                                        type="file"
                                        onChange={handleImage3}
                                        />
                                    <PhotoCamera />
                                </IconButton>
                                {imageURLs3.map((val, index) => (
                                    <div style={{position:'relative'}} >
                                        <img 
                                            style={{height:"2.5rem",margin:"3px 3px",borderRadius:"9px"}} 
                                            key={index} src={val.url} alt={`Image ${index + 1}`} 
                                        />
                                        { images3 && images3.length>1 &&
                                            <svg onClick={()=>{DeleteImage3(val,index)}} style={{position:'absolute',top:'4px',right:'4px',fill:'white', cursor:'pointer'}} xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
                                        }
                                    </div>
                                ))}
                            </div>
                            <div style={{margin:'6px 8px 0px 8px',display:'flex',justifyContent:'space-between',height:'1.5rem'}} >
                                <h5 style={{fontSize:'16px',fontWeight:'600'}} >DOCUMENTS IMAGES    </h5>                                
                            </div>
                            <div style={{display:'flex',flexWrap:'wrap'}} >
                                <IconButton disabled={false} color="primary" aria-label="upload picture" style={{marginLeft:'5px'}} component="label">
                                    <input
                                        hidden
                                        accept="image/*"
                                        multiple
                                        type="file"
                                        onChange={handleImage4}
                                        />
                                    <PhotoCamera />
                                </IconButton>
                                {imageURLs4.map((val, index) => (
                                    <div style={{position:'relative'}} >
                                        <img 
                                            style={{height:"2.5rem",margin:"3px 3px",borderRadius:"9px"}} 
                                            key={index} src={val.url} alt={`Image ${index + 1}`} 
                                        />
                                        { images4 && images4.length>1 &&
                                            <svg onClick={()=>{DeleteImage4(val,index)}} style={{position:'absolute',top:'4px',right:'4px',fill:'white', cursor:'pointer'}} xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Box>
                </div>
            </div>
            </Dialog>
    </>
  )
}

export default ProductBox
