import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axios';
import React, { useState } from 'react'
import { FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import FieldError from '../../components/FieldError';
import toast from 'react-hot-toast';
import { PasswordStrengthMeter, SecurityStatus, OTPVerification } from '../../components/Security';

function Signup() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    
    const validationSchema = yup.object({
        name: yup.string()
            .required('This Field is required')
            .min(2, 'Name must be at least 2 characters')
            .matches(/^[a-zA-Z\s\-']+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),

        email: yup.string()
            .email('Please enter a valid email address')
            .required('This Field is required'),
            
        mobile_no: yup.string()
            .required("Phone number is required")
            .matches(/^[9]\d{9}$/, "Invalid phone number"),
            
        password: yup
            .string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/\d/, 'Password must contain at least one number')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
            
        confirmpassword: yup
            .string()
            .required('Confirm Your Password')
            .oneOf([yup.ref('password')], 'Passwords must match')
    });

    // Function to handle form submission
    const handleFormSubmit = async (values, actions) => {
        try {
            const data = { ...values };
            delete data.confirmpassword;

            // Sanitize inputs
            data.name = data.name.trim();
            data.email = data.email.toLowerCase().trim();
            data.mobile_no = data.mobile_no.replace(/\s/g, '');

            // Make an Axios POST request
            const response = await axios.post('/users/register', data);

            if (response.data.success) {
                setUserEmail(data.email);
                toast.success('Registration Successful! Please verify your email.');
                
                // Show OTP verification modal
                setShowOTP(true);
            }

        } catch (error) {
            console.error('Error submitting form:', error);
            if (error.response?.status === 409) {
                toast.error('Email already exists. Please use a different email.');
            } else {
                toast.error(error.response?.data?.msg || 'Registration failed. Please try again.');
            }
        } finally {
            actions.setSubmitting(false);
        }
    };

    // Handle OTP verification
    const handleOTPVerification = async (otp) => {
        try {
            const response = await axios.post('/users/verify-email', {
                email: userEmail,
                otp: otp
            });
            
            if (response.data.success) {
                toast.success('Email verified successfully!');
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            }
        } catch (error) {
            throw new Error('Invalid OTP');
        }
    };

    // Handle OTP resend
    const handleResendOTP = async () => {
        try {
            await axios.post('/users/resend-otp', { email: userEmail });
        } catch (error) {
            throw new Error('Failed to resend OTP');
        }
    };

    // If showing OTP verification
    if (showOTP) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 dark:from-secondary-900 dark:to-black flex items-center justify-center px-6 py-12">
                <OTPVerification
                    email={userEmail}
                    onVerifySuccess={handleOTPVerification}
                    onResendOTP={handleResendOTP}
                    onCancel={() => {
                        setShowOTP(false);
                        navigate('/login');
                    }}
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 dark:from-secondary-900 dark:to-black flex items-center justify-center px-6 py-12">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100/20 to-transparent"></div>
            </div>
            
            <div className="relative w-full max-w-2xl">
                {/* Main Card */}
                <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-strong p-8 border border-secondary-200 dark:border-secondary-700">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <img
                            className="mx-auto h-16 w-auto"
                            src="/logo.png"
                            alt="FoodHub Logo"
                        />
                    </div>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-2">
                            Create Your Account
                        </h2>
                        <p className="text-secondary-600 dark:text-secondary-400">
                            Join FoodHub and start your culinary journey
                        </p>
                    </div>

                    {/* Security Status */}
                    <div className="mb-6 flex justify-center">
                        <SecurityStatus 
                            isSecure={window.location.protocol === 'https:'}
                            sessionStatus="active"
                        />
                    </div>

                    {/* Registration Form */}
                    <Formik
                        enableReinitialize
                        initialValues={{
                            name: "",
                            email: "",
                            mobile_no: "",
                            password: "",
                            confirmpassword: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit}
                    >
                        {(props) => (
                            <Form className="space-y-6">
                                {/* Personal Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name Field */}
                                    <div>
                                        <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                                            Full Name *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaUser className="h-4 w-4 text-secondary-400" />
                                            </div>
                                            <Field
                                                name="name"
                                                type="text"
                                                autoComplete="name"
                                                required
                                                placeholder="Enter your full name"
                                                className="block w-full pl-10 pr-3 py-2.5 border border-secondary-300 dark:border-secondary-600 rounded-lg
                                                         bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white
                                                         placeholder:text-secondary-400 dark:placeholder:text-secondary-500
                                                         focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                                                         transition-all duration-200"
                                            />
                                        </div>
                                        <FieldError message={props.touched.name && props.errors.name} />
                                    </div>

                                    {/* Mobile Number Field */}
                                    <div>
                                        <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                                            Mobile Number *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaPhone className="h-4 w-4 text-secondary-400" />
                                            </div>
                                            <Field
                                                name="mobile_no"
                                                type="tel"
                                                autoComplete="tel"
                                                required
                                                placeholder="9XXXXXXXXX"
                                                className="block w-full pl-10 pr-3 py-2.5 border border-secondary-300 dark:border-secondary-600 rounded-lg
                                                         bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white
                                                         placeholder:text-secondary-400 dark:placeholder:text-secondary-500
                                                         focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                                                         transition-all duration-200"
                                            />
                                        </div>
                                        <FieldError message={props.touched.mobile_no && props.errors.mobile_no} />
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                                        Email Address *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaEnvelope className="h-4 w-4 text-secondary-400" />
                                        </div>
                                        <Field
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            placeholder="Enter your email address"
                                            className="block w-full pl-10 pr-3 py-2.5 border border-secondary-300 dark:border-secondary-600 rounded-lg
                                                     bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white
                                                     placeholder:text-secondary-400 dark:placeholder:text-secondary-500
                                                     focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                                                     transition-all duration-200"
                                        />
                                    </div>
                                    <FieldError message={props.touched.email && props.errors.email} />
                                </div>

                                {/* Password Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Password Field */}
                                    <div>
                                        <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                                            Password *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaLock className="h-4 w-4 text-secondary-400" />
                                            </div>
                                            <Field
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                autoComplete="new-password"
                                                required
                                                placeholder="Create a strong password"
                                                className="block w-full pl-10 pr-12 py-2.5 border border-secondary-300 dark:border-secondary-600 rounded-lg
                                                         bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white
                                                         placeholder:text-secondary-400 dark:placeholder:text-secondary-500
                                                         focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                                                         transition-all duration-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300"
                                            >
                                                {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                        <FieldError message={props.touched.password && props.errors.password} />
                                    </div>

                                    {/* Confirm Password Field */}
                                    <div>
                                        <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                                            Confirm Password *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaLock className="h-4 w-4 text-secondary-400" />
                                            </div>
                                            <Field
                                                name="confirmpassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                autoComplete="new-password"
                                                required
                                                placeholder="Confirm your password"
                                                className="block w-full pl-10 pr-12 py-2.5 border border-secondary-300 dark:border-secondary-600 rounded-lg
                                                         bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white
                                                         placeholder:text-secondary-400 dark:placeholder:text-secondary-500
                                                         focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                                                         transition-all duration-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300"
                                            >
                                                {showConfirmPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                        <FieldError message={props.touched.confirmpassword && props.errors.confirmpassword} />
                                    </div>
                                </div>

                                {/* Password Strength Meter */}
                                {props.values.password && (
                                    <PasswordStrengthMeter password={props.values.password} />
                                )}

                                {/* Terms and Conditions */}
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="terms"
                                            name="terms"
                                            type="checkbox"
                                            required
                                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="text-secondary-700 dark:text-secondary-300">
                                            I agree to the{' '}
                                            <a href="#" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
                                                Terms and Conditions
                                            </a>{' '}
                                            and{' '}
                                            <a href="#" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
                                                Privacy Policy
                                            </a>
                                        </label>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={props.isSubmitting}
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg
                                             text-sm font-semibold text-white
                                             bg-primary-600 hover:bg-primary-700
                                             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
                                             disabled:opacity-50 disabled:cursor-not-allowed
                                             transition-all duration-200 shadow-soft"
                                >
                                    {props.isSubmitting ? 'Creating Account...' : 'Create Account'}
                                </button>
                            </Form>
                        )}
                    </Formik>

                    {/* Sign In Link */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-secondary-600 dark:text-secondary-400">
                            Already have an account?{' '}
                            <Link 
                                to="/login" 
                                className="font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200"
                            >
                                Sign in here
                            </Link>
                        </p>
                    </div>

                    {/* Back to Home */}
                    <div className="mt-6 text-center">
                        <Link 
                            to="/" 
                            className="inline-flex items-center text-sm text-secondary-600 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300 transition-colors duration-200"
                        >
                            <FaArrowLeft className="w-3 h-3 mr-2" />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup