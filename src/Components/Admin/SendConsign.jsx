import * as React from 'react';
import { useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { userloggedIn } from '../Context/Context';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SendConsign({val,setconsignmentDialogOpen, consignmentDialogOpen,handleClickOpenConsignment, handleCloseConsignment}) {
  const {userlogged,setuserLogged,userData,setuserData,url} = useContext(userloggedIn);
    const [sendLoading,setSendLoading] = React.useState(false);
    // console.log(val);
    const [to,setTo] = React.useState(val.email);
    const [subject,setSubject] = React.useState(`Invitation to Fill Consignment Form`);
    const [body, setBody] = React.useState(`Dear Seller,<br>
<br>
We hope this email finds you well. We wanted to follow up with you regarding the application you submitted for selling your car. After reviewing the details you provided, We believe your vehicle has great potential and We are interested in moving forward with the consignment process.<br><br>
As a next step, We would like to invite you to fill out our consignment form. This will provide us with more detailed information about your car and allow us to move forward with the sales process.<br><br>
Please let us know if you have any questions or concerns about the form or the consignment process in general. We look forward to working with you and getting your car sold.<br>
<br>
Best regards,<br>
Autosauctions`);

    const [open1,setopen1] = React.useState(false);
    // Error message
    const [open2,setopen2] = React.useState(false);
    const vertical = 'top';
    const horizontal = 'center';

    const submitform = async (event)=>{
        event.preventDefault();
        // setLoading(true);
        setSendLoading(true);
        const res = await fetch(`${url}consignmentForm`,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                to: to,
                subject: subject,
                body: body,
                carMake: val.carMake,
                carModel: val.carModel,
                firstName: val.firstName,
                lastName: val.lastName,
                images: val.images,
                notes: val.notes,
            }),
        });
        const data = await res.json();
        setSendLoading(false);
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
    React.useEffect(() => {
      // Perform any necessary logic when the val prop changes
      // console.log('val prop has changed:', val);
      // Update any state or perform any actions based on the new val prop value
    }, [val]);
    return (
    <>
        <Snackbar open={open1} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
          <Alert severity="success" sx={{ width: '100%' }}>
            Email Sent Successfully!
          </Alert>
        </Snackbar>
        <Snackbar open={open2} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
          <Alert severity="error" sx={{ width: '100%' }}>
            Unauthorized request!
          </Alert>
        </Snackbar>
      <Dialog
        open={consignmentDialogOpen}
        onClose={handleCloseConsignment}
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
            >
            <div className="cons_dialog_header">
            <div className="flex">
                <Button type='submit' style={{margin:'0 8px',backgroundColor:'green',width: "9rem"}} disabled={sendLoading} variant="contained" endIcon={!sendLoading&&<SendIcon />}>
                    {sendLoading?<div class="loader-5 center" ><span></span></div>:<>Send Mail</>}
                </Button>
                <Button  onClick={()=>{handleCloseConsignment()}} variant="contained" style={{width:'2rem'}}>
                    <svg style={{height:'1.3rem',fill:'white'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                </Button>
            </div>
            </div>
            <div>
                <TextField
                id="outlined-multiline-flexible"
                label="To"
                multiline
                maxRows={4}
                value={val.email}
                disabled={true}
                onChange={(e)=>{setTo(e.target.value)}}
                />
                <TextField
                id="outlined-textarea"
                label="Subject"
                placeholder="Enter subject"
                multiline
                defaultValue={subject}
                onChange={(e)=>{setSubject(e.target.value)}}
                />
                <TextField
                id="outlined-multiline-static"
                label="Body"
                multiline
                onChange={(e)=>{setBody(e.target.value)}}
                rows={16}
                defaultValue={body}
                />
            </div>
        </Box>
        </div>
      </div>
      </Dialog>
    </>
  )
}

export default SendConsign
