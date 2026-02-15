import React, { useState } from 'react';
import SudokuGrid from './components/SudokuGrid';
import SolutionMessage from './components/SolutionMessage';
import { solveSudoku } from './utils/sudokuSolver';
import './index.css';

const App: React.FC = () => {
  const [gridValues, setGridValues] = useState<string[]>(Array(81).fill(''));
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  console.log('🎮 Sudoku Solver - Frontend Only (No Backend)');

  const handleCellChange = (index: number, value: string): void => {
    const newValues = [...gridValues];
    newValues[index] = value;
    setGridValues(newValues);
  };

  const joinValues = (): string[] => {
    return gridValues.map((val) => val || '.');
  };

  const solve = (): void => {
    try {
      setLoading(true);
      setMessage('');

      console.log('🧩 Starting sudoku solve...');
      const submission = joinValues();
      const puzzleString = submission.join('');

      console.log('📝 Puzzle to solve:', puzzleString);

      // Call local sudoku solver - NO API CALL
      const result = solveSudoku(puzzleString);

      console.log('📊 Solver result:', result);

      if (result.solvable && result.solution) {
        setGridValues(result.solution.split(''));
        setIsSolved(true);
        setMessage('✓ Here you are! We have got the solution for you!');
      } else {
        console.warn('⚠️ Puzzle is not solvable');
        setMessage(
          '✗ Seems there is no solution for this set. Check if you got your numbers in the right positions and try again!'
        );
      }
    } catch (error) {
      console.error('❌ Error:', error);
      setMessage('✗ Error solving the puzzle. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const reset = (): void => {
    setGridValues(Array(81).fill(''));
    setIsSolved(false);
    setMessage('');
    console.log('🔄 Grid reset');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-950 to-teal-900 flex items-center justify-center py-8">
      <div className="w-full max-w-2xl px-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">Need help with your Sudoku?</h1>
          <p className="text-xl text-blue-100">Enter the numbers and we'll solve it for you!</p>
        </div>

        <div className="bg-white rounded-lg shadow-2xl p-8">
          <SudokuGrid values={gridValues} onChange={handleCellChange} disabled={isSolved} />

          <div className="flex gap-4 justify-center mb-6">
            <button
              onClick={solve}
              disabled={loading}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Solving...' : 'Solve'}
            </button>
            <button
              onClick={reset}
              className="px-8 py-3 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition-colors"
            >
              Reset
            </button>
          </div>

          {message && <SolutionMessage message={message} />}
        </div>
      </div>
    </div>
  );
};

export default App;
