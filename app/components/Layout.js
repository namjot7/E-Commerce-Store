"use client"
import React, { useEffect, useContext, useState } from 'react'
import Footer from './Footer'
import { ProductsContext } from './SelectedProductsContext'

const Layout = ({ children }) => {

    const { setSelectedProducts } = useContext(ProductsContext)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if (window.location.href.includes("success")) {
            setSelectedProducts([])// reset the cart to zero
            localStorage.setItem('cart', JSON.stringify([])) // to keep the empty cart consitent even after refreshing
            setSuccess(true) // to show the "SUCCESS" message

            // handleWebhook();
        }
    }, [])

    // const handleWebhook = async () => {
    //     console.log("Webhook handler called");

    //     // POST data for webhook
    //     const data2 = await fetch('/api/webhook', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             name: "Data posted to webhook",
    //             // date: "6 october"
    //         }),
    //     });
    //     console.log(data2);

    //     if (data2.headers.get('content-length') > 0) {
    //         const response2 = await data2.json();
    //         console.log(response2);
    //     } else {
    //         console.log("No content in the response");
    //     }
    // }

    return (
        <>
            <main className='p-4 text-white bg-black min-h-[100vh] overflow-x-hidden'>
                {success && <div className="absolute top-5 right-5 text-center bg-green-500 p-5 py-2 rounded-lg text-xl ">
                    Order Successful!
                </div>}
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout