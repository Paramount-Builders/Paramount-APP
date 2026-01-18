/**
 * Sketch Canvas Controller
 * Paramount Builders LLC - Restoration Bid App
 *
 * Handles room sketching with walls, doors, windows, and dimensions.
 * Touch and mouse support for mobile-first experience.
 *
 * @version 1.0.0
 */

const Sketch = {
  // Canvas and context
  canvas: null,
  ctx: null,

  // Current state
  currentTool: 'select',
  isDrawing: false,
  startPoint: null,

  // Drawing data
  shapes: [],        // All shapes on canvas
  undoStack: [],     // For undo functionality
  selectedShape: null,

  // Grid settings
  gridSize: 20,      // Pixels per foot
  showGrid: true,

  // Colors
  colors: {
    grid: '#e2e8f0',
    wall: '#1a365d',
    wallPreview: 'rgba(26, 54, 93, 0.5)',
    room: 'rgba(49, 130, 206, 0.1)',
    roomStroke: '#3182ce',
    door: '#ed8936',
    window: '#3182ce',
    dimension: '#718096',
    selected: '#e53e3e'
  },

  /**
   * Initialize the sketch canvas
   */
  init() {
    this.canvas = document.getElementById('sketchCanvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.resize();
    this.bindEvents();
    this.render();
  },

  /**
   * Resize canvas to fit container
   */
  resize() {
    const container = this.canvas.parentElement;
    const rect = container.getBoundingClientRect();

    // Set display size
    this.canvas.style.width = '100%';
    this.canvas.style.height = '400px';

    // Set actual size for retina displays
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = 400 * dpr;

    // Scale context for retina
    this.ctx.scale(dpr, dpr);

    this.render();
  },

  /**
   * Bind event listeners
   */
  bindEvents() {
    // Mouse events
    this.canvas.addEventListener('mousedown', (e) => this.handleStart(e));
    this.canvas.addEventListener('mousemove', (e) => this.handleMove(e));
    this.canvas.addEventListener('mouseup', (e) => this.handleEnd(e));
    this.canvas.addEventListener('mouseleave', (e) => this.handleEnd(e));

    // Touch events
    this.canvas.addEventListener('touchstart', (e) => this.handleStart(e), { passive: false });
    this.canvas.addEventListener('touchmove', (e) => this.handleMove(e), { passive: false });
    this.canvas.addEventListener('touchend', (e) => this.handleEnd(e));
    this.canvas.addEventListener('touchcancel', (e) => this.handleEnd(e));

    // Window resize
    window.addEventListener('resize', () => this.resize());
  },

  /**
   * Get point from event (mouse or touch)
   */
  getPoint(e) {
    const rect = this.canvas.getBoundingClientRect();
    let x, y;

    if (e.touches && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    // Snap to grid if enabled
    if (this.showGrid) {
      x = Math.round(x / this.gridSize) * this.gridSize;
      y = Math.round(y / this.gridSize) * this.gridSize;
    }

    return { x, y };
  },

  /**
   * Handle drawing start
   */
  handleStart(e) {
    e.preventDefault();
    const point = this.getPoint(e);

    if (this.currentTool === 'select') {
      this.selectShapeAt(point);
      return;
    }

    this.isDrawing = true;
    this.startPoint = point;
  },

  /**
   * Handle drawing move
   */
  handleMove(e) {
    if (!this.isDrawing) return;
    e.preventDefault();

    const point = this.getPoint(e);
    this.render();
    this.drawPreview(point);
  },

  /**
   * Handle drawing end
   */
  handleEnd(e) {
    if (!this.isDrawing) return;

    const point = this.getPoint(e.changedTouches ? e.changedTouches[0] : e);
    this.completeShape(point);

    this.isDrawing = false;
    this.startPoint = null;
    this.render();
  },

  /**
   * Draw preview while dragging
   */
  drawPreview(endPoint) {
    if (!this.startPoint) return;

    const ctx = this.ctx;
    ctx.save();

    switch (this.currentTool) {
      case 'wall':
        ctx.strokeStyle = this.colors.wallPreview;
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(this.startPoint.x, this.startPoint.y);
        ctx.lineTo(endPoint.x, endPoint.y);
        ctx.stroke();

        // Show length
        const wallLen = this.getDistance(this.startPoint, endPoint);
        const wallFeet = (wallLen / this.gridSize).toFixed(1);
        const midX = (this.startPoint.x + endPoint.x) / 2;
        const midY = (this.startPoint.y + endPoint.y) / 2;
        ctx.fillStyle = this.colors.dimension;
        ctx.font = '12px sans-serif';
        ctx.fillText(`${wallFeet} ft`, midX + 5, midY - 5);
        break;

      case 'room':
        const width = endPoint.x - this.startPoint.x;
        const height = endPoint.y - this.startPoint.y;

        ctx.fillStyle = this.colors.room;
        ctx.strokeStyle = this.colors.roomStroke;
        ctx.lineWidth = 2;
        ctx.fillRect(this.startPoint.x, this.startPoint.y, width, height);
        ctx.strokeRect(this.startPoint.x, this.startPoint.y, width, height);

        // Show dimensions
        const roomW = Math.abs(width / this.gridSize).toFixed(1);
        const roomH = Math.abs(height / this.gridSize).toFixed(1);
        ctx.fillStyle = this.colors.dimension;
        ctx.font = '12px sans-serif';
        ctx.fillText(`${roomW} x ${roomH} ft`, this.startPoint.x + 5, this.startPoint.y + 15);
        break;

      case 'door':
      case 'window':
        ctx.strokeStyle = this.currentTool === 'door' ? this.colors.door : this.colors.window;
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(this.startPoint.x, this.startPoint.y);
        ctx.lineTo(endPoint.x, endPoint.y);
        ctx.stroke();
        break;

      case 'dimension':
        ctx.strokeStyle = this.colors.dimension;
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(this.startPoint.x, this.startPoint.y);
        ctx.lineTo(endPoint.x, endPoint.y);
        ctx.stroke();
        ctx.setLineDash([]);

        const dimLen = this.getDistance(this.startPoint, endPoint);
        const dimFeet = (dimLen / this.gridSize).toFixed(1);
        ctx.fillStyle = this.colors.dimension;
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText(`${dimFeet} ft`, (this.startPoint.x + endPoint.x) / 2 + 5, (this.startPoint.y + endPoint.y) / 2 - 5);
        break;
    }

    ctx.restore();
  },

  /**
   * Complete shape when drawing ends
   */
  completeShape(endPoint) {
    if (!this.startPoint) return;

    // Minimum size check
    const dist = this.getDistance(this.startPoint, endPoint);
    if (dist < 10) return;

    const shape = {
      id: Date.now(),
      type: this.currentTool,
      start: { ...this.startPoint },
      end: { ...endPoint }
    };

    // Add type-specific properties
    switch (this.currentTool) {
      case 'wall':
        shape.length = dist / this.gridSize;
        break;
      case 'room':
        shape.width = Math.abs(endPoint.x - this.startPoint.x) / this.gridSize;
        shape.height = Math.abs(endPoint.y - this.startPoint.y) / this.gridSize;
        shape.area = shape.width * shape.height;
        break;
      case 'dimension':
        shape.length = dist / this.gridSize;
        break;
    }

    // Save for undo
    this.undoStack.push([...this.shapes]);
    this.shapes.push(shape);
  },

  /**
   * Get distance between two points
   */
  getDistance(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  },

  /**
   * Select shape at point
   */
  selectShapeAt(point) {
    this.selectedShape = null;

    // Check shapes in reverse order (top to bottom)
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i];

      if (this.isPointNearShape(point, shape)) {
        this.selectedShape = shape;
        break;
      }
    }

    this.render();
  },

  /**
   * Check if point is near a shape
   */
  isPointNearShape(point, shape) {
    const threshold = 10;

    switch (shape.type) {
      case 'wall':
      case 'door':
      case 'window':
      case 'dimension':
        return this.distanceToLine(point, shape.start, shape.end) < threshold;

      case 'room':
        const minX = Math.min(shape.start.x, shape.end.x);
        const maxX = Math.max(shape.start.x, shape.end.x);
        const minY = Math.min(shape.start.y, shape.end.y);
        const maxY = Math.max(shape.start.y, shape.end.y);
        return point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY;
    }

    return false;
  },

  /**
   * Distance from point to line segment
   */
  distanceToLine(point, lineStart, lineEnd) {
    const A = point.x - lineStart.x;
    const B = point.y - lineStart.y;
    const C = lineEnd.x - lineStart.x;
    const D = lineEnd.y - lineStart.y;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;

    if (lenSq !== 0) param = dot / lenSq;

    let xx, yy;

    if (param < 0) {
      xx = lineStart.x;
      yy = lineStart.y;
    } else if (param > 1) {
      xx = lineEnd.x;
      yy = lineEnd.y;
    } else {
      xx = lineStart.x + param * C;
      yy = lineStart.y + param * D;
    }

    return Math.sqrt(Math.pow(point.x - xx, 2) + Math.pow(point.y - yy, 2));
  },

  /**
   * Set current tool
   */
  setTool(tool) {
    this.currentTool = tool;
    this.selectedShape = null;
    this.render();

    // Update UI
    document.querySelectorAll('.sketch-tool').forEach(btn => {
      btn.classList.toggle('sketch-tool--active', btn.dataset.tool === tool);
    });
  },

  /**
   * Undo last action
   */
  undo() {
    if (this.undoStack.length === 0) {
      Utils.showToast('Nothing to undo', 'info');
      return;
    }

    this.shapes = this.undoStack.pop();
    this.selectedShape = null;
    this.render();
    Utils.showToast('Undone', 'info');
  },

  /**
   * Clear all shapes
   */
  clear() {
    if (this.shapes.length === 0) return;

    this.undoStack.push([...this.shapes]);
    this.shapes = [];
    this.selectedShape = null;
    this.render();
    Utils.showToast('Canvas cleared', 'info');
  },

  /**
   * Delete selected shape
   */
  deleteSelected() {
    if (!this.selectedShape) return;

    this.undoStack.push([...this.shapes]);
    this.shapes = this.shapes.filter(s => s.id !== this.selectedShape.id);
    this.selectedShape = null;
    this.render();
  },

  /**
   * Render the canvas
   */
  render() {
    const ctx = this.ctx;
    const width = this.canvas.width / (window.devicePixelRatio || 1);
    const height = this.canvas.height / (window.devicePixelRatio || 1);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid
    if (this.showGrid) {
      this.drawGrid(width, height);
    }

    // Draw all shapes
    this.shapes.forEach(shape => {
      this.drawShape(shape, shape === this.selectedShape);
    });
  },

  /**
   * Draw grid
   */
  drawGrid(width, height) {
    const ctx = this.ctx;
    ctx.strokeStyle = this.colors.grid;
    ctx.lineWidth = 1;

    // Vertical lines
    for (let x = 0; x <= width; x += this.gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y <= height; y += this.gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  },

  /**
   * Draw a shape
   */
  drawShape(shape, isSelected) {
    const ctx = this.ctx;
    ctx.save();

    const strokeColor = isSelected ? this.colors.selected : null;

    switch (shape.type) {
      case 'wall':
        ctx.strokeStyle = strokeColor || this.colors.wall;
        ctx.lineWidth = isSelected ? 6 : 4;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(shape.start.x, shape.start.y);
        ctx.lineTo(shape.end.x, shape.end.y);
        ctx.stroke();
        break;

      case 'room':
        const roomWidth = shape.end.x - shape.start.x;
        const roomHeight = shape.end.y - shape.start.y;

        ctx.fillStyle = this.colors.room;
        ctx.strokeStyle = strokeColor || this.colors.roomStroke;
        ctx.lineWidth = isSelected ? 3 : 2;
        ctx.fillRect(shape.start.x, shape.start.y, roomWidth, roomHeight);
        ctx.strokeRect(shape.start.x, shape.start.y, roomWidth, roomHeight);

        // Room label
        ctx.fillStyle = this.colors.dimension;
        ctx.font = '12px sans-serif';
        ctx.fillText(`${shape.width.toFixed(1)} x ${shape.height.toFixed(1)} ft`, shape.start.x + 5, shape.start.y + 15);
        ctx.fillText(`${shape.area.toFixed(0)} SF`, shape.start.x + 5, shape.start.y + 30);
        break;

      case 'door':
        ctx.strokeStyle = strokeColor || this.colors.door;
        ctx.lineWidth = isSelected ? 8 : 6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(shape.start.x, shape.start.y);
        ctx.lineTo(shape.end.x, shape.end.y);
        ctx.stroke();

        // Door swing arc
        const doorLen = this.getDistance(shape.start, shape.end);
        const doorAngle = Math.atan2(shape.end.y - shape.start.y, shape.end.x - shape.start.x);
        ctx.strokeStyle = strokeColor || this.colors.door;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(shape.start.x, shape.start.y, doorLen, doorAngle, doorAngle + Math.PI / 2);
        ctx.stroke();
        break;

      case 'window':
        ctx.strokeStyle = strokeColor || this.colors.window;
        ctx.lineWidth = isSelected ? 8 : 6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(shape.start.x, shape.start.y);
        ctx.lineTo(shape.end.x, shape.end.y);
        ctx.stroke();

        // Window center line
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(shape.start.x, shape.start.y);
        ctx.lineTo(shape.end.x, shape.end.y);
        ctx.stroke();
        break;

      case 'dimension':
        ctx.strokeStyle = strokeColor || this.colors.dimension;
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(shape.start.x, shape.start.y);
        ctx.lineTo(shape.end.x, shape.end.y);
        ctx.stroke();
        ctx.setLineDash([]);

        // Dimension text
        ctx.fillStyle = strokeColor || this.colors.dimension;
        ctx.font = 'bold 14px sans-serif';
        const midX = (shape.start.x + shape.end.x) / 2;
        const midY = (shape.start.y + shape.end.y) / 2;
        ctx.fillText(`${shape.length.toFixed(1)} ft`, midX + 5, midY - 5);

        // End caps
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(shape.start.x, shape.start.y - 5);
        ctx.lineTo(shape.start.x, shape.start.y + 5);
        ctx.moveTo(shape.end.x, shape.end.y - 5);
        ctx.lineTo(shape.end.x, shape.end.y + 5);
        ctx.stroke();
        break;
    }

    ctx.restore();
  },

  /**
   * Get sketch data for saving
   */
  getData() {
    return {
      shapes: this.shapes,
      gridSize: this.gridSize
    };
  },

  /**
   * Load sketch data
   */
  loadData(data) {
    if (data && data.shapes) {
      this.shapes = data.shapes;
      this.gridSize = data.gridSize || 20;
      this.render();
    }
  },

  /**
   * Calculate total room area from shapes
   */
  getTotalArea() {
    return this.shapes
      .filter(s => s.type === 'room')
      .reduce((sum, room) => sum + room.area, 0);
  },

  /**
   * Calculate total wall length from shapes
   */
  getTotalWallLength() {
    return this.shapes
      .filter(s => s.type === 'wall')
      .reduce((sum, wall) => sum + wall.length, 0);
  }
};

// Make globally available
window.Sketch = Sketch;
