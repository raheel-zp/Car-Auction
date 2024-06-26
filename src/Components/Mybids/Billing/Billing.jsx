import React from "react";

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "./CheckoutForm ";

// const stripePromise = loadStripe('pk_test_51MhEx6AM71JH6IUZM4ASCja7727EGnXEVXJmM9KgdItoHLG1F4AKNQ5UKysdZNzv5i18dRwd5hsc1i5UKX0tTIW300Rfq0Ddgka'); //Afaq
// const stripePromise = loadStripe('pk_test_51Nd9MNI9LzOT8DtJGQedgVwFqApahDTZsrwwVQNmJGjtpjs3nge6htGXKYBAfdDdRQDypaMOu7P8V2WjDRB3zdC300iT0oFdvba'); // Sam
//live
const stripePromise = loadStripe('pk_live_51Nd9MNI9LzOT8DtJI655ECf5SZJPdDlPqX7LEBjAtdNJRksr1WBoPDNBIanaYc1jaLucFQatjBBDZLRleoELBrfH008O48We95a'); // Sam

function Billing(){
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default Billing;