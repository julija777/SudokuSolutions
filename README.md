# 🧩 Sudoku Solver

Web application that solves Sudoku puzzles instantly using a local backtracking algorithm. 
Built with **React**, **TypeScript**, and **Tailwind CSS**

## ✨ Features

- **Instant Solving** - Solves sudoku puzzles using an optimized backtracking algorithm
- **No Backend Required** - Everything runs locally in your browser
- **Type-Safe** - Written entirely in TypeScript for reliability
- **Offline Capable** - No internet connection needed after initial load
- **Zero Dependencies for Solving** - No external APIs, pure algorithm

## 🚀 Live Demo

Try it now: **[Sudoku Solver on Vercel](https://sudoku-solver-sandy.vercel.app/)**

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS + PostCSS
- **Build Tool:** React Scripts (Create React App)
- **Algorithm:** Backtracking with constraint validation
- **Deployment:** Vercel
- **Package Manager:** npm

## 📦 Installation & Setup

### Prerequisites
- Node.js 20.x or higher
- npm or yarn

### Quick Start

```bash
# Clone the repository
git clone https://github.com/julija777/SudokuSolutions.git
cd SudokuSolutions

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at **http://localhost:3000**

## 🎮 How to Use

1. **Enter Numbers:** 
Click on the grid squares and enter known Sudoku numbers (1-9)
2. **Solve:** Click the "Solve" button to instantly solve the puzzle
3. **Reset:** Click "Reset" to clear the grid and start over
4. **View Solution:** The solved puzzle will populate in the grid


## ✅ Testing

The project includes Jest test suite:

```bash
# Run all tests
npm test

# Run tests without watch mode
npm test -- --watchAll=false
```

## 📁 Project Structure

```
src/
├── App.tsx                 # Main application component
├── index.tsx               # React entry point
├── index.css               # Global styles with Tailwind
├── components/
│   ├── SudokuGrid.tsx      # 9x9 grid component
│   └── SolutionMessage.tsx # Solution feedback component
└── utils/
    └── sudokuSolver.ts     # Sudoku solving algorithm
```

## 🧠 Algorithm

The Sudoku solver uses a **backtracking algorithm** with constraint validation:

1. Find an empty cell
2. Try numbers 1-9
3. Validate against Sudoku rules:
   - No duplicates in row
   - No duplicates in column
   - No duplicates in 3x3 box
4. Recursively solve the rest
5. Backtrack if no valid number found

**Performance:** Most puzzles solve in **< 50ms**

## 🎨 UI Features

- **Responsive Grid:** Adapts from mobile (full width) to desktop (centered max-width)
- **Alternating Colors:** Light blue/white cells for visual clarity
- **Bold Box Borders:** 3x3 Sudoku sections clearly defined
- **Loading States:** Visual feedback while solving
- **Success/Error Messages:** Clear puzzle status messages
- **Dark Teal Theme:** Professional gradient background


## 📝 Environment

- **Node.js:** 20.11.0 (LTS)
- **npm:** 10.x
- **React:** 18.2.0
- **TypeScript:** 4.9.5
- **Tailwind CSS:** 3.2.4

---

Made with ❤️ by Julija777
