/**
 * Authentication Module
 * Paramount Builders LLC - Restoration Bid App
 *
 * Simple password-based authentication for personal use.
 * Session stored in localStorage with expiration.
 *
 * @version 1.0.0
 */

const Auth = {
  /**
   * Check if user is currently authenticated
   * @returns {boolean} Authentication status
   */
  isAuthenticated() {
    const session = Utils.storage.get(CONFIG.STORAGE.SETTINGS);
    if (!session || !session.authenticated) return false;

    // Check if session has expired
    if (session.expiresAt && Date.now() > session.expiresAt) {
      this.logout();
      return false;
    }

    return true;
  },

  /**
   * Attempt to authenticate with password
   * @param {string} password - Password to verify
   * @returns {boolean} Success status
   */
  login(password) {
    // Simple password check - for personal use only
    // In a production app, this would be server-side authentication
    if (password === CONFIG.AUTH.PASSWORD) {
      const session = {
        authenticated: true,
        loginTime: Date.now(),
        expiresAt: Date.now() + CONFIG.AUTH.SESSION_DURATION
      };

      Utils.storage.set(CONFIG.STORAGE.SETTINGS, session);
      return true;
    }

    return false;
  },

  /**
   * Log out user and clear session
   */
  logout() {
    const settings = Utils.storage.get(CONFIG.STORAGE.SETTINGS) || {};
    settings.authenticated = false;
    settings.expiresAt = null;
    Utils.storage.set(CONFIG.STORAGE.SETTINGS, settings);
  },

  /**
   * Extend session duration
   * Called on user activity to keep session alive
   */
  extendSession() {
    if (this.isAuthenticated()) {
      const session = Utils.storage.get(CONFIG.STORAGE.SETTINGS);
      session.expiresAt = Date.now() + CONFIG.AUTH.SESSION_DURATION;
      Utils.storage.set(CONFIG.STORAGE.SETTINGS, session);
    }
  },

  /**
   * Get session info
   * @returns {Object|null} Session data or null
   */
  getSession() {
    if (!this.isAuthenticated()) return null;
    return Utils.storage.get(CONFIG.STORAGE.SETTINGS);
  }
};

// Make Auth globally available
window.Auth = Auth;
