import { FaExclamationTriangle, FaLockOpen, FaClock, FaShieldAlt, FaTimes } from 'react-icons/fa';

const SecurityAlert = ({ 
  type = 'error', 
  title, 
  message, 
  onClose, 
  actionButton = null,
  autoClose = false,
  autoCloseDelay = 5000 
}) => {
  const getAlertConfig = () => {
    switch (type) {
      case 'lockout':
        return {
          icon: <FaLockOpen className="w-5 h-5" />,
          bgColor: 'bg-error-50 dark:bg-error-900/20',
          borderColor: 'border-error-200 dark:border-error-800',
          iconColor: 'text-error-500',
          titleColor: 'text-error-800 dark:text-error-200',
          textColor: 'text-error-700 dark:text-error-300',
        };
      case 'password-expiry':
        return {
          icon: <FaClock className="w-5 h-5" />,
          bgColor: 'bg-warning-50 dark:bg-warning-900/20',
          borderColor: 'border-warning-200 dark:border-warning-800',
          iconColor: 'text-warning-500',
          titleColor: 'text-warning-800 dark:text-warning-200',
          textColor: 'text-warning-700 dark:text-warning-300',
        };
      case 'security':
        return {
          icon: <FaShieldAlt className="w-5 h-5" />,
          bgColor: 'bg-primary-50 dark:bg-primary-900/20',
          borderColor: 'border-primary-200 dark:border-primary-800',
          iconColor: 'text-primary-500',
          titleColor: 'text-primary-800 dark:text-primary-200',
          textColor: 'text-primary-700 dark:text-primary-300',
        };
      default:
        return {
          icon: <FaExclamationTriangle className="w-5 h-5" />,
          bgColor: 'bg-error-50 dark:bg-error-900/20',
          borderColor: 'border-error-200 dark:border-error-800',
          iconColor: 'text-error-500',
          titleColor: 'text-error-800 dark:text-error-200',
          textColor: 'text-error-700 dark:text-error-300',
        };
    }
  };

  const config = getAlertConfig();

  // Auto close functionality
  if (autoClose && onClose) {
    setTimeout(() => {
      onClose();
    }, autoCloseDelay);
  }

  return (
    <div className={`
      rounded-lg border p-4 ${config.bgColor} ${config.borderColor}
      animate-slide-up
    `}>
      <div className="flex items-start">
        <div className={`flex-shrink-0 ${config.iconColor}`}>
          {config.icon}
        </div>
        
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-semibold ${config.titleColor} mb-1`}>
              {title}
            </h3>
          )}
          
          <p className={`text-sm ${config.textColor}`}>
            {message}
          </p>
          
          {actionButton && (
            <div className="mt-3">
              {actionButton}
            </div>
          )}
        </div>
        
        {onClose && (
          <div className="ml-auto pl-3">
            <button
              onClick={onClose}
              className={`
                inline-flex rounded-md p-1.5 ${config.iconColor} 
                hover:bg-black/5 dark:hover:bg-white/5
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current
                transition-colors duration-200
              `}
            >
              <span className="sr-only">Dismiss</span>
              <FaTimes className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Predefined alert components for common security scenarios
export const AccountLockoutAlert = ({ remainingTime, onClose }) => (
  <SecurityAlert
    type="lockout"
    title="Account Temporarily Locked"
    message={`Too many failed login attempts. Please try again in ${remainingTime} minutes or reset your password.`}
    onClose={onClose}
    actionButton={
      <button className="text-sm font-medium text-error-600 hover:text-error-500 dark:text-error-400 dark:hover:text-error-300">
        Reset Password
      </button>
    }
  />
);

export const PasswordExpiryAlert = ({ daysRemaining, onClose }) => (
  <SecurityAlert
    type="password-expiry"
    title="Password Expiring Soon"
    message={`Your password will expire in ${daysRemaining} days. Update it now to maintain account security.`}
    onClose={onClose}
    actionButton={
      <button className="text-sm font-medium text-warning-600 hover:text-warning-500 dark:text-warning-400 dark:hover:text-warning-300">
        Update Password
      </button>
    }
  />
);

export const SecurityUpdateAlert = ({ message, onClose }) => (
  <SecurityAlert
    type="security"
    title="Security Notice"
    message={message}
    onClose={onClose}
    autoClose={true}
    autoCloseDelay={8000}
  />
);

export default SecurityAlert;