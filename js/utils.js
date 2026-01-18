/**
 * Utility Functions
 * Paramount Builders LLC - Restoration Bid App
 *
 * Common helper functions used throughout the app.
 *
 * @version 1.0.0
 */

const Utils = {
  /**
   * Generate a unique ID
   * @returns {string} UUID-like string
   */
  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },

  /**
   * Format a date for display
   * @param {Date|string|number} date - Date to format
   * @param {string} format - Format type: 'short', 'long', 'time', 'relative'
   * @returns {string} Formatted date string
   */
  formatDate(date, format = 'short') {
    const d = new Date(date);

    switch (format) {
      case 'short':
        return d.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });

      case 'long':
        return d.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        });

      case 'time':
        return d.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit'
        });

      case 'relative':
        return this.getRelativeTime(d);

      default:
        return d.toLocaleDateString();
    }
  },

  /**
   * Get relative time string (e.g., "2 hours ago")
   * @param {Date} date - Date to compare
   * @returns {string} Relative time string
   */
  getRelativeTime(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;

    return this.formatDate(date, 'short');
  },

  /**
   * Get greeting based on time of day
   * @returns {string} Greeting message
   */
  getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  },

  /**
   * Format number with commas
   * @param {number} num - Number to format
   * @returns {string} Formatted number
   */
  formatNumber(num) {
    return num.toLocaleString('en-US');
  },

  /**
   * Format currency
   * @param {number} amount - Amount to format
   * @returns {string} Formatted currency string
   */
  formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  },

  /**
   * Format square footage
   * @param {number} sqft - Square footage
   * @returns {string} Formatted string with unit
   */
  formatSqFt(sqft) {
    return `${this.formatNumber(sqft)} SF`;
  },

  /**
   * Calculate square footage from dimensions
   * @param {number} length - Length in feet
   * @param {number} width - Width in feet
   * @returns {number} Square footage
   */
  calculateSqFt(length, width) {
    return Math.round(length * width);
  },

  /**
   * Calculate cubic footage
   * @param {number} length - Length in feet
   * @param {number} width - Width in feet
   * @param {number} height - Height in feet
   * @returns {number} Cubic footage
   */
  calculateCuFt(length, width, height) {
    return Math.round(length * width * height);
  },

  /**
   * Calculate linear footage (perimeter)
   * @param {number} length - Length in feet
   * @param {number} width - Width in feet
   * @returns {number} Linear footage
   */
  calculateLinearFt(length, width) {
    return Math.round(2 * (length + width));
  },

  /**
   * Show toast notification
   * @param {string} message - Message to display
   * @param {string} type - Type: 'success', 'error', 'info'
   * @param {number} duration - Duration in ms
   */
  showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:20px;height:20px;flex-shrink:0;">
        ${type === 'success'
          ? '<polyline points="20 6 9 17 4 12"></polyline>'
          : type === 'error'
            ? '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>'
            : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>'}
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    // Remove after duration
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-8px)';
      setTimeout(() => toast.remove(), 200);
    }, duration);
  },

  /**
   * Show loading overlay
   * @param {string} message - Loading message
   */
  showLoading(message = 'Loading...') {
    const overlay = document.getElementById('loadingOverlay');
    const text = document.getElementById('loadingText');
    if (overlay && text) {
      text.textContent = message;
      overlay.classList.add('loading-overlay--visible');
    }
  },

  /**
   * Hide loading overlay
   */
  hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
      overlay.classList.remove('loading-overlay--visible');
    }
  },

  /**
   * Local storage helper - get
   * @param {string} key - Storage key
   * @param {*} defaultValue - Default value if not found
   * @returns {*} Stored value or default
   */
  storage: {
    get(key, defaultValue = null) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (e) {
        console.error('Storage get error:', e);
        return defaultValue;
      }
    },

    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        console.error('Storage set error:', e);
        return false;
      }
    },

    remove(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (e) {
        console.error('Storage remove error:', e);
        return false;
      }
    },

    clear() {
      try {
        localStorage.clear();
        return true;
      } catch (e) {
        console.error('Storage clear error:', e);
        return false;
      }
    }
  },

  /**
   * Debounce function
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in ms
   * @returns {Function} Debounced function
   */
  debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Throttle function
   * @param {Function} func - Function to throttle
   * @param {number} limit - Time limit in ms
   * @returns {Function} Throttled function
   */
  throttle(func, limit = 300) {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  /**
   * Convert file to base64
   * @param {File} file - File object
   * @returns {Promise<string>} Base64 string
   */
  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  },

  /**
   * Resize image for upload
   * @param {string} base64 - Base64 image string
   * @param {number} maxWidth - Maximum width
   * @param {number} maxHeight - Maximum height
   * @returns {Promise<string>} Resized base64 string
   */
  resizeImage(base64, maxWidth = 1920, maxHeight = 1080) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;

        // Calculate new dimensions
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        // Create canvas and resize
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.src = base64;
    });
  },

  /**
   * Simple hash function for strings
   * @param {string} str - String to hash
   * @returns {string} Hash string
   */
  hash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  }
};

// Make Utils globally available
window.Utils = Utils;
