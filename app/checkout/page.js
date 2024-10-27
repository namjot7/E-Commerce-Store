"use client"
import React, { useContext, useState } from 'react'
import Layout from '../components/Layout'
import { ProductsContext } from '../components/SelectedProductsContext'

const Page = () => {
    const { selectedProducts, setSelectedProducts } = useContext(ProductsContext)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState('')
    const [city, setCity] = useState("")


    const handleCheckout = async (e) => {
        e.preventDefault();

        // Collect the form data
        const formData = {
            name,
            email,
            address,
            city,
            productsIds: selectedProducts
        };

        // POST Data to API
        const data = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const response = await data.json();
        // console.log(response);

        // Redirect the user to the Stripe checkout page
        if (response.url) window.location.href = response.url
        else console.error('Error creating checkout session:', response.message);
    }
    return (
        <Layout>
            <div className='h-[100vh] flex items-center justify-center flex-wrap mt-4  mx-auto'>
                <form onSubmit={e => handleCheckout(e)} className='w-[320px]'>
                    <h2 className='text-xl text-center mb-2 capitalize'>Please Enter Your Address</h2>
                    <div><input name="name" value={name} onChange={e => setName(e.target.value)} className='bg-gray-800 w-full my-1 px-3 py-1.5 rounded-md outline-none' type="text" placeholder='Full Name' id="" /></div>
                    <div><input name="email" value={email} onChange={e => setEmail(e.target.value)} className='bg-gray-800 w-full my-1 px-3 py-1.5 rounded-md outline-none' type="text" placeholder='Email Address' id="" /></div>
                    <div><input name="address" value={address} onChange={e => setAddress(e.target.value)} className='bg-gray-800 w-full my-1 px-3 py-1.5 rounded-md outline-none' type="text" placeholder='Street Name' id="" /></div>
                    <div><input name="city" value={city} onChange={e => setCity(e.target.value)} className='bg-gray-800 w-full my-1 px-3 py-1.5 rounded-md outline-none' type="text" placeholder='City' id="" /></div>
                    {/* <input type="hidden" name="products" value={JSON.stringify(selectedProducts)} /> */}
                    {/* <input type="hidden" name="products" value={selectedProducts.join(',')} /> */}
                    <button type="submit" role="link" className='bg-yellow-400 hover:bg-yellow-500 w-full mx-auto mt-3 text-black rounded-md py-1 px-2'>Checkout</button>
                </form>
            </div>
        </Layout>
    )
}

export default Page