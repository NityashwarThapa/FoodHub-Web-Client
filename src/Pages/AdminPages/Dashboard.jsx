import { FaBoxes, FaShoppingBag, FaShoppingCart, FaUser } from 'react-icons/fa'
import React, { useEffect, useState } from 'react'
import axios from '../../axios'
import toast from 'react-hot-toast'
function Dashboard() {

  const [totalOrderCount, setTotalOrderCount] = useState(0)
  const [totalUserCount, setTotalUserCount] = useState(0)
  const [totalCategoryCount, setTotalCategoryCount] = useState(0)
  const [totalProductCount, setTotalProductCount] = useState(0)

  const getAllProduct = async () => {
    try {
      let result = await axios.get('/products', {
        params: {
          search: "",
          page: 1,
          size: 10
        }
      })

      if (result.data.success) {
        setTotalProductCount(result.data.totalCount)
      } else toast.error('Failed')
    } catch (ERR) {
      console.log(ERR)
      toast.error(ERR.response.data.msg)
    }
  }

  const getAllCategory = async (values, actions) => {
    try {
      let result = await axios.get('/category', {
        params: {
          search: "",
          page: 1,
          size: 10
        }
      })

      if (result.data.success) {
        setTotalCategoryCount(result?.data?.totalCount)
      } else toast.error('Failed')
    } catch (ERR) {
      console.log(ERR)
      toast.error(ERR.response.data.msg)
    }
  }

  const getAllUser = async () => {
    try {
      let result = await axios.get('/users/all', {
        params: {
          search: "",
          page: 1,
          size: 10
        }
      })

      if (result.data.success) {
        setTotalUserCount(result.data.totalCount)
      } else toast.error('Failed')
    } catch (ERR) {
      console.log(ERR)
      toast.error(ERR.response.data.msg)
    }
  }
  const getAllOrders = async () => {
    try {
      let result = await axios.get('carts/admin/order', {
        params: {
          search: "",
          page: 1,
          size: 10
        }
      })

      if (result.data.success) {
        setTotalOrderCount(result.data.totalCount)
      } else toast.error('Failed')
    } catch (ERR) {
      console.log(ERR)
      toast.error(ERR.response.data.msg)
    }
  }

  useEffect(() => {
    getAllCategory()
    getAllOrders()
    getAllProduct()
    getAllUser()
  }, [])

  return (
    <div className='mx-auto w-full px-8 mt-10 '>

      <h1 className='text-4xl font-semibold'>Admin Dashboard</h1>

      <div className='grid gap-4 lg:grid-cols-4 grid-cols-2 mt-10'>

        <div className='dark:bg-gray-900 dark:shadow-gray-00 shadow p-3 py-10 flex flex-col items-center'>
          <label className='text-4xl mt-3 text-gray-500'>{totalUserCount}</label>
          <label className='font-semibold text-xl flex items-center gap-3'> Total Users</label>
        </div>
        <div className='dark:bg-gray-900 dark:shadow-gray-00 shadow p-3 py-10 flex  flex-col items-center'>
          <label className='text-4xl mt-3 text-gray-500'>{totalProductCount}</label>
          <label className='font-semibold text-xl flex items-center gap-3'> Total Products</label>
        </div>
        <div className='dark:bg-gray-900 dark:shadow-gray-00 shadow p-3 py-10 flex  flex-col items-center'>
          <label className='text-4xl mt-3 text-gray-500'>{totalCategoryCount}</label>
          <label className='font-semibold text-xl flex items-center gap-3'> Total Categories</label>
        </div>
        <div className='dark:bg-gray-900 dark:shadow-gray-00 shadow p-3 py-10  flex flex-col items-center'>
          <label className='text-4xl mt-3 text-gray-500'>{totalOrderCount}</label>
          <label className='font-semibold text-xl flex items-center gap-3'> Total Orders</label>
        </div>
      </div>
    </div>
  )
}

export default Dashboard