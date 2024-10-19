"use client"
import React, { useState } from 'react'
import Product from './product'

const HomePageContent = ({ products }) => {

    const [phrase, setPhrase] = useState("")

    // Search box Logic
    // let products;
    if (phrase) {
        products = products.filter(p => p.name.toLowerCase().includes(phrase))
        // products = products.filter(p => p.name.toLowerCase().includes(phrase))
        // console.log(products);
    }
    // else products = products; // no need as products = products in server side rendering

    // Remove duplicates using Set and converting back to array
    let categories = [...new Set(products.map(item => item.category))]
    // console.log(categories);

    return (
        <div>
            <div className="w-4/5 md:w-[600px]  mx-auto">
                <input value={phrase} onChange={e => setPhrase(e.target.value)} className="bg-gray-800 w-full rounded-full px-4 py-2 outline-none" type="text" placeholder="Search" />
            </div>
            {/* Display Products w.r.t categories */}
            {categories.map(categoryName => {
                return (
                    // Remove the categoy if there is no product while searching
                    products.find(p => p.category == categoryName) && <div key={categoryName} className="my-5">
                        <h2 className="text-xl capitalize mb-3">{categoryName}</h2>

                        <div className="bg-gray-800 flex hid-scroll">
                            {products.filter(item => item.category == categoryName).map(productInfo => {
                                return <Product key={productInfo._id} {...productInfo} />
                            })}
                        </div>
                    </div>
                )
            })}
        </div >
    )
}

export default HomePageContent;