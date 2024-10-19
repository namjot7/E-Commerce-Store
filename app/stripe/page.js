"use client"
import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
// require('dotenv').config()

const stripePromise = loadStripe("pk_test_51Q59tgDVQbLGpRpMcVv4zFLXjH8KYSOpcZPGuI0oj9MqntstilgCiYg9mh6TVRqU5SAJoJ3pcOVwPcm8xdXyKdXY00wSVf6cZ5");

export default function PreviewPage() {

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        console.log(query);
        console.log("hi welcome");

        if (query.get('success')) {
            console.log('Order placed! You will receive an email confirmation.');
        }

        if (query.get('canceled')) {
            console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
    }, []);


    return (
        <>
            <main className='bg-gray-700 h-[100vh]' >
                <form action="/api/checkout" method="POST" target='_blank' onSubmit={e => handleForm()}>
                    <button className='bg-gray-900 text-white py-1 m-5 px-4 rounded-lg' type="submit" role="link">
                        Checkout
                    </button>
                </form>
                {/* <stripe-pricing-table pricing-table-id="prctbl_1Q22xEIDkB2yKc2nNQL8qUlq"
                    publishable-key="pk_test_51PkATEIDkB2yKc2nbPj2BwZlHmJytBzRisiy2G7JdQIvZBa6Dq4qqTKq9GObdGd2OXOyHVA2xvdQmxKzomkqTAwe007UJPDSAV">
                </stripe-pricing-table> */}
            </main>
            {/* <script async src="https://js.stripe.com/v3/pricing-table.js"></script> */}

        </>

    );
}