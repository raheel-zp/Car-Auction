import React from 'react'
import Box from '@mui/material/Box';

import LinearProgress from '@mui/material/LinearProgress';

function SellForm({changeValue,handleImage,image,formdata,setformdata,loading,setloading,openSell2,setopenSell2,submitform,
  disableSubmit,setdisableSubmit}) {

  return (
    <>
      <form onSubmit={submitform} encType="multipart/form-data" >
        {/* SECTION/SELL 1 */}
        <div style={{display: openSell2?'none':''}} >
          <div className="hero-form-fl" >
            <div className="single-form-item">
              <label htmlFor="#" onClick={()=>{console.log(formdata)}} >First Name</label>
              <div className="single-input">
                <input 
                  type="text" 
                  placeholder="Your First Name"
                  name="firstName" 
                  autoComplete="false" 
                  id="firstName"
                  onChange={changeValue} 
                  value={formdata.firstName}
                  />
              </div>
            </div>
            <div className="single-form-item">
              <label htmlFor="#">Last Name</label>
              <div className="single-input">
                <input 
                  type="text" 
                  placeholder="Last Name"
                  name="lastName" 
                  autoComplete="false"                   
                  id="lastName"
                  onChange={changeValue} 
                  value={formdata.lastName}
                   />
              </div>
            </div>
          </div>
          <div className="single-form-item">
            <label htmlFor="#">Email Address</label>
            <div className="single-input">
              <input 
                type="email" 
                placeholder="Your email address"
                name="email"
                required
                autoComplete="false" 
                id="email"
                onChange={changeValue} 
                value={formdata.email} />
            </div>
          </div>
          <div className="hero-form-fls">
            <div className="single-form-item">
              <label htmlFor="#">Phone Number</label>
              <div className="single-input">
                <input 
                  id="phone" 
                  type="text" 
                  name="phone"
                  placeholder="Your Phone number"
                  onChange={changeValue} 
                  value={formdata.phone}
                />
                <span id="valid-msg" className="hide">Valid</span>
                <span id="error-msg" className="hide">Invalid number</span>
              </div>
            </div>
          </div>
          <div className="single-form-item">
            <div className="single-login-check">
              <label className="containers">I'd like to receive SMS confirmation as my enquiry progresses
                <input type="checkbox" />
                <span className="checkmark" />
              </label>
            </div>
          </div>
          <div className="single-form-item">
            <label htmlFor="#">What would you like to sell?</label>
            <div className="single-input">
              <select>
                <option data-display="Car">Car</option>
                <option value={1}>Other</option>
                {/* <option value={2}>Another option</option>
                <option value={3} disabled>A disabled option</option>
                <option value={4}>Potato</option> */}
              </select>
            </div>
          </div>
          <div className="single-hero-form-btn">
            <div onClick={()=>setopenSell2(true)}>next</div>
          </div>
        </div>
        {/* SECTION/SELL 2 */}     
        <div style={{display:openSell2?'':'none'}}>
          <div className="single-form-item" >
            <label htmlFor="#">Car Make</label>
            <div className="single-input">
              <input 
                type="text" 
                placeholder="e.g. BMW"
                name="carMake" 
                autoComplete="false" 
                required
                id="carMake"
                onChange={changeValue} 
                value={formdata.carMake}
                   />
            </div>
          </div>
          <div className="single-form-item">
            <label htmlFor="#">Car Model</label>
            <div className="single-input">
              <input 
                type="text" 
                placeholder="e.g. M4 Competition"
                name="carModel" 
                autoComplete="false" 
                required
                id="carModel"
                onChange={changeValue} 
                value={formdata.carModel}
                 />
            </div>
          </div>
          <div className="single-form-item">
            <label htmlFor="#">Notes</label>
            <div className="single-input">
              <textarea 
                cols={30} 
                rows={10} 
                placeholder="e.g. Yas Marina Blue (Metallic), 2016, approximately 36,000 miles. White interior multiple additional extras." 
                name="notes" 
                autoComplete="false" 
                required
                id="notes"
                onChange={changeValue} 
                value={formdata.notes}
                />
            </div>
          </div>
          <div className="single-form-item">
            <label htmlFor="#">Would you like to upload a photo? (optional)</label>
            <div className="single-input" >
              <input 
                type="file"
                name='images'
                accept="image/*" 
                multiple
                onChange={handleImage}
                style={{cursor:'pointer'}}
              />
              <a ><i className="far fa-cloud-upload" /></a>
            </div>
          </div>
          <div className="single-hero-form-btn sell-sec--btn">
              <div style={{marginRight: "14px"}} onClick={()=>{setopenSell2(false)}} >Back</div>
              <input disabled={disableSubmit} className='single-hero-form-btn-submit' style={{width:'226px'}} type='submit' value={loading?'Submitting...':'Submit Inquiry'} />
          </div>
        </div>
      </form>
    </>
  )
}

export default SellForm
