"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { ProductsContext } from './SelectedProductsContext.js'

const Footer = () => {
    const path = usePathname() // current path of website (/ or /cart)
    // console.log({ path });

    const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);

    // Get Selected Items from Local Storage
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const cartData = JSON.parse(storedCart);
            setSelectedProducts(cartData);
        }
    }, [])

    return (
        <footer className='text-gray-400 text-sm sticky bottom-0 flex justify-center gap-6 py-3 bg-slate-900 '>
            {/* <Link href="/" className={(path == "/" ? "text-white" : "") + 'flex flex-col justify-center items-center'}> */}
            <Link href="/" className={`${path === '/' ? 'text-emerald-300  font-bold' : ''} flex flex-col justify-center items-center`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
            </Link>
            <Link href="/cart" className={`${path === '/cart' ? 'text-emerald-300  font-bold' : ''} relative flex flex-col justify-center items-center`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                <span className='absolute -top-1.5 -right-3 text-emerald-300 font-bold'>{selectedProducts.length} </span>
            </Link>
        </footer >
    )
}

export default Footer