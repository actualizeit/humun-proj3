import React, { Component } from 'react'
import { PayPalButton } from "react-paypal-button-v2";
 
class Payment extends Component {
  render() {
    return (
      <PayPalButton
        amount="0.01"
       
        onSuccess={(details, data) => {
          alert("Transaction completed by " + details.payer.name.given_name);
 
        
        return fetch("/paypal-transaction-complete", {
          method: "post",
          body: JSON.stringify({
            orderId: data.orderID
          })
        });
      }}
      options={{
        clientId: "PRODUCTION_CLIENT_ID"
      }}
      />
    );
  };
};

export default Payment