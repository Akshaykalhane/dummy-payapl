import { useState } from 'react'
import './App.css';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios"



function App() {
  const options = {
    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
  }

  const onCreateOrder = async () => {
    // const user = UserDB.getUser();
    // if(!user || !user._id){
    //   router.push("/signin?path=%Fpricing")
    //   return
    // }
    console.log('on order create')
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/paypal-payment/createOrder`,
        // "url",
        {userId:"Yi9SMYHuqFZTfEhDhAPxX6NU4gE3"},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response);
      return response.data.orderId;
    } catch (error) {
      console.log(error);
    }
  };

  const onError = (err) => {
    // navigate('/cancel-payment')
    console.log(err)
    console.log("on error")
    // router.push("/pricing/paypal-payment-acknowledgement?status=cancel")
  };


  const onApprove = async (data) => {
    console.log('on approve')
    try {
      if (!data?.orderID) throw new Error("Invalid order ID.");
      {/* dummy url will be goes here */}
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/paypal-payment/capturepayment/${data.orderID}?userId=Yi9SMYHuqFZTfEhDhAPxX6NU4gE3`
      );
      // `${process.env.SERVER_BASE_URL}/paypal-payment/capturepayment/${data.orderID}?userId=${user._id}`

      const result = response;
      console.log(response)

      //   navigate('/complete-payment')
      // if(response.data.status=="success"){
      //   router.push("/pricing/paypal-payment-acknowledgement?status=success")
      // }

    } catch (error) {
      console.log(error)
    }
  };

  const onCancel=async(data)=>{
    // router.push("/pricing/paypal-payment-acknowledgement?status=cancel")
    console.log("on cancel")
    console.log(data)
  }

  return (
    <div className='container'>
      <h2>Paypal payment</h2>
      <PayPalScriptProvider options={options} >
        <PayPalButtons 
        createOrder={onCreateOrder}
        onApprove={onApprove}
        onCancel={onCancel}
        onError={onError}
        fundingSource='paypal'
        />
      </PayPalScriptProvider>
    </div>
  )
}

export default App
