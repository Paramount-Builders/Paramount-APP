/**
 * Room Input Controller
 * Paramount Builders LLC - Restoration Bid App
 *
 * Handles room dimension input and affected materials selection.
 * Calculates quantities for line items based on room measurements.
 *
 * @version 1.0.0
 */

const RoomInput = {
  // Current room being edited
  currentRoom: null,

  /**
   * Open room input modal
   * @param {Object} room - Optional existing room to edit
   */
  open(room = null) {
    this.currentRoom = room;
    this.showModal();
    this.render();
  },

  /**
   * Show the modal
   */
  showModal() {
    const modal = document.getElementById('roomInputModal');
    if (modal) {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  },

  /**
   * Close the modal
   */
  close() {
    const modal = document.getElementById('roomInputModal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
    this.currentRoom = null;
  },

  /**
   * Render room input form
   */
  render() {
    const content = document.getElementById('roomInputContent');
    if (!content) return;

    const room = this.currentRoom;
    const damageType = App.currentProject?.damageType || 'water';

    content.innerHTML = `
      <div class="room-input">
        <h2 class="room-input__title">${room ? 'Edit Room' : 'Add Room'}</h2>

        <div class="room-input__form">
          <!-- Room Name -->
          <div class="form-group">
            <label class="form-label" for="roomName">Room Name</label>
            <input
              type="text"
              id="roomName"
              class="form-input"
              value="${room?.name || ''}"
              placeholder="e.g., Master Bedroom, Kitchen"
            >
          </div>

          <!-- Room Type -->
          <div class="form-group">
            <label class="form-label" for="roomType">Room Type</label>
            <select id="roomType" class="form-select">
              <option value="">Select type...</option>
              ${Object.keys(IICRC_KNOWLEDGE.roomTypes).map(type => `
                <option value="${type}" ${room?.type === type ? 'selected' : ''}>
                  ${this.formatRoomType(type)}
                </option>
              `).join('')}
            </select>
          </div>

          <!-- Dimensions -->
          <div class="room-input__dimensions">
            <h3 class="room-input__section-title">Dimensions</h3>
            <div class="dimension-inputs">
              <div class="form-group">
                <label class="form-label" for="roomLength">Length (ft)</label>
                <input
                  type="number"
                  id="roomLength"
                  class="form-input"
                  value="${room?.length || ''}"
                  placeholder="12"
                  min="1"
                  max="100"
                  step="0.5"
                >
              </div>
              <div class="form-group">
                <label class="form-label" for="roomWidth">Width (ft)</label>
                <input
                  type="number"
                  id="roomWidth"
                  class="form-input"
                  value="${room?.width || ''}"
                  placeholder="10"
                  min="1"
                  max="100"
                  step="0.5"
                >
              </div>
              <div class="form-group">
                <label class="form-label" for="roomHeight">Height (ft)</label>
                <input
                  type="number"
                  id="roomHeight"
                  class="form-input"
                  value="${room?.height || 9}"
                  placeholder="9"
                  min="6"
                  max="20"
                  step="0.5"
                >
              </div>
            </div>
            <div class="room-input__calcs" id="roomCalcs">
              <!-- Calculated values will appear here -->
            </div>
          </div>

          <!-- Affected Walls -->
          <div class="room-input__walls">
            <h3 class="room-input__section-title">Affected Walls</h3>
            <p class="room-input__hint">Select which walls have damage</p>
            <div class="wall-selector">
              <button type="button" class="wall-btn" data-wall="north" aria-label="North wall">N</button>
              <button type="button" class="wall-btn" data-wall="east" aria-label="East wall">E</button>
              <button type="button" class="wall-btn" data-wall="south" aria-label="South wall">S</button>
              <button type="button" class="wall-btn" data-wall="west" aria-label="West wall">W</button>
              <button type="button" class="wall-btn wall-btn--all" data-wall="all">All</button>
            </div>
          </div>

          <!-- Flooring Type -->
          <div class="form-group">
            <label class="form-label" for="floorType">Flooring Type</label>
            <select id="floorType" class="form-select">
              <option value="carpet" ${room?.floorType === 'carpet' ? 'selected' : ''}>Carpet</option>
              <option value="hardwood" ${room?.floorType === 'hardwood' ? 'selected' : ''}>Hardwood</option>
              <option value="laminate" ${room?.floorType === 'laminate' ? 'selected' : ''}>Laminate</option>
              <option value="tile" ${room?.floorType === 'tile' ? 'selected' : ''}>Tile</option>
              <option value="vinyl" ${room?.floorType === 'vinyl' ? 'selected' : ''}>Vinyl/LVP</option>
              <option value="concrete" ${room?.floorType === 'concrete' ? 'selected' : ''}>Concrete</option>
            </select>
          </div>

          <!-- Damage Percentage -->
          ${damageType === 'water' ? `
            <div class="form-group">
              <label class="form-label" for="damagePercent">Floor Area Affected</label>
              <div class="range-with-value">
                <input
                  type="range"
                  id="damagePercent"
                  class="form-range"
                  value="${room?.damagePercent || 50}"
                  min="0"
                  max="100"
                  step="5"
                >
                <span class="range-value" id="damagePercentValue">${room?.damagePercent || 50}%</span>
              </div>
            </div>
          ` : ''}

          <!-- Wall Height Affected (Water) -->
          ${damageType === 'water' ? `
            <div class="form-group">
              <label class="form-label" for="wallWickHeight">Water Wick Height (inches)</label>
              <div class="range-with-value">
                <input
                  type="range"
                  id="wallWickHeight"
                  class="form-range"
                  value="${room?.wallWickHeight || 12}"
                  min="0"
                  max="48"
                  step="6"
                >
                <span class="range-value" id="wallWickHeightValue">${room?.wallWickHeight || 12}"</span>
              </div>
            </div>
          ` : ''}

          <!-- Notes -->
          <div class="form-group">
            <label class="form-label" for="roomNotes">Notes</label>
            <textarea
              id="roomNotes"
              class="form-textarea"
              rows="3"
              placeholder="Additional observations..."
            >${room?.notes || ''}</textarea>
          </div>
        </div>

        <div class="room-input__actions">
          <button class="btn btn--ghost" id="roomCancelBtn">Cancel</button>
          <button class="btn btn--primary" id="roomSaveBtn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            ${room ? 'Update Room' : 'Add Room'}
          </button>
        </div>
      </div>
    `;

    this.bindEvents();
    this.updateCalculations();
    this.restoreWallSelections();
  },

  /**
   * Format room type for display
   */
  formatRoomType(type) {
    const names = {
      bathroom: 'Bathroom',
      kitchen: 'Kitchen',
      bedroom: 'Bedroom',
      livingRoom: 'Living Room',
      basement: 'Basement',
      attic: 'Attic',
      crawlspace: 'Crawlspace'
    };
    return names[type] || type;
  },

  /**
   * Bind event listeners
   */
  bindEvents() {
    // Cancel button
    document.getElementById('roomCancelBtn')?.addEventListener('click', () => this.close());

    // Save button
    document.getElementById('roomSaveBtn')?.addEventListener('click', () => this.saveRoom());

    // Dimension inputs - recalculate on change
    ['roomLength', 'roomWidth', 'roomHeight'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.updateCalculations());
    });

    // Wall buttons
    document.querySelectorAll('.wall-btn').forEach(btn => {
      btn.addEventListener('click', () => this.toggleWall(btn));
    });

    // Range sliders
    const damagePercent = document.getElementById('damagePercent');
    if (damagePercent) {
      damagePercent.addEventListener('input', (e) => {
        document.getElementById('damagePercentValue').textContent = `${e.target.value}%`;
      });
    }

    const wallWickHeight = document.getElementById('wallWickHeight');
    if (wallWickHeight) {
      wallWickHeight.addEventListener('input', (e) => {
        document.getElementById('wallWickHeightValue').textContent = `${e.target.value}"`;
      });
    }
  },

  /**
   * Toggle wall selection
   */
  toggleWall(btn) {
    const wall = btn.dataset.wall;

    if (wall === 'all') {
      const allActive = btn.classList.contains('wall-btn--active');
      document.querySelectorAll('.wall-btn:not(.wall-btn--all)').forEach(b => {
        b.classList.toggle('wall-btn--active', !allActive);
      });
      btn.classList.toggle('wall-btn--active', !allActive);
    } else {
      btn.classList.toggle('wall-btn--active');

      // Update "All" button state
      const allBtn = document.querySelector('.wall-btn--all');
      const wallBtns = document.querySelectorAll('.wall-btn:not(.wall-btn--all)');
      const allSelected = [...wallBtns].every(b => b.classList.contains('wall-btn--active'));
      allBtn?.classList.toggle('wall-btn--active', allSelected);
    }

    this.updateCalculations();
  },

  /**
   * Restore wall selections for editing
   */
  restoreWallSelections() {
    if (!this.currentRoom?.affectedWalls) return;

    const walls = this.currentRoom.affectedWalls;
    document.querySelectorAll('.wall-btn').forEach(btn => {
      const wall = btn.dataset.wall;
      if (wall !== 'all' && walls.includes(wall)) {
        btn.classList.add('wall-btn--active');
      }
    });
  },

  /**
   * Get selected walls
   */
  getSelectedWalls() {
    const walls = [];
    document.querySelectorAll('.wall-btn--active:not(.wall-btn--all)').forEach(btn => {
      walls.push(btn.dataset.wall);
    });
    return walls;
  },

  /**
   * Update calculated values
   */
  updateCalculations() {
    const length = parseFloat(document.getElementById('roomLength')?.value) || 0;
    const width = parseFloat(document.getElementById('roomWidth')?.value) || 0;
    const height = parseFloat(document.getElementById('roomHeight')?.value) || 9;

    const calcsEl = document.getElementById('roomCalcs');
    if (!calcsEl || length === 0 || width === 0) {
      if (calcsEl) calcsEl.innerHTML = '';
      return;
    }

    // Calculate values
    const floorSF = length * width;
    const perimeterLF = 2 * (length + width);
    const cubicFeet = floorSF * height;
    const wallSF = perimeterLF * height;

    // Calculate affected wall LF
    const selectedWalls = this.getSelectedWalls();
    let affectedWallLF = 0;
    selectedWalls.forEach(wall => {
      if (wall === 'north' || wall === 'south') {
        affectedWallLF += width;
      } else {
        affectedWallLF += length;
      }
    });

    calcsEl.innerHTML = `
      <div class="calc-grid">
        <div class="calc-item">
          <span class="calc-value">${floorSF.toFixed(0)}</span>
          <span class="calc-label">Floor SF</span>
        </div>
        <div class="calc-item">
          <span class="calc-value">${perimeterLF.toFixed(0)}</span>
          <span class="calc-label">Perimeter LF</span>
        </div>
        <div class="calc-item">
          <span class="calc-value">${affectedWallLF.toFixed(0)}</span>
          <span class="calc-label">Affected Wall LF</span>
        </div>
        <div class="calc-item">
          <span class="calc-value">${cubicFeet.toFixed(0)}</span>
          <span class="calc-label">Cubic Feet</span>
        </div>
      </div>
    `;
  },

  /**
   * Save room to project
   */
  saveRoom() {
    // Gather form data
    const name = document.getElementById('roomName')?.value.trim();
    const type = document.getElementById('roomType')?.value;
    const length = parseFloat(document.getElementById('roomLength')?.value) || 0;
    const width = parseFloat(document.getElementById('roomWidth')?.value) || 0;
    const height = parseFloat(document.getElementById('roomHeight')?.value) || 9;
    const floorType = document.getElementById('floorType')?.value || 'carpet';
    const damagePercent = parseInt(document.getElementById('damagePercent')?.value) || 50;
    const wallWickHeight = parseInt(document.getElementById('wallWickHeight')?.value) || 12;
    const notes = document.getElementById('roomNotes')?.value.trim();
    const affectedWalls = this.getSelectedWalls();

    // Validation
    if (!name) {
      Utils.showToast('Please enter a room name', 'error');
      document.getElementById('roomName')?.focus();
      return;
    }

    if (length === 0 || width === 0) {
      Utils.showToast('Please enter room dimensions', 'error');
      return;
    }

    // Calculate values
    const floorSF = length * width;
    const perimeterLF = 2 * (length + width);
    const cubicFeet = floorSF * height;

    let affectedWallLF = 0;
    affectedWalls.forEach(wall => {
      if (wall === 'north' || wall === 'south') {
        affectedWallLF += width;
      } else {
        affectedWallLF += length;
      }
    });

    // Build room object
    const room = {
      id: this.currentRoom?.id || Utils.generateId(),
      name,
      type,
      length,
      width,
      height,
      floorType,
      damagePercent,
      wallWickHeight,
      affectedWalls,
      notes,
      // Calculated
      floorSF,
      perimeterLF,
      cubicFeet,
      affectedWallLF,
      affectedFloorSF: Math.round(floorSF * (damagePercent / 100)),
      createdAt: this.currentRoom?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add/update in project
    if (!App.currentProject) {
      App.startNewProject();
    }

    const rooms = App.currentProject.rooms || [];
    const existingIndex = rooms.findIndex(r => r.id === room.id);

    if (existingIndex >= 0) {
      rooms[existingIndex] = room;
    } else {
      rooms.push(room);
    }

    App.currentProject.rooms = rooms;
    App.currentProject.updatedAt = new Date().toISOString();

    // Generate line items for this room
    this.generateRoomLineItems(room);

    App.saveCurrentProject();

    this.close();
    Utils.showToast(`Room "${name}" ${existingIndex >= 0 ? 'updated' : 'added'}!`, 'success');

    // Refresh line items view
    App.loadLineItems();
    App.loadDashboardData();

    // Ask if they want to add another room
    this.promptAddAnother();
  },

  /**
   * Generate line items for a room
   */
  generateRoomLineItems(room) {
    if (!App.currentProject) return;

    const damageType = App.currentProject.damageType || 'water';
    const classification = App.currentProject.classification || {};
    const items = [];

    // Helper to find or create line item
    const addOrUpdateItem = (code, description, quantity, unit, category) => {
      const existingIndex = App.currentProject.lineItems.findIndex(
        item => item.code === code && item.roomId === room.id
      );

      const lineItem = {
        id: existingIndex >= 0 ? App.currentProject.lineItems[existingIndex].id : Utils.generateId(),
        code,
        description: `${description} - ${room.name}`,
        quantity: Math.round(quantity * 100) / 100, // Round to 2 decimals
        unit,
        category,
        roomId: room.id,
        roomName: room.name,
        addedAt: new Date().toISOString()
      };

      if (existingIndex >= 0) {
        App.currentProject.lineItems[existingIndex] = lineItem;
      } else {
        App.currentProject.lineItems.push(lineItem);
      }
    };

    if (damageType === 'water') {
      const cat = classification.category || 1;
      const waterClass = classification.class || 2;

      // Extraction based on floor type
      if (room.floorType === 'carpet') {
        addOrUpdateItem('WTREXT', 'Water extraction - carpet', room.affectedFloorSF, 'SF', 'Extraction');
        addOrUpdateItem('WTRPAD', 'Carpet pad removal', room.affectedFloorSF, 'SF', 'Demo');
      } else {
        addOrUpdateItem('WTREXTH', 'Water extraction - hard surface', room.affectedFloorSF, 'SF', 'Extraction');
      }

      // Drying equipment based on class
      const classFactors = { 1: 100, 2: 50, 3: 40, 4: 40 };
      const dehuPints = Math.ceil(room.cubicFeet / classFactors[waterClass]);
      const dehuUnits = Math.ceil(dehuPints / 110);
      const airMovers = Math.ceil(room.affectedFloorSF / 60);

      addOrUpdateItem('WTRDRY', 'Air mover', airMovers, 'EA', 'Equipment');
      addOrUpdateItem('WTRDHM', 'LGR Dehumidifier', dehuUnits, 'EA', 'Equipment');

      // Flood cuts if walls affected
      if (room.affectedWallLF > 0 && room.wallWickHeight > 0) {
        if (room.wallWickHeight <= 24) {
          addOrUpdateItem('WTRDRYWLF', 'Flood cut drywall (2ft)', room.affectedWallLF, 'LF', 'Demo');
        } else {
          addOrUpdateItem('WTRDRYWI', 'Flood cut drywall (4ft)', room.affectedWallLF, 'LF', 'Demo');
        }
      }

      // Cat 2/3 treatment
      if (cat >= 2) {
        addOrUpdateItem('WTRGRM', 'Antimicrobial application', room.affectedFloorSF, 'SF', 'Treatment');
      }

      // Cat 3 containment
      if (cat >= 3) {
        addOrUpdateItem('WTRCNTLF', 'Poly containment', room.perimeterLF, 'LF', 'Containment');
      }

      // Contents manipulation
      if (room.floorType === 'carpet') {
        addOrUpdateItem('WTRBLK', 'Block/pad furniture', Math.ceil(room.floorSF / 50), 'EA', 'Contents');
      }

    } else if (damageType === 'fire') {
      // Fire cleaning based on soot type
      const sootType = classification.sootType || 'dry';

      if (sootType === 'dry' || sootType === 'synthetic') {
        addOrUpdateItem('CLNSOOT', 'Dry soot cleaning', room.floorSF, 'SF', 'Cleaning');
      } else {
        addOrUpdateItem('CLNSOOTW', 'Wet soot cleaning', room.floorSF, 'SF', 'Cleaning');
      }

      // Wall cleaning
      const wallSF = room.affectedWallLF * room.height;
      addOrUpdateItem('CLNSMOKEH', 'Smoke cleaning - walls', wallSF, 'SF', 'Cleaning');

      // Deodorization
      addOrUpdateItem('CLNFOG', 'Thermal fogging', room.cubicFeet, 'CF', 'Deodorization');

    } else if (damageType === 'mold') {
      const level = classification.level || 2;

      // HEPA vacuuming
      addOrUpdateItem('HEPAFSH', 'HEPA vacuum - floor', room.floorSF, 'SF', 'Cleaning');

      // Containment for level 3+
      if (level >= 3) {
        addOrUpdateItem('WTRCNTLF', 'Poly containment', room.perimeterLF, 'LF', 'Containment');
        addOrUpdateItem('WTRNAFAN', 'Air scrubber (per day)', 3, 'DAY', 'Equipment');
      }

      // Treatment
      addOrUpdateItem('WTRGRM', 'Antimicrobial application', room.floorSF, 'SF', 'Treatment');
    }
  },

  /**
   * Prompt to add another room
   */
  promptAddAnother() {
    // Simple approach - could be enhanced with a proper dialog
    setTimeout(() => {
      if (confirm('Room added! Do you want to add another room?')) {
        this.open();
      } else {
        App.navigateTo('screenItems');
      }
    }, 500);
  }
};

// Make globally available
window.RoomInput = RoomInput;
