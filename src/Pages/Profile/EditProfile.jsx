import { Field, Form, Formik } from 'formik';
import axios from '../../axios'
import React, { useContext } from 'react'
import toast from 'react-hot-toast'
import Modal from 'react-modal'
import FieldError from '../../components/FieldError';
import * as yup from 'yup';
import { AuthContext } from '../../context/authContext'

function EditProfile({ modalIsOpen, closeModal, getRoute, profileDetails }) {


    const { userDetails } = useContext(AuthContext)

    console.log('userDetails', userDetails)


    const validationSchema = yup.object({
        name: yup.string()
            .required('This Field is required'),
        email: yup.string()
            .required('This Field is required'),
        mobile_no: yup.string()
            .required("Phone number is required")
            .matches(/^[9]\d{9}$/, "Invalid phone number"),
    });

    const handleFormSubmit = async (values, actions) => {
        try {
            // Make an Axios POST request
            const response = await axios.put('/users/update-profile/' + userDetails?._id, values);

            if (response.data.success) {
                toast.success('Editing Successfull')
                getRoute()
                closeModal()
            }

            // Handle the response as needed (e.g., redirect, show a success message)
        } catch (error) {
            // Handle errors (e.g., show an error message)
            console.error('Error submitting form:', error);
            toast.error(error.response.data.msg)
        }
    };


    return (
        <Modal
            ariaHideApp={false}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Add Category Modal"
            overlayClassName="Overlay"
            className="Modal rounded-md p-5 max-w-xl max-h-screen overflow-auto"
        >
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Change Profile Details
                </h2>
            </div>

            <div className="mt-10 ">

                <Formik
                    enableReinitialize
                    initialValues={{
                        name: profileDetails?.name,
                        email: profileDetails?.email,
                        mobile_no: profileDetails?.mobile_no,
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
                                    First Name
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
                                    Mobile Number
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

                            <div className='col-span-full mt-4 flex gap-3'>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                >
                                    Submit
                                </button>
                                <button
                                    onClick={() => {
                                        closeModal()
                                    }}
                                    type="button"
                                    className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
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

export default EditProfile