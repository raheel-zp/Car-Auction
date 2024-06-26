import * as React from 'react';
import { useContext } from 'react';
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

import './Admin.css'
import ArticleBox from './ArticleBox'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ArticlePage({allArticles,Articles,setArticles,articlesLoading,setarticlesLoading}) {
    const {userlogged,setuserLogged,userData,setuserData,url} = useContext(userloggedIn);
    const pattern = /^[a-zA-Z0-9 ]*$/;
    const [sendLoading,setSendLoading] = React.useState(false);
    const [by,setby] = React.useState('by Auto Auction');
    const [title,settitle] = React.useState("");
    const [metaTitle,setmetaTitle] = React.useState('');
    const [metaDescription,setmetaDescription] = React.useState('');
    const [metaKeywords,setmetaKeywords] = React.useState('');
    const [description,setdescription] = React.useState('');
    const [para1,setPara1] = React.useState('');
    const [para2,setPara2] = React.useState('');
    const [para3,setPara3] = React.useState('');
    const [para4,setPara4] = React.useState('');
    const [category,setcategory] = React.useState('Cars');
    const [images, setImages] = React.useState([]);
    const [imageURLs, setImageURLs] = React.useState([]);

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
    // const submitform = async (event)=>{
    //     event.preventDefault();
    //     setSendLoading(true);
    //     const res = await fetch("/UploadArticle",{
    //         method: "POST",
    //         headers: {
    //             "Content-Type" : "application/json"
    //         },
    //         body: JSON.stringify({
    //             by,description,title
    //         }),
    //     });
    //     const data = await res.json();
    //     setSendLoading(false);
    //     if(data.msg==='success'){
    //         setopen2(false);
    //         setopen1(true);
    //         allArticles();
    //         handleClose();
    //         setTimeout(() => {
    //             setopen2(false);
    //             setopen1(false);
    //         }, 3000);
    //     }else{
    //         setopen1(false)
    //         setopen2(true);
    //         setTimeout(() => {
    //             setopen1(false);
    //             setopen2(false);
    //         }, 3000);
    //     }
    // }
    const handleImage = (e) => {
        const files = Array.from(e.target.files);
        setImages([...images, ...files]);

        const tempURLs = files.map((file) => URL.createObjectURL(file));
        setImageURLs([...imageURLs, ...tempURLs]);
    }
    const submitform = async (event)=>{
        event.preventDefault();
        console.log(category);
        if(images.length === 0) {
            setopen3(true);
            setTimeout(() => {
                setopen3(false);            
            }, 3000);
            return;
        }
        setSendLoading(true);
        const formData = new FormData();
        formData.append('by', by);
        formData.append('title', title);
        formData.append('metaTitle', metaTitle);
        formData.append('metaDescription', metaDescription);
        formData.append('metaKeywords', metaKeywords);
        // formData.append('description', description);
        formData.append('para1', para1 );
        formData.append('para2', para2 );
        formData.append('para3', para3 );
        formData.append('para4', para4 );
        formData.append('category', category );

        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }
        const res = await fetch(`${url}UploadArticle`, {
        method: 'POST',
        body: formData
        });
        
        setSendLoading(false);
        const data = await res.json();
        if(data.msg==='success'){
            setopen2(false);
            setopen1(true);
            allArticles();
            handleClose();
            setImages([]);
            setImageURLs([]);
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
    React.useEffect(()=>{
        allArticles();
    },[])
  return (<>
        <div className='flex_wrap' style={{position:'relative'}} >
            {
                Articles.map((val,ind)=>{
                    return(<>
                        <ArticleBox val={val} allArticles={allArticles} ind={ind} />                    
                    </>)
                })
            }
            <IconButton onClick={()=>{handleOpen()}} color="primary" style={{position:'absolute',top:'0',right:'5px',height:"2.5rem",width: "2.5rem",borderRadius: "50%",backgroundColor: "#0000ff0f"}} aria-label="upload picture" component="label">
                <svg style={{fill:"#2c2cff"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
            </IconButton>
            <Snackbar open={open1} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
            <Alert severity="success" sx={{ width: '100%' }}>
                Article uploaded successfully!
            </Alert>
            </Snackbar>
            <Snackbar open={open2} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
            <Alert severity="error" sx={{ width: '100%' }}>
                Unauthorized request!
            </Alert>
            </Snackbar>
            <Snackbar open={open3} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
            <Alert severity="error" sx={{ width: '100%' }}>
                Please select atleast 1 image!
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
                PaperProps={{ style: { width: "40%", height: "100%" } }}
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
                    <div>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="By"
                            multiline
                            maxRows={4}
                            value={by}
                            onChange={(e)=>{setby(e.target.value)}}
                        />
                        <TextField
                            id="outlined-textarea"
                            label="Title"
                            placeholder="Enter Title"
                            multiline
                            value={title}
                            // defaultValue={subject}
                            onChange={(e) => {
                                if (pattern.test(e.target.value)) {
                                    settitle(e.target.value.toLowerCase());
                                }else{
                                    handleopen4();
                                }
                            }}
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
                        {/* <Button variant="contained" component="label">
                            Upload
                            <input 
                                hidden
                                accept="image/*"
                                multiple 
                                type="file"
                                onChange={handleImage}
                                />
                        </Button> */}
                        <div style={{displa:'flex'}} >
                            <IconButton color="primary" aria-label="upload picture" style={{marginLeft:'5px'}} component="label">
                                <input 
                                    hidden 
                                    accept="image/*" 
                                    multiple
                                    type="file"
                                    onChange={handleImage}                            
                                    />
                                <PhotoCamera />
                            </IconButton>
                            {imageURLs.map((url, index) => (
                                <img style={{height:"2.5rem",margin:"3px 3px",borderRadius:"9px"}} key={index} src={url} alt={`Image ${index + 1}`} />
                            ))}
                        </div>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={category}
                                label="category"
                                onChange={(e)=>{setcategory(e.target.value)}}
                            > 
                            <MenuItem value={'Cars'}>Cars</MenuItem>
                            <MenuItem value={'Event Highlights'}>Event Highlights</MenuItem>
                            <MenuItem value={'Chris Haris'}>Chris Haris</MenuItem>
                            <MenuItem value={'Watches'}>Watches</MenuItem>
                            <MenuItem value={'Market Updates'}>Market Updates</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                        id="outlined-textarea"
                        label="Paragraph 1"
                        placeholder="Enter first Paragraph"
                        multiline
                        value={para1}
                        // defaultValue={subject}
                        onChange={(e)=>{setPara1(e.target.value)}}
                        />
                        <TextField
                        id="outlined-textarea"
                        label="Paragraph 2"
                        placeholder="Enter Second Paragraph"
                        multiline
                        value={para2}
                        // defaultValue={subject}
                        onChange={(e)=>{setPara2(e.target.value)}}
                        />
                        <TextField
                        id="outlined-textarea"
                        label="Paragraph 3"
                        placeholder="Enter Third Paragraph"
                        multiline
                        value={para3}
                        // defaultValue={subject}
                        onChange={(e)=>{setPara3(e.target.value)}}
                        />
                        <TextField
                        id="outlined-textarea"
                        label="Last Paragraph"
                        placeholder="Enter Last Paragraph"
                        multiline
                        value={para4}
                        // defaultValue={subject}
                        onChange={(e)=>{setPara4(e.target.value)}}
                        />      
                    </div>
                </Box>
                </div>
            </div>
            </Dialog>
        </div>
       { Articles.length === 0 && 
            <div className="flex_wrap" style={{position:'relative',height:'40rem',display: "flex",justifyContent: "center",alignItems: "center",zIndex:'-1'}}>
                {/* <iframe style={{height:'13rem'}} src="https://embed.lottiefiles.com/animation/93121"></iframe> */}
                <iframe style={{height:'13rem'}} src="https://embed.lottiefiles.com/animation/134394"></iframe>                
            </div>
        }
    </>
  )
}
export default ArticlePage