import toast from 'react-hot-toast'
import axios from '../../axios'
import React, { useEffect, useState } from 'react'

function Wishlist() {

    const [wishlistData, setWishlistData] = useState([])


    const getAllWishlist = async (values, actions) => {
        try {
            let result = await axios.get('/wishlist', {
                params: {
                    search: "",
                    page: 1,
                    limit: 10
                }
            })

            if (result.data.success) {
                setWishlistData(result.data.data)

            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR.response.data.msg)
        }
    }

    console.log(wishlistData)

    const addToWishlist = async (id) => {
        try {
            let result = await axios.post('/wishlist/' + id)

            if (result.data.success) {
                toast.success('Removed From Wishlist')
                getAllWishlist()
                // setSelectedVariantData(result?.data?.data?.variant[0] ? result?.data?.data?.variant[0] : [])
            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR?.response?.data?.msg)
        }
    }


    useEffect(() => {
        getAllWishlist()
    }, [])


    return (
        <section className="py-12 ">
            <div className="max-w-7xl px-4 mx-auto">
                <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-5">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">Wishlist</h1>
                </div>

                {
                    wishlistData.length === 0 ? <div className='mt-5'> No Data </div> :
                        <div className="flex md:flex-row flex-col gap-5 mt-5">
                            <div className="pointer-events-auto  w-full">
                                <div className="px-4 py-6 sm:pl-0">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-3 ">
                                        {
                                            wishlistData?.map((value, index) => (
                                                <li className="flex py-6 shadow px-8" key={index} >
                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                        <img src={`${import.meta.env.VITE_APP_BASE_URI}${value?.product?.images[0]}`} alt="Wishlist product." className="h-full w-full object-cover object-center" />
                                                    </div>

                                                    <div className="ml-4 flex flex-1 flex-col">
                                                        <div>
                                                            <div className="flex justify-between text-base font-medium text-gray-900 capitalize">
                                                                <h3 >
                                                                    <a href={`product/` + value?.product?.sku}>{value?.product?.name}</a>
                                                                </h3>
                                                            </div>
                                                            <p className="">Rs. {value?.product.price}</p>
                                                        </div>
                                                        <div className="flex flex-1 items-center mt-2 justify-end text-sm">
                                                            <button onClick={() => {
                                                                addToWishlist(value?.product._id)
                                                            }} type="button" className="font-medium text-red-600 hover:text-red-500">Remove</button>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                        {/* <li className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg" alt="Front of satchel with gray canvas body, black straps and handle, drawstring top, and front zipper pouch." className="h-full w-full object-cover object-center" />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    <a href="#">Medium Stuff Satchel</a>
                                                </h3>
                                                <p className="ml-4">$32.00</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">gray</p>
                                        </div>
                                        <div className="flex flex-1 items-center mt-2 justify-end text-sm">
                                            <button type="button" className="font-medium text-red-600 hover:text-red-500">Remove</button>
                                        </div>
                                    </div>
                                </li> */}

                                    </ul>
                                </div>
                            </div>


                        </div>
                }
            </div>
        </section >
    )
}

export default Wishlist