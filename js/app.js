/**
 * Main Application Controller
 * Paramount Builders LLC - Restoration Bid App
 *
 * Handles app initialization, navigation, and screen management.
 *
 * @version 1.0.0
 */

const App = {
  // Current state
  currentScreen: 'screenLogin',
  currentProject: null,

  /**
   * Initialize the application
   */
  init() {
    console.log(`${CONFIG.APP_NAME} v${CONFIG.APP_VERSION} initializing...`);

    // Check authentication status
    if (Auth.isAuthenticated()) {
      this.showScreen('screenDashboard');
      this.showNavigation(true);
    } else {
      this.showScreen('screenLogin');
      this.showNavigation(false);
    }

    // Bind event listeners
    this.bindEvents();

    // Update greeting
    this.updateGreeting();

    // Load dashboard data
    this.loadDashboardData();

    console.log('App initialized successfully');
  },

  /**
   * Bind all event listeners
   */
  bindEvents() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => this.handleLogin(e));
    }

    // Navigation items
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const screen = item.dataset.screen;
        if (screen) this.navigateTo(screen);
      });
    });

    // New project button
    const newProjectBtn = document.getElementById('newProjectBtn');
    if (newProjectBtn) {
      newProjectBtn.addEventListener('click', () => this.startNewProject());
    }

    // Settings button
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => this.openSettings());
    }

    // Camera controls
    const captureBtn = document.getElementById('captureBtn');
    if (captureBtn) {
      captureBtn.addEventListener('click', () => this.capturePhoto());
    }

    const galleryBtn = document.getElementById('galleryBtn');
    if (galleryBtn) {
      galleryBtn.addEventListener('click', () => this.openGallery());
    }

    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
    }

    // Sketch tools
    document.querySelectorAll('.sketch-tool').forEach(tool => {
      tool.addEventListener('click', () => this.selectSketchTool(tool));
    });

    // Add Room button (Sketch screen)
    const addRoomBtn = document.getElementById('addRoomBtn');
    if (addRoomBtn) {
      addRoomBtn.addEventListener('click', () => this.openAddRoom());
    }

    // Line items buttons
    const addItemBtn = document.getElementById('addItemBtn');
    if (addItemBtn) {
      addItemBtn.addEventListener('click', () => this.addLineItem());
    }

    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportLineItems());
    }

    // Extend session on user activity
    document.addEventListener('click', () => Auth.extendSession());
    document.addEventListener('touchstart', () => Auth.extendSession());
  },

  /**
   * Handle login form submission
   * @param {Event} e - Form submit event
   */
  handleLogin(e) {
    e.preventDefault();

    const passwordInput = document.getElementById('passwordInput');
    const loginError = document.getElementById('loginError');
    const password = passwordInput.value;

    if (Auth.login(password)) {
      // Success - navigate to dashboard
      loginError.classList.add('hidden');
      passwordInput.value = '';
      this.showScreen('screenDashboard');
      this.showNavigation(true);
      this.loadDashboardData();
      Utils.showToast('Welcome back!', 'success');
    } else {
      // Failed - show error
      loginError.classList.remove('hidden');
      passwordInput.value = '';
      passwordInput.focus();

      // Shake animation
      passwordInput.style.animation = 'shake 0.5s';
      setTimeout(() => passwordInput.style.animation = '', 500);
    }
  },

  /**
   * Navigate to a screen
   * @param {string} screenId - Target screen ID
   */
  navigateTo(screenId) {
    // Check auth for protected screens
    if (screenId !== 'screenLogin' && !Auth.isAuthenticated()) {
      this.showScreen('screenLogin');
      this.showNavigation(false);
      return;
    }

    this.showScreen(screenId);

    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('nav-item--active', item.dataset.screen === screenId);
    });

    // Screen-specific initialization
    switch (screenId) {
      case 'screenCamera':
        this.initCamera();
        break;
      case 'screenSketch':
        this.initSketch();
        break;
      case 'screenItems':
        this.loadLineItems();
        break;
    }
  },

  /**
   * Show a specific screen
   * @param {string} screenId - Screen element ID
   */
  showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('screen--active');
    });

    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
      targetScreen.classList.add('screen--active');
      this.currentScreen = screenId;
    }
  },

  /**
   * Show/hide bottom navigation
   * @param {boolean} show - Whether to show navigation
   */
  showNavigation(show) {
    const footer = document.getElementById('appFooter');
    const header = document.getElementById('appHeader');

    if (footer) {
      footer.style.display = show ? 'flex' : 'none';
    }

    // Adjust header visibility on login screen
    if (header) {
      header.style.opacity = show ? '1' : '0.5';
    }
  },

  /**
   * Update greeting based on time of day
   */
  updateGreeting() {
    const greetingEl = document.getElementById('greetingTime');
    if (greetingEl) {
      greetingEl.textContent = Utils.getGreeting();
    }
  },

  /**
   * Load dashboard data
   */
  loadDashboardData() {
    const projects = Utils.storage.get(CONFIG.STORAGE.PROJECTS) || [];

    // Calculate stats
    let totalPhotos = 0;
    let totalRooms = 0;
    let totalItems = 0;

    projects.forEach(project => {
      totalPhotos += (project.photos || []).length;
      totalRooms += (project.rooms || []).length;
      totalItems += (project.lineItems || []).length;
    });

    // Update stat cards
    document.getElementById('statProjects').textContent = projects.length;
    document.getElementById('statPhotos').textContent = totalPhotos;
    document.getElementById('statRooms').textContent = totalRooms;
    document.getElementById('statItems').textContent = totalItems;

    // Render recent projects
    this.renderProjects(projects);
  },

  /**
   * Render projects list
   * @param {Array} projects - Array of project objects
   */
  renderProjects(projects) {
    const container = document.getElementById('projectList');
    if (!container) return;

    if (projects.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <svg class="empty-state__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="12" y1="18" x2="12" y2="12"></line>
            <line x1="9" y1="15" x2="15" y2="15"></line>
          </svg>
          <h3 class="empty-state__title">No projects yet</h3>
          <p class="empty-state__description">Start your first assessment to see it here</p>
        </div>
      `;
      return;
    }

    // Sort by most recent
    const sorted = [...projects].sort((a, b) =>
      new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
    );

    // Show last 5
    const recent = sorted.slice(0, 5);

    container.innerHTML = recent.map(project => `
      <div class="project-card" data-id="${project.id}">
        <div class="project-card__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${project.damageType === 'water'
              ? '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>'
              : project.damageType === 'fire'
                ? '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>'
                : '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>'}
          </svg>
        </div>
        <div class="project-card__content">
          <div class="project-card__title">${project.name || 'Untitled Project'}</div>
          <div class="project-card__meta">${Utils.formatDate(project.updatedAt || project.createdAt, 'relative')}</div>
        </div>
        <svg class="project-card__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    `).join('');

    // Add click handlers
    container.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        const projectId = card.dataset.id;
        this.openProject(projectId);
      });
    });
  },

  /**
   * Start a new project
   */
  startNewProject() {
    const project = {
      id: Utils.generateId(),
      name: `Assessment ${Utils.formatDate(new Date(), 'short')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      damageType: null,
      classification: null,
      photos: [],
      rooms: [],
      lineItems: [],
      notes: ''
    };

    // Save to storage
    const projects = Utils.storage.get(CONFIG.STORAGE.PROJECTS) || [];
    projects.push(project);
    Utils.storage.set(CONFIG.STORAGE.PROJECTS, projects);

    // Set as current
    this.currentProject = project;
    Utils.storage.set(CONFIG.STORAGE.CURRENT_PROJECT, project.id);

    // Open question flow to classify damage
    QuestionFlow.start();

    Utils.showToast('New assessment started', 'success');
  },

  /**
   * Open an existing project
   * @param {string} projectId - Project ID
   */
  openProject(projectId) {
    const projects = Utils.storage.get(CONFIG.STORAGE.PROJECTS) || [];
    const project = projects.find(p => p.id === projectId);

    if (project) {
      this.currentProject = project;
      Utils.storage.set(CONFIG.STORAGE.CURRENT_PROJECT, projectId);
      this.navigateTo('screenItems');
    }
  },

  /**
   * Initialize camera
   */
  async initCamera() {
    const video = document.getElementById('cameraVideo');
    const placeholder = document.getElementById('cameraPlaceholder');

    if (!video) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: CONFIG.CAMERA.FACING_MODE,
          width: { ideal: CONFIG.CAMERA.PREFERRED_WIDTH },
          height: { ideal: CONFIG.CAMERA.PREFERRED_HEIGHT }
        }
      });

      video.srcObject = stream;
      video.style.display = 'block';
      if (placeholder) placeholder.style.display = 'none';
    } catch (err) {
      console.error('Camera access error:', err);
      if (placeholder) {
        placeholder.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
          </svg>
          <p>Camera access denied</p>
          <p style="font-size: 12px; opacity: 0.7;">Use the gallery button to upload photos</p>
        `;
      }
    }
  },

  /**
   * Capture photo from camera
   */
  capturePhoto() {
    const video = document.getElementById('cameraVideo');
    if (!video || !video.srcObject) {
      Utils.showToast('Camera not available', 'error');
      return;
    }

    // Create canvas and capture frame
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    // Convert to base64
    const imageData = canvas.toDataURL('image/jpeg', 0.85);

    // Add to current project
    this.addPhotoToProject(imageData);

    // Visual feedback
    Utils.showToast('Photo captured!', 'success');
  },

  /**
   * Open gallery to select photo
   */
  openGallery() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  },

  /**
   * Handle file selection from gallery
   * @param {Event} e - Change event
   */
  async handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;

    Utils.showLoading('Processing image...');

    try {
      let base64 = await Utils.fileToBase64(file);
      base64 = await Utils.resizeImage(base64);

      this.addPhotoToProject(base64);

      Utils.showToast('Photo added!', 'success');
    } catch (err) {
      console.error('File processing error:', err);
      Utils.showToast('Failed to process image', 'error');
    } finally {
      Utils.hideLoading();
      e.target.value = ''; // Reset input
    }
  },

  /**
   * Add photo to current project
   * @param {string} imageData - Base64 image data
   */
  addPhotoToProject(imageData) {
    if (!this.currentProject) {
      this.startNewProject();
    }

    const photo = {
      id: Utils.generateId(),
      data: imageData,
      capturedAt: new Date().toISOString(),
      analyzed: false,
      analysis: null
    };

    this.currentProject.photos.push(photo);
    this.currentProject.updatedAt = new Date().toISOString();
    this.saveCurrentProject();

    // Update dashboard stats
    this.loadDashboardData();
  },

  /**
   * Save current project to storage
   */
  saveCurrentProject() {
    if (!this.currentProject) return;

    const projects = Utils.storage.get(CONFIG.STORAGE.PROJECTS) || [];
    const index = projects.findIndex(p => p.id === this.currentProject.id);

    if (index >= 0) {
      projects[index] = this.currentProject;
    } else {
      projects.push(this.currentProject);
    }

    Utils.storage.set(CONFIG.STORAGE.PROJECTS, projects);
  },

  /**
   * Initialize sketch canvas
   */
  initSketch() {
    Sketch.init();
  },

  /**
   * Select sketch tool
   * @param {HTMLElement} toolEl - Tool button element
   */
  selectSketchTool(toolEl) {
    const tool = toolEl.dataset.tool;

    // Handle special tools
    if (tool === 'undo') {
      Sketch.undo();
      return;
    } else if (tool === 'clear') {
      Sketch.clear();
      return;
    }

    // Set drawing tool
    Sketch.setTool(tool);
  },

  /**
   * Load line items for current project
   */
  loadLineItems() {
    const container = document.getElementById('lineItemsList');
    const countEl = document.getElementById('itemsCount');
    if (!container) return;

    const items = this.currentProject?.lineItems || [];

    if (countEl) {
      countEl.textContent = `${items.length} item${items.length !== 1 ? 's' : ''}`;
    }

    if (items.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <svg class="empty-state__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
          </svg>
          <h3 class="empty-state__title">No line items yet</h3>
          <p class="empty-state__description">Take photos and add rooms to generate line items</p>
        </div>
      `;
      return;
    }

    // Group items by category
    const grouped = {};
    items.forEach(item => {
      const cat = item.category || 'Other';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(item);
    });

    container.innerHTML = Object.entries(grouped).map(([category, categoryItems]) => `
      <div class="item-group">
        <h3 class="item-group__title">${category}</h3>
        ${categoryItems.map(item => `
          <div class="line-item" data-id="${item.id}">
            <span class="line-item__code">${item.code}</span>
            <span class="line-item__description">${item.description}</span>
            <div class="line-item__quantity">
              <button class="line-item__qty-btn" data-action="decrease">-</button>
              <span class="line-item__qty-value">${item.quantity} ${item.unit}</span>
              <button class="line-item__qty-btn" data-action="increase">+</button>
            </div>
          </div>
        `).join('')}
      </div>
    `).join('');
  },

  /**
   * Add a new line item (via room)
   */
  addLineItem() {
    // If no project or no classification, start question flow first
    if (!this.currentProject || !this.currentProject.classification) {
      QuestionFlow.start();
      return;
    }
    // Otherwise open room input
    RoomInput.open();
  },

  /**
   * Export line items (shows export options)
   */
  exportLineItems() {
    const items = this.currentProject?.lineItems || [];

    if (items.length === 0) {
      Utils.showToast('No items to export', 'error');
      return;
    }

    // Check if MCP server is enabled
    const settings = Settings.get();
    const mcpEnabled = settings.mcpServerEnabled;

    // Show export options
    const choice = mcpEnabled
      ? prompt('Export format:\n1 = CSV (spreadsheet)\n2 = ESX (Xactimate)\n\nEnter 1 or 2:', '2')
      : '1';

    if (choice === '2' && mcpEnabled) {
      this.exportToESX();
    } else if (choice === '1' || !mcpEnabled) {
      this.exportToCSV();
    }
  },

  /**
   * Export to CSV format
   */
  exportToCSV() {
    const items = this.currentProject?.lineItems || [];

    // Generate CSV content
    const headers = ['Code', 'Description', 'Quantity', 'Unit', 'Category', 'Room'];
    const rows = items.map(item =>
      [
        item.code,
        `"${item.description.replace(/"/g, '""')}"`,
        item.quantity,
        item.unit,
        item.category,
        item.roomName || ''
      ].join(',')
    );

    const csv = [headers.join(','), ...rows].join('\n');

    // Create download
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.currentProject?.name || 'estimate'}_line_items.csv`;
    a.click();
    URL.revokeObjectURL(url);

    Utils.showToast('CSV exported!', 'success');
  },

  /**
   * Export to ESX format via MCP server
   */
  async exportToESX() {
    const settings = Settings.get();
    const serverUrl = settings.mcpServerUrl;

    if (!serverUrl) {
      Utils.showToast('MCP server URL not configured', 'error');
      Settings.open();
      return;
    }

    Utils.showLoading('Generating ESX file...');

    try {
      // Prepare line items for ESX
      const lineItems = this.currentProject.lineItems.map(item => ({
        code: item.code,
        description: item.description,
        quantity: item.quantity,
        unit: item.unit
      }));

      // Prepare rooms for ESX
      const rooms = this.currentProject.rooms.map(room => ({
        name: room.name,
        type: room.type,
        length: room.length,
        width: room.width,
        height: room.height
      }));

      // Build request
      const request = {
        project: {
          name: this.currentProject.name,
          damageType: this.currentProject.damageType,
          classification: this.currentProject.classification
        },
        rooms,
        lineItems
      };

      // Call MCP server
      const response = await fetch(`${serverUrl}/create-esx`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request),
        signal: AbortSignal.timeout(30000)
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      // Get the ESX file
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${this.currentProject?.name || 'estimate'}.esx`;
      a.click();
      URL.revokeObjectURL(url);

      Utils.showToast('ESX file exported!', 'success');

    } catch (err) {
      console.error('ESX export failed:', err);

      if (err.name === 'TimeoutError') {
        Utils.showToast('Server timeout - check MCP server', 'error');
      } else if (err.message.includes('Failed to fetch')) {
        Utils.showToast('Could not connect to MCP server', 'error');
      } else {
        Utils.showToast(`Export failed: ${err.message}`, 'error');
      }
    } finally {
      Utils.hideLoading();
    }
  },

  /**
   * Open settings
   */
  openSettings() {
    Settings.open();
  },

  /**
   * Open add room modal
   */
  openAddRoom() {
    RoomInput.open();
  }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

// Add shake animation for login error
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-8px); }
    75% { transform: translateX(8px); }
  }
`;
document.head.appendChild(style);

// Make App globally available
window.App = App;
