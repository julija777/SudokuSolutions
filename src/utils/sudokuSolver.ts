/**
 * Sudoku Solver using Backtracking Algorithm
 * Solves standard 9x9 sudoku puzzles locally
 */

interface SolveResult {
  solvable: boolean;
  solution: string | null;
  error?: string;
}

const isValid = (board: number[][], row: number, col: number, num: number): boolean => {
  // Check row
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) return false;
  }

  // Check column
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) return false;
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = boxRow; i < boxRow + 3; i++) {
    for (let j = boxCol; j < boxCol + 3; j++) {
      if (board[i][j] === num) return false;
    }
  }

  return true;
};

const solve = (board: number[][]): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solve(board)) {
              return true;
            }
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
};

const parsePuzzleString = (puzzleString: string): number[][] => {
  const board: number[][] = [];
  let index = 0;

  for (let i = 0; i < 9; i++) {
    board[i] = [];
    for (let j = 0; j < 9; j++) {
      const char = puzzleString[index];
      board[i][j] = char === '.' ? 0 : parseInt(char);
      index++;
    }
  }

  return board;
};

const boardToString = (board: number[][]): string => {
  let result = '';
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      result += board[i][j];
    }
  }
  return result;
};

export const solveSudoku = (puzzleString: string): SolveResult => {
  console.log('🧩 Solving sudoku locally with backtracking algorithm...');
  console.log('📋 Input puzzle:', puzzleString);

  // Validate puzzle length
  if (puzzleString.length !== 81) {
    console.log('❌ Invalid puzzle length. Expected 81 characters, got', puzzleString.length);
    return {
      solvable: false,
      solution: null
    };
  }

  try {
    const board = parsePuzzleString(puzzleString);
    const boardCopy = JSON.parse(JSON.stringify(board)) as number[][];

    const startTime = performance.now();
    const isSolved = solve(boardCopy);
    const endTime = performance.now();

    if (isSolved) {
      const solution = boardToString(boardCopy);
      console.log('✅ Puzzle solved locally in', (endTime - startTime).toFixed(2), 'ms');
      console.log('🔍 Solution:', solution);
      return {
        solvable: true,
        solution: solution
      };
    } else {
      console.log('❌ Puzzle could not be solved');
      return {
        solvable: false,
        solution: null
      };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Error solving puzzle:', error);
    return {
      solvable: false,
      solution: null,
      error: errorMessage
    };
  }
};
