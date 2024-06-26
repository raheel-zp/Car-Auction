import * as React from 'react';
import { useState } from 'react';
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
import { userloggedIn } from './Context/Context';


import './Admin.css'
import ProductBox from './ProductBox';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ProductUpdateBox() {
    const {userlogged,setuserLogged,userData,setuserData,url} = useContext(userloggedIn);
    const pattern = /^[a-zA-Z0-9 ]*$/;
    const [title,settitle] = React.useState('');
    const [originalTitle,setoriginalTitle] = React.useState('');
    const [userEmail,setuserEmail] = React.useState('');
    const [sendLoading,setSendLoading] = React.useState(false);
    const [formdata,setformdata] = useState({
        category: '',
        auctionEnd: '',
        summary:'',
        description:'',
    })
    const [category,setcategory] = useState('auction');
    const [duration,setduration] = useState(1); //duration
    const [startPrice,setstartPrice] = useState(0); //auction price
    const [price,setprice] = useState(0); //auction price    
    const [side,setside] = useState("left");
    const [country,setcountry] = useState("Pakistan");
    const [OdometerReading,setOdometerReading] = useState(0);
    const [unit,setunit] = useState('miles');
    const [TransmissionType,setTransmissionType] = useState('auto');
    const [color,setcolor] = useState('');
    const [EngineDisplacement,setEngineDisplacement] = useState('');
    const [VIN,setVIN] = useState('');
    const [ModelNumber,setModelNumber] = useState('');
    // Lot Overview
    const [lotNumber,setlotNumber] = useState('');
    const [saleType,setSaleType] = useState('private');

    const [summary,setsummary] = useState('');
    const [youtubeLink,setyoutubeLink] = useState('');
    const [metaTitle,setmetaTitle] = React.useState('');
    const [metaDescription,setmetaDescription] = React.useState('');
    const [metaKeywords,setmetaKeywords] = React.useState('');
    // Thumbnail Image
    const [image, setImage] = React.useState(null);
    const [imageURL, setImageURL] = React.useState("");

    const handleImage = (e) => {
      const file = e.target.files[0];
      setImage(file);
      setImageURL(URL.createObjectURL(file));
    };
    // Exterior Images
    const [images1, setImages1] = React.useState([]);
    const [imageURLs1, setImageURLs1] = React.useState([]);
    const handleImage1 = (e) => {
        const files = Array.from(e.target.files);
        setImages1([...images1, ...files]);

        const tempURLs = files.map((file) => URL.createObjectURL(file));
        setImageURLs1([...imageURLs1, ...tempURLs]);
    }
    // Interior Images
    const [images2, setImages2] = React.useState([]);
    const [imageURLs2, setImageURLs2] = React.useState([]);
    const handleImage2 = (e) => {
        const files = Array.from(e.target.files);
        setImages2([...images2, ...files]);

        const tempURLs = files.map((file) => URL.createObjectURL(file));
        setImageURLs2([...imageURLs2, ...tempURLs]);
    }
    // Mechanical Images
    const [images3, setImages3] = React.useState([]);
    const [imageURLs3, setImageURLs3] = React.useState([]);
    const handleImage3 = (e) => {
        const files = Array.from(e.target.files);
        setImages3([...images3, ...files]);

        const tempURLs = files.map((file) => URL.createObjectURL(file));
        setImageURLs3([...imageURLs3, ...tempURLs]);
    }
    // Documents Images
    const [images4, setImages4] = React.useState([]);
    const [imageURLs4, setImageURLs4] = React.useState([]);
    const handleImage4 = (e) => {
        const files = Array.from(e.target.files);
        setImages4([...images4, ...files]);

        const tempURLs = files.map((file) => URL.createObjectURL(file));
        setImageURLs4([...imageURLs4, ...tempURLs]);
    }

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
    function handleopen4(){
        setopen4(true);
        setTimeout(() => {
            setopen4(false);
        }, 3000);
    }  
    // For storing key facts
    const [bulletPoints, setBulletPoints] = useState(['']); // Store bullet points in state
    const handleChange = (index, event) => {
      const updatedBulletPoints = [...bulletPoints];
      updatedBulletPoints[index] = event.target.value;
      setBulletPoints(updatedBulletPoints);
    };
    const handleAddBulletPoint = () => {
      setBulletPoints([...bulletPoints, '']);
    };
    const handleRemoveBulletPoint = (index) => {
      const updatedBulletPoints = [...bulletPoints];
      updatedBulletPoints.splice(index, 1);
      setBulletPoints(updatedBulletPoints);
    };
    // For EQUIPMENT AND FEATURES  
    const [bulletPoints2, setBulletPoints2] = useState(['']); // Store bullet points in state
    const handleChange2 = (index, event) => {
      const updatedBulletPoints = [...bulletPoints2];
      updatedBulletPoints[index] = event.target.value;
      setBulletPoints2(updatedBulletPoints);
    //   console.log(bulletPoints);
    };
    const handleAddBulletPoint2 = () => {
      setBulletPoints2([...bulletPoints2, '']);
    };
    const handleRemoveBulletPoint2 = (index) => {
      const updatedBulletPoints = [...bulletPoints2];
      updatedBulletPoints.splice(index, 1);
      setBulletPoints2(updatedBulletPoints);
    };
    // For Condition  
    const [bulletPoints3, setBulletPoints3] = useState(['']); // Store bullet points in state
    const handleChange3 = (index, event) => {
      const updatedBulletPoints = [...bulletPoints3];
      updatedBulletPoints[index] = event.target.value;
      setBulletPoints3(updatedBulletPoints);
    //   console.log(bulletPoints);
    };
    const handleAddBulletPoint3 = () => {
      setBulletPoints3([...bulletPoints3, '']);
    };
    const handleRemoveBulletPoint3 = (index) => {
      const updatedBulletPoints = [...bulletPoints3];
      updatedBulletPoints.splice(index, 1);
      setBulletPoints3(updatedBulletPoints);
    };
    // For Service History  
    const [bulletPoints4, setBulletPoints4] = useState(['']); // Store bullet points in state
    const handleChange4 = (index, event) => {
      const updatedBulletPoints = [...bulletPoints4];
      updatedBulletPoints[index] = event.target.value;
      setBulletPoints4(updatedBulletPoints);
    //   console.log(bulletPoints);
    };
    const handleAddBulletPoint4 = () => {
      setBulletPoints4([...bulletPoints4, '']);
    };
    const handleRemoveBulletPoint4 = (index) => {
      const updatedBulletPoints = [...bulletPoints4];
      updatedBulletPoints.splice(index, 1);
      setBulletPoints4(updatedBulletPoints);
    };

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
        if(image.length === 0 || images1.length === 0 || images2.length === 0 || images3.length === 0 || images4.length === 0 ) {
            setopen3(true);
            setTimeout(() => {
                setopen3(false);            
            }, 3000);
            return;
        }
        setSendLoading(true);
        const formData = new FormData();                
        formData.append('title', title);
        formData.append('originalTitle', originalTitle);
        formData.append('userEmail', userEmail);
        formData.append('category', category );
        formData.append('keyFactors', bulletPoints );
        formData.append('equipmenatAndFeatures', bulletPoints2 );
        formData.append('condition', bulletPoints3 );
        formData.append('serviceHistory', bulletPoints4 );
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
        formData.append('VIN', VIN );
        formData.append('ModelNumber', ModelNumber );
        formData.append('lotNumber', lotNumber );
        formData.append('saleType', saleType );
        formData.append('summary', summary );
        formData.append('youtubeLink', youtubeLink );
        formData.append('image', image );
        formData.append('metaTitle', metaTitle);
        formData.append('metaDescription', metaDescription);
        formData.append('metaKeywords', metaKeywords);
        
        for (let i = 0; i < images1.length; i++) {
            formData.append('images1', images1[i]);
        }
        for (let i = 0; i < images2.length; i++) {
            formData.append('images2', images2[i]);
        }
        for (let i = 0; i < images3.length; i++) {
            formData.append('images3', images3[i]);
        }
        for (let i = 0; i < images4.length; i++) {
            formData.append('images4', images4[i]);
        }
        console.log(formData);
        const res = await fetch(`${url}UploadProduct`, {
        method: 'POST',
        body: formData
        });
        
        setSendLoading(false);
        const data = await res.json();
        if(data.msg==='success'){
            setopen2(false);
            setopen1(true);
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
    return (
    <>
        <div className='flex_wrap' style={{position:'relative'}} >
            {
                products.map((val,ind)=>{
                    return(<>
                        <ProductBox fetchAllProducts={fetchAllProducts} val={val} ind={ind} />                    
                    </>)
                })
            }
            <IconButton onClick={()=>{handleOpen()}} color="primary" style={{position:'absolute',top:'0',right:'5px',height:"2.5rem",width: "2.5rem",borderRadius: "50%",backgroundColor: "#0000ff0f"}} aria-label="upload picture" component="label">
                <svg style={{fill:"#2c2cff"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
            </IconButton>
            <Snackbar open={open1} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
            <Alert severity="success" sx={{ width: '100%' }}>
                Product uploaded successfully!
            </Alert>
            </Snackbar>
            <Snackbar open={open2} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
            <Alert severity="error" sx={{ width: '100%' }}>
                Uploading Failed!
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
                    <div className="cons_dialog_header">
                    <div className="flex">
                        <Button type='submit' style={{margin:'0 8px',backgroundColor:'green',width: "7rem"}} disabled={sendLoading} variant="contained" endIcon={!sendLoading&&<SendIcon />}>
                            {sendLoading?<div class="loader-5 center" ><span></span></div>:<>Upload</>}
                        </Button>
                        <Button  onClick={()=>{handleClose()}} variant="contained" style={{width:'2rem'}}>
                            <svg style={{height:'1.3rem',fill:'white'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                        </Button>
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
                                        value={bulletPoint}
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
                                        value={bulletPoint}
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
                                        value={bulletPoint}
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
                                        value={bulletPoint}
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
                                style={{width:'21rem'}}
                            />
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
                        </div>
                        <div >
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
                            <div style={{margin:'6px 8px 0px 8px',display:'flex',justifyContent:'space-between',height:'1.5rem'}} >
                                <h5 style={{fontSize:'16px',fontWeight:'600'}} >UPLOAD THUMBNAIL</h5>                                
                            </div>
                            <div style={{displa:'flex'}} >
                                <IconButton color="primary" aria-label="upload picture" style={{marginLeft:'5px'}} component="label">
                                    <input 
                                        hidden 
                                        accept="image/*" 
                                        type="file"
                                        onChange={handleImage}                            
                                        />
                                    <PhotoCamera />
                                </IconButton>
                                {imageURL && (
                                  <img
                                    style={{ height: "2.5rem", margin: "3px 3px", borderRadius: "9px" }}
                                    src={imageURL}
                                    alt="Uploaded Image"
                                  />
                                )}
                            </div>
                            <div style={{margin:'6px 8px 0px 8px',display:'flex',justifyContent:'space-between',height:'1.5rem'}} >
                                <h5 style={{fontSize:'16px',fontWeight:'600'}} >EXTERIOR IMAGES</h5>                                
                            </div>
                            <div style={{displa:'flex'}} >
                                <IconButton color="primary" aria-label="upload picture" style={{marginLeft:'5px'}} component="label">
                                    <input 
                                        hidden 
                                        accept="image/*" 
                                        multiple
                                        type="file"
                                        onChange={handleImage1}                            
                                        />
                                    <PhotoCamera />
                                </IconButton>
                                {imageURLs1.map((url, index) => (
                                    <img style={{height:"2.5rem",margin:"3px 3px",borderRadius:"9px"}} key={index} src={url} alt={`Image ${index + 1}`} />
                                ))}
                            </div>
                            <div style={{margin:'6px 8px 0px 8px',display:'flex',justifyContent:'space-between',height:'1.5rem'}} >
                                <h5 style={{fontSize:'16px',fontWeight:'600'}} >INTERIOR IMAGES</h5>                                
                            </div>
                            <div style={{displa:'flex'}} >
                                <IconButton color="primary" aria-label="upload picture" style={{marginLeft:'5px'}} component="label">
                                    <input 
                                        hidden 
                                        accept="image/*" 
                                        multiple
                                        type="file"
                                        onChange={handleImage2}                            
                                        />
                                    <PhotoCamera />
                                </IconButton>
                                {imageURLs2.map((url, index) => (
                                    <img style={{height:"2.5rem",margin:"3px 3px",borderRadius:"9px"}} key={index} src={url} alt={`Image ${index + 1}`} />
                                ))}
                            </div>
                            <div style={{margin:'6px 8px 0px 8px',display:'flex',justifyContent:'space-between',height:'1.5rem'}} >
                                <h5 style={{fontSize:'16px',fontWeight:'600'}} >MECHANICAL IMAGES</h5>                                
                            </div>
                            <div style={{displa:'flex'}} >
                                <IconButton color="primary" aria-label="upload picture" style={{marginLeft:'5px'}} component="label">
                                    <input
                                        hidden
                                        accept="image/*"
                                        multiple
                                        type="file"
                                        onChange={handleImage3}
                                        />
                                    <PhotoCamera />
                                </IconButton>
                                {imageURLs3.map((url, index) => (
                                    <img style={{height:"2.5rem",margin:"3px 3px",borderRadius:"9px"}} key={index} src={url} alt={`Image ${index + 1}`} />
                                ))}
                            </div>
                            <div style={{margin:'6px 8px 0px 8px',display:'flex',justifyContent:'space-between',height:'1.5rem'}} >
                                <h5 style={{fontSize:'16px',fontWeight:'600'}} >DOCUMENTS IMAGES    </h5>                                
                            </div>
                            <div style={{displa:'flex'}} >
                                <IconButton color="primary" aria-label="upload picture" style={{marginLeft:'5px'}} component="label">
                                    <input
                                        hidden
                                        accept="image/*"
                                        multiple
                                        type="file"
                                        onChange={handleImage4}
                                        />
                                    <PhotoCamera />
                                </IconButton>
                                {imageURLs4.map((url, index) => (
                                    <img style={{height:"2.5rem",margin:"3px 3px",borderRadius:"9px"}} key={index} src={url} alt={`Image ${index + 1}`} />
                                ))}
                            </div>
                        </div>
                    </div>
                </Box>
                </div>
            </div>
            </Dialog>
        </div>
    </>
  )
}

export default ProductUpdateBox
