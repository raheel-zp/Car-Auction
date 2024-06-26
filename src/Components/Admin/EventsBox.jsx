import React,{useContext} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
// import ImageViewer from './ImageViewer';
import { userloggedIn } from '../Context/Context';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function EventsBox({val,allEvents}) {
    const {userlogged,setuserLogged,userData,setuserData,url} = useContext(userloggedIn);
    const pattern = /^[a-zA-Z0-9 ]*$/;
    const [deleteLoading,setdeleteLoading] = React.useState(false);
    const [sendLoading,setSendLoading] = React.useState(false);
    const [title,settitle] = React.useState(val.title);
    // const [description,setdescription] = React.useState(val.description);
    const [para1,setPara1] = React.useState(val.para1);
    const [para2,setPara2] = React.useState(val.para2);
    const [para3,setPara3] = React.useState(val.para3);
    const [para4,setPara4] = React.useState(val.para4);
    const [by,setby] = React.useState(val.by);
    const [showImage,setShowImages] = React.useState(val.images);

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
        settitle(val.title);
        setby(val.by);
        setShowImages(val.images);
        setPara1(val.para1);
        setPara2(val.para2);
        setPara3(val.para3);
        setPara4(val.para4);
    };
    const handleClose = () => {
        setOpen(false);
        settitle(val.title);
        setby(val.by);
        setPara1(val.para1);
        setPara2(val.para2);
        setPara3(val.para3);
        setPara4(val.para4);
        setShowImages(val.images);
    };
    // update success message
    const [open1,setopen1] = React.useState(false);
    // Error message
    const [open2,setopen2] = React.useState(false);
    // delete success message
    const [open3,setopen3] = React.useState(false);

    const [open4,setopen4] = React.useState(false);
    function handleopen4(){
        setopen4(true);
        setTimeout(() => {
            setopen4(false);
        }, 3000);
    }

    const updateArticle = async (event)=>{
        event.preventDefault();
        console.log("Updating event");
        setSendLoading(true);
        const res = await fetch(`${url}UpdateEvents/${val._id}`,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "authToken": localStorage.getItem("authToken"),
            },
            body: JSON.stringify({
                by,para1,para2,para3,para4,title
            }),
        });
        const data = await res.json();
        setSendLoading(false);
        if(data.msg==='success'){
            setopen2(false);
            setopen1(true);
            allEvents();
            setOpen(false);
            // handleClose();
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
    const deleteArticles = async ()=>{
        setdeleteLoading(true);
        const res = await fetch(`${url}deleteEvents/${val._id}`,{
            method: "GET",
            headers: {
          Accept: "application/json",
          "Content-Type":"application/json",
          "authToken": localStorage.getItem("authToken"),
        }
        });
        const data = await res.json();
        setdeleteLoading(false);
        if(data.msg === 'success'){
            setopen3(true);
            handleClose(true);
            allEvents();
            setTimeout(() => {
                setopen1(false);
                setopen2(false);
                setopen3(false);
            }, 3000);
        }else{
            setopen2(true);
            setTimeout(() => {
                setopen1(false);
                setopen2(false);
                setopen3(false);
            }, 3000);
        }
    }

  return (
    <>
        <div className='enquiry_box' onClick={handleClickOpen}>
            <div className="enquiry_img" style={{backgroundImage: `url(${val.images[0]})`}} ></div>
            <div className='e_box_bottom' >
                <div className="e_carMake" style={{height:'2rem'}} ><span style={{fontWeight:'600',textTransform: "uppercase"}} >Title: </span>{val.title}</div>
                <div className="e_notes" style={{height:'6rem',}} ><span style={{fontWeight:'600',textTransform: "uppercase"}} >Description:</span> {val.para1} </div>
                <div className="e_time"> {new Date(val.date).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} </div>
            </div>
        </div>
        <Snackbar open={open1} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
          <Alert severity="success" sx={{ width: '100%' }}>
            Article updated successfully!
          </Alert>
        </Snackbar>
        <Snackbar open={open2} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
          <Alert severity="error" sx={{ width: '100%' }}>
            Unauthorized request!
          </Alert>
        </Snackbar>
        <Snackbar open={open3} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
          <Alert severity="success" sx={{ width: '100%' }}>
            Article Deleted successfully!
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
            maxWidth="600px"
        >
            {/* <DialogTitle id="alert-dialog-title">
            {"About inquiry"}
            </DialogTitle> */}
        <div style={{backgroundColor: "#eaeaea24"}} >
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '96%' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={updateArticle}
            >
            <div className="eb_dialog_header">
            <div className="eb_head_left"></div>
            <div className="eb_head_right flex">
                <Button style={{margin:'0 8px',backgroundColor:'#d43434',width: "7rem"}} onClick={deleteArticles} disabled={deleteLoading} variant="contained" endIcon={!deleteLoading&&<SendIcon />}>
                    {deleteLoading?<div class="loader-5 center" ><span></span></div>:<>Delete</>}
                </Button>
                <Button type='submit' style={{margin:'0 8px',backgroundColor:'green',width: "7rem"}} disabled={sendLoading} variant="contained" endIcon={!sendLoading&&<SendIcon />}>
                    {sendLoading?<div class="loader-5 center" ><span></span></div>:<>Update</>}
                </Button>
                <Button style={{width:'2rem',marginLeft:'10px'}} onClick={()=>{setOpen(false)}} variant="contained">
                <svg style={{height:'1.6rem',fill:'white'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                </Button>
            </div>
            </div>
            <div className='eb_dialog_body' >
            <div className="eb_d_left">
                <div className="eb_left_about">
                <div className='eb_left_title' style={{margin:'0',height:"3rem",display:'flex',alignItems:'center',marginTop: "5px"}} >
                    <span>Article Details</span>
                    { 
                        showImage.map((val,ind)=>{
                            return(<>
                                <img style={{height:'2.5rem',borderRadius:"6px",margin:'0 6px'}} className='eb_d_right_img=' src={val} alt="" />
                            </>)
                    })
                    }
                </div>                
                    <div className='eb_left_row'> 
                        {/* <div><span> Title  </span></div>  */}
                        {/* <div className='ml-7 over_flow_scroll' style={{height:'2rem'}} >WEDNESDAY ONE-OFF: 1994 FIAT PUNTO GRAMA 2 MAGGIORA</div>  */}
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Title"
                            multiline
                            maxRows={2}
                            // defaultValue={val.title}
                            value={title}
                            // disabled={true}
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
                            label="By"
                            multiline
                            maxRows={1}
                            // defaultValue={by}
                            value={by}
                            onChange={(e)=>{setby(e.target.value)}}
                        />
                    </div>
                    <div className='eb_left_row'> 
                        <div><span> Description </span></div> 
                        <div className='over_flow_scroll' style={{height:'24rem'}} >
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
                    </div>
                </div>
            </div>
            <div className="eb_d_right" style={{overflowY: "scroll"}} >
            <List sx={{ width: '100%', maxWidth: 430, bgcolor: 'background.paper' }}>
                {
                    val.participants.map((val,ind)=>{
                       return(<>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={val.img_url || "/static/images/avatar/1.jpg" } />
                            </ListItemAvatar>
                            <ListItemText
                            primary={`${val.name} => Plate(${val.registration})`}
                            secondary={
                                <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {val.email}
                                </Typography>
                                {` — insta: ${val.instagram || "Not added" } — ${val.notes}`}
                                <br />
                                {new Date(val.date).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </React.Fragment>
                            }
                            />
                        </ListItem>                
                        <Divider variant="inset" component="li" />
                       </>) 
                    })
                }
                {val.participants.length === 0 &&
                <div >
                    <div className="flex_wrap" style={{height:'34rem',display: "flex",justifyContent: "center",alignItems: "center",zIndex:'-1'}}>
                        {/* <iframe style={{height:'13rem'}} src="https://embed.lottiefiles.com/animation/93121"></iframe> */}
                        <iframe style={{height:'13rem'}} src="https://embed.lottiefiles.com/animation/134394"></iframe>
                    </div>
                </div>                    
                }
            </List>
            </div>
            </div>
            <div className="eb_dialog_footer">
                    
            </div>
            </Box>
        </div>
      </Dialog>
    </>
  )
}
export default EventsBox