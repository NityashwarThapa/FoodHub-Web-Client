import React, { useEffect, useState } from 'react'
import axios from '../../../axios'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'


function Orders() {

    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [orderData, setOrderData] = useState([])
    const [selectedOrderData, setSelectedOrderData] = useState([])
    const [totalOrderCount, setTotalOrderCount] = useState(0)
    const [currentOrderPage, setCurrentOrderPage] = useState(1)
    const [totalOrderPage, setTotalOrderPage] = useState(1)
    const [orderPageSize, setOrderPageSize] = useState(10)
    const [keyword, setKeyword] = useState("")
    const [cartkeyword, setCartKeyword] = useState("")

    const closeAddModal = () => {
        setIsAddModalOpen(false)
    }
    const openAddModal = () => {
        setIsAddModalOpen(true)
    }
    const closeEditModal = () => {
        setIsEditModalOpen(false)
    }
    const openEditModal = () => {
        setIsEditModalOpen(true)
    }

    const getAllOrders = async () => {
        try {
            let result = await axios.get('carts/admin/order', {
                params: {
                    email: keyword,
                    cart_no: cartkeyword,
                    page: currentOrderPage,
                    size: orderPageSize
                }
            })

            if (result.data.success) {
                setOrderData(result.data.data)
                setTotalOrderCount(result.data.totalCount)
                setTotalOrderPage(Math.ceil(result.data.totalCount / orderPageSize))

            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR.response.data.msg)
        }
    }

    console.log(orderData)

    useEffect(() => {
        getAllOrders()
    }, [keyword, currentOrderPage, orderPageSize, cartkeyword])

    const removeItem = async (id) => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    let result = await axios.delete('order/' + id)
                    if (result.data.success) {
                        getAllOrders()
                        toast.success('Deleted Successfully')
                    }
                }
            })

        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR.response.data.msg)
        }
    }

    const changeStatus = async (id, status) => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "Do you want to change the status!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    let result = await axios.put('carts/change-status', {
                        cartItem: id,
                        status: status
                    })
                    if (result.data.success) {
                        getAllOrders()
                        toast.success('Deleted Successfully')
                    }
                }
            })

        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR.response.data.msg)
        }
    }


    return (
        <div className='mx-auto w-full px-8 mt-4'>

            {/* {
        isAddModalOpen &&

        <AddOrder closeModal={closeAddModal} modalIsOpen={isAddModalOpen}
          getRoute={getAllOrders}
        />
      }

      {
        isEditModalOpen &&

        <EditOrder closeModal={closeEditModal} modalIsOpen={isEditModalOpen}
          getRoute={getAllOrders} orderData={selectedOrderData}
        />

      } */}

            <div className="flex items-baseline justify-between  pb-6 pt-5">
                <h1 className="text-4xl font-bold tracking-tight dark:text-white text-gray-900 ">Order</h1>
                {/* <button onClick={() => {
          openAddModal()
        }} className='bg-gray-800 p-3 rounded-md text-white font-semibold px-4'>Add Order</button> */}
            </div>
            <div className='flex flex-wrap gap-3'>
                <input className='border p-2 dark:bg-gray-900' type='string' placeholder='Search By Email ' onChange={(e) => {
                    setKeyword(e.target.value)
                    setCurrentOrderPage(1)
                }} />
                <input className='border p-2 dark:bg-gray-900' type='number' placeholder='Search By Cart #' onChange={(e) => {
                    setCartKeyword(e.target.value)
                    setCurrentOrderPage(1)
                }} />
            </div>
            <div className='w-full my-5  bg-white dark:bg-gray-900'>
                <table className="table-auto w-full text-left ">
                    <thead className='font-semibold border-b bg-gray-100 dark:bg-gray-900'>
                        <tr className='opacity-75'>
                            <th className='p-3'>#</th>
                            <th className='p-3'>Customer Name</th>
                            <th className='p-3'>Contact</th>
                            <th className='p-3'>Email</th>
                            <th className='p-3'>Cart #</th>
                            <th className='p-3'>Product</th>
                            <th className='p-3'>Quantity</th>
                            <th className='p-3'>Status</th>
                            <th className='p-3'>Total Price</th>
                            <th className='p-3'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderData &&
                            (orderData.length === 0 ?
                                <tr>
                                    <td className='p-5 font-semibold text-red-800'>No Data</td>
                                </tr>
                                :
                                orderData.map((value, index) => (
                                    <tr key={index} className='border-b'>
                                        <td className='p-3'>{index + 1}</td>
                                        <td className='p-3'>{value?.cart?.user_id?.firstname}</td>
                                        <td className='p-3'>{value?.cart?.user_id?.contact}</td>
                                        <td className='p-3'>{value?.cart?.user_id?.email}</td>
                                        <td className='p-3'>{value?.cart?.cart_no}</td>
                                        <td className='p-3'>{value?.item?.name}</td>
                                        <td className='p-3'>{value?.quantity}</td>
                                        <td className='p-3'>{value?.status}</td>
                                        <td className='p-3'>Rs. {value?.cart?.grand_total}</td>
                                        <td className='p-3 flex gap-2 flex-wrap max-w-fit'>
                                            {/* <button className='bg-red-700 text-white p-2 rounded' onClick={() => {
                                                removeItem(value._id)
                                            }}><FaTrashAlt />
                                            </button> */}
                                            <select onChange={(e) => {
                                                if (e.target.value) {
                                                    changeStatus(value._id, e.target.value)
                                                }
                                            }}>
                                                <option className='' value={''}>
                                                    Change Status
                                                </option>
                                                <option className='' value={'PROCEED'}>
                                                    Processing
                                                </option>
                                                <option className='' value={'DELIVERED'}>
                                                    Delivered
                                                </option>
                                            </select>
                                            {/* <button onClick={() => {
                                                setSelectedOrderData(value)
                                                openEditModal()
                                            }} className='bg-gray-700 text-white p-2 rounded'>
                                                <FaEdit />
                                            </button> */}
                                        </td>
                                    </tr>
                                )))
                        }

                    </tbody>
                </table>
                <div className="flex items-center justify-between border-t border-gray-200 bg-white dark:bg-gray-900 px-4 py-3 sm:px-6">
                    <div className="flex flex-1 justify-between sm:hidden">
                        <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 bg-white dark:bg-gray-900 px-4 py-2 text-sm font-medium dark:text-white text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ">Previous</a>
                        <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white dark:bg-gray-900 px-4 py-2 text-sm font-medium dark:text-white text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">Next</a>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div className='text-sm dark:text-white text-gray-700'>
                            <p className="font-semibold">
                                {totalOrderCount} Total Results
                            </p>
                        </div>
                        <div className='flex flex-wrap items-center gap-3'>
                            <label>Showing</label>
                            <select defaultValue={orderPageSize} className='border rounded py-1' onChange={(e) => {
                                setCurrentOrderPage(1)
                                setOrderPageSize(e.target.value)
                            }}>
                                <option>1</option>
                                <option>5</option>
                                <option>10</option>
                                <option>20</option>
                            </select>
                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                <button
                                    disabled={currentOrderPage === 1}
                                    onClick={() => {
                                        setCurrentOrderPage(currentOrderPage - 1)
                                    }} className="relative inline-flex items-center rounded-l-md px-2 py-2 dark:text-white text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-offset-0">
                                    <span className="sr-only">Previous</span>
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                                    </svg>
                                </button>

                                <a className="relative inline-flex items-center px-4 py-2 text-sm font-semibold dark:text-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-offset-0">
                                    Page {currentOrderPage} of {totalOrderPage}
                                </a>

                                <button
                                    disabled={currentOrderPage === totalOrderPage}
                                    onClick={() => {
                                        setCurrentOrderPage(currentOrderPage + 1)
                                    }} className="relative inline-flex items-center rounded-r-md px-2 py-2 dark:text-white text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-offset-0">
                                    <span className="sr-only">Next</span>
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Orders