import React, { useState,useContext } from "react";
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';
// import MenuItem from '@mui/material/MenuItem';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
import { userloggedIn } from '../../Context/Context';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CheckoutForm () {
    const {url,userData,getLoggedin} = useContext(userloggedIn);
    //   const [stripe1, setStripe1] = useState(null);
    const stripe = useStripe();
    const elements = useElements();

    const [cardNumber, setCardNumber] = useState("");
    const [cardHolder, setCardHolder] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [focus, setFocus] = useState("");
    const [phone, setPhone] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [postCode, setPostCode] = useState("");
    const [loading,setLoading] = useState(false);
    
    const [openSuccess,setOpenSuccess] = useState(false);
    const [openFailed,setOpenFailed] = useState(false);
    const [openIncompleteError,setOpenIncompleteError] = useState(false);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "number") {
          setCardNumber(value);
        } else if (name === "name") {
          setCardHolder(value);
        } else if (name === "expiry") {
          setExpiry(value);
        } else if (name === "cvc") {
          setCvc(value);
        } else if (name === "phone") {
          setPhone(value);
        } else if (name === "address1") {
          setAddress1(value);
        } else if (name === "address2") {
          setAddress2(value);
        } else if (name === "city") {
          setCity(value);
        } else if (name === "state") {
          setState(value);
        } else if (name === "country") {
          setCountry(value);
        } else if (name === "postCode") {
          setPostCode(value);
        }
    };
    
    const handleCardElementChange = (event) => {
      // const cardElement = elements.getElement(CardElement);
      // console.log(CardElement);      
      // const cardNumberElement = elements.getElement('cardNumber');
      // console.log(cardNumberElement);
      // const cardElement = elements.getElement(CardElement);
      // console.log(cardElement.cardNumber);
      // console.log(cardNumber);
      // console.log(expiry);
      // const cardNumber = cardElement?.cardNumber;
      // const cardHolder = cardElement?.cardName;
      // const cardExpiry = cardElement?.cardExpiry;
      // const cardCvc = cardElement?.cardCvc;
  
      // setCardNumber(cardNumber?.value || '');
      // setCardHolder(cardHolder?.value || '');
      // setExpiry(cardExpiry?.value || '');
      // setCvc(cardCvc?.value || '');
      // setFocus(event?.focus || '');
  
      // Rest of your code...
    }; 

    const handleSubmit = async (event) => {
      setLoading(true);
      event.preventDefault();      
      try {
        if(phone === '' || address1==='' || address2==='' || city==='' || country==='' || postCode===''){
          setOpenIncompleteError(true);
          setLoading(false);
          setTimeout(() => {
            setOpenIncompleteError(false);
          },10000);
          return;
        }
        const cardElement = elements.getElement(CardElement);    
        const { paymentMethod, error } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });
    
        if (error) {
          console.error('Error creating payment method:', error);
        } else {
          console.log('Payment Method:', paymentMethod);
          // Perform further actions with the paymentMethod, such as sending it to the server
          const res = await fetch(`${url}save-card-info/${userData._id}`,{
            method: "POST",
            headers: {
              "Content-Type" : "application/json"
            },
            body: JSON.stringify({
              paymentMethodId : paymentMethod.id,
              cardBrand : paymentMethod.card.brand,
              cardLast4 : paymentMethod.card.last4,
              billingDetails : paymentMethod.billing_details,
              phone, address1, address2, city, country, postCode,
              email: userData.email,
            }),
          });
          const data = await res.json();

          if(data.msg==='success'){
            getLoggedin();
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
    const cardElementOptions = {
        style:{
            base:{
                fontSize:'16px',
                color:'black',
                width: '27.5rem',
            },
            invalid:{
                color:'red'
            }
        }
    }

    return (
    <>
      <Snackbar open={openSuccess} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
          <Alert severity="success" sx={{ width: '100%' }}>
              Card Added successfully!
          </Alert>
      </Snackbar>
      <Snackbar open={openFailed} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
          <Alert severity="error" sx={{ width: '100%' }}>
              Error Adding your Card. Please try later!
          </Alert>
      </Snackbar>
      <Snackbar open={openIncompleteError} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
          <Alert severity="error" sx={{ width: '100%' }}>
            Incomplete Form. Please fill all fields!
          </Alert>
      </Snackbar>
      <div className="detials__clps">
        <div className="accordion" id="accordionExample">
          <div className="detials-item">
            <h2 className="detials-header" id="headingOnet">
              <button
                className="detials-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOnet"
                aria-expanded="false"
                aria-controls="collapseOnet"
              >
                <div className="clps__flx">
                  <div className="clps__flx-tx">
                    <h3>PAYMENT METHOD</h3>
                    { userData.cardInfo?(
                      <><span style={{color:'green',fontWeight:'600'}} >Already added a card.</span></>                    
                    ):(
                      <><span>No card on file.</span></>
                    )
                    }
                  </div>
                  <div className="flx-icn">
                    <p>
                      View
                      <i className="fas fa-caret-right" />
                    </p>
                  </div>
                </div>
              </button>
            </h2>
            <div
              id="collapseOnet"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOnet"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="payment__body">
                  <div className="payment_wrap">
                    <Cards
                      number={cardNumber}
                      name={cardHolder}
                      expiry={expiry}
                      cvc={cvc}
                      focused={focus}
                    />
                    <form onSubmit={handleSubmit}>
                      {/* <div className="payment__input__fx">
                        <div className="payment__single">
                          <label htmlFor="#">Credit or Debit Card</label>
                          <div className="card__inp">
                            <input
                              type="tel"
                              name="number"
                              placeholder="Card number"
                              value={cardNumber}
                              onChange={handleInputChange}
                              onFocus={(e) => setFocus(e.target.name)}
                            />
                          </div>
                        </div>
                        <div className="payment__single">
                          <label htmlFor="#">Card Holder Name</label>
                          <div className="card__inp">
                            <input
                              type="text"
                              name="name"
                              placeholder="Full name on card"
                              value={cardHolder}
                              onChange={handleInputChange}
                              onFocus={(e) => setFocus(e.target.name)}
                            />
                          </div>
                        </div>
                      </div> */}
                      {/* <div className="payment__input__fx">
                        <div className="payment__single">
                          <label htmlFor="#">Expiry</label>
                          <div className="card__inp">
                            <input
                              type="tel"
                              name="expiry"
                              placeholder="MMYY Expiry"
                              value={expiry}
                              onChange={handleInputChange}
                              onFocus={(e) => setFocus(e.target.name)}
                            />
                          </div>
                        </div>
                        <div className="payment__single">
                          <label htmlFor="#">CVC</label>
                          <div className="card__inp">
                            <input
                              type="tel"
                              name="cvc"
                              placeholder="CVC number"
                              value={cvc}
                              onChange={handleInputChange}
                              onFocus={(e) => setFocus(e.target.name)}
                            />
                          </div>
                        </div>
                      </div> */}
                      <div className="payment__input__fx" style={{marginTop:'2rem'}} >
                        <div className="payment__single">
                          <label htmlFor="#">Credit/Debit Card</label>
                          <CardElement options={cardElementOptions} onChange={handleCardElementChange} />
                        </div>
                        <div className="payment__single">
                           
                        </div>
                        <div className="payment__single">
                          <label htmlFor="#">Phone Number</label>
                          <div className="card__inp telephone">
                            <input
                              type="tel"
                              name="phone"
                              placeholder="Phone number"
                              value={phone}
                              onChange={handleInputChange}
                            />
                            <span id="valid-msg" className="hide">
                              Valid
                            </span>
                            <span id="error-msg" className="hide">
                              Invalid number
                            </span>
                          </div>
                        </div>
                        <div className="payment__single">
                          <label htmlFor="#">Billing Address 1</label>
                          <div className="card__inp">
                            <input
                                type="text"
                                name="address1"
                                placeholder="Address line 1"
                                value={address1}
                                onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="payment__single">
                          <label htmlFor="#">Address 2</label>
                          <div className="card__inp">
                            <input
                                type="text"
                                name="address2"
                                placeholder="Address line 2"
                                value={address2}
                                onChange={handleInputChange}     
                            />
                          </div>
                        </div>
                        <div className="payment__single">
                          <label htmlFor="#">Town/City</label>
                          <div className="card__inp">
                            <input
                                type="text"
                                name="city"
                                placeholder="City/town name"
                                value={city}
                                onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="payment__single">
                          <label htmlFor="#">Country/State</label>
                          <div className="card__inp">
                            <input
                                type="text"
                                name="country"
                                placeholder="Country/State name"
                                value={country}
                                onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="payment__single">
                          <label htmlFor="#">Postcode/Zipcode</label>
                          <div className="card__inp">
                            <input
                                type="text"
                                name="postCode"
                                placeholder="Postcode number"
                                value={postCode}
                                onChange={handleInputChange}                                 
                            />
                          </div>
                        </div>
                      </div>                      
                      <div className="card__slct__tx">
                        <p>
                          I authorise The Autosauctions Group Ltd to send
                          instructions to the financial institution that issued
                          my card to take payments from my card account in
                          accordance with the{" "}
                          <a href="/terms-and-conditions" target="_blank" >Terms and Conditions.</a>
                        </p>
                      </div>
                      <div className="card__btn">
                        <button type="submit" disabled={loading} > {loading?'VERIFYING':'ADD CARD'} </button>
                      </div>
                    </form>                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="detials-item">
            <h2 className="detials-header" id="headingTwoc">
              <button
                className="detials-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwoc"
                aria-expanded="false"
                aria-controls="collapseTwoc"
              >
                <div className="clps__flx">
                  <div className="clps__flx-tx">
                    <h3>INVOICE ADDRESS</h3>
                    <span>Same as billing address.</span>
                  </div>
                  <div className="flx-icn">
                    <p>
                      View
                      <i className="fas fa-caret-right" />
                    </p>
                  </div>
                </div>
              </button>
            </h2>
            <div
              id="collapseTwoc"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwoc"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="payment__body">
                  <div className="payment_wrap">
                    <form action="#">
                      <div className="payment__single">
                        <label htmlFor="#">Company Name</label>
                        <div className="card__inp">
                          <input type="text" placeholder />
                        </div>
                      </div>
                      <div className="payment__input__fx">
                        <div className="payment__single">
                          <label htmlFor="#">Address 1</label>
                          <div className="card__inp">
                            <input type="text" placeholder />
                          </div>
                        </div>
                        <div className="payment__single">
                          <label htmlFor="#">Address 2</label>
                          <div className="card__inp">
                            <input type="text" placeholder />
                          </div>
                        </div>
                        <div className="payment__single">
                          <label htmlFor="#">Town/City</label>
                          <div className="card__inp">
                            <input type="text" placeholder />
                          </div>
                        </div>
                        <div className="payment__single">
                          <label htmlFor="#">County/State</label>
                          <div className="card__inp">
                            <input type="text" placeholder />
                          </div>
                        </div>
                        <div className="payment__single">
                          <label htmlFor="#">Postcode/Zipcode</label>
                          <div className="card__inp">
                            <input type="text" placeholder />
                          </div>
                        </div>
                        <div className="payment__single">
                          <label htmlFor="#">Country</label>
                          <div className="card__inp card__slct">
                            <select>
                              <option data-display="Select">Nothing</option>
                              <option value={1}>Some option</option>
                              <option value={2}>Another option</option>
                              <option value={3} disabled>
                                A disabled option
                              </option>
                              <option value={4}>Potato</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="payment__single telephone">
                        <label htmlFor="#">Phone Number</label>
                        <div className="card__inp telephone">
                          <input id="phones" type="tel" />
                          <span id="valid-msg" className="hide">
                            Valid
                          </span>
                          <span id="error-msg" className="hide">
                            Invalid number
                          </span>
                        </div>
                      </div>
                      <div className="payment__single">
                        <label htmlFor="#">VAT Number</label>
                        <div className="card__inp">
                          <input type="text" placeholder />
                        </div>
                      </div>
                      <div className="card__btn card__btn-bg">
                        <a href="/login">save</a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CheckoutForm 
