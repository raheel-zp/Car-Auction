import React,{useState,useContext} from 'react'
import { userloggedIn } from '../../Context/Context';

function MydetailsForm({userData,getLoggedin}) {
    const {url} = useContext(userloggedIn);
    const [loading,setLoading] = useState(false);
    const [successMsg1,setsuccessMsg1] = useState(false);
    const [successMsg2,setsuccessMsg2] = useState(false);
    const [disableSubmit,setdisableSubmit] = useState(false);
    const [formdata,setformdata] = useState({
        username:userData.username,
        email:userData.email
    });
    // const [username,setusername] = useState(userData.username);
    // const [email,setemail] = useState(userData.email);
    //   function changeName(event){
    //     const {name,value} = event.target;
    //     setusername(value);
    //     setdisableSubmit(true);
    //     const checkName = async (username)=>{
    //         const res = await fetch("/checkUniqueName",{
    //             method: "POST",
    //             headers: {
    //             "Content-Type" : "application/json"
    //             },
    //             body: JSON.stringify({
    //             username: username,
    //             }),
    //         });
    //     }
    //     checkName(value);
    //   }
    // function debounce(func, delay) {
    //     let timerId;
    //     return function (...args) {
    //       if (timerId) {
    //         clearTimeout(timerId);
    //       }
    //       timerId = setTimeout(() => {
    //         func.apply(this, args);
    //       }, delay);
    //     };
    // }      
    // function changeName(event){
    //     const {name,value} = event.target;
    //     setusername(value);
    //     setdisableSubmit(true);
    // }      
    // const checkName = async (username)=>{
    //     const res = await fetch("/checkUniqueName",{
    //       method: "POST",
    //       headers: {
    //         "Content-Type" : "application/json"
    //       },
    //       body: JSON.stringify({
    //         username: username,
    //       }),
    //     });
    // }      
    // const debouncedCheckName = debounce(checkName, 500);      
    // function onNameChange(event) {
    //     const { value } = event.target;
    //     setusername(value);
    //     setdisableSubmit(true);
    //     debouncedCheckName(value);
    // }
    // function changeEmail(event){
    //     const {name,value} = event.target;
    //     setemail(value);
    // }
    function changeValue(event){
        const {name,value} = event.target;
        setformdata({
          ...formdata,
          [name]: value,
        });
      }
    const submitform = async (event)=>{
        setLoading(true);
        event.preventDefault();
        const res = await fetch(`${url}mydetails/${userData._id}`,{
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(formdata),
        });
        const data = await res.json();
        setLoading(false);
        if(data.usernameChanged==='usernameChanged'){
            // console.log("username Changed");
            getLoggedin();
            setsuccessMsg1(true);
            setTimeout(() => {
                setsuccessMsg1(false);
            }, 3000);
        }
        if(data.emailChanged==='emailChanged'){
            // console.log("Email Changed");
            getLoggedin();
            setsuccessMsg2(true);
            setTimeout(() => {
                setsuccessMsg2(false);
            }, 3000);
        }
        setLoading(false);
        setTimeout(() => {
        }, 3000);
    }
  return (
    <>
      <form onSubmit={submitform}>
        <div className="detial__fx">
        <div className="setials__single">
            <label htmlFor="#">Display Name</label>
            <input 
                type="text"
                placeholder={userData.username}
                name='username'
                onChange={changeValue}
                value={formdata.username}
                />
            <span><i className="fas fa-check-circle" /></span>
        </div>
        <div className="setials__single">
            <label htmlFor="#">Email Address</label>
            <input 
                type="email" 
                placeholder={userData.email}
                name='email'
                onChange={changeValue}
                value={formdata.email}
                disabled
                />            
        </div>
        </div>
        <div className="mydetails-msg">
            { successMsg1 && <div>Username changed successfully!</div>}
            { successMsg2 && <div>Email changed successfully!</div>}
        </div>
        <button style={{marginTop:'10px'}} type={loading?'':'submit'} className="update-btn">{loading?'Updating...':'Update'}</button>
    </form>
    </>
  )
}

export default MydetailsForm
