import { solveSudoku } from './sudokuSolver';

describe('Sudoku Solver', () => {
  describe('solveSudoku', () => {
    it('should solve a valid sudoku puzzle', () => {
      const puzzle = '....27......8..6.1.3.4....9....84..7.52...81.3..61....9....8.4.1.7..5......23....';
      const result = solveSudoku(puzzle);

      expect(result.solvable).toBe(true);
      expect(result.solution).toBeDefined();
      expect(result.solution).toMatch(/^[1-9]{81}$/);
    });

    it('should return solvable false for unsolvable puzzle', () => {
      const unsolvablePuzzle = '1....7.9.9...928....4.1.7.7.1...9.27.8...1...9' + '.....5.6....5.4......9.4.2...7';
      const result = solveSudoku(unsolvablePuzzle);

      expect(result.solvable).toBeFalsy();
      expect(result.solution).toBeNull();
    });

    it('should solve an easy puzzle quickly', () => {
      const easyPuzzle = '....27......8..6.1.3.4....9....84..7.52...81.3..61....9....8.4.1.7..5......23....';
      const start = performance.now();
      const result = solveSudoku(easyPuzzle);
      const duration = performance.now() - start;

      expect(result.solvable).toBe(true);
      expect(result.solution).toBeDefined();
      expect(duration).toBeLessThan(500); // Should solve in less than 500ms
    });

    it('should validate sudoku rules - no duplicates in rows', () => {
      const puzzle = '....27......8..6.1.3.4....9....84..7.52...81.3..61....9....8.4.1.7..5......23....';
      const result = solveSudoku(puzzle);

      if (result.solution) {
        const solution = result.solution;
        // Check each row has digits 1-9
        for (let row = 0; row < 9; row++) {
          const rowDigits = new Set<string>();
          for (let col = 0; col < 9; col++) {
            const digit = solution[row * 9 + col];
            expect(rowDigits.has(digit)).toBe(false);
            rowDigits.add(digit);
          }
          expect(rowDigits.size).toBe(9);
        }
      }
    });

    it('should validate sudoku rules - no duplicates in columns', () => {
      const puzzle = '....27......8..6.1.3.4....9....84..7.52...81.3..61....9....8.4.1.7..5......23....';
      const result = solveSudoku(puzzle);

      if (result.solution) {
        const solution = result.solution;
        // Check each column has digits 1-9
        for (let col = 0; col < 9; col++) {
          const colDigits = new Set<string>();
          for (let row = 0; row < 9; row++) {
            const digit = solution[row * 9 + col];
            expect(colDigits.has(digit)).toBe(false);
            colDigits.add(digit);
          }
          expect(colDigits.size).toBe(9);
        }
      }
    });

    it('should handle empty puzzle string', () => {
      const emptyPuzzle = '.'.repeat(81);
      const result = solveSudoku(emptyPuzzle);

      expect(result.solvable).toBe(true);
      expect(result.solution).toBeDefined();
      expect(result.solution).toMatch(/^[1-9]{81}$/);
    });

    it('should handle short puzzle string gracefully', () => {
      const invalidPuzzle = '123'; // Too short
      const result = solveSudoku(invalidPuzzle);

      expect(result.solvable).toBe(false);
      expect(result.solution).toBeNull();
    });
  });
});
