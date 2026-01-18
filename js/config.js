/**
 * App Configuration
 * Paramount Builders LLC - Restoration Bid App
 *
 * Centralized configuration and constants.
 * All magic values and settings defined here.
 *
 * @version 1.0.0
 */

const CONFIG = {
  // App Info
  APP_NAME: 'Paramount Builders LLC',
  APP_VERSION: '1.0.0',

  // Authentication
  AUTH: {
    PASSWORD: 'damian',
    SESSION_KEY: 'pb_session',
    SESSION_DURATION: 24 * 60 * 60 * 1000 // 24 hours in milliseconds
  },

  // Storage Keys
  STORAGE: {
    PROJECTS: 'pb_projects',
    CURRENT_PROJECT: 'pb_current_project',
    SETTINGS: 'pb_settings',
    AUTH: 'pb_session',
    THEME: 'pb_theme'
  },

  // Claude API (to be configured)
  API: {
    CLAUDE_ENDPOINT: 'https://api.anthropic.com/v1/messages',
    CLAUDE_MODEL: 'claude-3-5-sonnet-20241022',
    // API key should be entered by user in settings, NOT hardcoded
    MAX_TOKENS: 4096
  },

  // Camera Settings
  CAMERA: {
    PREFERRED_WIDTH: 1920,
    PREFERRED_HEIGHT: 1080,
    FACING_MODE: 'environment' // Back camera
  },

  // Sketch Settings
  SKETCH: {
    GRID_SIZE: 12, // pixels per foot at default zoom
    DEFAULT_WALL_WIDTH: 4, // inches
    SNAP_THRESHOLD: 10, // pixels
    COLORS: {
      WALL: '#1a365d',
      DOOR: '#ed8936',
      WINDOW: '#3182ce',
      DIMENSION: '#718096',
      GRID: '#e2e8f0',
      SELECTED: '#e53e3e'
    }
  },

  // Water Damage Categories (IICRC S500)
  WATER_CATEGORIES: {
    1: { name: 'Category 1', description: 'Clean Water', color: '#38a169' },
    2: { name: 'Category 2', description: 'Gray Water', color: '#d69e2e' },
    3: { name: 'Category 3', description: 'Black Water', color: '#e53e3e' }
  },

  // Water Damage Classes (IICRC S500)
  WATER_CLASSES: {
    1: { name: 'Class 1', description: 'Slow Evaporation', dryingTime: '1-3 days' },
    2: { name: 'Class 2', description: 'Fast Evaporation', dryingTime: '3-5 days' },
    3: { name: 'Class 3', description: 'Fastest Evaporation', dryingTime: '5-10 days' },
    4: { name: 'Class 4', description: 'Specialty Drying', dryingTime: '7-14+ days' }
  },

  // Damage Types
  DAMAGE_TYPES: {
    WATER: 'water',
    FIRE: 'fire',
    MOLD: 'mold',
    STORM: 'storm'
  },

  // Room Types
  ROOM_TYPES: [
    { id: 'bathroom', name: 'Bathroom', icon: 'bath' },
    { id: 'bedroom', name: 'Bedroom', icon: 'bed' },
    { id: 'kitchen', name: 'Kitchen', icon: 'utensils' },
    { id: 'living', name: 'Living Room', icon: 'sofa' },
    { id: 'dining', name: 'Dining Room', icon: 'chair' },
    { id: 'basement', name: 'Basement', icon: 'stairs' },
    { id: 'attic', name: 'Attic', icon: 'home' },
    { id: 'garage', name: 'Garage', icon: 'car' },
    { id: 'laundry', name: 'Laundry Room', icon: 'droplet' },
    { id: 'office', name: 'Office', icon: 'briefcase' },
    { id: 'hallway', name: 'Hallway', icon: 'move' },
    { id: 'closet', name: 'Closet', icon: 'archive' },
    { id: 'other', name: 'Other', icon: 'square' }
  ],

  // Units of Measurement
  UNITS: {
    SF: 'Square Feet',
    LF: 'Linear Feet',
    EA: 'Each',
    HR: 'Hour',
    DAY: 'Day',
    RM: 'Room',
    CF: 'Cubic Feet',
    SQ: 'Square (100 SF)',
    BF: 'Board Feet'
  }
};

// Freeze config to prevent accidental modification
Object.freeze(CONFIG);
Object.freeze(CONFIG.AUTH);
Object.freeze(CONFIG.STORAGE);
Object.freeze(CONFIG.API);
Object.freeze(CONFIG.CAMERA);
Object.freeze(CONFIG.SKETCH);
Object.freeze(CONFIG.SKETCH.COLORS);
Object.freeze(CONFIG.WATER_CATEGORIES);
Object.freeze(CONFIG.WATER_CLASSES);
Object.freeze(CONFIG.DAMAGE_TYPES);
Object.freeze(CONFIG.UNITS);
