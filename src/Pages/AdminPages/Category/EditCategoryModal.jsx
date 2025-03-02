import axios from '../../../axios'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Modal from 'react-modal'

function EditCategoryModal({ modalIsOpen, closeModal, getRoute, categoryData }) {

  const [image, setImage] = useState()

  const editCategory = async (values, actions) => {
    try {

      // let formdata = new FormData

      // if (image) {
      //   formdata.append('image', image)
      // }


      // for (let value in values) {
      //   formdata.append(value, values[value])
      // }


      let result = await axios.put('/category/' + categoryData?._id, values)

      if (result.data.success) {
        toast.success('Category Edited Successfully')
        closeModal()
        getRoute()
      } else toast.error('Failed')
    } catch (ERR) {
      console.log(ERR)
      toast.error(ERR.response.data.msg)
    }
  }


  return (
    <Modal
      ariaHideApp={false}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Category Modal"
      overlayClassName="Overlay"
      className="Modal rounded-md p-5 md:w-1/4 max-h-screen overflow-auto"
    >
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">Edit Category</h1>

      <div className='mt-4'>
        <Formik
          initialValues={{
            name: categoryData.name,
          }}
          onSubmit={async (values, actions) => {
            editCategory(values, actions);
          }}
        >
          {(props) => (
            <Form>
              <div>
                <label
                  id="name"
                  className="block w-full text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <Field
                  required
                  name="name"
                  value={props.values.name}
                  aria-labelledby="name"
                  type="name"
                  className="block mt-2 w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </div>

              {/* <div className='mt-4'>
                <label
                  id="image"
                  className="block w-full text-sm font-medium leading-6 text-gray-900"
                >
                  Image
                </label>
                <input
                  onChange={(e) => {
                    setImage(e.target.files[0])
                  }}
                  required
                  type="file"
                  className="block mt-2 w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />

                {
                  categoryData.image &&
                  <div>
                    <label
                      id="image"
                      className="block w-full text-sm font-medium leading-6 text-gray-900"
                    >
                      Previous Image
                    </label>

                    <img
                      src={`${import.meta.env.VITE_APP_BASE_URI}${categoryData?.image}`}
                    />
                  </div>
                }
              </div> */}

              <div className="mt-8 flex gap-4">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                  Edit
                </button>
                <button
                  onClick={closeModal}
                  type="button"
                  className="flex w-full justify-center rounded-md bg-gray-200 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-800 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                  Close
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

    </Modal>
  )
}

export default EditCategoryModal