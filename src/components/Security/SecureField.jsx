import { useState, useEffect } from 'react';
import { Field, ErrorMessage } from 'formik';
import { FaEye, FaEyeSlash, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
import { sanitizeInput, validateInput } from './securityUtils';

const SecureField = ({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  autoComplete,
  validation = {},
  showValidationIcon = false,
  sanitize = true,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [localValue, setLocalValue] = useState('');
  const [localErrors, setLocalErrors] = useState([]);

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  const handleChange = (e, formikProps) => {
    let value = e.target.value;
    
    // Sanitize input if enabled
    if (sanitize) {
      value = sanitizeInput(value, type);
    }

    // Update local state
    setLocalValue(value);

    // Validate input
    const errors = validateInput(value, type, {
      required,
      ...validation
    });
    setLocalErrors(errors);

    // Update Formik
    formikProps.setFieldValue(name, value);
  };

  const getValidationState = (formikProps) => {
    const hasError = formikProps.errors[name] && formikProps.touched[name];
    const hasLocalError = localErrors.length > 0 && localValue;
    const isValid = formikProps.touched[name] && !formikProps.errors[name] && !hasLocalError && localValue;

    if (hasError || hasLocalError) return 'error';
    if (isValid) return 'success';
    return 'default';
  };

  const getFieldClasses = (validationState) => {
    const baseClasses = `
      block w-full rounded-lg border-0 py-2.5 px-3 text-secondary-900 dark:text-white
      shadow-sm ring-1 ring-inset placeholder:text-secondary-400 dark:placeholder:text-secondary-500
      focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 
      transition-all duration-200
      dark:bg-secondary-700
    `;

    switch (validationState) {
      case 'error':
        return `${baseClasses} ring-error-300 dark:ring-error-600 focus:ring-error-500 bg-error-50 dark:bg-error-900/20`;
      case 'success':
        return `${baseClasses} ring-success-300 dark:ring-success-600 focus:ring-success-500 bg-success-50 dark:bg-success-900/20`;
      default:
        return `${baseClasses} ring-secondary-300 dark:ring-secondary-600 focus:ring-primary-500 bg-white dark:bg-secondary-700`;
    }
  };

  return (
    <div className={className}>
      {/* Label */}
      <label htmlFor={name} className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
        {label}
        {required && <span className="text-error-500 ml-1">*</span>}
      </label>

      {/* Input Container */}
      <div className="relative">
        <Field name={name}>
          {({ field, form }) => {
            const validationState = getValidationState(form);
            
            return (
              <>
                <input
                  {...field}
                  {...props}
                  id={name}
                  type={inputType}
                  placeholder={placeholder}
                  autoComplete={autoComplete}
                  required={required}
                  onChange={(e) => handleChange(e, form)}
                  className={getFieldClasses(validationState)}
                />

                {/* Password Visibility Toggle */}
                {isPassword && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="w-4 h-4" />
                    ) : (
                      <FaEye className="w-4 h-4" />
                    )}
                  </button>
                )}

                {/* Validation Icon */}
                {showValidationIcon && !isPassword && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    {validationState === 'error' && (
                      <FaExclamationCircle className="w-4 h-4 text-error-500" />
                    )}
                    {validationState === 'success' && (
                      <FaCheckCircle className="w-4 h-4 text-success-500" />
                    )}
                  </div>
                )}
              </>
            );
          }}
        </Field>
      </div>

      {/* Error Messages */}
      <div className="mt-1 min-h-[1.25rem]">
        <ErrorMessage name={name}>
          {msg => (
            <p className="text-sm text-error-600 dark:text-error-400 flex items-center">
              <FaExclamationCircle className="w-3 h-3 mr-1 flex-shrink-0" />
              {msg}
            </p>
          )}
        </ErrorMessage>
        
        {/* Local validation errors */}
        {localErrors.length > 0 && localValue && (
          <div className="space-y-1">
            {localErrors.map((error, index) => (
              <p key={index} className="text-sm text-error-600 dark:text-error-400 flex items-center">
                <FaExclamationCircle className="w-3 h-3 mr-1 flex-shrink-0" />
                {error}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SecureField;