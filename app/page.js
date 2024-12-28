
import Layout from "./components/Layout"
import Products from "./components/Products"
// import { useState } from "react";

export default async function Home({ productsData }) {

  // const [productsInfo, setProductsInfo] = useState([]) // array of objects
  // console.log(productsInfo);

  // Load all the products info when page is loaded (Client side fetch)
  // useEffect(() => {
  //   fetch("/api/products")
  //     .then(res => res.json())
  //     .then(json => setProductsInfo(json))
  // }, [])

  // Fetching the data using Server (faster load time)
  let data = await fetch('http://localhost:3000/api/products')
  let products = await data.json()
  // console.log(products);

  return (
    <Layout>
      <Products products={products} />
    </Layout>
  );
}