/**
 * Question Flow Controller
 * Paramount Builders LLC - Restoration Bid App
 *
 * Handles the IICRC-based question flow for damage classification.
 * Guides user through determining water category/class, fire soot type,
 * or mold remediation level based on visual observations.
 *
 * @version 1.0.0
 */

const QuestionFlow = {
  // Current state
  damageType: null,        // 'water', 'fire', 'mold'
  currentQuestionIndex: 0,
  answers: {},
  classification: null,

  /**
   * Start a new question flow
   * @param {string} type - Damage type: 'water', 'fire', or 'mold'
   */
  start(type) {
    this.damageType = type;
    this.currentQuestionIndex = 0;
    this.answers = {};
    this.classification = null;

    this.showModal();
    this.renderDamageTypeSelector();
  },

  /**
   * Show the question flow modal
   */
  showModal() {
    const modal = document.getElementById('questionFlowModal');
    if (modal) {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  },

  /**
   * Close the modal
   */
  closeModal() {
    const modal = document.getElementById('questionFlowModal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
    this.reset();
  },

  /**
   * Reset the flow state
   */
  reset() {
    this.damageType = null;
    this.currentQuestionIndex = 0;
    this.answers = {};
    this.classification = null;
  },

  /**
   * Render damage type selection screen
   */
  renderDamageTypeSelector() {
    const content = document.getElementById('questionFlowContent');
    if (!content) return;

    content.innerHTML = `
      <div class="qf-header">
        <h2 class="qf-title">What type of damage?</h2>
        <p class="qf-subtitle">Select the primary damage type for this assessment</p>
      </div>

      <div class="qf-damage-types">
        <button class="qf-damage-card" data-type="water">
          <div class="qf-damage-card__icon qf-damage-card__icon--water">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
            </svg>
          </div>
          <div class="qf-damage-card__content">
            <div class="qf-damage-card__title">Water Damage</div>
            <div class="qf-damage-card__desc">Flooding, leaks, overflow, storms</div>
          </div>
        </button>

        <button class="qf-damage-card" data-type="fire">
          <div class="qf-damage-card__icon qf-damage-card__icon--fire">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
            </svg>
          </div>
          <div class="qf-damage-card__content">
            <div class="qf-damage-card__title">Fire & Smoke</div>
            <div class="qf-damage-card__desc">Fire damage, soot, smoke odor</div>
          </div>
        </button>

        <button class="qf-damage-card" data-type="mold">
          <div class="qf-damage-card__icon qf-damage-card__icon--mold">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="6"></circle>
              <circle cx="12" cy="12" r="2"></circle>
            </svg>
          </div>
          <div class="qf-damage-card__content">
            <div class="qf-damage-card__title">Mold</div>
            <div class="qf-damage-card__desc">Visible growth, musty odors</div>
          </div>
        </button>
      </div>
    `;

    // Bind click handlers
    content.querySelectorAll('.qf-damage-card').forEach(card => {
      card.addEventListener('click', () => {
        this.selectDamageType(card.dataset.type);
      });
    });
  },

  /**
   * Handle damage type selection
   * @param {string} type - Selected damage type
   */
  selectDamageType(type) {
    this.damageType = type;
    this.currentQuestionIndex = 0;
    this.answers = {};
    this.renderQuestion();
  },

  /**
   * Get questions for current damage type
   * @returns {Array} Array of question objects
   */
  getQuestions() {
    const flows = IICRC_KNOWLEDGE.questionFlows;
    return flows[this.damageType] || [];
  },

  /**
   * Render current question
   */
  renderQuestion() {
    const content = document.getElementById('questionFlowContent');
    if (!content) return;

    const questions = this.getQuestions();
    const question = questions[this.currentQuestionIndex];

    if (!question) {
      this.showResults();
      return;
    }

    const progress = ((this.currentQuestionIndex + 1) / questions.length) * 100;
    const damageLabel = this.getDamageTypeLabel();

    content.innerHTML = `
      <div class="qf-header">
        <div class="qf-badge qf-badge--${this.damageType}">${damageLabel}</div>
        <div class="qf-progress">
          <div class="qf-progress__bar" style="width: ${progress}%"></div>
        </div>
        <p class="qf-progress-text">Question ${this.currentQuestionIndex + 1} of ${questions.length}</p>
      </div>

      <div class="qf-question">
        <h2 class="qf-question__text">${question.question}</h2>
      </div>

      <div class="qf-options">
        ${question.options.map((opt, idx) => `
          <button class="qf-option" data-index="${idx}">
            <span class="qf-option__text">${opt.label}</span>
            <svg class="qf-option__check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </button>
        `).join('')}
      </div>

      <div class="qf-nav">
        <button class="btn btn--ghost" id="qfBackBtn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Back
        </button>
      </div>
    `;

    // Bind option click handlers
    content.querySelectorAll('.qf-option').forEach(opt => {
      opt.addEventListener('click', () => {
        this.selectOption(parseInt(opt.dataset.index));
      });
    });

    // Back button
    const backBtn = document.getElementById('qfBackBtn');
    if (backBtn) {
      backBtn.addEventListener('click', () => this.goBack());
    }
  },

  /**
   * Get damage type display label
   */
  getDamageTypeLabel() {
    const labels = {
      water: 'Water Damage',
      fire: 'Fire & Smoke',
      mold: 'Mold Remediation'
    };
    return labels[this.damageType] || 'Assessment';
  },

  /**
   * Handle option selection
   * @param {number} optionIndex - Selected option index
   */
  selectOption(optionIndex) {
    const questions = this.getQuestions();
    const question = questions[this.currentQuestionIndex];
    const selectedOption = question.options[optionIndex];

    // Store the answer
    this.answers[this.currentQuestionIndex] = {
      question: question.question,
      answer: selectedOption.label,
      data: selectedOption
    };

    // Visual feedback
    const options = document.querySelectorAll('.qf-option');
    options.forEach((opt, idx) => {
      opt.classList.toggle('qf-option--selected', idx === optionIndex);
    });

    // Advance after short delay
    setTimeout(() => {
      this.currentQuestionIndex++;
      this.renderQuestion();
    }, 300);
  },

  /**
   * Go back to previous question
   */
  goBack() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.renderQuestion();
    } else {
      // Go back to damage type selection
      this.renderDamageTypeSelector();
    }
  },

  /**
   * Calculate classification from answers
   * @returns {Object} Classification result
   */
  calculateClassification() {
    const result = {
      damageType: this.damageType,
      answers: this.answers,
      classification: {},
      lineItems: [],
      equipment: {}
    };

    switch (this.damageType) {
      case 'water':
        result.classification = this.classifyWater();
        result.equipment = this.calculateWaterEquipment();
        break;
      case 'fire':
        result.classification = this.classifyFire();
        break;
      case 'mold':
        result.classification = this.classifyMold();
        break;
    }

    result.lineItems = this.generateLineItems(result.classification);
    this.classification = result;
    return result;
  },

  /**
   * Classify water damage from answers
   */
  classifyWater() {
    let category = 1;
    let waterClass = 1;
    let hasMold = false;

    Object.values(this.answers).forEach(answer => {
      const data = answer.data;

      // Category determination
      if (data.category) {
        category = Math.max(category, data.category);
      }
      if (data.modifier === 'upgrade_category' || data.modifier === 'assume_cat3') {
        category = Math.min(category + 1, 3);
      }
      if (data.modifier === 'may_upgrade_category' && category < 3) {
        category = Math.max(category, 2);
      }

      // Class determination
      if (data.class) {
        waterClass = Math.max(waterClass, data.class);
      }

      // Mold flag
      if (data.mold === 'minor' || data.mold === 'major') {
        hasMold = true;
      }
    });

    const catInfo = IICRC_KNOWLEDGE.waterDamage.categories[category];
    const classInfo = IICRC_KNOWLEDGE.waterDamage.classes[waterClass];

    return {
      category,
      categoryName: catInfo?.name || `Category ${category}`,
      categoryDescription: catInfo?.description || '',
      class: waterClass,
      className: classInfo?.name || `Class ${waterClass}`,
      classDescription: classInfo?.characteristics?.join(', ') || '',
      hasMold,
      ppeRequired: catInfo?.ppeRequired || 'Basic',
      xactimateModifier: catInfo?.xactimateModifier || null
    };
  },

  /**
   * Classify fire damage from answers
   */
  classifyFire() {
    let sootType = 'dry';
    let extent = 'minor';
    let sootLevel = 'light';
    let hvacAffected = false;

    Object.values(this.answers).forEach(answer => {
      const data = answer.data;

      if (data.sootType) sootType = data.sootType;
      if (data.extent) extent = data.extent;
      if (data.soot) sootLevel = data.soot;
      if (data.hvac === true || data.hvac === 'possible') hvacAffected = true;
    });

    const sootInfo = IICRC_KNOWLEDGE.fireDamage.sootTypes[sootType];

    return {
      sootType,
      sootTypeName: sootInfo?.name || sootType,
      sootCharacteristics: sootInfo?.characteristics || [],
      cleaningMethod: sootInfo?.cleaning || '',
      extent,
      sootLevel,
      hvacAffected
    };
  },

  /**
   * Classify mold damage from answers
   */
  classifyMold() {
    let level = 1;
    let depth = 'surface';
    let moistureActive = false;
    let healthConcerns = false;

    Object.values(this.answers).forEach(answer => {
      const data = answer.data;

      if (data.level) level = Math.max(level, data.level);
      if (data.depth) depth = data.depth;
      if (data.moisture === 'active') moistureActive = true;
      if (data.health === 'mild' || data.health === 'significant') healthConcerns = true;
    });

    const levelInfo = IICRC_KNOWLEDGE.moldDamage.remediationLevels[`level${level}`];

    return {
      level,
      levelName: `Level ${level}`,
      size: levelInfo?.size || 'Unknown',
      ppe: levelInfo?.ppe || 'N95 respirator',
      containment: levelInfo?.containment || 'None',
      personnel: levelInfo?.personnel || 'Building maintenance',
      depth,
      moistureActive,
      healthConcerns
    };
  },

  /**
   * Calculate water drying equipment needs
   */
  calculateWaterEquipment() {
    // Default room size (will be replaced when room dimensions are added)
    const defaultSF = 200;
    const defaultHeight = 9;
    const cubicFeet = defaultSF * defaultHeight;

    const classification = this.classification?.classification || this.classifyWater();
    const waterClass = classification.class || 2;

    const factors = IICRC_KNOWLEDGE.calculations.dehumidifiers.classFactors.lgr;
    const classFactor = factors[`class${waterClass}`] || 50;

    const pints = Math.ceil(cubicFeet / classFactor);
    const airMovers = Math.ceil(defaultSF / 60); // 1 per 50-70 SF average

    return {
      cubicFeet,
      dehumPints: pints,
      airMovers,
      note: `Based on ${defaultSF} SF room. Update with actual dimensions.`
    };
  },

  /**
   * Generate line items based on classification
   * @param {Object} classification - Damage classification
   * @returns {Array} Array of line item objects
   */
  generateLineItems(classification) {
    const items = [];

    switch (this.damageType) {
      case 'water':
        items.push(...this.generateWaterLineItems(classification));
        break;
      case 'fire':
        items.push(...this.generateFireLineItems(classification));
        break;
      case 'mold':
        items.push(...this.generateMoldLineItems(classification));
        break;
    }

    return items;
  },

  /**
   * Generate water damage line items
   */
  generateWaterLineItems(classification) {
    const items = [];
    const cat = classification.category;

    // Always needed
    items.push(
      { code: 'WTRDRY', description: 'Air mover - per unit per day', quantity: 4, unit: 'EA', category: 'Equipment' },
      { code: 'WTRDHM', description: 'Dehumidifier - LGR per day', quantity: 1, unit: 'EA', category: 'Equipment' },
      { code: 'WTREQ', description: 'Equipment setup & daily monitoring', quantity: 3, unit: 'DAY', category: 'Labor' }
    );

    // Extraction
    items.push({
      code: 'WTREXT',
      description: 'Water extraction - carpet',
      quantity: 1,
      unit: 'SF',
      category: 'Extraction'
    });

    // Category-specific items
    if (cat >= 2) {
      items.push({
        code: 'WTRGRM',
        description: 'Antimicrobial application',
        quantity: 1,
        unit: 'SF',
        category: 'Treatment'
      });
    }

    if (cat >= 3) {
      items.push(
        { code: 'WTRPAD', description: 'Carpet pad removal & disposal', quantity: 1, unit: 'SF', category: 'Demo' },
        { code: 'WTRFCC', description: 'Carpet removal (non-salvageable)', quantity: 1, unit: 'SF', category: 'Demo' },
        { code: 'WTRCNTLF', description: 'Containment - poly enclosure', quantity: 1, unit: 'LF', category: 'Containment' }
      );
    }

    // Class 2+ flood cuts
    if (classification.class >= 2) {
      items.push({
        code: 'WTRDRYWLF',
        description: 'Flood cut drywall - 2ft',
        quantity: 1,
        unit: 'LF',
        category: 'Demo'
      });
    }

    // Class 3+ ceiling/insulation
    if (classification.class >= 3) {
      items.push(
        { code: 'WTRINS', description: 'Insulation removal - wall cavity', quantity: 1, unit: 'SF', category: 'Demo' }
      );
    }

    // Mold present
    if (classification.hasMold) {
      items.push(
        { code: 'HMRDIS', description: 'Antimicrobial fogging', quantity: 1, unit: 'SF', category: 'Treatment' }
      );
    }

    return items;
  },

  /**
   * Generate fire damage line items
   */
  generateFireLineItems(classification) {
    const items = [];

    // Always needed for fire
    items.push(
      { code: 'WTRNAFAN', description: 'Air scrubber - per day', quantity: 3, unit: 'DAY', category: 'Equipment' }
    );

    // Based on soot type
    if (classification.sootType === 'dry' || classification.sootType === 'synthetic') {
      items.push(
        { code: 'HEPAFSH', description: 'HEPA vacuum surfaces', quantity: 1, unit: 'SF', category: 'Cleaning' },
        { code: 'CLNSOOT', description: 'Dry soot cleaning', quantity: 1, unit: 'SF', category: 'Cleaning' }
      );
    }

    if (classification.sootType === 'wet' || classification.sootType === 'protein' || classification.sootType === 'mixed') {
      items.push(
        { code: 'CLNSOOTW', description: 'Wet soot cleaning', quantity: 1, unit: 'SF', category: 'Cleaning' }
      );
    }

    // Based on soot level
    if (classification.sootLevel === 'light' || classification.sootLevel === 'odor_only') {
      items.push(
        { code: 'CLNSMOKE', description: 'Light smoke cleaning', quantity: 1, unit: 'SF', category: 'Cleaning' }
      );
    } else if (classification.sootLevel === 'heavy' || classification.sootLevel === 'severe') {
      items.push(
        { code: 'CLNSMOKEH', description: 'Heavy smoke cleaning', quantity: 1, unit: 'SF', category: 'Cleaning' }
      );
    }

    // Deodorization
    items.push(
      { code: 'CLNFOG', description: 'Thermal fogging', quantity: 1, unit: 'SF', category: 'Deodorization' }
    );

    // HVAC affected
    if (classification.hvacAffected) {
      items.push(
        { code: 'CLNDUCT', description: 'HVAC duct cleaning', quantity: 1, unit: 'SYS', category: 'HVAC' }
      );
    }

    return items;
  },

  /**
   * Generate mold damage line items
   */
  generateMoldLineItems(classification) {
    const items = [];
    const level = classification.level;

    // Always needed for mold
    items.push(
      { code: 'HEPAFSH', description: 'HEPA vacuum surfaces', quantity: 1, unit: 'SF', category: 'Cleaning' },
      { code: 'WTRGRM', description: 'Antimicrobial application', quantity: 1, unit: 'SF', category: 'Treatment' }
    );

    // Containment for level 3+
    if (level >= 3) {
      items.push(
        { code: 'HMRCNT', description: 'Containment setup', quantity: 1, unit: 'EA', category: 'Containment' },
        { code: 'WTRCNTLF', description: 'Poly containment walls', quantity: 1, unit: 'LF', category: 'Containment' },
        { code: 'WTRNAFAN', description: 'HEPA air scrubber', quantity: 3, unit: 'DAY', category: 'Equipment' }
      );
    }

    // Deep remediation
    if (classification.depth === 'deep' || classification.depth === 'hidden') {
      items.push(
        { code: 'WTRDRYWLF', description: 'Drywall removal - affected area', quantity: 1, unit: 'LF', category: 'Demo' },
        { code: 'HMRABR', description: 'Wood framing cleaning', quantity: 1, unit: 'SF', category: 'Cleaning' }
      );
    }

    // Level 4+
    if (level >= 4) {
      items.push(
        { code: 'HMREQD', description: 'Equipment decontamination', quantity: 1, unit: 'EA', category: 'Safety' },
        { code: 'HMRDIS', description: 'Post-remediation fogging', quantity: 1, unit: 'SF', category: 'Treatment' }
      );
    }

    // Testing
    items.push(
      { code: 'HMRASBTS', description: 'Air/surface sampling', quantity: 2, unit: 'EA', category: 'Testing' }
    );

    return items;
  },

  /**
   * Show classification results
   */
  showResults() {
    const result = this.calculateClassification();
    const content = document.getElementById('questionFlowContent');
    if (!content) return;

    const classification = result.classification;
    let classificationHTML = '';
    let equipmentHTML = '';

    // Build classification display based on damage type
    switch (this.damageType) {
      case 'water':
        classificationHTML = `
          <div class="qf-result-card">
            <div class="qf-result-card__header">
              <span class="qf-result-card__label">Water Category</span>
              <span class="qf-result-card__value qf-result-card__value--cat${classification.category}">
                Category ${classification.category}
              </span>
            </div>
            <p class="qf-result-card__desc">${classification.categoryDescription}</p>
          </div>
          <div class="qf-result-card">
            <div class="qf-result-card__header">
              <span class="qf-result-card__label">Drying Class</span>
              <span class="qf-result-card__value">Class ${classification.class}</span>
            </div>
            <p class="qf-result-card__desc">${classification.classDescription}</p>
          </div>
          ${classification.hasMold ? `
            <div class="qf-result-card qf-result-card--warning">
              <span class="qf-result-card__icon">⚠️</span>
              <span>Mold present - remediation scope may apply</span>
            </div>
          ` : ''}
        `;
        equipmentHTML = `
          <div class="qf-equipment">
            <h4>Estimated Equipment</h4>
            <div class="qf-equipment__grid">
              <div class="qf-equipment__item">
                <span class="qf-equipment__value">${result.equipment.airMovers}</span>
                <span class="qf-equipment__label">Air Movers</span>
              </div>
              <div class="qf-equipment__item">
                <span class="qf-equipment__value">${Math.ceil(result.equipment.dehumPints / 110)}</span>
                <span class="qf-equipment__label">LGR Dehumidifiers</span>
              </div>
            </div>
            <p class="qf-equipment__note">${result.equipment.note}</p>
          </div>
        `;
        break;

      case 'fire':
        classificationHTML = `
          <div class="qf-result-card">
            <div class="qf-result-card__header">
              <span class="qf-result-card__label">Soot Type</span>
              <span class="qf-result-card__value">${classification.sootTypeName}</span>
            </div>
            <p class="qf-result-card__desc">${classification.cleaningMethod}</p>
          </div>
          <div class="qf-result-card">
            <div class="qf-result-card__header">
              <span class="qf-result-card__label">Damage Extent</span>
              <span class="qf-result-card__value">${classification.extent.charAt(0).toUpperCase() + classification.extent.slice(1)}</span>
            </div>
          </div>
          ${classification.hvacAffected ? `
            <div class="qf-result-card qf-result-card--warning">
              <span class="qf-result-card__icon">⚠️</span>
              <span>HVAC system may need cleaning</span>
            </div>
          ` : ''}
        `;
        break;

      case 'mold':
        classificationHTML = `
          <div class="qf-result-card">
            <div class="qf-result-card__header">
              <span class="qf-result-card__label">Remediation Level</span>
              <span class="qf-result-card__value">Level ${classification.level}</span>
            </div>
            <p class="qf-result-card__desc">Size: ${classification.size}</p>
          </div>
          <div class="qf-result-card">
            <div class="qf-result-card__header">
              <span class="qf-result-card__label">Containment</span>
              <span class="qf-result-card__value">${classification.containment}</span>
            </div>
          </div>
          <div class="qf-result-card">
            <div class="qf-result-card__header">
              <span class="qf-result-card__label">PPE Required</span>
              <span class="qf-result-card__value">${classification.ppe}</span>
            </div>
          </div>
          ${classification.moistureActive ? `
            <div class="qf-result-card qf-result-card--warning">
              <span class="qf-result-card__icon">⚠️</span>
              <span>Active moisture source - address before remediation</span>
            </div>
          ` : ''}
        `;
        break;
    }

    content.innerHTML = `
      <div class="qf-header">
        <div class="qf-badge qf-badge--${this.damageType}">${this.getDamageTypeLabel()}</div>
        <h2 class="qf-title">Assessment Complete</h2>
      </div>

      <div class="qf-results">
        ${classificationHTML}
        ${equipmentHTML}
      </div>

      <div class="qf-line-items">
        <h3 class="qf-section-title">Recommended Line Items (${result.lineItems.length})</h3>
        <div class="qf-items-list">
          ${result.lineItems.map(item => `
            <div class="qf-item">
              <span class="qf-item__code">${item.code}</span>
              <span class="qf-item__desc">${item.description}</span>
              <span class="qf-item__unit">${item.unit}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="qf-actions">
        <button class="btn btn--secondary" id="qfStartOverBtn">Start Over</button>
        <button class="btn btn--primary" id="qfAddRoomBtn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Room
        </button>
      </div>
    `;

    // Bind buttons
    document.getElementById('qfStartOverBtn')?.addEventListener('click', () => {
      this.renderDamageTypeSelector();
    });

    document.getElementById('qfAddRoomBtn')?.addEventListener('click', () => {
      this.applyToProject();
    });
  },

  /**
   * Apply classification and line items to current project
   */
  applyToProject() {
    if (!this.classification || !App.currentProject) {
      Utils.showToast('No project selected', 'error');
      return;
    }

    // Update project with classification
    App.currentProject.damageType = this.damageType;
    App.currentProject.classification = this.classification.classification;

    // Add line items (with generated IDs)
    this.classification.lineItems.forEach(item => {
      App.currentProject.lineItems.push({
        id: Utils.generateId(),
        ...item,
        addedAt: new Date().toISOString()
      });
    });

    App.currentProject.updatedAt = new Date().toISOString();
    App.saveCurrentProject();

    // Close modal and navigate to room input
    this.closeModal();
    RoomInput.open();

    Utils.showToast('Classification applied! Now add rooms.', 'success');
  }
};

// Make globally available
window.QuestionFlow = QuestionFlow;
