import React from 'react';
import Products from '../components/Paypal/products'
import Payment from '../components/Paypal/payment'

function Donation () {
  return (
    <div>
      
      <p>This is the donation page</p>
      <Payment />
      <p>This is products</p>
      {/* <Products /> */}
    </div>
  );
}

export default Donation;
