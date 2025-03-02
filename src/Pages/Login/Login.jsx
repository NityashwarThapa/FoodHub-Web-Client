import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axios';
import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { Field, Form, Formik } from 'formik';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/authContext';

function Login() {

  const navigate = useNavigate()
  const { isAuthenticated, setIsAuthenticated, setUserDetails } = useContext(AuthContext)


  // Function to handle form submission
  const handleFormSubmit = async (values, actions) => {

    try {
      // Make an Axios POST request
      const response = await axios.post('users/login', values);

      if (response.data.success) {
        localStorage.setItem('_hw_userDetails', JSON.stringify(response.data.data))
        localStorage.setItem('_hw_token', response.data.data.token)
        setUserDetails(response.data.data);
        toast.success('Login Successfull')

        setTimeout(() => {
          setIsAuthenticated(true)
          if (response.data.data.role.includes('admin') || response.data.data.role.includes('super-admin')) {
            navigate('/dashboard')
          } else navigate('/')
        }, 400)
      }

    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Error submitting form:', error);
      toast.error(error?.response?.data?.msg ? error?.response?.data?.msg : "Failed To Login")
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  })


  return (
    <div className="grid min-h-screen bg-center bg-cover  w-full items-center  px-6 py-12 lg:px-8">
      <div
        className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >

      </div>
      <div className='max-w-sm w-full mx-auto'>
        <img
          className="mx-auto w-auto my-10"
          src="/logo.png"
          alt="login img"
        />
        <a href='/' className='font-semibold text-gray-600 flex items-center gap-3'>
          <FaArrowLeft /> Home
        </a>
        <div className="mx-auto w-full ">
          <h2 className="mt-10 text-left text-2xl font-bold leading-9 tracking-tight ">
            Log in
          </h2>
        </div>

        <div className="mt-10 mx-auto w-full ">

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={async (values, actions) => {
              handleFormSubmit(values, actions);
            }}
          >
            {(props) => (
              <Form>
                <div>
                  <label
                    id="email"
                    className="block w-full text-sm font-medium leading-6 "
                  >
                    Email Address
                  </label>
                  <Field
                    required
                    name="email"
                    value={props.values.email}
                    aria-labelledby="email"
                    type="email"
                    className="block mt-2 w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="mt-6  w-full">
                  <label
                    htmlFor="pass"
                    className="block w-full text-sm font-medium leading-6 "
                  >
                    Password
                  </label>
                  <div className="relative flex items-center justify-center">
                    <Field
                      required
                      name="password"
                      value={props.values.password}
                      id="pass"
                      type={`${"password"}`}
                      className="block mt-2 w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    />

                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    role="button"
                    className="flex w-full mr-auto  justify-center rounded-md bg-green-800 text-white px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                  >
                    Sign in
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not Registered Yet?
            <Link to="/signup" className="font-semibold ml-3 leading-6 text-gray-600 hover:text-gray-500">
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login