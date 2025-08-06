import { useState, useEffect, useRef } from 'react';
import { FaEnvelope, FaSpinner, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';

const OTPVerification = ({ 
  email, 
  onVerifySuccess, 
  onResendOTP, 
  onCancel,
  isLoading = false,
  resendCooldown = 60 
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(resendCooldown);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
      handleVerifyOTP(newOtp.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split('').concat(['', '', '', '', '', '']).slice(0, 6);
      setOtp(newOtp);
      if (newOtp.join('').length === 6) {
        handleVerifyOTP(newOtp.join(''));
      }
    }
  };

  const handleVerifyOTP = async (otpCode) => {
    if (otpCode.length !== 6) {
      toast.error('Please enter all 6 digits');
      return;
    }

    setIsVerifying(true);
    try {
      await onVerifySuccess(otpCode);
      toast.success('Email verified successfully!');
    } catch (error) {
      toast.error('Invalid OTP. Please try again.');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    
    try {
      await onResendOTP();
      setTimer(resendCooldown);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      toast.success('New OTP sent to your email');
      inputRefs.current[0]?.focus();
    } catch (error) {
      toast.error('Failed to resend OTP. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-secondary-800 rounded-2xl shadow-soft p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-4">
          <FaEnvelope className="w-8 h-8 text-primary-600 dark:text-primary-400" />
        </div>
        <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-2">
          Verify Your Email
        </h2>
        <p className="text-secondary-600 dark:text-secondary-300 text-sm">
          We've sent a 6-digit code to
        </p>
        <p className="text-primary-600 dark:text-primary-400 font-semibold">
          {email}
        </p>
      </div>

      {/* OTP Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-3">
          Enter verification code
        </label>
        <div className="flex justify-center space-x-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              inputMode="numeric"
              pattern="[0-9]"
              maxLength="1"
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-12 h-12 text-center text-lg font-semibold border border-secondary-300 dark:border-secondary-600 rounded-lg 
                         focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
                         dark:bg-secondary-700 dark:text-white
                         transition-all duration-200"
              disabled={isVerifying || isLoading}
            />
          ))}
        </div>
      </div>

      {/* Verify Button */}
      <button
        onClick={() => handleVerifyOTP(otp.join(''))}
        disabled={otp.join('').length !== 6 || isVerifying || isLoading}
        className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-secondary-300 
                   text-white font-semibold py-3 px-4 rounded-lg
                   transition-all duration-200 
                   disabled:cursor-not-allowed
                   flex items-center justify-center"
      >
        {isVerifying || isLoading ? (
          <>
            <FaSpinner className="w-4 h-4 mr-2 animate-spin" />
            Verifying...
          </>
        ) : (
          <>
            <FaCheckCircle className="w-4 h-4 mr-2" />
            Verify Email
          </>
        )}
      </button>

      {/* Resend Section */}
      <div className="mt-6 text-center">
        <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-2">
          Didn't receive the code?
        </p>
        {canResend ? (
          <button
            onClick={handleResend}
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 
                       dark:hover:text-primary-300 font-semibold text-sm
                       transition-colors duration-200"
          >
            Resend OTP
          </button>
        ) : (
          <p className="text-sm text-secondary-500 dark:text-secondary-400">
            Resend in {timer}s
          </p>
        )}
      </div>

      {/* Cancel Button */}
      <div className="mt-4 text-center">
        <button
          onClick={onCancel}
          className="text-secondary-600 hover:text-secondary-700 dark:text-secondary-400 
                     dark:hover:text-secondary-300 text-sm
                     transition-colors duration-200 flex items-center justify-center mx-auto"
        >
          <FaTimesCircle className="w-4 h-4 mr-1" />
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;