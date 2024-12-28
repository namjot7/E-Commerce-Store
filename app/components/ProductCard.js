import React, { useContext } from 'react'
import { ProductsContext } from './SelectedProductsContext'

const Product = ({ _id, name, description, price, picture }) => {
    const { setSelectedProducts } = useContext(ProductsContext)

    // Add to cart
    const addProduct = () => {
        setSelectedProducts(prev => {
            // console.log(prev);
            let updatedCart = [...prev, _id]// add new ProductId to the Cart
            localStorage.setItem('cart', JSON.stringify(updatedCart))
            // console.log(updatedCart);
            return updatedCart; // to update setSelectedProducts
        })
        // OR
        // setSelectedProducts(prev => [...prev, _id])
    }
    return (
        <div className="products w-[170px] m-4 px-3">
            <div className="bg-blue-100 flex items-center justify-center p-4  rounded-lg">
                <img className="w-[150px] h-[130px] object-contain" src={picture} alt={picture} />
            </div>
            <div className='overflow-hidden h-[53px] mt-3'>
                <p className="text-lg ">{name}</p>
                <p className="text-sm leading-5 text-gray-400">{description}</p>
            </div>
            <div className="text-md flex justify-between items-center">
                <span>${price}</span>
                <button onClick={e => addProduct()} className="bg-green-500 px-2 py-1 rounded-lg hover:bg-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                </button>
            </div>
        </div >)
}

export default Product