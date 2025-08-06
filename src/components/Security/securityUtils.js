// Input sanitization utilities for security
export const sanitizeInput = (input, type = 'text') => {
  if (!input || typeof input !== 'string') return '';

  switch (type) {
    case 'email':
      // Remove potentially dangerous characters but keep valid email chars
      return input.replace(/[<>"\\/\{\}\[\]]/g, '').toLowerCase().trim();
    
    case 'name':
      // Allow letters, spaces, hyphens, apostrophes
      return input.replace(/[^a-zA-Z\s\-']/g, '').trim();
    
    case 'phone':
      // Allow only numbers, spaces, dashes, parentheses, plus
      return input.replace(/[^0-9\s\-\(\)\+]/g, '').trim();
    
    case 'password':
      // Remove null bytes and other dangerous chars but preserve password complexity
      return input.replace(/[\x00\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
    
    case 'text':
    default:
      // Basic XSS prevention - remove script tags and dangerous characters
      return input
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/[<>]/g, '')
        .trim();
  }
};

// Validate input based on type and security requirements
export const validateInput = (input, type = 'text', rules = {}) => {
  const errors = [];
  
  if (!input && rules.required) {
    errors.push('This field is required');
    return errors;
  }

  if (!input) return errors;

  switch (type) {
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input)) {
        errors.push('Please enter a valid email address');
      }
      break;
    
    case 'password':
      if (rules.minLength && input.length < rules.minLength) {
        errors.push(`Password must be at least ${rules.minLength} characters`);
      }
      if (rules.requireUppercase && !/[A-Z]/.test(input)) {
        errors.push('Password must contain at least one uppercase letter');
      }
      if (rules.requireLowercase && !/[a-z]/.test(input)) {
        errors.push('Password must contain at least one lowercase letter');
      }
      if (rules.requireNumber && !/\d/.test(input)) {
        errors.push('Password must contain at least one number');
      }
      if (rules.requireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(input)) {
        errors.push('Password must contain at least one special character');
      }
      break;
    
    case 'phone':
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      const cleanPhone = input.replace(/[\s\-\(\)]/g, '');
      if (!phoneRegex.test(cleanPhone)) {
        errors.push('Please enter a valid phone number');
      }
      break;
    
    case 'name':
      if (input.length < 2) {
        errors.push('Name must be at least 2 characters');
      }
      if (!/^[a-zA-Z\s\-']+$/.test(input)) {
        errors.push('Name can only contain letters, spaces, hyphens, and apostrophes');
      }
      break;
  }

  // Check for common security issues
  if (/<script|javascript:|data:|vbscript:/i.test(input)) {
    errors.push('Invalid input detected');
  }

  return errors;
};

// Rate limiting utilities (client-side tracking)
export class RateLimiter {
  constructor(maxAttempts = 5, windowMs = 15 * 60 * 1000) { // 5 attempts per 15 minutes
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
    this.attempts = new Map();
  }

  isAllowed(identifier) {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier) || [];
    
    // Remove old attempts outside the time window
    const validAttempts = userAttempts.filter(time => now - time < this.windowMs);
    
    if (validAttempts.length >= this.maxAttempts) {
      return {
        allowed: false,
        remainingTime: Math.ceil((validAttempts[0] + this.windowMs - now) / 60000) // minutes
      };
    }

    return { allowed: true, remainingTime: 0 };
  }

  recordAttempt(identifier) {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier) || [];
    userAttempts.push(now);
    
    // Keep only attempts within the time window
    const validAttempts = userAttempts.filter(time => now - time < this.windowMs);
    this.attempts.set(identifier, validAttempts);
  }

  reset(identifier) {
    this.attempts.delete(identifier);
  }
}

// CSRF token utilities
export const getCSRFToken = () => {
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta ? meta.getAttribute('content') : null;
};

// Secure storage utilities
export const secureStorage = {
  set: (key, value, expiry = null) => {
    const item = {
      value,
      timestamp: Date.now(),
      expiry: expiry ? Date.now() + expiry : null
    };
    localStorage.setItem(key, JSON.stringify(item));
  },

  get: (key) => {
    try {
      const item = JSON.parse(localStorage.getItem(key));
      if (!item) return null;

      if (item.expiry && Date.now() > item.expiry) {
        localStorage.removeItem(key);
        return null;
      }

      return item.value;
    } catch {
      return null;
    }
  },

  remove: (key) => {
    localStorage.removeItem(key);
  },

  clear: () => {
    localStorage.clear();
  }
};