import React from 'react'
import { useState,useContext } from 'react';
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
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { userloggedIn } from '../Context/Context';


function ConsBox({val,ind}) {
    console.log(val);
    const {userlogged,setuserLogged,userData,setuserData,url} = useContext(userloggedIn);
    const [open,setOpen] = React.useState(false);
    
    const handleClickOpen = () => {
        setOpen(true);
      };
    const handleClose = () => {
      setOpen(false);
    };
    // Success message snackbar
    const [open1,setopen1] = React.useState(false);
    // Error message
    const [open2,setopen2] = React.useState(false);

    const steps = ['Vehicle', 'Condition', 'Ownership'];
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const [formdata,setformdata] = React.useState({
        name: val.name,
        email: val.email,
        phone: val.phone,
        price: val.price,
        year: val.year,
        make: val.make,
        model: val.model,
        located: val.located,
        mileage: val.mileage,
        owners: val.owners,
        license: val.license,
        chassis: val.chassis ,
        engineSize: val.engineSize,
        engineType: val.engineType,
        transmission: val.transmission,
        speeds: val.speeds,
        exteriorColor: val.exteriorColor,
        interiorColor: val.interiorColor,
        bodyworkDamage: val.bodyworkDamage,
        paintworkDamage: val.paintworkDamage,
        discolouration : val.discolouration,
        faults: val.faults,
        cambelt: val.cambelt ,
        conditionOfTyres: val.conditionOfTyres,
        notOriginalParts: val.notOriginalParts,
        customised: val.customised,
        knownFaults: val.knownFaults,
        p3q1: val.p3q1,
        p3q2: val.p3q2,
        p3q3: val.p3q3,
        p3q4: val.p3q4,
        p3q5: val.p3q5,
        p3q6: val.p3q6,
        p3q7: val.p3q7,
        p3q8: val.p3q8,
        p3q9: val.p3q9,
        p3q10: val.p3q10,
        p3q11: val.p3q11,
        p3q12: val.p3q12,
        p3q13: val.p3q13,
        image_urls: val.image_urls,
    })
    const [side,setside] = useState("left");
    function changeSide(event){
        const { name, checked } = event.target;
        if (checked) {
            setside(name);
            // console.log(name);
        }
    }
    const [paintwork,setpaintwork] = useState("good");
    function changePaintwork(event){
        const { name, checked } = event.target;
        if (checked) {
            setpaintwork(name);
            console.log(name);
        }
    }
    const [repainted,setrepainted] = useState("I don't know");
    function changeRepainted(event){
        const { name, checked } = event.target;
        if (checked) {
            setrepainted(name);
            console.log(name);
        }
    }
    const [interiorTrim,setinteriorTrim] = useState("good");
    function changeInteriorTrim(event){
        const { name, checked } = event.target;
        if (checked) {
            setinteriorTrim(name);
            console.log(name);
        }
    }
    const [reupholstered,setreupholstered] = useState("I don't know");
    function changereupholstered(event){
        const { name, checked } = event.target;
        if (checked) {
            setreupholstered(name);
            console.log(name);
        }
    }
    const totalSteps = () => {
        return steps.length;
      };
      const completedSteps = () => {
        return Object.keys(completed).length;
      };
      const isLastStep = () => {
        return activeStep === totalSteps() - 1;
      };
      const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
      };
      const handleNext = () => {
        //   window.scrollTo(0,0);
          setCompleted({ ...completed, [activeStep]: true });
        const newActiveStep =
          isLastStep() && !allStepsCompleted()
            ? // It's the last step, but not all steps have been completed,
              // find the first step that has been completed
              steps.findIndex((step, i) => !(i in completed))
            : activeStep + 1;
        setActiveStep(newActiveStep);
      };
      const handleBack = () => {
        //   window.scrollTo(0,0);
          setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
      const handleStep = (step) => () => {
        setActiveStep(step);
      };
      const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
      };
      function changeValue(event){
          const {name,value} = event.target;
          setformdata({
            ...formdata,
            [name]: value,
          });
          // console.log(formdata);
      }
      const [plateIncluded,setplateIncluded] = useState(true);
      const [loading,setloading] = useState(false);
      
      const submitform = async (event)=>{
          event.preventDefault();        
        //   if(images.length === 0) {
        //       setopen3(true);
        //       setTimeout(() => {
        //           setopen3(false);            
        //       }, 3000);
        //       return;
        //   }
        //   setloading(true);        
        //   const formData = new FormData();
        //   formData.append('price', formdata.price);
        //   formData.append('year', formdata.year);
        //   formData.append('make', formdata.make);
        //   formData.append('model', formdata.model);
        //   formData.append('located', formdata.located);
        //   formData.append('mileage', formdata.mileage);
        //   formData.append('owners', formdata.owners);
        //   formData.append('license', formdata.license);
        //   formData.append('chassis', formdata.chassis);
        //   formData.append('engineSize', formdata.engineSize);
        //   formData.append('engineType', formdata.engineType);
        //   formData.append('transmission', formdata.transmission);
        //   formData.append('speeds', formdata.speeds);
        //   formData.append('exteriorColor', formdata.exteriorColor);
        //   formData.append('interiorColor', formdata.interiorColor);
        //   formData.append('side', side);
        //   formData.append('plateIncluded', plateIncluded);
        //   formData.append('bodyworkDamage', formdata.bodyworkDamage);
        //   formData.append('paintworkDamage', formdata.paintworkDamage);
        //   formData.append('discolouration', formdata.discolouration);
        //   formData.append('faults', formdata.faults);
        //   formData.append('cambelt', formdata.cambelt);
        //   formData.append('conditionOfTyres', formdata.conditionOfTyres);
        //   formData.append('notOriginalParts', formdata.notOriginalParts);
        //   formData.append('customised', formdata.customised);
        //   formData.append('knownFaults', formdata.knownFaults);
        //   formData.append('paintwork', paintwork);
        //   formData.append('repainted', repainted);
        //   formData.append('interiorTrim', interiorTrim);
        //   formData.append('reupholstered', reupholstered);
        //   formData.append('p3q1', formdata.p3q1);
        //   formData.append('p3q2', formdata.p3q2);
        //   formData.append('p3q3', formdata.p3q3);
        //   formData.append('p3q4', formdata.p3q4);
        //   formData.append('p3q5', formdata.p3q5);
        //   formData.append('p3q6', formdata.p3q6);
        //   formData.append('p3q7', formdata.p3q7);
        //   formData.append('p3q8', formdata.p3q8);
        //   formData.append('p3q9', formdata.p3q9);
        //   formData.append('p3q10', formdata.p3q10);
        //   formData.append('p3q11', formdata.p3q11);
        //   formData.append('p3q12', formdata.p3q12);
        //   formData.append('p3q13', formdata.p3q13);
        //   // Reference token data
        //   formData.append('carMake', reference.carMake);
        //   formData.append('carModel', reference.carModel);
        //   formData.append('date', reference.date);
        //   formData.append('firstName', reference.firstName);
        //   formData.append('lastName', reference.lastName);
        //   formData.append('ref_token', reference.token);
        //   formData.append('ref_images', reference.images);
  
        //   console.log(reference.images);
        //   for (let i = 0; i < images.length; i++) {
        //       formData.append('images', images[i]);
        //   }
        //   console.log(formData);
        //   const res = await fetch(`${url}UploadConsignment/${token}`, {
        //   method: 'POST',
        //   body: formData
        //   });
  
        //   const data = await res.json();
        //   setloading(false);
        //   if(data.msg==='success'){
        //       Navigate('/');
        //       setopen1(true);
        //       setImages([]);
        //       setTimeout(() => {
        //           setopen1(false);
        //           setopen2(false);
        //           setopen3(false);
        //           setopen4(false);
        //       }, 10000);
        //   }else if(data.msg==='notoken'){
        //       setopen4(true);
        //       setTimeout(() => {
        //           setopen1(false);
        //           setopen2(false);
        //           setopen3(false);
        //           setopen4(false);
        //       }, 3000);
        //   }else{
        //       setopen2(true);
        //       setTimeout(() => {
        //           setopen1(false);
        //           setopen2(false);
        //           setopen3(false);
        //           setopen4(false);
        //       }, 3000);
  
        //   }
      }
      const submit1 = async (event)=>{
          event.preventDefault();
          handleNext();
      }
      const handleImage = (e) => {
        // const files = Array.from(e.target.files);
        // setImages([...images, ...files]);
        // const tempURLs = files.map((file) => URL.createObjectURL(file));
        // setImageURLs([...imageURLs, ...tempURLs]);
    } 
    
  return (
    <>
      <div className='enquiry_box' onClick={handleClickOpen} >
        <div className="enquiry_img" style={{backgroundImage: `url(${val.reference.ref_images[0] || '/assets/img/ed-img.png'})`}} ></div>
        <div className='e_box_bottom' >
            <div className="e_carMake"><span style={{fontWeight:'600',textTransform: "uppercase"}} >Make: </span>{val.reference.carMake}</div>
            <div className="e_carModel"><span style={{fontWeight:'600',textTransform: "uppercase"}} >Model:</span> {val.reference.carModel} </div>
            <div className="e_notes"> {val.reference.notes} </div>
            <div className="e_email"> {val.reference.email} </div>
            <div className="e_time"> {new Date(val.reference.date).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} </div>
        </div>
      </div>
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
                    {/* <Button style={{width:'7rem',margin:'0 10px'}} variant="outlined" startIcon={!loadingDelete&&<DeleteIcon/>} disabled={loadingDelete} onClick={deleteInquiry} >
                    { loadingDelete?<div class="loader-5-blue center" ><span></span></div>:<>Delete</>}
                    </Button> */}
                    <Button style={{marginLeft:'10px'}} variant="contained" endIcon={<SendIcon />}>
                    Send Mail
                    </Button>
                    <Button style={{width:'2rem',marginLeft:'10px'}} onClick={()=>{setOpen(false)}} variant="contained">
                    <svg style={{height:'1.6rem',fill:'white'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                    </Button>
                </div>
            </div>
            <div className="eb_body">
            <Box sx={{ width: '100%' }} style={{position:'relative'}} >
                <Stepper nonLinear activeStep={activeStep} style={{margin: '1rem 4rem 0rem 4rem'}} >
                    {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                        <StepButton color="inherit">
                        {label}
                        </StepButton>
                    </Step>
                    ))}
                </Stepper>
                <div className="pag_arrow_right" onClick={handleNext} >
                    <svg style={{height:'1.2rem',fill: '#9d5679'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                </div>
                <div className="pag_arrow_left" onClick={handleBack} >
                    <svg style={{height:'1.2rem',fill: '#9d5679'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                </div>
                <div>
                    {/* Page 1 Vehicle */}
                    {activeStep === 0 && (
                        <>
                            <div className='fade-in' style={{display:'flex',justifyContent:'center',margin:"0 2rem",position:'relative'}} >
                                <div className="owner__information__box" style={{width: "30rem",background: "none",padding: "0.5rem 1rem 0.2rem 1rem"}} >
                                    <div className="owner__information__title">
                                    <h6 style={{marginBottom: "4px"}} >Submitter Information</h6>
                                    </div>
                                    <div className="info__check">
                                    <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">Full Name</label>
                                    <div className="check__fx">                                  
                                        {/* <div className="info__inp" style={{width:'100%'}} >
                                        <textarea
                                            cols={30} rows={7} disabled={true}
                                            required
                                            type="text" 
                                            name='price'
                                            value={formdata.price}
                                            onChange={changeValue}
                                            placeholder="Your answer..."
                                            />
                                        </div> */}
                                        <div style={{color:"#106210",fontSize:"14px"}} > {formdata.name} </div>
                                    </div>
                                    </div>
                                    <div className="info__check">
                                    <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">Email Address</label>
                                    <div className="check__fx">                                  
                                        {/* <div className="info__inp" style={{width:'100%'}} >
                                        <textarea
                                            cols={30} rows={7} disabled={true}
                                            required
                                            type="text" 
                                            name='price'
                                            value={formdata.price}
                                            onChange={changeValue}
                                            placeholder="Your answer..."
                                            />
                                        </div> */}
                                        <div style={{color:"#106210",fontSize:"14px"}} > {formdata.email} </div>
                                    </div>
                                    </div>
                                    <div className="info__check">
                                    <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">Phone Number</label>
                                    <div className="check__fx">                                  
                                        {/* <div className="info__inp" style={{width:'100%'}} >
                                        <textarea
                                            cols={30} rows={7} disabled={true}
                                            required
                                            type="text" 
                                            name='price'
                                            value={formdata.price}
                                            onChange={changeValue}
                                            placeholder="Your answer..."
                                            />
                                        </div> */}
                                        <div style={{color:"#106210",fontSize:"14px"}} > {formdata.phone} </div>
                                    </div>
                                    </div>
                                    <div className="owner__information__title">
                                    <h6 style={{marginBottom: "4px"}} >Auction Information</h6>
                                    </div>
                                    <div className="info__check">
                                    <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">What is the reserve price you have initially agreed
                                        with our team?</label>
                                    <div className="check__fx">                                  
                                        {/* <div className="info__inp" style={{width:'100%'}} >
                                        <textarea
                                            cols={30} rows={7} disabled={true}
                                            required
                                            type="text" 
                                            name='price'
                                            value={formdata.price}
                                            onChange={changeValue}
                                            placeholder="Your answer..."
                                            />
                                        </div> */}
                                        <div style={{color:"#106210",fontSize:"14px"}} > {formdata.price} </div>
                                    </div>
                                    </div>
                                    <div className="owner__inp--wrap">
                                    <div className="owner__information__title owner__sec--title">
                                        <h6 style={{marginBottom: "4px"}} >Vehicle Information</h6>
                                    </div>
                                    {/* <form action="#"> */}
                                        <div className="check__single__inp">
                                        <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">What year was the car manufactured?</label>
                                        {/* <input 
                                            type="Number"
                                            required 
                                            name='year'
                                            value={formdata.year}
                                            onChange={changeValue}
                                            placeholder="Your answer..."
                                             /> */}
                                             <div style={{color:"#106210",fontSize:"14px"}} > {formdata.year} </div>
                                        </div>                                        
                                        <div className="check__single__inp">
                                        <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">What is the car make?</label>
                                        {/* <input 
                                            type="text"
                                            required 
                                            name='make'
                                            value={formdata.make}
                                            onChange={changeValue}
                                            placeholder="Your answer..."
                                            /> */}
                                            <div style={{color:"#106210",fontSize:"14px"}} > {formdata.make} </div>
                                        </div>
                                        <div className="check__single__inp">
                                        <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">What is the car model?</label>
                                        {/* <input 
                                            type="text"
                                            required 
                                            name='model'
                                            value={formdata.model}
                                            onChange={changeValue}
                                            placeholder="Your answer..."
                                            /> */}
                                            <div style={{color:"#106210",fontSize:"14px"}} > {formdata.model} </div>
                                        </div>
                                        <div className="check__single__inp">
                                        <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">Where is the car located?</label>
                                        {/* <input 
                                            type="text"
                                            required
                                            name='located'
                                            value={formdata.located}
                                            onChange={changeValue}
                                            placeholder="Your answer..."
                                            /> */}
                                            <div style={{color:"#106210",fontSize:"14px"}} > {formdata.located} </div>
                                        </div>                                    
                                    </div>
                                </div>  
                                <div className="owner__information__box" style={{width: "30rem",background: "none",padding: "0.5rem 1rem 0.2rem 1rem"}} >                                    
                                    <div className="owner__inp--wrap">                                    
                                        <div className="check__single__inp">
                                        <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">What is the current mileage?</label>
                                        {/* <input 
                                            type="Number" 
                                            name='mileage'
                                            required
                                            value={formdata.mileage}
                                            onChange={changeValue}
                                            placeholder="Your answer..."
                                            /> */}
                                            <div style={{color:"#106210",fontSize:"14px"}} > {formdata.mileage} </div>
                                        </div>
                                        <div className="check__single__inp">
                                        <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">How many owners (including you) has the car had?</label>
                                        {/* <input 
                                            type="Number" 
                                            name='owners'
                                            required
                                            value={formdata.owners}
                                            onChange={changeValue}
                                            placeholder="Your answer..."
                                             /> */}
                                             <div style={{color:"#106210",fontSize:"14px"}} > {formdata.owners} </div>
                                        </div>
                                        <div className="check__single__inp">
                                        <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">What is the full license plate or registration?</label>
                                        {/* <input 
                                            type="text" 
                                            name='license'
                                            required
                                            value={formdata.license}
                                            onChange={changeValue}
                                            placeholder="Your answer..." /> */}
                                            <div style={{color:"#106210",fontSize:"14px"}} > {formdata.license} </div>
                                        </div>
                                        <div className="check__single__inp">
                                        <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">Is the number plate included in the sale?</label>
                                        <div className="info__yes">
                                            <div className="new">
                                            <div className="form-group">
                                                <input
                                                    id="html"
                                                    type="checkbox"
                                                    checked={plateIncluded}
                                                    onChange={()=>{setplateIncluded(!plateIncluded)}}
                                                     />
                                                <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="html">Yes</label>
                                            </div>
                                            <div className="form-group">
                                                <input 
                                                    type="checkbox" 
                                                    id="css"
                                                    checked={!plateIncluded}
                                                    onChange={()=>{setplateIncluded(!plateIncluded)}}
                                                    />
                                                <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="css">no</label>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                        {/* </form> */}
                                        <div className="check__single__inp">
                                        <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">What is the chassis number/VIN?</label>
                                        {/* <input 
                                            type="text" 
                                            name='chassis'
                                            required
                                            value={formdata.chassis}
                                            onChange={changeValue}
                                            placeholder="Your answer..."
                                             /> */}
                                             <div style={{color:"#106210",fontSize:"14px"}} > {formdata.chassis} </div>
                                        </div>
                                        <div className="check__single__inp">
                                        <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">What is the engine size?</label>
                                        {/* <input 
                                            type="Number"
                                            required 
                                            name='engineSize'
                                            value={formdata.engineSize}
                                            onChange={changeValue}
                                            placeholder="Your answer..."
                                             /> */}
                                             <div style={{color:"#106210",fontSize:"14px"}} > {formdata.engineSize} </div> 
                                        </div>
                                    </div>
                                </div>  
                                <div className="owner__information__box" style={{width: "30rem",background: "none",padding: "0.5rem 1rem 0.2rem 1rem"}} >                                    
                                    <div className="owner__inp--wrap">                                                                          
                                        <div className="check__single__inp">
                                        <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">What is the engine type?</label>
                                        {/* <input 
                                            type="text"
                                            required 
                                            name='engineType'
                                            value={formdata.engineType}
                                            onChange={changeValue}
                                            placeholder="Your answer..." /> */}
                                            <div style={{color:"#106210",fontSize:"14px"}} > {formdata.engineType} </div>
                                        </div>
                                        <div className="check__single__inp">
                                        <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">What is the transmission?</label>
                                        {/* <input 
                                            type="text"
                                            required
                                            name='transmission'
                                            value={formdata.transmission}
                                            onChange={changeValue} /> */}
                                            <div style={{color:"#106210",fontSize:"14px"}} > {formdata.transmission} </div>
                                        </div>
                                        <div className="check__single__inp">
                                        <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">How many speeds does the gearbox have (NOT including reverse)?</label>
                                        {/* <input 
                                            type="Number"
                                            required
                                            name='speeds'
                                            value={formdata.speeds}
                                            onChange={changeValue}
                                            placeholder="Your answer..."
                                             /> */}
                                             <div style={{color:"#106210",fontSize:"14px"}} > {formdata.speeds} </div>
                                        </div>
                                        <div className="check__single__inp">
                                        <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">Which side does the driver sit?</label>
                                        <div className="info__yes">
                                        <div className="new">
                                            {/* <form> */}
                                            <div className="form-group">
                                                <input 
                                                    type="checkbox"
                                                    id="html1"
                                                    name='left'
                                                    onChange={changeSide}
                                                    checked={side==='left'?true:false}
                                                    />
                                                <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="html1">Left-hand drive</label>
                                            </div>
                                            <div className="form-group">
                                                <input 
                                                    type="checkbox" 
                                                    id="css2" 
                                                    name='right'
                                                    onChange={changeSide}
                                                    checked={side==='right'?true:false}
                                                    />
                                                <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="css2">Right-hand drive</label>
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    name='central'
                                                    type="checkbox"
                                                    id="javascript" 
                                                    onChange={changeSide}
                                                    checked={side==='central'?true:false}
                                                    />
                                                <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="javascript">Central seat</label>
                                            </div>
                                            {/* </form> */}
                                        </div>
                                        </div>
                                        </div>
                                        <div className="check__single__inp">
                                        <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">What is the exterior colour?</label>
                                        {/* <input 
                                            type="text"
                                            required 
                                            name='exteriorColor'
                                            value={formdata.exteriorColor}
                                            placeholder="Your answer..."
                                            onChange={changeValue}
                                            /> */}
                                            <div style={{color:"#106210",fontSize:"14px"}} > {formdata.exteriorColor} </div>
                                        </div>
                                        <div className="check__single__inp">
                                        <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">What is the interior colour?</label>
                                        {/* <input 
                                            type="text"
                                            required
                                            name='interiorColor'
                                            value={formdata.interiorColor}
                                            onChange={changeValue}
                                            placeholder="Your answer..."
                                            /> */}
                                            <div style={{color:"#106210",fontSize:"14px"}} > {formdata.interiorColor} </div>
                                        </div>
                                        {/* <div className="check__info__btn">
                                            <p>Please include official name and code if known</p>
                                            <button type='submit' >NEXT</button>
                                            <button onClick={handleBack} className="back-btn"> BACK </button>
                                        </div> */}
                                    </div>
                                </div>                                
                            </div>
                        </>
                    )}
                    {/* Page 2 Condition */}
                    {activeStep === 1 && (
                        <>
                        <div className='fade-in' style={{display:'flex',justifyContent:'center',margin:"0 2rem",position:'relative'}} >
                            <div className="owner__information__box" style={{width: "30rem",background: "none",padding: "0.5rem 1rem 0.2rem 1rem"}}>
                                    <div className="owner__inp--wrap">
                                        <div className="owner__information__title">
                                        <h6>Exterior Condition</h6>
                                        </div>
                                        {/* <form action="#"> */}
                                        <div className="check__single__inp">
                                            <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">To your knowledge, has the car ever suffered from any bodywork damage?</label>
                                            {/* <input 
                                                type="text"
                                                required
                                                name='bodyworkDamage'
                                                value={formdata.bodyworkDamage}
                                                onChange={changeValue}
                                                placeholder="Your answer..."
                                            /> */}
                                            <div style={{color:"#106210",fontSize:"14px"}} > {formdata.bodyworkDamage} </div>
                                            <span>If yes, please describe the damage and any repairs</span>
                                        </div>
                                        <div className="check__single__inp">
                                            <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">What is the condition of the paintwork?</label>
                                            <div className="info__yes">
                                            <div className="new">
                                                <div className="form-group">
                                                <input
                                                    type="checkbox" 
                                                    id="Excellent"
                                                    name='excellent'
                                                    onChange={changePaintwork}
                                                    checked={paintwork==='excellent'?true:false} />
                                                <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="Excellent">Excellent</label>
                                                </div>
                                                <div className="form-group">
                                                <input 
                                                    type="checkbox" 
                                                    id="Good"
                                                    name='good'
                                                    onChange={changePaintwork}
                                                    checked={paintwork==='good'?true:false} />
                                                <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="Good">Good</label>
                                                </div>
                                                <div className="form-group">
                                                <input 
                                                    type="checkbox" 
                                                    id="Fair"
                                                    name='fair'
                                                    onChange={changePaintwork}
                                                    checked={paintwork==='fair'?true:false} />
                                                <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="Fair">Fair</label>
                                                </div>
                                                <div className="form-group">
                                                <input 
                                                    type="checkbox" 
                                                    id="Poor"
                                                    name='poor'
                                                    onChange={changePaintwork}
                                                    checked={paintwork==='poor'?true:false} />
                                                <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="Poor">Poor</label>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        {/* </form> */}
                                        <div className="check__single__inp">
                                        <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">Has the car ever been repainted?</label>
                                        <div className="info__yes">
                                            <div className="new">
                                            {/* <form> */}
                                                <div className="form-group">
                                                <input 
                                                    type="checkbox" 
                                                    id="Excellent1"
                                                    name='yes'
                                                    onChange={changeRepainted}
                                                    checked={repainted==='yes'?true:false} />
                                                <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="Excellent1">Yes some or all of it has definitely been
                                                    resprayed)</label>
                                                </div>
                                                <div className="form-group">
                                                <input 
                                                    type="checkbox" 
                                                    id="Good2"
                                                    name='no'
                                                    onChange={changeRepainted}
                                                    checked={repainted==='no'?true:false} />
                                                <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="Good2">No (paintwork is believed to be original)</label>
                                                </div>
                                                <div className="form-group">
                                                <input 
                                                    type="checkbox" 
                                                    id="Fair1"
                                                    name="I don't know"
                                                    onChange={changeRepainted}
                                                    checked={repainted==="I don't know"?true:false} />
                                                <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="Fair1">I don't know</label>
                                                </div>
                                            {/* </form> */}
                                            </div>
                                        </div>
                                        </div>
                                        <div className="check__single__inp">
                                        <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">Please provide details of any paintwork damage or blemishes (even if very minor)</label>
                                        {/* <input 
                                            type="text" 
                                            placeholder="e.g. stone chips, scratches, scuUs, etc."
                                            name='paintworkDamage'
                                            value={formdata.paintworkDamage}
                                            onChange={changeValue}
                                             /> */}
                                             <div style={{color:"#106210",fontSize:"14px"}} > {formdata.paintworkDamage} </div>
                                        <span>Please tell us about any repainted sections if specified</span>
                                        </div>
                                    </div>
                            </div>
                            <div className="owner__information__box" style={{width: "30rem",background: "none",padding: "0.5rem 1rem 0.2rem 1rem"}}>
                                    <div className="owner__inp--wrap">                                        
                                        <div className="Interior__title">
                                        <h5 style={{margin:'0.5rem 0'}} >Interior Condition</h5>
                                        </div>
                                        <div className="check__single__inp">
                                        <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">What is the condition of the interior trim?</label>
                                        <div className="info__yes">
                                            <div className="new">
                                            {/* <form> */}
                                                <div className="form-group">
                                                <input 
                                                    type="checkbox" 
                                                    id="html1"
                                                    name='excellent'
                                                    onChange={changeInteriorTrim}
                                                    checked={interiorTrim==='excellent'?true:false} />
                                                <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="html1">Excellent</label>
                                                </div>
                                                <div className="form-group">
                                                <input 
                                                    type="checkbox" 
                                                    id="css2"
                                                    name='good'
                                                    onChange={changeInteriorTrim}
                                                    checked={interiorTrim==='good'?true:false} />
                                                <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="css2">Good</label>
                                                </div>
                                                <div className="form-group">
                                                <input 
                                                    type="checkbox" 
                                                    id="javascript"
                                                    name='fair'
                                                    onChange={changeInteriorTrim}
                                                    checked={interiorTrim==='fair'?true:false} />
                                                <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="javascript">Fair</label>
                                                </div>
                                                <div className="form-group">
                                                <input 
                                                    type="checkbox" 
                                                    id="javascript5"
                                                    name='poor'
                                                    onChange={changeInteriorTrim}
                                                    checked={interiorTrim==='poor'?true:false} />
                                                <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="javascript5">Poor</label>
                                                </div>
                                            {/* </form> */}
                                            </div>
                                        </div>
                                        </div>
                                        <div className="check__single__inp">
                                        <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">Has the car ever been reupholstered?</label>
                                        <div className="info__yes">
                                            <div className="new">
                                            {/* <form> */}
                                                <div className="form-group">
                                                <input 
                                                    type="checkbox" 
                                                    id="Excellent17"
                                                    name='yes'
                                                    onChange={changereupholstered}
                                                    checked={reupholstered==='yes'?true:false}
                                                     />
                                                <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="Excellent17">Yes (it has definitely been re-trimmed)</label>
                                                </div>
                                                <div className="form-group">
                                                <input 
                                                    type="checkbox" 
                                                    id="Good27"
                                                    name='no'
                                                    onChange={changereupholstered}
                                                    checked={reupholstered==='no'?true:false} />
                                                <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="Good27">No (upholstery is believed to be original)</label>
                                                </div>
                                                <div className="form-group">
                                                <input 
                                                    type="checkbox" 
                                                    id="Fair17"
                                                    name="I don't know"
                                                    onChange={changereupholstered}
                                                    checked={reupholstered==="I don't know"?true:false} />
                                                <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="Fair17">I don't know</label>
                                                </div>
                                            {/* </form> */}
                                            </div>
                                        </div>
                                        </div>
                                        <div className="check__single__inp textfild">
                                        <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">Please provide details of any wear, discolouration on or
                                            damage to the seats or other trim (even if very
                                            minor)</label>
                                        {/* <textarea id cols={30} rows={10} 
                                            required
                                            placeholder="Your description..."
                                            name='discolouration'
                                            value={formdata.discolouration}
                                            onChange={changeValue}
                                            /> */}
                                            <div style={{color:"#106210",fontSize:"14px"}} > {formdata.discolouration} </div>
                                        </div>
                                        <div className="check__single__inp textfild">
                                        <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">Please provide details of any faults with controls, 
                                            switches, or other electrics</label>
                                        {/* <textarea id cols={30} rows={10} 
                                            required 
                                            placeholder="Your description..." 
                                            defaultValue={""}
                                            name='faults'
                                            value={formdata.faults}
                                            onChange={changeValue} /> */}
                                            <div style={{color:"#106210",fontSize:"14px"}} > {formdata.faults} </div>
                                        <span>Please include any warning lights on the dashboard</span>
                                        </div>                                        
                                    </div>
                            </div>
                            <div className="owner__information__box" style={{width: "30rem",background: "none",padding: "0.5rem 1rem 0.2rem 1rem"}}>
                                    <div className="owner__inp--wrap">                                        
                                        <div className="owner__information__title">
                                        <h6>Mechanical Condition</h6>
                                        </div>
                                        <div className="check__single__inp">
                                        <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">If the car has a cambelt, when does the history show it was last replaced?</label>
                                        {/* <input 
                                            type="text" 
                                            placeholder="Your answer..." 
                                            required
                                            name='cambelt'
                                            value={formdata.cambelt}
                                            onChange={changeValue} /> */}
                                            <div style={{color:"#106210",fontSize:"14px"}} > {formdata.cambelt} </div>
                                        </div>
                                        <div className="check__single__inp">
                                        <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">What is the condition / age / tread depth of the tyres?</label>
                                        {/* <input 
                                            type="text" 
                                            placeholder="Your answer..." 
                                            required 
                                            name='conditionOfTyres'
                                            value={formdata.conditionOfTyres}
                                            onChange={changeValue}    
                                            /> */}
                                            <div style={{color:"#106210",fontSize:"14px"}} > {formdata.conditionOfTyres} </div>
                                        </div>
                                        <div className="check__single__inp">
                                        <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">Are there any major parts of the car that are not original?</label>
                                        {/* <input 
                                            type="text" 
                                            placeholder="Your answer..." 
                                            required
                                            name='notOriginalParts'
                                            value={formdata.notOriginalParts}
                                            onChange={changeValue} /> */}
                                            <div style={{color:"#106210",fontSize:"14px"}} > {formdata.notOriginalParts} </div>
                                        </div>
                                        <div className="check__single__inp">
                                        <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">Has the car been modified or customised in any way?</label>
                                        {/* <input 
                                            type="text" 
                                            placeholder="Your answer..." 
                                            required
                                            name='customised'
                                            value={formdata.customised}
                                            onChange={changeValue} /> */}
                                            <div style={{color:"#106210",fontSize:"14px"}} > {formdata.customised} </div>
                                        </div>
                                        <div className="check__single__inp">
                                        <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">Are there any known faults that you have not detailed in the information above?</label>
                                        {/* <input 
                                            type="text" 
                                            placeholder="Your answer..." 
                                            required
                                            name='knownFaults'
                                            value={formdata.knownFaults}
                                            onChange={changeValue} /> */}
                                            <div style={{color:"#106210",fontSize:"14px"}} > {formdata.knownFaults} </div>
                                        </div>                                      
                                    </div>
                            </div>
                        </div>
                        </>
                    )}
                    {/* Page 3 Ownership */}
                    {activeStep === 2 && (
                        <>
                        <div className='fade-in' style={{display:'flex',justifyContent:'center',margin:"0 2rem",position:'relative'}} >
                            <div className="owner__information__box" style={{width: "30rem",background: "none",padding: "0.5rem 1rem 0.2rem 1rem"}}>
                                        <div className="owner__inp--wrap">
                                            <div className="owner__information__title">
                                            <h6>Ownership Information</h6>
                                            </div>
                                            {/* <form action="#"> */}
                                            <div className="check__single__inp">
                                                <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">What was the date of first registration for the car?</label>
                                                {/* <input 
                                                    type="text" 
                                                    placeholder="Your answer..."
                                                    required
                                                    name='p3q1'
                                                    value={formdata.p3q1}
                                                    onChange={changeValue}
                                                    /> */}
                                                    <div style={{color:"#106210",fontSize:"14px"}} > {formdata.p3q1} </div>
                                            </div>
                                            <div className="check__single__inp">
                                                <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">What was the date and mileage at the last service,
                                                and which company did the work?</label>
                                                {/* <input 
                                                    type="text" 
                                                    placeholder="Your answer..."
                                                    required
                                                    name='p3q2'
                                                    value={formdata.p3q2}
                                                    onChange={changeValue} /> */}
                                                    <div style={{color:"#106210",fontSize:"14px"}} > {formdata.p3q2} </div>
                                            </div>
                                            <div className="check__single__inp textfild">
                                                <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">What work was carried out at the last service?</label>
                                                {/* <textarea 
                                                    cols={30} 
                                                    rows={10} 
                                                    placeholder="Your description..." 
                                                    required
                                                    name='p3q3'
                                                    value={formdata.p3q3}
                                                    onChange={changeValue}
                                                /> */}
                                                <div style={{color:"#106210",fontSize:"14px"}} > {formdata.p3q3} </div>
                                            </div>
                                            <div className="check__single__inp">
                                                <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">When were the two previous services before this
                                                and what worked was carried out during those?</label>
                                                {/* <textarea 
                                                    cols={30} 
                                                    rows={10} 
                                                    placeholder="Your description..."
                                                    required
                                                    name='p3q4'
                                                    value={formdata.p3q4}
                                                    onChange={changeValue}
                                                /> */}
                                                <div style={{color:"#106210",fontSize:"14px"}} > {formdata.p3q4} </div>
                                            </div>                                                                                                                                  
                                            <div className="check__single__inp">
                                                <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">What other maintenance has been carried out
                                                during your ownership?</label>
                                                {/* <textarea 
                                                    cols={30} 
                                                    rows={10} 
                                                    placeholder="Your description..." 
                                                    required
                                                    name='p3q5'
                                                    value={formdata.p3q5}
                                                    onChange={changeValue} /> */}
                                                    <div style={{color:"#106210",fontSize:"14px"}} > {formdata.p3q5} </div>
                                            </div>
                                        </div>
                            </div>
                            <div className="owner__information__box" style={{width: "30rem",background: "none",padding: "0.5rem 1rem 0.2rem 1rem"}}>
                                        <div className="owner__inp--wrap">                                            
                                            <div className="check__single__inp">
                                                <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">How many years have you owned the car?</label>
                                                {/* <input 
                                                    type="text" 
                                                    placeholder="Your answer..."
                                                    required
                                                    name='p3q6'
                                                    value={formdata.p3q6}
                                                    onChange={changeValue} /> */}
                                                    <div style={{color:"#106210",fontSize:"14px"}} > {formdata.p3q6} </div>
                                            </div>
                                            <div className="check__single__inp">
                                                <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">Has the vehicle been involved in an accident (if yes, please provide details)?</label>
                                                {/* <input 
                                                    type="text" 
                                                    placeholder="Your answer..."
                                                    required
                                                    name='p3q7'
                                                    value={formdata.p3q7}
                                                    onChange={changeValue} /> */}
                                                    <div style={{color:"#106210",fontSize:"14px"}} > {formdata.p3q7} </div>
                                            </div>
                                            <div className="check__single__inp">
                                                <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">When was the last MOT / eSafety / TUV or equivalent technical inspection?</label>
                                                {/* <input 
                                                    type="text" 
                                                    placeholder="e.g. TUV / CT/ Revision?"
                                                    required
                                                    name='p3q8'
                                                    value={formdata.p3q8}
                                                    onChange={changeValue} /> */}
                                                    <div style={{color:"#106210",fontSize:"14px"}} > {formdata.p3q8} </div>
                                            </div>                                                                                                                                   
                                            <div className="check__single__inp">
                                                <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">Were there any advisories or warnings about thecar’s condition from this inspection?</label>
                                                {/* <input 
                                                    type="text" 
                                                    placeholder="Your answer..."
                                                    required
                                                    name='p3q9'
                                                    value={formdata.p3q9}
                                                    onChange={changeValue} /> */}
                                                    <div style={{color:"#106210",fontSize:"14px"}} > {formdata.p3q9} </div>
                                            </div>
                                        </div>
                            </div>
                            <div className="owner__information__box" style={{width: "30rem",background: "none",padding: "0.5rem 1rem 0.2rem 1rem"}}>
                                        <div className="owner__inp--wrap">
                                            <div className="check__single__inp">
                                                <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">How much service history paperwork accompanies the vehicle to evidence the maintenance?</label>
                                                {/* <input 
                                                    type="text" 
                                                    placeholder="Your answer..."
                                                    required
                                                    name='p3q10'
                                                    value={formdata.p3q10}
                                                    onChange={changeValue} /> */}
                                                    <div style={{color:"#106210",fontSize:"14px"}} > {formdata.p3q10} </div>
                                            </div>
                                            <div className="owner__information__title final">
                                                <h6 style={{margin:'0.5rem 0'}} >Final Details</h6>
                                            </div>
                                            <div className="check__single__inp">
                                                <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">What handbooks / literature / service history /
                                                tools are included with the car?</label>
                                                {/* <textarea 
                                                    cols={30} 
                                                    rows={10} 
                                                    placeholder="e.g. stamped service book"
                                                    required
                                                    name='p3q11'
                                                    value={formdata.p3q11}
                                                    onChange={changeValue} /> */}
                                                    <div style={{color:"#106210",fontSize:"14px"}} > {formdata.p3q11} </div>                                                
                                            </div>
                                            <div className="check__single__inp">
                                                <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">If there is anything else you would like to tell us,
                                                please add it here</label>
                                                {/* <textarea 
                                                    cols={30} 
                                                    rows={10} 
                                                    placeholder="Your description..."
                                                    required
                                                    name='p3q12'
                                                    value={formdata.p3q12}
                                                    onChange={changeValue} /> */}
                                                    <div style={{color:"#106210",fontSize:"14px"}} > {formdata.p3q12} </div>                                                
                                            </div>
                                            <div className="check__single__inp">
                                                <label style={{fontSize:"14px",fontWeight:"600",color:"#1940a2"}} htmlFor="#">In summary, what would you say are the best things
                                                about the car?</label>
                                                {/* <textarea 
                                                    cols={30}
                                                    rows={10}
                                                    placeholder="Your description..." 
                                                    required
                                                    name='p3q13'
                                                    value={formdata.p3q13}
                                                    onChange={changeValue} /> */}
                                                    <div style={{color:"#106210",fontSize:"14px"}} > {formdata.p3q13} </div>
                                            </div>                                                                                    
                                        </div>
                            </div>
                        </div>
                        </>
                    )}  
                    {/* Page 4 Images */}
                    {activeStep === 3 && (
                        <>
                        <div className='fade-in' style={{padding:'0 0.8rem',display:'flex',flexWrap:'wrap',justifyContent:'start',margin:"0 2rem",position:'relative',gap:'10px'}} >
                            { formdata.image_urls && formdata.image_urls.length>0 &&
                                formdata.image_urls.map((val,ind)=>{
                                    return(<>
                                        <img src={val} style={{height:'8rem'}}/>
                                    </>)
                                })
                            }                            
                        </div>
                        </>
                    )}  

                </div>
            </Box>
            </div>
        </div>
        </Dialog>
    </>
  )
}

export default ConsBox
