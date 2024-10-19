"use client"
import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout';
import { ProductsContext } from '../components/SelectedProductsContext';


const Cart = () => {
    const { selectedProducts, setSelectedProducts } = useContext(ProductsContext) // contains IDs only
    const [productsInfo, setProductsInfo] = useState([]) // array of objects
    // console.log(selectedProducts);

    // Get Selected Products using their ID
    const data = productsInfo.filter(product => selectedProducts.includes(product._id)) // unique values
    // console.log(data);

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState('')
    const [city, setCity] = useState("")

    // Depends on SelectedProducts
    useEffect(() => {
        const uniqIds = [... new Set(selectedProducts)] // remove duplicate Ids
        // console.log(uniqIds);

        fetch("/api/products?ids=" + uniqIds.join(","))// create a string with all array elements
            .then(res => res.json())
            .then(json => setProductsInfo(json))
    }, [selectedProducts])

    // Sum the prices of all products in the cart
    let subtotal = 0, total = 0;
    let deliveryCharges = 5;

    if (selectedProducts.length != 0) { // OR selectedProducts?.length
        for (let id of selectedProducts) {
            let product = productsInfo.find(p => p._id == id)
            // console.log(product);
            if (product != null) {// sometimes it is undefined for unselected products
                subtotal = subtotal + product.price;
            }
        }
        total = subtotal + deliveryCharges;
    }
    const increaseQty = (id) => {
        setSelectedProducts(prev => {
            let updatedCart = [...prev, id] // add new ProductId to the Cart
            localStorage.setItem('cart', JSON.stringify(updatedCart))
            return updatedCart;
        })
    }
    const decreaseQty = (id) => {
        const position = selectedProducts.indexOf(id)
        if (position != -1) {
            const newSelectedProducts = selectedProducts.filter((value, idx) => idx != position)
            // console.log(newSelectedProducts);
            setSelectedProducts(newSelectedProducts)
            localStorage.setItem('cart', JSON.stringify(newSelectedProducts))
        }
    }
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

            {/* Cart is empty */}
            {!selectedProducts.length && <div>
                <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center space-y-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-24 w-24 mx-auto text-emerald-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 3h18l-2 13H5L3 3z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 21h14a2 2 0 002-2H3a2 2 0 002 2z"
                            />
                        </svg>
                        <h2 className="text-3xl font-semibold">Your cart is empty!</h2>
                        <p className="text-gray-400">
                            It looks like you haven’t added anything to your cart yet.
                        </p>
                        <button
                            className="bg-emerald-500 text-gray-900 px-4 py-2 rounded-md font-semibold hover:bg-emerald-600 transition-colors duration-300"
                            onClick={() => window.location.href = '/'} >
                            Go to Shop
                        </button>
                    </div>
                </div>
            </div>}

            {/* Cart not empty */}
            {selectedProducts.length && <h2 className='text-2xl font-bold my-6'>Your Cart</h2>}
            {selectedProducts.length && data.map(product =>
            (<div className="product m-5 w-full my-8 px-3 flex" key={product._id}>
                <div className="bg-gray-800 flex items-center justify-center p-2 rounded-lg">
                    <img className="w-[120px] h-[100px] object-contain" src={product.picture} />
                </div>
                <div className='flex justify-between w-full mx-5'>
                    <div>
                        <p className="text-xl ">{product.name}</p>
                        <p className="text-sm leading-5 text-gray-400">{product.description}</p>
                        {/* <button className='py-0.5 w-full my-1 px-3 text-sm rounded-xl mt-5'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#cc0c39"><path d="M272-96q-50.94 0-85.97-35.03T151-217v-489H89v-121h250v-61h281v61h252v121h-62v489q0 50.94-35.03 85.97T689-96H272Zm75-188.5h98v-355h-98v355Zm169 0h98v-355h-98v355Z" /></svg></button> */}
                    </div>
                    <div className='flex flex-col items-end justify-between py-5'>
                        <span className="text-lg">${product.price}</span>
                        <div>
                            <button onClick={() => { decreaseQty(product._id) }} className='bg-gray-800 py-0.5 my-1 px-3 rounded-xl'>-</button>
                            <span className='mx-2'>Qty: {selectedProducts.filter(id => id == product._id).length}</span>
                            <button onClick={() => { increaseQty(product._id) }} className='bg-emerald-600 py-0.5 my-1 px-3 rounded-xl'>+</button>
                        </div>
                    </div>
                </div>
            </div >
            ))}
            {selectedProducts.length && <div>
                <div className="total mt-14 text-lg mx-auto w-3/4 hidden">
                    <div className='flex my-2'>
                        <h2 className='grow text-gray-400'>Subtotal:</h2>
                        <h2>${subtotal}</h2>
                    </div>
                    <div className='flex my-2'>
                        <h2 className='grow text-gray-400'>Delivery:</h2>
                        <h2>${deliveryCharges}</h2>
                    </div>
                    <div className='flex my-1 border-t border-dashed border-emerald-300 py-3'>
                        <h2 className='grow text-gray-400'>Total:</h2>
                        <h2>${total}</h2>
                    </div>
                    <div className=' text-center'><button className='bg-yellow-400 w-[300px] mx-auto my-8 text-black rounded-md py-1 px-2'>Pay ${total}</button></div>
                </div>

                {/* Form */}
                <div className='mt-4 w-[320px] mx-auto'>
                    <form onSubmit={e => handleCheckout(e)}>
                        <h2 className='text-xl text-center mb-2 capitalize'>Please Enter Your Address</h2>
                        <div><input name="name" value={name} onChange={e => setName(e.target.value)} className='bg-gray-800 w-full my-1 px-3 py-1.5 rounded-md outline-none' type="text" placeholder='Full Name' id="" /></div>
                        <div><input name="email" value={email} onChange={e => setEmail(e.target.value)} className='bg-gray-800 w-full my-1 px-3 py-1.5 rounded-md outline-none' type="text" placeholder='Email Address' id="" /></div>
                        <div><input name="address" value={address} onChange={e => setAddress(e.target.value)} className='bg-gray-800 w-full my-1 px-3 py-1.5 rounded-md outline-none' type="text" placeholder='Street Name' id="" /></div>
                        <div><input name="city" value={city} onChange={e => setCity(e.target.value)} className='bg-gray-800 w-full my-1 px-3 py-1.5 rounded-md outline-none' type="text" placeholder='City' id="" /></div>
                        {/* <input type="hidden" name="products" value={JSON.stringify(selectedProducts)} /> */}
                        {/* <input type="hidden" name="products" value={selectedProducts.join(',')} /> */}
                        <button type="submit" role="link" className='bg-yellow-400 w-full mx-auto mt-3 text-black rounded-md py-1 px-2'>Checkout</button>
                    </form>
                </div>
            </div>
            }
        </Layout>
    )
}

export default Cart