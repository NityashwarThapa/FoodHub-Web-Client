import { FaLock, FaShieldAlt, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

const SecurityStatus = ({ 
  isSecure = true, 
  showHttpsIndicator = true, 
  sessionStatus = 'active',
  className = '' 
}) => {
  const getSessionStatusIcon = () => {
    switch (sessionStatus) {
      case 'active':
        return <FaCheckCircle className="w-4 h-4 text-success-500" />;
      case 'expired':
        return <FaExclamationTriangle className="w-4 h-4 text-warning-500" />;
      case 'locked':
        return <FaExclamationTriangle className="w-4 h-4 text-error-500" />;
      default:
        return <FaShieldAlt className="w-4 h-4 text-secondary-500" />;
    }
  };

  const getSessionStatusText = () => {
    switch (sessionStatus) {
      case 'active':
        return 'Secure Session';
      case 'expired':
        return 'Session Expired';
      case 'locked':
        return 'Account Locked';
      default:
        return 'Unknown Status';
    }
  };

  const getSessionStatusColor = () => {
    switch (sessionStatus) {
      case 'active':
        return 'text-success-600 dark:text-success-400';
      case 'expired':
        return 'text-warning-600 dark:text-warning-400';
      case 'locked':
        return 'text-error-600 dark:text-error-400';
      default:
        return 'text-secondary-600 dark:text-secondary-400';
    }
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* HTTPS Indicator */}
      {showHttpsIndicator && (
        <div className="flex items-center space-x-1">
          <FaLock className={`w-3 h-3 ${isSecure ? 'text-success-500' : 'text-error-500'}`} />
          <span className={`text-xs font-medium ${isSecure ? 'text-success-600 dark:text-success-400' : 'text-error-600 dark:text-error-400'}`}>
            {isSecure ? 'HTTPS' : 'Not Secure'}
          </span>
        </div>
      )}

      {/* Session Status */}
      <div className="flex items-center space-x-1">
        {getSessionStatusIcon()}
        <span className={`text-xs font-medium ${getSessionStatusColor()}`}>
          {getSessionStatusText()}
        </span>
      </div>
    </div>
  );
};

export default SecurityStatus;