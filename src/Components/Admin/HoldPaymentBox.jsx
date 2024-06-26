import React, { useState,useContext, useEffect } from 'react'
import moment from 'moment';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Snackbar from '@mui/material/Snackbar';
import SendIcon from '@mui/icons-material/Send';
import MuiAlert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { userloggedIn } from '../Context/Context';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function HoldPaymentBox({openHoldPayment,setopenHoldPayment}) {
    const {url,userData} = useContext(userloggedIn);
    const [openChargeBox, setOpenChargeBox] = React.useState(false);
    const [loading,setLoading] = useState(false);
    const [chargeAmount,setchargeAmount] = useState(0);
    const [userEmail,setuserEmail] = useState("");

    const handleOpenChargeBox = () => {
          setOpenChargeBox(true);
    };
    const handleCloseChargeBox = () => {
        setOpenChargeBox(false);
    };

    const [openConfirm, setOpenConfirm] = React.useState(false);
    const handleClickOpenConfirm = () => {
      setOpenConfirm(true);
    };
    const handleCloseConfirm = () => {
      setOpenConfirm(false);
    };

    const [openSuccess,setOpenSuccess] = useState(false);
    const [openNoUser,setopenNoUser] = useState(false);
    const [openNoCard,setopenNoCard] = useState(false);
    const [openFailed,setOpenFailed] = useState(false);
    const [openIncompleteError,setOpenIncompleteError] = useState(false);
    
    const handleCharge = async (event) => {
        setOpenConfirm(false);
        if(chargeAmount<=0){
            setOpenIncompleteError(true);
            setTimeout(() => {
                setOpenIncompleteError(false);
            }, 5000);
            return;
        }
        if(loading){
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`${url}holdPaymentForPhotography`,{
              method: "POST",
              headers: {
                "Content-Type" : "application/json"
              },
              body: JSON.stringify({
                email: userEmail,
                amount: chargeAmount,
              }),
            });
            const data = await res.json();
  
            if(data.msg==='success'){
              setOpenSuccess(true);
              setTimeout(() => {
                  setOpenSuccess(false);
              }, 5000);
            }else if(data.msg==='no card found'){
                setopenNoCard(true);
                setTimeout(() => {
                    setopenNoCard(false);
                }, 5000);
            }else if(data.msg==='no user found'){
                setopenNoUser(true);
                setTimeout(() => {
                    setopenNoUser(false);
                }, 5000);
            }
            else{
                setOpenFailed(true);
                setTimeout(() => {
                  setOpenFailed(true);          
                }, 10000);
            }        
        } catch (error) {
        //   console.error('Error creating payment method:', error);
          setOpenFailed(true);
          setTimeout(() => {
            setOpenFailed(true);          
          }, 10000);
        }      
        setLoading(false);
    };

  return (
    <>
        <Snackbar open={openSuccess} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
            <Alert severity="success" sx={{ width: '100%' }}>
                {`Amount Holded successfully!`}
            </Alert>
        </Snackbar>
        <Snackbar open={openFailed} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
            <Alert severity="error" sx={{ width: '100%' }}>
                Error Charging user. Please try later!
            </Alert>
        </Snackbar>
        <Snackbar open={openNoUser} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
            <Alert severity="error" sx={{ width: '100%' }}>
                No User Found with this Email. Please try later!
            </Alert>
        </Snackbar>
        <Snackbar open={openNoCard} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
            <Alert severity="error" sx={{ width: '100%' }}>
                User have not added card yet. Please try later!
            </Alert>
        </Snackbar>
        <Snackbar open={openFailed} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
            <Alert severity="error" sx={{ width: '100%' }}>
                Error Charging user. Please try later!
            </Alert>
        </Snackbar>
        <Snackbar open={openIncompleteError} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
            <Alert severity="error" sx={{ width: '100%' }}>
              Incomplete Form. Please fill all fields!
            </Alert>
        </Snackbar>
        <Dialog
            open={openHoldPayment}
            onClose={handleCloseChargeBox}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{style:{width:"20rem",height:"25rem"}}}
            maxWidth="200px"
        >
            <div className="cons_dialog_header">
                <div className="flex" style={{justifyContent:'space-between'}} >
                    <div style={{display:'flex',alignItems:'center'}} >                            
                    </div>
                    <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'end'}} >
                      {/* <Button style={{margin:'0 8px',backgroundColor:'#d43434',width: "7rem"}} onClick={deleteBid} disabled={deleteLoading} variant="contained" endIcon={!deleteLoading&&<SendIcon />}>
                        {deleteLoading?<div class="loader-5 center" ><span></span></div>:<>Delete</>}
                      </Button> */}
                      <Button  onClick={()=>{setopenHoldPayment(false)}} variant="contained" style={{width:'1.2rem',margin:'10px'}}>
                          <svg style={{height:'1rem',fill:'white'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                      </Button>
                    </div>
                </div>
            </div>            
            <div style={{backgroundColor: "#eaeaea24",height:'100%'}}>
                <div style={{padding: "1rem",display:'flex',flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
                    <div>
                        <div style={{marginBottom:'1rem'}} ><span style={{fontWeight:'600'}} >Hold Payment</span></div>
                        <TextField
                            id="outlined-textarea"
                            label="User email"
                            placeholder="Enter user email"
                            type='email'
                            value={userEmail}
                            onChange={(e)=>{setuserEmail(e.target.value)}}
                            style={{marginBottom:'1rem',width:'100%'}}
                        />
                        <TextField
                            id="outlined-textarea"
                            label="Enter Amount"
                            placeholder="Amount(GBP)"
                            type='number'
                            value={chargeAmount}
                            onChange={(e)=>{setchargeAmount(e.target.value)}}
                            style={{marginBottom:'1rem',width:'100%'}}
                        />
                    </div>
                    <div>
                        <div className="charge_btn" onClick={handleClickOpenConfirm} style={{margin:'0 auto'}} > {loading?'CHARGING':'CHARGE USER'} </div>
                    </div>
                </div>
            </div>
        </Dialog>
        <Dialog
          open={openConfirm}
          onClose={handleCloseConfirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to charge this user?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              By confirming {userEmail} amount will be holded with £{chargeAmount}.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirm} style={{color:'#de4141'}} >Cancel</Button>
            <Button onClick={handleCharge} autoFocus>
              Charge
            </Button>
          </DialogActions>
        </Dialog>
    </>
  )
}

export default HoldPaymentBox
