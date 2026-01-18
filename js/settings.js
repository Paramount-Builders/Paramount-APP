/**
 * Settings Controller
 * Paramount Builders LLC - Restoration Bid App
 *
 * Handles app settings including:
 * - MCP server configuration for ESX export
 * - Optional Claude API key for AI features
 * - App preferences
 *
 * @version 1.0.0
 */

const Settings = {
  // Default settings
  defaults: {
    mcpServerUrl: 'http://localhost:8765',
    mcpServerEnabled: false,
    claudeApiKey: '',
    autoBackup: true,
    darkMode: false
  },

  /**
   * Open settings modal
   */
  open() {
    this.showModal();
    this.render();
  },

  /**
   * Show the modal
   */
  showModal() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  },

  /**
   * Close the modal
   */
  close() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  },

  /**
   * Get current settings
   */
  get() {
    const stored = Utils.storage.get(CONFIG.STORAGE.SETTINGS) || {};
    return { ...this.defaults, ...stored };
  },

  /**
   * Save settings
   */
  save(settings) {
    const current = this.get();
    const updated = { ...current, ...settings };
    Utils.storage.set(CONFIG.STORAGE.SETTINGS, updated);
    return updated;
  },

  /**
   * Render settings form
   */
  render() {
    const content = document.getElementById('settingsContent');
    if (!content) return;

    const settings = this.get();

    content.innerHTML = `
      <div class="settings">
        <h2 class="settings__title">Settings</h2>

        <!-- MCP Server Section -->
        <div class="settings__section">
          <h3 class="settings__section-title">ESX Export Server</h3>

          <div class="settings__item">
            <div class="settings__item-content">
              <div class="settings__item-title">Enable MCP Server</div>
              <div class="settings__item-desc">Connect to local server for ESX file generation</div>
            </div>
            <div class="settings__item-action">
              <button
                class="toggle ${settings.mcpServerEnabled ? 'toggle--active' : ''}"
                id="toggleMcpServer"
                aria-pressed="${settings.mcpServerEnabled}"
              >
                <div class="toggle__thumb"></div>
              </button>
            </div>
          </div>

          <div class="form-group" id="mcpServerUrlGroup" style="${settings.mcpServerEnabled ? '' : 'display: none;'}">
            <label class="form-label" for="mcpServerUrl">Server URL</label>
            <input
              type="url"
              id="mcpServerUrl"
              class="form-input"
              value="${settings.mcpServerUrl}"
              placeholder="http://localhost:8765"
            >
            <div class="connection-status" id="mcpConnectionStatus">
              <span class="connection-dot"></span>
              <span>Not connected</span>
            </div>
            <button class="btn btn--sm btn--secondary" id="testMcpConnection" style="margin-top: var(--space-2);">
              Test Connection
            </button>
          </div>
        </div>

        <!-- AI Features Section -->
        <div class="settings__section">
          <h3 class="settings__section-title">AI Features (Optional)</h3>

          <div class="form-group">
            <label class="form-label" for="claudeApiKey">Claude API Key</label>
            <input
              type="password"
              id="claudeApiKey"
              class="form-input"
              value="${settings.claudeApiKey}"
              placeholder="sk-ant-..."
            >
            <p class="form-helper">
              Optional. Enables AI photo analysis (~$0.04 per photo).
              <a href="https://console.anthropic.com" target="_blank" rel="noopener">Get API key</a>
            </p>
          </div>
        </div>

        <!-- Preferences Section -->
        <div class="settings__section">
          <h3 class="settings__section-title">Preferences</h3>

          <div class="settings__item">
            <div class="settings__item-content">
              <div class="settings__item-title">Auto Backup</div>
              <div class="settings__item-desc">Automatically backup projects to local storage</div>
            </div>
            <div class="settings__item-action">
              <button
                class="toggle ${settings.autoBackup ? 'toggle--active' : ''}"
                id="toggleAutoBackup"
                aria-pressed="${settings.autoBackup}"
              >
                <div class="toggle__thumb"></div>
              </button>
            </div>
          </div>
        </div>

        <!-- Data Management Section -->
        <div class="settings__section">
          <h3 class="settings__section-title">Data</h3>

          <div class="settings__item">
            <div class="settings__item-content">
              <div class="settings__item-title">Export All Data</div>
              <div class="settings__item-desc">Download all projects as JSON</div>
            </div>
            <div class="settings__item-action">
              <button class="btn btn--sm btn--secondary" id="exportAllData">Export</button>
            </div>
          </div>

          <div class="settings__item">
            <div class="settings__item-content">
              <div class="settings__item-title">Clear All Data</div>
              <div class="settings__item-desc">Delete all projects and settings</div>
            </div>
            <div class="settings__item-action">
              <button class="btn btn--sm btn--danger" id="clearAllData">Clear</button>
            </div>
          </div>
        </div>

        <!-- App Info -->
        <div class="settings__section">
          <h3 class="settings__section-title">About</h3>
          <div class="settings__item" style="flex-direction: column; align-items: flex-start; gap: var(--space-2);">
            <div><strong>${CONFIG.APP_NAME}</strong></div>
            <div style="font-size: var(--text-sm); color: var(--text-tertiary);">
              Version ${CONFIG.APP_VERSION}
            </div>
            <div style="font-size: var(--text-sm); color: var(--text-tertiary);">
              Paramount Builders LLC - Restoration Estimating
            </div>
          </div>
        </div>

      </div>

      <div class="modal__footer-sticky">
        <button class="btn btn--primary btn--block" id="saveSettingsBtn">Done</button>
      </div>
    `;

    this.bindEvents();
  },

  /**
   * Bind event listeners
   */
  bindEvents() {
    // MCP Server toggle
    document.getElementById('toggleMcpServer')?.addEventListener('click', (e) => {
      const btn = e.currentTarget;
      const isActive = btn.classList.toggle('toggle--active');
      btn.setAttribute('aria-pressed', isActive);

      const urlGroup = document.getElementById('mcpServerUrlGroup');
      if (urlGroup) {
        urlGroup.style.display = isActive ? '' : 'none';
      }

      this.save({ mcpServerEnabled: isActive });
    });

    // Auto backup toggle
    document.getElementById('toggleAutoBackup')?.addEventListener('click', (e) => {
      const btn = e.currentTarget;
      const isActive = btn.classList.toggle('toggle--active');
      btn.setAttribute('aria-pressed', isActive);
      this.save({ autoBackup: isActive });
    });

    // Test MCP connection
    document.getElementById('testMcpConnection')?.addEventListener('click', () => {
      this.testMcpConnection();
    });

    // Export all data
    document.getElementById('exportAllData')?.addEventListener('click', () => {
      this.exportAllData();
    });

    // Clear all data
    document.getElementById('clearAllData')?.addEventListener('click', () => {
      this.clearAllData();
    });

    // Save and close
    document.getElementById('saveSettingsBtn')?.addEventListener('click', () => {
      this.saveAndClose();
    });

    // Save URL on blur
    document.getElementById('mcpServerUrl')?.addEventListener('blur', (e) => {
      this.save({ mcpServerUrl: e.target.value });
    });

    // Save API key on blur
    document.getElementById('claudeApiKey')?.addEventListener('blur', (e) => {
      this.save({ claudeApiKey: e.target.value });
    });
  },

  /**
   * Test MCP server connection
   */
  async testMcpConnection() {
    const urlInput = document.getElementById('mcpServerUrl');
    const statusEl = document.getElementById('mcpConnectionStatus');
    const testBtn = document.getElementById('testMcpConnection');

    if (!urlInput || !statusEl) return;

    const url = urlInput.value.trim();
    if (!url) {
      Utils.showToast('Please enter a server URL', 'error');
      return;
    }

    // Update UI
    testBtn.disabled = true;
    testBtn.textContent = 'Testing...';
    statusEl.innerHTML = `
      <span class="connection-dot"></span>
      <span>Connecting...</span>
    `;

    try {
      const response = await fetch(`${url}/health`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(5000)
      });

      if (response.ok) {
        statusEl.innerHTML = `
          <span class="connection-dot connection-dot--connected"></span>
          <span>Connected</span>
        `;
        Utils.showToast('MCP server connected!', 'success');
      } else {
        throw new Error(`Server returned ${response.status}`);
      }
    } catch (err) {
      console.error('MCP connection test failed:', err);
      statusEl.innerHTML = `
        <span class="connection-dot connection-dot--error"></span>
        <span>Connection failed</span>
      `;
      Utils.showToast('Could not connect to MCP server', 'error');
    } finally {
      testBtn.disabled = false;
      testBtn.textContent = 'Test Connection';
    }
  },

  /**
   * Export all app data
   */
  exportAllData() {
    const data = {
      version: CONFIG.APP_VERSION,
      exportedAt: new Date().toISOString(),
      projects: Utils.storage.get(CONFIG.STORAGE.PROJECTS) || [],
      settings: this.get()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `paramount-backup-${Utils.formatDate(new Date(), 'short').replace(/\//g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);

    Utils.showToast('Data exported!', 'success');
  },

  /**
   * Clear all app data
   */
  clearAllData() {
    if (!confirm('This will delete ALL projects and settings. This cannot be undone. Are you sure?')) {
      return;
    }

    if (!confirm('Really? This deletes EVERYTHING. Last chance!')) {
      return;
    }

    // Clear storage
    localStorage.removeItem(CONFIG.STORAGE.PROJECTS);
    localStorage.removeItem(CONFIG.STORAGE.CURRENT_PROJECT);
    localStorage.removeItem(CONFIG.STORAGE.SETTINGS);
    localStorage.removeItem(CONFIG.STORAGE.AUTH);

    Utils.showToast('All data cleared', 'success');

    // Reload app
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  },

  /**
   * Save settings and close modal
   */
  saveAndClose() {
    // Gather values
    const mcpServerUrl = document.getElementById('mcpServerUrl')?.value || this.defaults.mcpServerUrl;
    const claudeApiKey = document.getElementById('claudeApiKey')?.value || '';

    this.save({ mcpServerUrl, claudeApiKey });
    this.close();
    Utils.showToast('Settings updated', 'success');
  }
};

// Make globally available
window.Settings = Settings;
