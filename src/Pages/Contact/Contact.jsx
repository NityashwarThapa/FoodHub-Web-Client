import axios from '../../axios'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import toast from 'react-hot-toast'
import { FaChevronDown } from 'react-icons/fa'

function Contact() {

    const handleFormSubmit = async (values, actions) => {
        try {
            let result = await axios.post('/contact', values)

            if (result.data.success) {
                toast.success('Message Submitted Successfully')
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR.response.data.msg)
        }
    }


    return (
        <div className="isolate  px-6 py-24 sm:py-32 lg:px-8">

            <img src='/aboutpagebg.webp' className='fixed object-cover -z-10 top-0 left-0 h-full w-full' />

            <div className="max-w-2xl text-left">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Contact Us</h2>
                <p className="mt-2 text-lg leading-8 text-white">
                    Feel free to ask about anything.
                </p>
            </div>

            <Formik
                enableReinitialize
                initialValues={{
                    firstname: "",
                    lastname: "",
                    email: "",
                    mobile_no: "",
                    message: "",
                }}
                onSubmit={(values, actions) => {
                    handleFormSubmit(values, actions);
                }}>
                {(props) => (

                    <Form className=" mt-16 max-w-xl sm:mt-20">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div>
                                <label htmlFor="firstname" className="block text-sm font-semibold leading-6 text-white">
                                    First name
                                </label>
                                <div className="mt-2.5">
                                    <Field
                                        type="text"
                                        name="firstname"
                                        id="firstname"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="lastname" className="block text-sm font-semibold leading-6 text-white">
                                    Last name
                                </label>
                                <div className="mt-2.5">
                                    <Field
                                        type="text"
                                        name="lastname"
                                        id="lastname"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-white">
                                    Email
                                </label>
                                <div className="mt-2.5">
                                    <Field
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="block w-full rounded-md border-0 px-3.5 py-2  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="mobile_no" className="block text-sm font-semibold leading-6 text-white">
                                    Phone number
                                </label>
                                <div className="relative mt-2.5">
                                    <div className="absolute inset-y-0 left-0 flex items-center">
                                        <label htmlFor="country" className="sr-only">
                                            Country Code
                                        </label>
                                        <p
                                            disabled
                                            id="country"
                                            name="country"
                                            className="h-full rounded-md border-0 bg-transparent bg-none py-2.5 pl-4 pr-1  focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm"
                                        >
                                            +977
                                        </p>
                                    </div>
                                    <Field
                                        type="tel"
                                        name="mobile_no"
                                        id="mobile_no"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 pl-14  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-white">
                                    Message
                                </label>
                                <div className="mt-2.5">
                                    <Field
                                        as="textarea"
                                        name="message"
                                        id="message"
                                        rows={4}
                                        className="block w-full rounded-md border-0 px-3.5 py-2  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="mt-10">
                            <button
                                type="submit"
                                className="block w-full rounded-md bg-gray-800 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                            >
                                Submit
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Contact