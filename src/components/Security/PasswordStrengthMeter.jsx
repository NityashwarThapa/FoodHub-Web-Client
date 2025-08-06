import { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaEye, FaShieldAlt } from 'react-icons/fa';

const PasswordStrengthMeter = ({ password, showVisibilityToggle = false, onVisibilityToggle }) => {
  const [strength, setStrength] = useState(0);
  const [checks, setChecks] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  });

  useEffect(() => {
    if (!password) {
      setStrength(0);
      setChecks({
        length: false,
        lowercase: false,
        uppercase: false,
        number: false,
        special: false,
      });
      return;
    }

    const newChecks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    setChecks(newChecks);

    // Calculate strength based on checks
    const passedChecks = Object.values(newChecks).filter(Boolean).length;
    setStrength(passedChecks);
  }, [password]);

  const getStrengthColor = () => {
    if (strength <= 2) return 'text-security-low';
    if (strength <= 3) return 'text-warning-500';
    return 'text-security-high';
  };

  const getStrengthBgColor = () => {
    if (strength <= 2) return 'bg-security-low';
    if (strength <= 3) return 'bg-warning-500';
    return 'bg-security-high';
  };

  const getStrengthText = () => {
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Medium';
    if (strength <= 4) return 'Strong';
    return 'Very Strong';
  };

  if (!password) return null;

  return (
    <div className="mt-3 space-y-3">
      {/* Strength Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
            Password Strength
          </span>
          <span className={`text-sm font-semibold ${getStrengthColor()}`}>
            {getStrengthText()}
          </span>
        </div>
        
        <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getStrengthBgColor()}`}
            style={{ width: `${(strength / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Requirements Checklist */}
      <div className="bg-secondary-50 dark:bg-secondary-800 rounded-lg p-3 space-y-2">
        <div className="flex items-center text-xs font-medium text-secondary-600 dark:text-secondary-400 mb-2">
          <FaShieldAlt className="w-3 h-3 mr-2" />
          Password Requirements
        </div>
        
        <div className="grid grid-cols-1 gap-1">
          {[
            { key: 'length', text: 'At least 8 characters' },
            { key: 'lowercase', text: 'One lowercase letter' },
            { key: 'uppercase', text: 'One uppercase letter' },
            { key: 'number', text: 'One number' },
            { key: 'special', text: 'One special character' },
          ].map(({ key, text }) => (
            <div key={key} className="flex items-center text-xs">
              {checks[key] ? (
                <FaCheck className="w-3 h-3 text-security-high mr-2" />
              ) : (
                <FaTimes className="w-3 h-3 text-secondary-400 mr-2" />
              )}
              <span className={checks[key] ? 'text-security-high' : 'text-secondary-500 dark:text-secondary-400'}>
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Security Tips */}
      {strength >= 4 && (
        <div className="text-xs text-security-high bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-lg p-2">
          <FaShieldAlt className="inline w-3 h-3 mr-1" />
          Great! Your password meets security requirements.
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthMeter;