import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axios';
import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeft, FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/authContext';
import { SecurityStatus, SecurityAlert, RateLimiter } from '../../components/Security';

// Rate limiter for login attempts
const loginRateLimiter = new RateLimiter(5, 15 * 60 * 1000); // 5 attempts per 15 minutes

function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, setUserDetails } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);
  const [securityAlert, setSecurityAlert] = useState(null);

  // Validation schema
  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(5, 'Password must be at least 5 characters'),
  });

  // Check rate limiting on component mount
  useEffect(() => {
    const userIP = 'user-session'; // In real app, use actual IP or session ID
    const rateLimitResult = loginRateLimiter.isAllowed(userIP);
    
    if (!rateLimitResult.allowed) {
      setIsLocked(true);
      setLockoutTime(rateLimitResult.remainingTime);
      setSecurityAlert({
        type: 'lockout',
        title: 'Account Temporarily Locked',
        message: `Too many failed login attempts. Please try again in ${rateLimitResult.remainingTime} minutes.`
      });
    }
  }, []);

  // Function to handle form submission
  const handleFormSubmit = async (values, actions) => {
    if (isLocked) {
      toast.error('Account temporarily locked. Please try again later.');
      return;
    }

    try {
      // Sanitize input
      const sanitizedValues = {
        email: values.email.toLowerCase().trim(),
        password: values.password
      };

      // Make an Axios POST request
      const response = await axios.post('users/login', sanitizedValues);

      if (response.data.success) {
        localStorage.setItem('_hw_userDetails', JSON.stringify(response.data.data))
        localStorage.setItem('_hw_token', response.data.data.token)
        setUserDetails(response.data.data);
        
        // Reset rate limiter on successful login
        loginRateLimiter.reset('user-session');
        
        toast.success('Login Successful')

        setTimeout(() => {
          setIsAuthenticated(true)
          if (response.data.data.role.includes('admin') || response.data.data.role.includes('super-admin')) {
            navigate('/dashboard')
          } else navigate('/')
        }, 400)
      }

    } catch (error) {
      // Record failed attempt
      loginRateLimiter.recordAttempt('user-session');
      
      // Check if now locked out
      const rateLimitResult = loginRateLimiter.isAllowed('user-session');
      if (!rateLimitResult.allowed) {
        setIsLocked(true);
        setLockoutTime(rateLimitResult.remainingTime);
        setSecurityAlert({
          type: 'lockout',
          title: 'Account Temporarily Locked',
          message: `Too many failed login attempts. Please try again in ${rateLimitResult.remainingTime} minutes.`
        });
      }

      console.error('Error submitting form:', error);
      
      // Enhanced error handling
      if (error?.response?.status === 401) {
        toast.error('Invalid email or password');
      } else if (error?.response?.status === 423) {
        toast.error('Account is locked. Please contact support.');
      } else {
        toast.error(error?.response?.data?.msg || "Failed To Login")
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 dark:from-secondary-900 dark:to-black flex items-center justify-center px-6 py-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100/20 to-transparent"></div>
      </div>
      
      <div className="relative w-full max-w-md">
        {/* Security Alert */}
        {securityAlert && (
          <div className="mb-6">
            <SecurityAlert
              type={securityAlert.type}
              title={securityAlert.title}
              message={securityAlert.message}
              onClose={() => setSecurityAlert(null)}
            />
          </div>
        )}

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
              Welcome Back
            </h2>
            <p className="text-secondary-600 dark:text-secondary-400">
              Sign in to your account to continue
            </p>
          </div>

          {/* Security Status */}
          <div className="mb-6 flex justify-center">
            <SecurityStatus 
              isSecure={window.location.protocol === 'https:'}
              sessionStatus="active"
            />
          </div>

          {/* Login Form */}
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {(props) => (
              <Form className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="h-4 w-4 text-secondary-400" />
                    </div>
                    <Field
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="Enter your email"
                      className="block w-full pl-10 pr-3 py-2.5 border border-secondary-300 dark:border-secondary-600 rounded-lg
                               bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white
                               placeholder:text-secondary-400 dark:placeholder:text-secondary-500
                               focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                               transition-all duration-200"
                    />
                  </div>
                  {props.errors.email && props.touched.email && (
                    <p className="mt-1 text-sm text-error-600 dark:text-error-400">
                      {props.errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="h-4 w-4 text-secondary-400" />
                    </div>
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      placeholder="Enter your password"
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
                  {props.errors.password && props.touched.password && (
                    <p className="mt-1 text-sm text-error-600 dark:text-error-400">
                      {props.errors.password}
                    </p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-secondary-700 dark:text-secondary-300">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={props.isSubmitting || isLocked}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg
                           text-sm font-semibold text-white
                           bg-primary-600 hover:bg-primary-700
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-200 shadow-soft"
                >
                  {props.isSubmitting ? 'Signing in...' : 'Sign in'}
                </button>
              </Form>
            )}
          </Formik>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-secondary-600 dark:text-secondary-400">
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className="font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200"
              >
                Sign up now
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

export default Login