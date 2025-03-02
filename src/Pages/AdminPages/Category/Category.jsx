import React, { useEffect, useState } from 'react'
import AddCatgeoryModal from './AddCatgeoryModal'
import EditCategoryModal from './EditCategoryModal'
import axios from '../../../axios'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'

function Category() {

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [categoryData, setCategoryData] = useState([])
  const [selectedCategoryData, setSelectedCategoryData] = useState([])

  const [totalCategoryCount, setTotalCategoryCount] = useState(0)
  const [currentCategoryPage, setCurrentCategoryPage] = useState(1)
  const [totalCategoryPage, setTotalCategoryPage] = useState(1)
  const [categoryPageSize, setCategoryPageSize] = useState(10)
  const [keyword, setKeyword] = useState("")


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
          let result = await axios.delete('category/' + id)
          if (result.data.success) {
            getAllCategory()
            toast.success('Deleted Successfully')
          }
        }
      })

    } catch (ERR) {
      console.log(ERR)
      toast.error(ERR.response.data.msg)
    }
  }

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

  const getAllCategory = async (values, actions) => {
    try {
      let result = await axios.get('/category', {
        params: {
          search: keyword,
          page: currentCategoryPage,
          size: categoryPageSize
        }
      })

      if (result.data.success) {
        setCategoryData(result?.data?.data)
        setTotalCategoryCount(result?.data?.totalCount)
        setTotalCategoryPage(Math.ceil(result?.data?.totalCount / categoryPageSize))
      } else toast.error('Failed')
    } catch (ERR) {
      console.log(ERR)
      toast.error(ERR.response.data.msg)
    }
  }

  useEffect(() => {
    getAllCategory()
  }, [keyword, currentCategoryPage, categoryPageSize])

  return (
    <div className='mx-auto  w-full px-8 mt-4'>

      {
        isAddModalOpen &&

        <AddCatgeoryModal closeModal={closeAddModal} modalIsOpen={isAddModalOpen}
          getRoute={getAllCategory}
        />

      }
      {
        isEditModalOpen &&

        <EditCategoryModal closeModal={closeEditModal} modalIsOpen={isEditModalOpen}
          getRoute={getAllCategory} categoryData={selectedCategoryData}
        />

      }

      <div className="flex items-baseline justify-between  pb-6 pt-5">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Category</h1>
        <button onClick={() => {
          openAddModal()
        }} className='bg-green-800 p-3 rounded-md text-white font-semibold px-4'>Add Category</button>
      </div>

      <div>
        <input className='border p-2 dark:bg-gray-900' type='string' placeholder='Search' onChange={(e) => {
          setKeyword(e.target.value)
          setCurrentCategoryPage(1)
        }} />
      </div>

      <div className='w-full my-5  bg-white dark:bg-gray-900'>
        <table className="table-auto w-full text-left ">
          <thead className='font-semibold border-b bg-gray-100 dark:bg-gray-900'>
            <tr className='opacity-75'>
              <th className='p-3'>Name</th>
              <th className='p-3'>Created Date</th>
              {/* <th className='p-3'>Image</th> */}
              <th className='p-3'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              categoryData &&
              (categoryData.length === 0 ?
                <tr>
                  <td className='p-5 font-semibold text-red-800'>No Data</td>
                </tr> :
                categoryData.map((value, index) => (
                  <tr key={index} className='border-b'>
                    <td className='p-3'>{value?.name}</td>
                    <td className='p-3'>{Date(value?.createdAt)}</td>
                    {/* <td className='p-3'>
                      {
                        value?.image ?

                          <img className='h-10' src={`${import.meta.env.VITE_APP_BASE_URI}${value?.image}`} />

                          :
                          <label className='error'>No Image</label>
                      }
                    </td> */}
                    <td className='p-3 flex gap-2 flex-wrap max-w-fit'>
                      <button className='bg-red-700 text-white p-2 rounded' onClick={() => {
                        removeItem(value._id)
                      }}><FaTrashAlt /></button>
                      <button onClick={() => {
                        setSelectedCategoryData(value)
                        openEditModal()
                      }} className='bg-blue-700 text-white p-2 rounded'>
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                )))
            }

          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-gray-200 bg-white dark:bg-gray-900 px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium dark:text-white text-gray-700 hover:bg-gray-50">Previous</a>
            <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium dark:text-white text-gray-700 hover:bg-gray-50">Next</a>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div className='text-sm text-gray-700 dark:text-white'>
              <p className="font-semibold">
                {totalCategoryCount} Total Results
              </p>
            </div>
            <div className='flex flex-wrap items-center gap-3'>
              <label>Showing</label>
              <select defaultValue={categoryPageSize} className='border dark:bg-gray-900 rounded py-1' onChange={(e) => {
                setCurrentCategoryPage(1)
                setCategoryPageSize(e.target.value)
              }}>
                <option>1</option>
                <option>5</option>
                <option>10</option>
                <option>20</option>
              </select>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  disabled={currentCategoryPage === 1}
                  onClick={() => {
                    setCurrentCategoryPage(currentCategoryPage - 1)
                  }} className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 dark:text-white ring-1 ring-inset ring-gray-300 hover:bg-gray-50  focus:outline-offset-0">
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                  </svg>
                </button>

                <a className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 hover:bg-gray-50  focus:outline-offset-0">
                  Page {currentCategoryPage} of {totalCategoryPage}
                </a>

                <button
                  disabled={currentCategoryPage === totalCategoryPage}
                  onClick={() => {
                    setCurrentCategoryPage(currentCategoryPage + 1)
                  }} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 dark:text-white ring-1 ring-inset ring-gray-300 hover:bg-gray-50  focus:outline-offset-0">
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

export default Category