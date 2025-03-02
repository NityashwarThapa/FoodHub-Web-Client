import axios from '../../../axios'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import toast from 'react-hot-toast'
import Modal from 'react-modal'
import * as yup from 'yup';
import FieldError from '../../../components/FieldError'

function AddUser({ modalIsOpen, closeModal, getRoute }) {

    const handleFormSubmit = async (values, actions) => {
        try {
            let result = await axios.post('/users/register', values)

            if (result.data.success) {
                toast.success('User Added Successfully')
                closeModal()
                getRoute()
            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR.response.data.msg)
        }
    }

    const validationSchema = yup.object({
        name: yup.string()
            .required('This Field is required'),

        email: yup.string()
            .required('This Field is required'),
        mobile_no: yup.string()
            .required("Phone number is required")
            .matches(/^[9]\d{9}$/, "Invalid phone number"),
    });

    return (
        <Modal
            ariaHideApp={false}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Add User Modal"
            overlayClassName="Overlay"
            className="Modal rounded-md p-5 md:w-1/4 max-h-screen overflow-auto"
        >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Add User</h1>

            <div className='mt-4'>
                <Formik
                    enableReinitialize
                    initialValues={{
                        name: "",
                        email: "",
                        mobile_no: "",
                        password: "password",
                        // role:'super-admin',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        handleFormSubmit(values, actions);
                    }}
                >
                    {(props) => (
                        <Form className='gap-3 grid grid-cols-2'>
                            <div className=''>
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Full Name
                                </label>
                                <div className="mt-2">
                                    <Field
                                        id="name"
                                        name="name"
                                        autoComplete="name"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <FieldError message={props.touched.name && props.errors.name} />

                            </div>

                            <div>
                                <label htmlFor="mobile_no" className="block text-sm font-medium leading-6 text-gray-900">
                                    Contact
                                </label>
                                <div className="mt-2">
                                    <Field
                                        id="mobile_no"
                                        name="mobile_no"
                                        autoComplete="mobile_no"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <FieldError message={props.touched.mobile_no && props.errors.mobile_no} />

                            </div>


                            <div className='col-span-full text-center opacity-15'>
                                ------------
                            </div>

                            <div className='col-span-full -mt-3'>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <Field
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <FieldError message={props.touched.email && props.errors.email} />

                            </div>

                            <div className='col-span-full mt-4'>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5  text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                >
                                    Register
                                </button>
                            </div>


                        </Form>
                    )}
                </Formik>
            </div>

        </Modal>
    )
}

export default AddUser