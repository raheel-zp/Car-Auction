import * as React from 'react';
import { useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { filledInputClasses } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import ClearIcon from '@mui/icons-material/Clear';

import SendConsign from './SendConsign';
import SendEmail from './SendEmail';
import { userloggedIn } from '../Context/Context';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function EnquiryBox({val,ind,allSellerQueries}) {
  const {userlogged,setuserLogged,userData,setuserData,url} = useContext(userloggedIn);
  // console.log(val);
  const [loadingDelete,setloadingDelete] = React.useState(false);
  // Main Dialogue Box
  const [open, setOpen] = React.useState(false);
  // Send Consignment form Email Dialog
  const [consignmentDialogOpen, setconsignmentDialogOpen] = React.useState(false);
  //send general email for more info
  const [sendEmailDialogOpen, setsendEmailDialogOpen] = React.useState(false);
  // console.log(val);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenConsignment = () => {
    setOpen(false);
    setconsignmentDialogOpen(true);
  };
  const handleCloseConsignment = () => {
    setconsignmentDialogOpen(false);
    setOpen(true);
  };
  //send general email for more info
  const handleClickOpensendEmail = () => {
    setOpen(false);
    setsendEmailDialogOpen(true);
  };
  const handleCloseSendEmail = () => {
    setsendEmailDialogOpen(false);
    setOpen(true);
  };
  // Success message snackbar
  const [open1,setopen1] = React.useState(false);
  // Error message
  const [open2,setopen2] = React.useState(false);
  const vertical = 'top';
  const horizontal = 'center';

  const snackbarStyle1 = { backgroundColor: 'green' };

  const deleteInquiry = async () =>{
    setloadingDelete(true);
    console.log("DELETE");
    const res = await fetch(`${url}deleteInquiry/${val._id}`,{
      method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type":"application/json",
      "authToken": localStorage.getItem("authToken"),
    }
  });
    setloadingDelete(false);
    const data = await res.json();
    if(data.msg === 'success'){
      setOpen(false);
      allSellerQueries();
      setopen1(true);
      setTimeout(() => {
        setopen1(false);
        setopen2(false);
      }, 3000);
      // setsnackbar1({ ...snackbar1, open: true });
    }
  }
  React.useEffect(()=>{
    allSellerQueries();
  },[])
    return (
    <>
      <Snackbar open={open1} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
          <Alert severity="success" sx={{ width: '100%' }}>
            Enquiry deleted successfully!
          </Alert>
      </Snackbar>
      <Snackbar open={open2} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
          <Alert severity="error" sx={{ width: '100%' }}>
            Unauthorized request!
          </Alert>
      </Snackbar>
      <div className='enquiry_box' onClick={handleClickOpen} >
        <div className="enquiry_img" style={{backgroundImage: `url(${val.images[0] || '/assets/img/ed-img.png'})`}} ></div>
        <div className='e_box_bottom' >
            <div className="e_carMake"><span style={{fontWeight:'600',textTransform: "uppercase"}} >Make: </span>{val.carMake}</div>
            <div className="e_carModel"><span style={{fontWeight:'600',textTransform: "uppercase"}} >Model:</span> {val.carModel} </div>
            <div className="e_notes"> {val.notes} </div>
            <div className="e_email"> {val.email} </div>
            <div className="e_time"> {new Date(val.date).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} </div>
        </div>
      </div>
      {/* Main Page */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ style: { width: "100%", height: "100%" } }}
        maxWidth="600px"
      >
      <div style={{backgroundColor: "#eaeaea24"}} >
        <div className="eb_dialog_header">
          <div className="eb_head_left"></div>
          <div className="eb_head_right flex">
            <Button style={{width:'7rem',margin:'0 10px'}} variant="outlined" startIcon={!loadingDelete&&<DeleteIcon/>} disabled={loadingDelete} onClick={deleteInquiry} >
              { loadingDelete?<div class="loader-5-blue center" ><span></span></div>:<>Delete</>}
            </Button>
            <Button variant="outlined" onClick={handleClickOpenConsignment} >
              Consignment
            </Button>
            <Button style={{marginLeft:'10px'}} variant="contained" onClick={handleClickOpensendEmail} endIcon={<SendIcon />}>
              Send Mail
            </Button>
            <Button style={{width:'2rem',marginLeft:'10px'}} onClick={()=>{setOpen(false)}} variant="contained">
              <svg style={{height:'1.6rem',fill:'white'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
            </Button>
          </div>
        </div>
        <div className='eb_dialog_body' >
          <div className="eb_d_left">
            <div className="eb_left_contact">
              <div className='eb_left_title' > <span>CONTACT</span> </div>
              <div className='eb_left_row'> 
                <div><span> NAME:  </span></div> 
                <div className='ml-7' >{val.firstName} {val.lastName} </div> 
              </div>
              <div className='eb_left_row'> 
                <div><span> EMAIL:  </span></div> 
                <div className='ml-7' > {val.email} </div> 
              </div>
              <div className='eb_left_row'> 
                <div><span> PHONE:  </span></div> 
                <div className='ml-7' >{val.phone}</div> 
              </div>
            </div>
            <div className="eb_left_about">
              <div className='eb_left_title' > <span>ABOUT</span> </div>
              <div className='eb_left_row'> 
                <div><span> CATEGORY:  </span></div> 
                <div className='ml-7' >Car</div> 
              </div>
              <div className='eb_left_row'> 
                <div><span> CAR MAKE: </span></div> 
                <div className='ml-7' > {val.carMake} </div>  
              </div>
              <div className='eb_left_row'> 
                <div><span> CAR MODEL: </span></div> 
                <div className='ml-7' > {val.carModel} </div>
              </div>
              <div className='eb_left_row'> 
                <div><span> NOTES: </span></div> 
                <div className='over_flow_scroll' > {val.notes} </div> 
              </div>
            </div>
          </div>
          <div className="eb_d_right">
            { val.images.length>0 &&
              val.images.map((val,ind)=>{
                return(<>
                  <img className='eb_d_right_img' src={val} alt="" />
                </>)
              })
            }
            { val.images.length ===0 &&
              <div >
                    <div className="flex_wrap" style={{height:'34rem',display: "flex",justifyContent: "center",alignItems: "center",zIndex:'-1'}}>
                        {/* <iframe style={{height:'13rem'}} src="https://embed.lottiefiles.com/animation/93121"></iframe> */}
                        <iframe style={{height:'13rem'}} src="https://embed.lottiefiles.com/animation/134394"></iframe>
                    </div>
              </div>
            }
          </div>
        </div>
        <div className="eb_dialog_footer">
          
        </div>
      </div>
      </Dialog>
      
      <SendConsign setconsignmentDialogOpen={setconsignmentDialogOpen} consignmentDialogOpen={consignmentDialogOpen}
        handleClickOpenConsignment={handleClickOpenConsignment} handleCloseConsignment={handleCloseConsignment} val={val} />

      <SendEmail setsendEmailDialogOpen={setsendEmailDialogOpen} sendEmailDialogOpen={sendEmailDialogOpen}
        handleClickOpensendEmail={handleClickOpensendEmail} handleCloseSendEmail={handleCloseSendEmail} val={val} />
    </>
  )
}

export default EnquiryBox
