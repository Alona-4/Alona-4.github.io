// Get the grid container
const gridContainer = document.getElementById("grid");

// Grid dimensions
const rows = 15;
const cols = 20;

// Create the grid dynamically
function createGrid() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      gridContainer.appendChild(cell);
    }
  }
}

// Initialize the grid
createGrid();

// Get all cells
const cells = document.querySelectorAll(".cell");

// Convert a 2D (row, col) position into a 1D index
const getCellIndex = (row, col) => row * cols + col;

// Raindrop state
const activeDrops = Array(cols).fill(-1); // Each column can have one active drop
const colorSequence = [
  "rgb(255, 0, 255)", // Pink
  "rgb(127, 0, 255)", // Purple
  "rgb(0, 0, 255)",   // Blue
  "rgb(0, 128, 255)", // Light Blue
  "rgb(0, 255, 255)", // Cyan
  "rgb(0, 255, 128)", // Aqua
  "rgb(0, 255, 0)",   // Green
  "rgb(128, 255, 0)", // Lime
  "rgb(255, 255, 0)", // Yellow
  "rgb(255, 128, 0)", // Orange
  "rgb(255, 0, 0)",   // Red
  "rgb(255, 0, 127)", // Magenta
];

let currentColorIndex = 0;

// Function to get the next color in the sequence
function updateColor() {
  currentColorIndex = (currentColorIndex + 1) % colorSequence.length;
}
// Function to simulate raindrop movement with fading trail
function moveRaindrops() {
  // Clear all cells first
  cells.forEach((cell) => {
    cell.style.backgroundColor = ""; // Reset the color
  });

  // Move drops downward
  for (let col = 0; col < cols; col++) {
    if (activeDrops[col] >= 0) {
      activeDrops[col]++; // Move the drop one row down

      // Apply color trail for the current column
      for (let i = 0; i < 4; i++) { // Create a trail of 4 cells
        const row = activeDrops[col] - i;
        if (row >= 0 && row < rows) {
          const cellIndex = getCellIndex(row, col);

          // Set color based on trail intensity
          const intensity = 255 - i * 60; // Decrease brightness
          cells[cellIndex].style.backgroundColor = colorSequence[currentColorIndex]; // Pink shades
          cells[cellIndex].style.transition = "background-color 0.5s ease"; // Smooth color transition
        }
      }

      // Reset the drop once it goes out of bounds
      if (activeDrops[col] >= rows) {
        activeDrops[col] = -1;
      }
    }
  }

  // Randomly start new drops at the top of the grid
  if (Math.random() > 0.7) { // Adjust probability for more/less frequent raindrops
    const randomCol = Math.floor(Math.random() * cols);
    if (activeDrops[randomCol] === -1) {
      activeDrops[randomCol] = 0; // Start a new drop at the top
    }
  }
}

// Start the raindrop animation
setInterval(moveRaindrops, 100); // Adjust speed (200ms)
setInterval(updateColor, 5000);