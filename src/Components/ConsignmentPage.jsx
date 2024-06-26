import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Animations.css'
import { userloggedIn } from './Context/Context';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ConsignmentPage() {
    const {userlogged,setuserLogged,userData,setuserData,url} = useContext(userloggedIn);
    const Navigate = useNavigate();
    const {token} = useParams();
    // const [imageURLs, setImageURLs] = React.useState([]);
    // Values of sellingForm with token
    const [reference,setReference] = useState({});
    const steps = ['Overview', 'Vehicle', 'Condition', 'Ownership'];
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const [formdata,setformdata] = useState({
        name:'',
        email:'',
        phone:'',
        price:'',
        year: '',
        make:'',
        model:'',
        located:'',
        mileage:'',
        owners:'',
        license:'',
        chassis:'',
        engineSize:'',
        engineType:'',
        transmission:'',
        speeds:'',
        exteriorColor:'',
        interiorColor:'',
        bodyworkDamage:'',
        paintworkDamage:'',
        discolouration :'',
        faults:'',
        cambelt:'',
        conditionOfTyres:'',
        notOriginalParts:'',
        customised:'',
        knownFaults:'',
        p3q1:'',
        p3q2:'',
        p3q3:'',
        p3q4:'',
        p3q5:'',
        p3q6:'',
        p3q7:'',
        p3q8:'',
        p3q9:'',
        p3q10:'',
        p3q11:'',
        p3q12:'',
        p3q13:'',
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
    const [images, setImages] = React.useState([]);
    const [imageURLs, setImageURLs] = React.useState([]);
    const [open1,setopen1] = React.useState(false);
    const [open2,setopen2] = React.useState(false);
    const [open3,setopen3] = React.useState(false);
    const [open4,setopen4] = React.useState(false);
  
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
        window.scrollTo(0,0);
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
        window.scrollTo(0,0);
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
  
    const handleReset = () => {
    //   setActiveStep(0);
    //   setCompleted({});
        console.log(reference);
    };
    const handleImage = (e) => {
        const files = Array.from(e.target.files);
        setImages([...images, ...files]);
        const tempURLs = files.map((file) => URL.createObjectURL(file));
        setImageURLs([...imageURLs, ...tempURLs]);
    } 
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
        if(images.length === 0) {
            setopen3(true);
            setTimeout(() => {
                setopen3(false);            
            }, 3000);
            return;
        }
        setloading(true);        
        const formData = new FormData();
        formData.append('name', formdata.name);
        formData.append('email', formdata.email);
        formData.append('phone', formdata.phone);
        formData.append('price', formdata.price);
        formData.append('year', formdata.year);
        formData.append('make', formdata.make);
        formData.append('model', formdata.model);
        formData.append('located', formdata.located);
        formData.append('mileage', formdata.mileage);
        formData.append('owners', formdata.owners);
        formData.append('license', formdata.license);
        formData.append('chassis', formdata.chassis);
        formData.append('engineSize', formdata.engineSize);
        formData.append('engineType', formdata.engineType);
        formData.append('transmission', formdata.transmission);
        formData.append('speeds', formdata.speeds);
        formData.append('exteriorColor', formdata.exteriorColor);
        formData.append('interiorColor', formdata.interiorColor);
        formData.append('side', side);
        formData.append('plateIncluded', plateIncluded);
        formData.append('bodyworkDamage', formdata.bodyworkDamage);
        formData.append('paintworkDamage', formdata.paintworkDamage);
        formData.append('discolouration', formdata.discolouration);
        formData.append('faults', formdata.faults);
        formData.append('cambelt', formdata.cambelt);
        formData.append('conditionOfTyres', formdata.conditionOfTyres);
        formData.append('notOriginalParts', formdata.notOriginalParts);
        formData.append('customised', formdata.customised);
        formData.append('knownFaults', formdata.knownFaults);
        formData.append('paintwork', paintwork);
        formData.append('repainted', repainted);
        formData.append('interiorTrim', interiorTrim);
        formData.append('reupholstered', reupholstered);
        formData.append('p3q1', formdata.p3q1);
        formData.append('p3q2', formdata.p3q2);
        formData.append('p3q3', formdata.p3q3);
        formData.append('p3q4', formdata.p3q4);
        formData.append('p3q5', formdata.p3q5);
        formData.append('p3q6', formdata.p3q6);
        formData.append('p3q7', formdata.p3q7);
        formData.append('p3q8', formdata.p3q8);
        formData.append('p3q9', formdata.p3q9);
        formData.append('p3q10', formdata.p3q10);
        formData.append('p3q11', formdata.p3q11);
        formData.append('p3q12', formdata.p3q12);
        formData.append('p3q13', formdata.p3q13);
        // Reference token data
        formData.append('carMake', reference.carMake);
        formData.append('carModel', reference.carModel);
        formData.append('date', reference.date);
        formData.append('firstName', reference.firstName);
        formData.append('lastName', reference.lastName);
        formData.append('notes', reference.notes);
        formData.append('ref_token', reference.token);
        formData.append('ref_images', reference.images);

        console.log(reference.images);
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }
        console.log(formData);
        const res = await fetch(`${url}UploadConsignment/${token}`, {
        method: 'POST',
        body: formData
        });

        const data = await res.json();
        setloading(false);
        if(data.msg==='success'){
            // setopen2(false);
            setopen1(true);
            setImages([]);
            setImageURLs([]);
            setTimeout(() => {
                setopen1(false);
                setopen2(false);
                setopen3(false);
                setopen4(false);
                Navigate('/');
            }, 10000);
        }else if(data.msg==='notoken'){
            setopen4(true);
            setTimeout(() => {
                setopen1(false);
                setopen2(false);
                setopen3(false);
                setopen4(false);
            }, 3000);
        }else{
            setopen2(true);
            setTimeout(() => {
                setopen1(false);
                setopen2(false);
                setopen3(false);
                setopen4(false);
            }, 3000);

        }
    }
    const submit1 = async (event)=>{
        event.preventDefault();
        handleNext();
    }
    const [authLoading,setauthLoading] = useState(false);
    const [pageLoading,setpageLoading] = useState(false);

    const RetrieveTokenReference = async ()=>{
        const res = await fetch(`${url}RetrieveTokenReference/${token}`,{
            method: "GET",
            headers: {
            Accept: "application/json",
            "Content-Type":"application/json",
            }
        });
        const data = await res.json();
        // console.log(data);
        if(data.msg==='success'){
            setReference(data.data);
            setpageLoading(true);
            setauthLoading(true);
            console.log(data.data);
        }else{
            setpageLoading(true);
            setauthLoading(false);
            // setauthLoading(true);
        }
    }
    useEffect(()=>{
        RetrieveTokenReference();
        // console.log(reference);
    },[])

    return (
    <>
        { pageLoading ?
            <>
                { authLoading ?
                    <div style={{padding: "3% 12%"}}>
            <Snackbar open={open3} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
                <Alert severity="error" sx={{ width: '100%' }}>
                    Please select atleast 1 image!
                </Alert>
            </Snackbar>
            <Snackbar open={open1} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
                <Alert severity="success" sx={{ width: '100%' }}>
                    Form Successfully Submitted!
                </Alert>
            </Snackbar>
            <Snackbar open={open2} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
                <Alert severity="error" sx={{ width: '100%' }}>
                    Failed to submit form!
                </Alert>
            </Snackbar>
            <Snackbar open={open4} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
                <Alert severity="error" sx={{ width: '100%' }}>
                    Invalid token or already submitted!
                </Alert>
            </Snackbar>
            <Box sx={{ width: '100%' }}>
                <h2 style={{textAlign:"center",marginBottom:"2rem",fontWeight:"500",color: "#160f7c"}} onClick={handleReset} > {reference.carMake} {reference.carModel} </h2>
                <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                        <StepButton color="inherit">
                        {label}
                        </StepButton>
                    </Step>
                    ))}
                </Stepper>
                <div>
                    {/* Page 1 Overview */}
                    {activeStep === 0 && (
                        <div className='fade-in' >
                            <div className="get__area">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="get__wrap">
                                                <h2>Before we get started...</h2>
                                                <p>We believe our descriptions are the most detailed and engaging in the marketplace. To help us help you, please provide as much information as you can about your consignment. You are solely responsible for the factual accuracy of, and for any judgments or opinions expressed in, the description of each auction lot consigned by you, and for any error, misleadingstatement or omission of information in that description. As a seller, you are responsible for compliance with all relevant legislation.</p>
                                                <div className="get__list">
                                                    <ul>
                                                        <li>This form is generated by <span style={{margin:0,display:'inline-block',fontWeight:'bold'}} >{reference.firstName} {reference.lastName}</span> for <span style={{margin:0,display:'inline-block',fontWeight:'bold'}} >{reference.carMake} {reference.carModel}</span></li>
                                                        <li>Please provide an accurate appraisal of the car's cosmetic condition</li>
                                                        <li>Tell us about any electrical or mechanical faults
                                                            with the car</li>
                                                        <li>Share as much detail as you can about recent
                                                            service history</li>
                                                        <li>Note any major work (full respray / engine rebuild
                                                            etc.)</li>
                                                        <li>The car must be 'as described', so be honest aboutfaults or imperfections</li>
                                                        <li>If you do not know the answer to any question
                                                            you must say so</li>
                                                    </ul>
                                                </div>
                                                <span>We estimate this form will take around 10 minutes to
                                                    complete</span>
                                                <button className='get__wrap__btn' onClick={handleNext} >GET STARTED</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Page 2 Vehicle */}
                    {activeStep === 1 && (
                        <div className='fade-in' >
                            <div className="sell__area">
                                <div className="sell__wrap">
                                <form onSubmit={submit1}>
                                <div className="owner__information__box">
                                    <div className="owner__information__title">
                                    <h6>Form Submitter Information</h6>
                                    </div>
                                    <div className="info__check">
                                        <label htmlFor="#">What is your full name?</label>
                                        <div className="check__fx">                                  
                                            <div className="info__inp" style={{width:'100%'}} >
                                            <input
                                                required
                                                type="text" 
                                                name='name'
                                                value={formdata.name}
                                                onChange={changeValue}
                                                placeholder="Please enter full name"
                                                style={{marginBottom:'1rem'}}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="info__check">
                                        <label htmlFor="#">What is your email address?</label>
                                        <div className="check__fx">                                  
                                            <div className="info__inp" style={{width:'100%'}} >
                                            <input
                                                required
                                                type="text"
                                                name='email'
                                                value={formdata.email}
                                                onChange={changeValue}
                                                placeholder="Please enter your email address to contact you later."
                                                style={{marginBottom:'1rem'}}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="info__check">
                                        <label htmlFor="#">What is your phone number?</label>
                                        <div className="check__fx">                                  
                                            <div className="info__inp" style={{width:'100%'}} >
                                            <input
                                                required
                                                type="text" 
                                                name='phone'
                                                value={formdata.phone}
                                                onChange={changeValue}
                                                placeholder="Please enter your phone number to contact you later."
                                                style={{marginBottom:'2rem'}}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="owner__information__title">
                                    <h6>Auction Information</h6>
                                    </div>
                                    <div className="info__check">
                                    <label htmlFor="#">What is the reserve price you have initially agreed
                                        with our team?</label>
                                    <div className="check__fx">                                  
                                        <div className="info__inp" style={{width:'100%'}} >
                                        <input
                                            required
                                            type="text" 
                                            name='price'
                                            value={formdata.price}
                                            onChange={changeValue}
                                            placeholder="Your answer..."
                                            />
                                        </div>
                                    </div>
                                    </div>
                                    <div className="owner__inp--wrap">
                                    <div className="owner__information__title owner__sec--title">
                                        <h6>Vehicle Information</h6>
                                    </div>
                                    {/* <form action="#"> */}
                                        <div className="check__single__inp">
                                        <label htmlFor="#">What year was the car manufactured?</label>
                                        <input 
                                            type="Number"
                                            required 
                                            name='year'
                                            value={formdata.year}
                                            onChange={changeValue}
                                            placeholder="Your answer..."
                                             />
                                        </div>                                        
                                        <div className="check__single__inp">
                                        <label htmlFor="#">What is the car make?</label>
                                        <input 
                                            type="text"
                                            required 
                                            name='make'
                                            value={formdata.make}
                                            onChange={changeValue}
                                            placeholder="Your answer..."
                                            />
                                        </div>
                                        <div className="check__single__inp">
                                        <label htmlFor="#">What is the car model?</label>
                                        <input 
                                            type="text"
                                            required 
                                            name='model'
                                            value={formdata.model}
                                            onChange={changeValue}
                                            placeholder="Your answer..."
                                            />
                                        </div>
                                        <div className="check__single__inp">
                                        <label htmlFor="#">Where is the car located?</label>
                                        <input 
                                            type="text"
                                            required
                                            name='located'
                                            value={formdata.located}
                                            onChange={changeValue}
                                            placeholder="Your answer..."
                                            />
                                        </div>
                                        <div className="check__single__inp">
                                        <label htmlFor="#">What is the current mileage?</label>
                                        <input 
                                            type="Number" 
                                            name='mileage'
                                            required
                                            value={formdata.mileage}
                                            onChange={changeValue}
                                            placeholder="Your answer..."
                                            />
                                        </div>
                                        <div className="check__single__inp">
                                        <label htmlFor="#">How many owners (including you) has the car had?</label>
                                        <input 
                                            type="Number" 
                                            name='owners'
                                            required
                                            value={formdata.owners}
                                            onChange={changeValue}
                                            placeholder="Your answer..."
                                             />
                                        </div>
                                        <div className="check__single__inp">
                                        <label htmlFor="#">What is the full license plate or registration?</label>
                                        <input 
                                            type="text" 
                                            name='license'
                                            required
                                            value={formdata.license}
                                            onChange={changeValue}
                                            placeholder="Your answer..." />
                                        </div>
                                        <div className="check__single__inp">
                                        <label htmlFor="#">Is the number plate included in the sale?</label>
                                        <div className="info__yes">
                                            <div className="new">
                                            <div className="form-group">
                                                <input
                                                    id="html"
                                                    type="checkbox"
                                                    checked={plateIncluded}
                                                    onChange={()=>{setplateIncluded(!plateIncluded)}}
                                                     />
                                                <label htmlFor="html">Yes</label>
                                            </div>
                                            <div className="form-group">
                                                <input 
                                                    type="checkbox" 
                                                    id="css"
                                                    checked={!plateIncluded}
                                                    onChange={()=>{setplateIncluded(!plateIncluded)}}
                                                    />
                                                <label htmlFor="css">no</label>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    {/* </form> */}
                                    <div className="check__single__inp">
                                        <label htmlFor="#">What is the chassis number/VIN?</label>
                                        <input 
                                            type="text" 
                                            name='chassis'
                                            required
                                            value={formdata.chassis}
                                            onChange={changeValue}
                                            placeholder="Your answer..."
                                             />
                                    </div>
                                    <div className="check__single__inp">
                                        <label htmlFor="#">What is the engine size?</label>
                                        <input 
                                            type="Number"
                                            required 
                                            name='engineSize'
                                            value={formdata.engineSize}
                                            onChange={changeValue}
                                            placeholder="Your answer..."
                                             />
                                    </div>
                                    <div className="check__single__inp">
                                        <label htmlFor="#">What is the engine type?</label>
                                        <input 
                                            type="text"
                                            required 
                                            name='engineType'
                                            value={formdata.engineType}
                                            onChange={changeValue}
                                            placeholder="Your answer..." />
                                    </div>
                                    <div className="check__single__inp">
                                        <label htmlFor="#">What is the transmission?</label>
                                        <input 
                                            type="text"
                                            required
                                            name='transmission'
                                            value={formdata.transmission}
                                            onChange={changeValue} />
                                    </div>
                                    <div className="check__single__inp">
                                        <label htmlFor="#">How many speeds does the gearbox have (NOT including reverse)?</label>
                                        <input 
                                            type="Number"
                                            required
                                            name='speeds'
                                            value={formdata.speeds}
                                            onChange={changeValue}
                                            placeholder="Your answer..."
                                             />
                                    </div>
                                    <div className="check__single__inp">
                                        <label htmlFor="#">Which side does the driver sit?</label>
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
                                                <label htmlFor="html1">Left-hand drive</label>
                                            </div>
                                            <div className="form-group">
                                                <input 
                                                    type="checkbox" 
                                                    id="css2" 
                                                    name='right'
                                                    onChange={changeSide}
                                                    checked={side==='right'?true:false}
                                                    />
                                                <label htmlFor="css2">Right-hand drive</label>
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    name='central'
                                                    type="checkbox"
                                                    id="javascript" 
                                                    onChange={changeSide}
                                                    checked={side==='central'?true:false}
                                                    />
                                                <label htmlFor="javascript">Central seat</label>
                                            </div>
                                            {/* </form> */}
                                        </div>
                                        </div>
                                    </div>
                                    <div className="check__single__inp">
                                        <label htmlFor="#">What is the exterior colour?</label>
                                        <input 
                                            type="text"
                                            required 
                                            name='exteriorColor'
                                            value={formdata.exteriorColor}
                                            placeholder="Your answer..."
                                            onChange={changeValue}
                                            />
                                    </div>
                                    <div className="check__single__inp">
                                        <label htmlFor="#">What is the interior colour?</label>
                                        <input 
                                            type="text"
                                            required
                                            name='interiorColor'
                                            value={formdata.interiorColor}
                                            onChange={changeValue}
                                            placeholder="Your answer..."
                                            />
                                    </div>
                                    <div className="check__info__btn">
                                        <p>Please include official name and code if known</p>
                                        <button type='submit' >NEXT</button>
                                        <button onClick={handleBack} className="back-btn"> BACK </button>
                                    </div>
                                    </div>
                                </div>
                                </form>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Page 3 Condition */}
                    {activeStep === 2 && (
                        <div className='fade-in'>
                            <div className="sell__area">
                                <form onSubmit={submit1} >
                                <div className="sell__wrap">
                                    <div className="owner__information__box">
                                    <div className="owner__inp--wrap">
                                        <div className="owner__information__title">
                                        <h6>Exterior Condition</h6>
                                        </div>
                                        {/* <form action="#"> */}
                                        <div className="check__single__inp">
                                            <label htmlFor="#">To your knowledge, has the car ever suffered from any bodywork damage?</label>
                                            <input 
                                                type="text"
                                                required
                                                name='bodyworkDamage'
                                                value={formdata.bodyworkDamage}
                                                onChange={changeValue}
                                                placeholder="Your answer..."
                                            />
                                            <span>If yes, please describe the damage and any repairs</span>
                                        </div>
                                        <div className="check__single__inp">
                                            <label htmlFor="#">What is the condition of the paintwork?</label>
                                            <div className="info__yes">
                                            <div className="new">
                                                <div className="form-group">
                                                <input
                                                    type="checkbox" 
                                                    id="Excellent"
                                                    name='excellent'
                                                    onChange={changePaintwork}
                                                    checked={paintwork==='excellent'?true:false} />
                                                <label htmlFor="Excellent">Excellent</label>
                                                </div>
                                                <div className="form-group">
                                                <input 
                                                    type="checkbox" 
                                                    id="Good"
                                                    name='good'
                                                    onChange={changePaintwork}
                                                    checked={paintwork==='good'?true:false} />
                                                <label htmlFor="Good">Good</label>
                                                </div>
                                                <div className="form-group">
                                                <input 
                                                    type="checkbox" 
                                                    id="Fair"
                                                    name='fair'
                                                    onChange={changePaintwork}
                                                    checked={paintwork==='fair'?true:false} />
                                                <label htmlFor="Fair">Fair</label>
                                                </div>
                                                <div className="form-group">
                                                <input 
                                                    type="checkbox" 
                                                    id="Poor"
                                                    name='poor'
                                                    onChange={changePaintwork}
                                                    checked={paintwork==='poor'?true:false} />
                                                <label htmlFor="Poor">Poor</label>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        {/* </form> */}
                                        <div className="check__single__inp">
                                        <label htmlFor="#">Has the car ever been repainted?</label>
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
                                                <label htmlFor="Excellent1">Yes some or all of it has definitely been
                                                    resprayed)</label>
                                                </div>
                                                <div className="form-group">
                                                <input 
                                                    type="checkbox" 
                                                    id="Good2"
                                                    name='no'
                                                    onChange={changeRepainted}
                                                    checked={repainted==='no'?true:false} />
                                                <label htmlFor="Good2">No (paintwork is believed to be original)</label>
                                                </div>
                                                <div className="form-group">
                                                <input 
                                                    type="checkbox" 
                                                    id="Fair1"
                                                    name="I don't know"
                                                    onChange={changeRepainted}
                                                    checked={repainted==="I don't know"?true:false} />
                                                <label htmlFor="Fair1">I don't know</label>
                                                </div>
                                            {/* </form> */}
                                            </div>
                                        </div>
                                        </div>
                                        <div className="check__single__inp">
                                        <label htmlFor="#">Please provide details of any paintwork damage or blemishes (even if very minor)</label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g. stone chips, scratches, scuUs, etc."
                                            name='paintworkDamage'
                                            value={formdata.paintworkDamage}
                                            onChange={changeValue}
                                             />
                                        <span>Please tell us about any repainted sections if specified</span>
                                        </div>
                                        <div className="Interior__title">
                                        <h5>Interior Condition</h5>
                                        </div>
                                        <div className="check__single__inp">
                                        <label htmlFor="#">What is the condition of the interior trim?</label>
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
                                                <label htmlFor="html1">Excellent</label>
                                                </div>
                                                <div className="form-group">
                                                <input 
                                                    type="checkbox" 
                                                    id="css2"
                                                    name='good'
                                                    onChange={changeInteriorTrim}
                                                    checked={interiorTrim==='good'?true:false} />
                                                <label htmlFor="css2">Good</label>
                                                </div>
                                                <div className="form-group">
                                                <input 
                                                    type="checkbox" 
                                                    id="javascript"
                                                    name='fair'
                                                    onChange={changeInteriorTrim}
                                                    checked={interiorTrim==='fair'?true:false} />
                                                <label htmlFor="javascript">Fair</label>
                                                </div>
                                                <div className="form-group">
                                                <input 
                                                    type="checkbox" 
                                                    id="javascript5"
                                                    name='poor'
                                                    onChange={changeInteriorTrim}
                                                    checked={interiorTrim==='poor'?true:false} />
                                                <label htmlFor="javascript5">Poor</label>
                                                </div>
                                            {/* </form> */}
                                            </div>
                                        </div>
                                        </div>
                                        <div className="check__single__inp">
                                        <label htmlFor="#">Has the car ever been reupholstered?</label>
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
                                                <label htmlFor="Excellent17">Yes (it has definitely been re-trimmed)</label>
                                                </div>
                                                <div className="form-group">
                                                <input 
                                                    type="checkbox" 
                                                    id="Good27"
                                                    name='no'
                                                    onChange={changereupholstered}
                                                    checked={reupholstered==='no'?true:false} />
                                                <label htmlFor="Good27">No (upholstery is believed to be original)</label>
                                                </div>
                                                <div className="form-group">
                                                <input 
                                                    type="checkbox" 
                                                    id="Fair17"
                                                    name="I don't know"
                                                    onChange={changereupholstered}
                                                    checked={reupholstered==="I don't know"?true:false} />
                                                <label htmlFor="Fair17">I don't know</label>
                                                </div>
                                            {/* </form> */}
                                            </div>
                                        </div>
                                        </div>
                                        <div className="check__single__inp textfild">
                                        <label htmlFor="#">Please provide details of any wear, discolouration on or
                                            damage to the seats or other trim (even if very
                                            minor)</label>
                                        <textarea id cols={30} rows={10} 
                                            required
                                            placeholder="Your description..."
                                            name='discolouration'
                                            value={formdata.discolouration}
                                            onChange={changeValue}
                                            />
                                        </div>
                                        <div className="check__single__inp textfild">
                                        <label htmlFor="#">Please provide details of any faults with controls, 
                                            switches, or other electrics</label>
                                        <textarea id cols={30} rows={10} 
                                            required 
                                            placeholder="Your description..." 
                                            defaultValue={""}
                                            name='faults'
                                            value={formdata.faults}
                                            onChange={changeValue} />
                                        <span>Please include any warning lights on the dashboard</span>
                                        </div>
                                        <div className="owner__information__title">
                                        <h6>Mechanical Condition</h6>
                                        </div>
                                        <div className="check__single__inp">
                                        <label htmlFor="#">If the car has a cambelt, when does the history show it was last replaced?</label>
                                        <input 
                                            type="text" 
                                            placeholder="Your answer..." 
                                            required
                                            name='cambelt'
                                            value={formdata.cambelt}
                                            onChange={changeValue} />
                                        </div>
                                        <div className="check__single__inp">
                                        <label htmlFor="#">What is the condition / age / tread depth of the tyres?</label>
                                        <input 
                                            type="text" 
                                            placeholder="Your answer..." 
                                            required 
                                            name='conditionOfTyres'
                                            value={formdata.conditionOfTyres}
                                            onChange={changeValue}    
                                            />
                                        </div>
                                        <div className="check__single__inp">
                                        <label htmlFor="#">Are there any major parts of the car that are not original?</label>
                                        <input 
                                            type="text" 
                                            placeholder="Your answer..." 
                                            required
                                            name='notOriginalParts'
                                            value={formdata.notOriginalParts}
                                            onChange={changeValue} />
                                        </div>
                                        <div className="check__single__inp">
                                        <label htmlFor="#">Has the car been modified or customised in any way?</label>
                                        <input 
                                            type="text" 
                                            placeholder="Your answer..." 
                                            required
                                            name='customised'
                                            value={formdata.customised}
                                            onChange={changeValue} />
                                        </div>
                                        <div className="check__single__inp">
                                        <label htmlFor="#">Are there any known faults that you have not detailed in the information above?</label>
                                        <input 
                                            type="text" 
                                            placeholder="Your answer..." 
                                            required
                                            name='knownFaults'
                                            value={formdata.knownFaults}
                                            onChange={changeValue} />
                                        </div>
                                        <div className="check__info__btn">
                                        <button type='submit' >NEXT</button>
                                        <button onClick={handleBack} className="back-btn">back</button>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </form>
                                </div>
                        </div>
                    )}
                    {/* Page 4 Ownership */}
                    {activeStep === 3 && (
                        <div className='fade-in'>
                            <div className="sell__area">
                                <form onSubmit={submitform} encType="multipart/form-data">
                                <div className="sell__wrap">
                                    <div className="owner__information__box">
                                    <div className="owner__inp--wrap">
                                        <div className="owner__information__title">
                                        <h6>Ownership Information</h6>
                                        </div>
                                        {/* <form action="#"> */}
                                        <div className="check__single__inp">
                                            <label htmlFor="#">What was the date of first registration for the car?</label>
                                            <input 
                                                type="text" 
                                                placeholder="Your answer..."
                                                required
                                                name='p3q1'
                                                value={formdata.p3q1}
                                                onChange={changeValue}
                                                />
                                        </div>
                                        <div className="check__single__inp">
                                            <label htmlFor="#">What was the date and mileage at the last service,
                                            and which company did the work?</label>
                                            <input 
                                                type="text" 
                                                placeholder="Your answer..."
                                                required
                                                name='p3q2'
                                                value={formdata.p3q2}
                                                onChange={changeValue} />
                                        </div>
                                        <div className="check__single__inp textfild">
                                            <label htmlFor="#">What work was carried out at the last service?</label>
                                            <textarea 
                                                cols={30} 
                                                rows={10} 
                                                placeholder="Your description..." 
                                                required
                                                name='p3q3'
                                                value={formdata.p3q3}
                                                onChange={changeValue}
                                            />
                                        </div>
                                        <div className="check__single__inp">
                                            <label htmlFor="#">When were the two previous services before this
                                            and what worked was carried out during those?</label>
                                            <textarea 
                                                cols={30} 
                                                rows={10} 
                                                placeholder="Your description..."
                                                required
                                                name='p3q4'
                                                value={formdata.p3q4}
                                                onChange={changeValue}
                                            />
                                        </div>
                                        <div className="check__single__inp">
                                            <label htmlFor="#">What other maintenance has been carried out
                                            during your ownership?</label>
                                            <textarea 
                                                cols={30} 
                                                rows={10} 
                                                placeholder="Your description..." 
                                                required
                                                name='p3q5'
                                                value={formdata.p3q5}
                                                onChange={changeValue} />
                                        </div>
                                        <div className="check__single__inp">
                                            <label htmlFor="#">How many years have you owned the car?</label>
                                            <input 
                                                type="text" 
                                                placeholder="Your answer..."
                                                required
                                                name='p3q6'
                                                value={formdata.p3q6}
                                                onChange={changeValue} />
                                        </div>
                                        <div className="check__single__inp">
                                            <label htmlFor="#">Has the vehicle been involved in an accident (if yes, please provide details)?</label>
                                            <input 
                                                type="text" 
                                                placeholder="Your answer..."
                                                required
                                                name='p3q7'
                                                value={formdata.p3q7}
                                                onChange={changeValue} />
                                        </div>
                                        <div className="check__single__inp">
                                            <label htmlFor="#">When was the last MOT / eSafety / TUV or equivalent technical inspection?</label>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. TUV / CT/ Revision?"
                                                required
                                                name='p3q8'
                                                value={formdata.p3q8}
                                                onChange={changeValue} />
                                        </div>
                                        <div className="check__single__inp">
                                            <label htmlFor="#">Were there any advisories or warnings about thecar’s condition from this inspection?</label>
                                            <input 
                                                type="text" 
                                                placeholder="Your answer..."
                                                required
                                                name='p3q9'
                                                value={formdata.p3q9}
                                                onChange={changeValue} />
                                        </div>
                                        <div className="check__single__inp">
                                            <label htmlFor="#">How much service history paperwork accompanies the vehicle to evidence the maintenance?</label>
                                            <input 
                                                type="text" 
                                                placeholder="Your answer..."
                                                required
                                                name='p3q10'
                                                value={formdata.p3q10}
                                                onChange={changeValue} />
                                        </div>
                                        <div className="owner__information__title final">
                                            <h6>Final Details</h6>
                                        </div>
                                        <div className="check__single__inp">
                                            <label htmlFor="#">What handbooks / literature / service history /
                                            tools are included with the car?</label>
                                            <textarea 
                                                cols={30} 
                                                rows={10} 
                                                placeholder="e.g. stamped service book"
                                                required
                                                name='p3q11'
                                                value={formdata.p3q11}
                                                onChange={changeValue} />
                                            <span>e.g. Does it have an original stamped service book (if supplied
                                            when new)? How much service history paperwork accompanies
                                            the vehicle to evidence the maintenance?</span>
                                        </div>
                                        <div className="check__single__inp">
                                            <label htmlFor="#">If there is anything else you would like to tell us,
                                            please add it here</label>
                                            <textarea 
                                                cols={30} 
                                                rows={10} 
                                                placeholder="Your description..."
                                                required
                                                name='p3q12'
                                                value={formdata.p3q12}
                                                onChange={changeValue} />
                                            <span>If you can include it, a list of dates and mileages of all services
                                            on record is o_en well received by bidders</span>
                                        </div>
                                        <div className="check__single__inp">
                                            <label htmlFor="#">In summary, what would you say are the best things
                                            about the car?</label>
                                            <textarea 
                                                cols={30}
                                                rows={10}
                                                placeholder="Your description..." 
                                                required
                                                name='p3q13'
                                                value={formdata.p3q13}
                                                onChange={changeValue} />
                                            <span>Do you have images to attach of the vehicle?(Please only include some representative photos, at this stage we do not need a full set)</span>
                                        </div>
                                        <div className="uplod__btn">
                                            <label className="form-label" htmlFor="customFile"><img src="assets/img/sell-page/uplod.png" alt="" />Drag files here, or click to upload.</label>
                                            <input 
                                                type="file" 
                                                id="customFile" 
                                                onChange={handleImage}
                                                accept="image/*" 
                                                multiple
                                                />
                                        </div>
                                        {imageURLs.map((url, index) => (
                                            <img style={{height:"2.5rem",margin:"3px 3px",borderRadius:"9px"}} key={index} src={url} alt={`Image ${index + 1}`} />
                                        ))}
                                        <div className="check__info__btn">
                                        <button type='submit' disabled={loading} style={{position:'relative'}} >
                                            {loading?<div class="loader-5-colored center" ><span></span></div>:'Submit'}
                                        </button>
                                        <button onClick={handleBack} className="back-btn">back</button>
                                        </div>
                                        {/* </form> */}
                                    </div>
                                    </div>
                                </div>
                                </form>
                                </div>

                        </div>
                    )}
                    {/* {allStepsCompleted() ? (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </React.Fragment>
                        ) : (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                            Step {activeStep + 1}
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleNext} sx={{ mr: 1 }}>
                                Next
                            </Button>
                            {activeStep !== steps.length &&
                                (completed[activeStep] ? (
                                <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                    Step {activeStep + 1} already completed
                                </Typography>
                                ) : (
                                <Button onClick={handleComplete}>
                                    {completedSteps() === totalSteps() - 1
                                    ? 'Finish'
                                    : 'Complete Step'}
                                </Button>
                                ))}
                            </Box>
                        </React.Fragment>
                        )} */}
                </div>
            </Box>
                    </div>
                    :
                    <div style={{height:'40rem',color:'red',display:'flex',justifyContent:'center',alignItems:'center'}} >
                        This link has been used or expired!
                    </div>
                }
            </>
            :
            <>
                <div style={{height:'40rem',display:'flex',justifyContent:'center',alignItems:'center'}} >
                    <div className='loader-5-colored' ></div>
                </div>
            </>
        }
    </>
  )
}
export default ConsignmentPage