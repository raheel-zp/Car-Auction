import React, { useState,useContext, useEffect } from 'react'
import moment from 'moment';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Snackbar from '@mui/material/Snackbar';
import SendIcon from '@mui/icons-material/Send';
import MuiAlert from '@mui/material/Alert';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { userloggedIn } from '../Context/Context';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ChargeBox({val,ProductId,title,product,fetchAllProducts}) {
    const {url,userData} = useContext(userloggedIn);
    const [openChargeBox, setOpenChargeBox] = React.useState(false);
    const [deleteLoading,setdeleteLoading] = React.useState(false);
    const [loading,setLoading] = useState(false);
    const [chargeAmount,setchargeAmount] = useState(0);
    const [chargedAmount,setchargedAmount] = useState(0);

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
    const [openDeleteBidSuccess,setopenDeleteBidSuccess] = useState(false);
    const [openFailed,setOpenFailed] = useState(false);
    const [openIncompleteError,setOpenIncompleteError] = useState(false);
    const handleCharge = async (event) => {
        handleCloseConfirm();
        if(loading){
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`${url}charge-user`,{
              method: "POST",
              headers: {
                "Content-Type" : "application/json"
              },
              body: JSON.stringify({
                username: val.username,
                email: val.email,
                bidPrice: val.price,
                bidDate: val.date,
                productTitle: title,
                ProductId:ProductId,
                amount: chargeAmount,
              }),
            });
            const data = await res.json();
            setOpenChargeBox(false);
  
            if(data.msg==='success'){
              setchargedAmount(data.amount);
              setOpenSuccess(true);
              setTimeout(() => {
                setOpenSuccess(false);            
                setOpenFailed(false);            
              }, 30000);
            }else{
              setOpenFailed(true);
              setTimeout(() => {
                setOpenSuccess(false);            
                setOpenFailed(false);            
              }, 30000);
            }        
        } catch (error) {
          console.error('Error creating payment method:', error);
          setOpenFailed(true);
          setTimeout(() => {
            setOpenFailed(true);          
          }, 10000);
        }      
        setLoading(false);
    };
    const deleteBid = async ()=>{
      setdeleteLoading(true);
      const res = await fetch(`${url}deleteBid`,{
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          "authToken": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          bid_id: val._id,
          product_id: product._id,
        }),
      });
      const data = await res.json();
      setdeleteLoading(false);
      if(data.msg === 'success'){
          handleCloseChargeBox();
          fetchAllProducts();
          setopenDeleteBidSuccess(true);
          setTimeout(() => {
            setopenDeleteBidSuccess(false);
          }, 3000);
      }else{
          // setTimeout(() => {
          // }, 3000);
      }
  }

    useEffect(()=>{
      let percentage = (5.5*val.price)/100;
      if(percentage<=550){
        setchargeAmount(550+110);
      }else{
        setchargeAmount(percentage+110);
      }
    },[]);

  return (
    <>
        <Snackbar open={openSuccess} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
            <Alert severity="success" sx={{ width: '100%' }}>
                {`User Charged £${chargedAmount} successfully!`}
            </Alert>
        </Snackbar>
        <Snackbar open={openDeleteBidSuccess} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
            <Alert severity="success" sx={{ width: '100%' }}>
                {`Bid Deleted Successfully!`}
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
        <div className="single-car-info-his" style={{cursor:'pointer'}} onClick={handleOpenChargeBox} >                                                    
            <div className="car-info-his-icon">
                <a>
                  <i className="fas fa-arrow-alt-circle-up" />
                </a>
            </div>
            <div className="car-info-his-text">
                <h3>£{val.price}</h3>
                <p>{val.username}</p>
                <span>{moment(val.date).fromNow()}</span>
            </div>
        </div>
        <Dialog
            open={openChargeBox}
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
                    <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between'}} >
                      <Button style={{margin:'0 8px',backgroundColor:'#d43434',width: "7rem"}} onClick={deleteBid} disabled={deleteLoading} variant="contained" endIcon={!deleteLoading&&<SendIcon />}>
                        {deleteLoading?<div class="loader-5 center" ><span></span></div>:<>Delete</>}
                      </Button>
                      <Button  onClick={()=>{handleCloseChargeBox()}} variant="contained" style={{width:'1.2rem',margin:'10px'}}>
                          <svg style={{height:'1rem',fill:'white'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                      </Button>
                    </div>
                </div>
            </div>            
            <div style={{backgroundColor: "#eaeaea24",height:'100%'}}>
                <div style={{padding: "1rem",display:'flex',flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
                    <div>
                        <div style={{margin:'7px 0'}} ><span style={{fontWeight:'600'}} >Name:</span> {val.username}</div>
                        <div style={{margin:'7px 0'}} ><span style={{fontWeight:'600'}} >Email:</span> {val.email}</div>
                        <div style={{margin:'7px 0'}} ><span style={{fontWeight:'600'}} >Automatic:</span> {val.automatic?'YES':'NO'}</div>
                        {/*<div>Email: {val.emailVerified? <span style={{color:'green'}} >verified</span> : <span style={{color:'red'}} >Not verified</span> }</div> */}
                        <div style={{margin:'7px 0'}} ><span style={{fontWeight:'600'}} >Since:</span> {moment(val.date).fromNow()} </div>                    
                        <div style={{margin:'7px 0'}} ><span style={{fontWeight:'600'}} >Bid Price:</span> <span style={{color:'green',fontWeight:'600'}} >${val.price}</span> </div>
                        <div style={{margin:'7px 0'}} ><span style={{fontWeight:'600'}} >Percentage(5.5%):</span> £{(5.5*val.price)/100} </div>
                        <div style={{margin:'7px 0'}} ><span style={{fontWeight:'600'}} >Amount:</span> £{chargeAmount-110} + £{110}(VAT) = <br /> £ <input type='number' value={chargeAmount} onChange={(e)=>{setchargeAmount(e.target.value)}} /> </div>
                        
                    </div>
                    <div>
                        { val.email !== 'admin@gmail.com' && <div className="charge_btn" onClick={handleClickOpenConfirm} style={{margin:'0 auto'}} > {loading?'CHARGING':'CHARGE USER'} </div> }
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
              By confirming {val.username} having {val.email} will be charged with £{chargeAmount}.
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

export default ChargeBox
