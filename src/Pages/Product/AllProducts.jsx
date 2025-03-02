import axios from '../../axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaFilter } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function AllProducts() {
    const [showFilter, setShowFilter] = useState()
    const [priceFilter, setPriceFilter] = useState("")
    const [dateFilter, setDateFilter] = useState("")

    const navigate = useNavigate()
    const location = useLocation();
    const { category, search } = location.state || {};

    const [categoryData, setCategoryData] = useState([])
    const [productData, setProductData] = useState([])

    const getAllCategory = async () => {
        try {
            let result = await axios.get('/category', {
                params: {
                    search: "",
                    page: 1,
                    size: 50
                }
            })

            if (result.data.success) {
                setCategoryData(result?.data?.data ? result?.data?.data : [])
            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR?.response?.data?.msg)
        }
    }

    const getAllProducts = async () => {
        try {
            let result = await axios.get('/products', {
                params: {
                    search: search,
                    page: 1,
                    size: 50,
                    price: priceFilter,
                    category: category,
                    date: dateFilter
                }
            })

            if (result.data.success) {
                setProductData(result?.data?.data ? result?.data?.data : [])
            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR?.response?.data?.msg)
        }
    }

    useEffect(() => {
        getAllCategory()
    }, [])

    useEffect(() => {
        getAllProducts()
    }, [category, priceFilter, dateFilter, search])

    const clearFilter = () => {
        navigate('/product', { state: { category: "", search: "" } });
    }

    return (
        <div className="bg-white dark:bg-black">
            <div>
                {
                    showFilter &&
                    <div className="relative z-40 lg:hidden" role="dialog" aria-modal="true">

                        <div className="fixed inset-0 bg-black bg-opacity-25"></div>

                        <div className="fixed inset-0 z-50 flex" style={{
                            zIndex: "99999"
                        }}>
                            <div className="relative p-5 ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white dark:bg-black py-4 pb-12 shadow-xl">
                                <div className="flex items-center justify-between mb-5">
                                    <h2 className="text-lg font-medium dark:text-white text-gray-900">Filters</h2>
                                    <button onClick={() => {
                                        setShowFilter(false)
                                    }} type="button" className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white dark:bg-gray-800 p-2 dark:text-white text-gray-400">
                                        <span className="sr-only">Close menu</span>
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* <!-- Filters --> */}
                                <div className="lg:hidden block">
                                    <h3 className="sr-only">Categories</h3>
                                    <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium dark:text-white text-gray-900">
                                        <li role='button' onClick={() => {
                                            setDateFilter(1)
                                        }} className={`${dateFilter === 1 ? "bg-gray-50 dark:bg-gray-800 " : ""} p-2`}>
                                            Oldest
                                        </li>
                                        <li onClick={() => {
                                            setDateFilter(-1)
                                        }} role='button' className={`${dateFilter === -1 ? "bg-gray-50 dark:bg-gray-800" : ""} p-2`} >
                                            Newest
                                        </li>
                                        <li role='button' onClick={() => {
                                            setPriceFilter(1)
                                        }} className={`${priceFilter === 1 ? "bg-gray-50 dark:bg-gray-800" : ""} p-2`}>
                                            Price: Low to High
                                        </li>
                                        <li role='button' onClick={() => {
                                            setPriceFilter(-1)
                                        }} className={`${priceFilter === -1 ? "bg-gray-50 dark:bg-gray-800" : ""} p-2`}>
                                            Price: High to Low
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
                        <h1 className="text-4xl font-bold tracking-tight dark:text-white text-gray-900 px-5 dark:bg">Products</h1>
                        <button className='lg:hidden block' onClick={() => {
                            setShowFilter(true)
                        }}><FaFilter /></button>
                    </div>



                    <ul role="list" className=" hidden lg:flex flex-wrap justify-end gap-3 border-b border-gray-200 p-4 text-sm font-medium dark:text-white text-gray-900">
                        <p className='p-2'>Sort By:</p>
                        <li role='button' onClick={() => {
                            setDateFilter(1)
                        }} className={`${dateFilter === 1 ? "bg-gray-50 dark:bg-gray-800" : ""} p-2`}>
                            Oldest
                        </li>
                        <li onClick={() => {
                            setDateFilter(-1)
                        }} role='button' className={`${dateFilter === -1 ? "bg-gray-50 dark:bg-gray-800" : ""} p-2`} >
                            Newest
                        </li>
                        <li role='button' onClick={() => {
                            setPriceFilter(1)
                        }} className={`${priceFilter === 1 ? "bg-gray-50 dark:bg-gray-800" : ""} p-2`}>
                            Price: Low to High
                        </li>
                        <li role='button' onClick={() => {
                            setPriceFilter(-1)
                        }} className={`${priceFilter === -1 ? "bg-gray-50 dark:bg-gray-800" : ""} p-2`}>
                            Price: High to Low
                        </li>
                    </ul>

                    <div className="mx-auto max-w-2xl px-4 lg:max-w-7xl mt-2">

                        {
                            search &&
                            <div className='flex gap-4 mt-6'>
                                <label>Showing search results for : "{search}"</label>
                                <button className='bg-red-100 px-3 rounded-full text-sm' onClick={() => {
                                    clearFilter()
                                }}>Clear</button>
                            </div>
                        }


                        <div className="my-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {productData.map((product, index) => (
                                <Link to={`/product/${product.sku}`} key={index} className="group relative" role='button'>
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                        <img
                                            src={`${import.meta.env.VITE_APP_BASE_URI}${product.images[0]}`}
                                            alt={product.imageAlt}
                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                        />
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <div>
                                            <h3 className="text-sm dark:text-white text-gray-700 capitalize">
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product.name}
                                            </h3>
                                        </div>
                                        <p className="text-sm font-medium dark:text-white text-gray-900">Rs. {product.price}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div >
    )
}

export default AllProducts