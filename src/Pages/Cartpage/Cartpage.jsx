import toast from 'react-hot-toast'
import axios from '../../axios'
import React, { useEffect, useState } from 'react'
import CheckoutPage from '../Checkout/CheckoutPage'

function Cartpage() {

    const [cartData, setCartData] = useState([])

    const getAllCart = async (values, actions) => {
        try {
            let result = await axios.get('/carts/my-cart', {
                params: {
                    search: "",
                    page: 1,
                    limit: 50
                }
            })

            if (result.data.success) {
                setCartData(result.data.data)

            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR.response.data.msg)
        }
    }

    console.log(cartData)

    const removeFromCart = async (id, quantity) => {
        try {
            let result = await axios.put('/carts/add-remove-item', {
                cartitem: id,
                quantity: -quantity
            })

            if (result.data.success) {
                getAllCart()
                // setSelectedVariantData(result?.data?.data?.variant[0] ? result?.data?.data?.variant[0] : [])
            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR?.response?.data?.msg)
        }
    }
    const addItem = async (id) => {
        try {
            let result = await axios.put('/carts/add-remove-item', {
                cartitem: id,
                quantity: +1
            })

            if (result.data.success) {
                getAllCart()
                // setSelectedVariantData(result?.data?.data?.variant[0] ? result?.data?.data?.variant[0] : [])
            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR?.response?.data?.msg)
        }
    }
    const removeItem = async (id) => {
        try {
            let result = await axios.put('/carts/add-remove-item', {
                cartitem: id,
                quantity: -1
            })

            if (result.data.success) {
                getAllCart()
                // setSelectedVariantData(result?.data?.data?.variant[0] ? result?.data?.data?.variant[0] : [])
            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR?.response?.data?.msg)
        }
    }


    useEffect(() => {
        getAllCart()
    }, [])

    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const closeAddModal = () => {
        setIsAddModalOpen(false)
    }
    const openAddModal = () => {
        setIsAddModalOpen(true)
    }

    return (
        <section className="py-12 ">

            {
                isAddModalOpen &&

                <CheckoutPage closeModal={closeAddModal} modalIsOpen={isAddModalOpen}
                    getRoute={getAllCart} cartData={cartData}
                />

            }


            <div className="max-w-7xl px-4 mx-auto">
                <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-5">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Cart Page</h1>
                </div>

                <div className="flex md:flex-row flex-col gap-5 mt-5">
                    <div className="pointer-events-auto  w-full">
                        <div className="px-4 py-6 sm:pl-0">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">

                                {cartData?.cartItems?.length === 0 ?
                                    <div>No Data</div>
                                    :
                                    cartData?.cartItems?.map((value, index) => (
                                        <li className="flex py-6" key={index}>
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden border border-gray-200">
                                                <img src={`${import.meta.env.VITE_APP_BASE_URI}${value?.item?.images[0]}`} alt="Cartpage" className="h-full w-full object-cover object-center" />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                                        <h3 className=' text-xl capitalize'>
                                                            {value?.item?.name}
                                                        </h3>
                                                        <div className=" flex items-center">
                                                            <div className=" rounded-sm flex gap-3 items-center bg-white dark:bg-gray-800">
                                                                <button disabled={
                                                                    value?.quantity === 1
                                                                } onClick={() => {
                                                                    removeItem(value?._id)
                                                                }} className="p-2 cursor-pointer border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-white hover:text-red-400 hover:border-red-400  transition duration-200">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewbox="0 0 16 17" fill="none">
                                                                        <path d="M12.6667 7.49988H3.33341C3.1566 7.49988 2.98703 7.57012 2.86201 7.69514C2.73699 7.82016 2.66675 7.98973 2.66675 8.16654C2.66675 8.34336 2.73699 8.51292 2.86201 8.63795C2.98703 8.76297 3.1566 8.83321 3.33341 8.83321H12.6667C12.8436 8.83321 13.0131 8.76297 13.1382 8.63795C13.2632 8.51292 13.3334 8.34336 13.3334 8.16654C13.3334 7.98973 13.2632 7.82016 13.1382 7.69514C13.0131 7.57012 12.8436 7.49988 12.6667 7.49988Z" fill="currentColor"></path>
                                                                    </svg>
                                                                </button>

                                                                <span className="text-gray-800 dark:text-white text-sm"> {value?.quantity} </span>

                                                                <button onClick={() => {
                                                                    addItem(value?._id)
                                                                }} className="p-2 cursor-pointer border dark:border-gray-800 border-gray-200 text-gray-600 dark:text-white hover:text-green-600 hover:border-green-600 transition duration-200">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewbox="0 0 16 17" fill="none">
                                                                        <path d="M12.6667 7.4998H8.66675V3.4998C8.66675 3.32299 8.59651 3.15342 8.47149 3.02839C8.34646 2.90337 8.17689 2.83313 8.00008 2.83313C7.82327 2.83313 7.6537 2.90337 7.52868 3.02839C7.40365 3.15342 7.33341 3.32299 7.33341 3.4998V7.4998H3.33341C3.1566 7.4998 2.98703 7.57003 2.86201 7.69506C2.73699 7.82008 2.66675 7.98965 2.66675 8.16646C2.66675 8.34327 2.73699 8.51284 2.86201 8.63787C2.98703 8.76289 3.1566 8.83313 3.33341 8.83313H7.33341V12.8331C7.33341 13.0099 7.40365 13.1795 7.52868 13.3045C7.6537 13.4296 7.82327 13.4998 8.00008 13.4998C8.17689 13.4998 8.34646 13.4296 8.47149 13.3045C8.59651 13.1795 8.66675 13.0099 8.66675 12.8331V8.83313H12.6667C12.8436 8.83313 13.0131 8.76289 13.1382 8.63787C13.2632 8.51284 13.3334 8.34327 13.3334 8.16646C13.3334 7.98965 13.2632 7.82008 13.1382 7.69506C13.0131 7.57003 12.8436 7.4998 12.6667 7.4998Z" fill="currentColor"></path>
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-1 items-center mt-2 justify-between text-sm">
                                                    <p className="">Rs. {value?.item?.price}</p>

                                                    <div className="flex">
                                                        <button type="button" onClick={() => {
                                                            removeFromCart(value?._id, value?.quantity)
                                                        }} className="font-medium text-red-600 hover:text-red-500">Remove</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }

                            </ul>
                        </div>
                    </div>

                    {
                        cartData?.cartItems?.length > 0 &&
                        <div className="w-full md:w-1/2 px-4 py">
                            <div className="bg-white dark:bg-gray-900  rounded shadow-md p-6">
                                <h2 className="text-gray-700 dark:text-white text-lg mb-4 font-semibold">Bill</h2>
                                <div className="pb-4 border-gray-200 flex flex-wrap gap    -2 justify-between items-center mb-4">
                                    <p className="dark:text-white text-gray-600">Subtotal</p>
                                    <p className="dark:text-white text-gray-800">Rs. {cartData?.cart?.total}</p>
                                </div>
                                <div className="pb-4  border-gray-200 flex flex-wrap gap-2 justify-between items-center mb-4">
                                    <p className="dark:text-white text-gray-600">Discount</p>
                                    <p className="dark:text-white text-gray-800">Rs. {cartData?.cart?.discount}</p>
                                </div>
                                <div className="flex items-center justify-between flex-wrap gap-2 mb-4 mt-10">
                                    <label className="dark:text-white text-gray-700 font-semibold text-lg">Grand Total</label>
                                    <label className="dark:text-white text-gray-700 font-semibold text-lg">Rs. {cartData?.cart?.grand_total}</label>
                                </div>
                                <button onClick={() => {
                                    openAddModal()
                                }} className="bg-green-500 mt-4 py-3 px-4 rounded-sm text-white text-center hover:bg-green-600 transition duration-200 w-full inline-block">Checkout</button>
                            </div>
                        </div>
                    }
                </div>
            </div>


        </section >
    )
}

export default Cartpage