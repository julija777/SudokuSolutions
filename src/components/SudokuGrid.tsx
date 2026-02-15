import React from 'react';

interface SudokuGridProps {
  values: string[];
  onChange: (index: number, value: string) => void;
  disabled: boolean;
}

const SudokuGrid: React.FC<SudokuGridProps> = ({ values, onChange, disabled }) => {
  const isOddSection = (index: number): boolean => {
    return (
      ((index % 9 === 0 || index % 9 === 1 || index % 9 === 2) && index < 21) ||
      ((index % 9 === 6 || index % 9 === 7 || index % 9 === 8) && index < 27) ||
      ((index % 9 === 3 || index % 9 === 4 || index % 9 === 5) && index > 27 && index < 53) ||
      ((index % 9 === 0 || index % 9 === 1 || index % 9 === 2) && index > 53) ||
      ((index % 9 === 6 || index % 9 === 7 || index % 9 === 8) && index > 53)
    );
  };

  return (
    <div className="sudoku-grid mb-8">
      {values.map((value, i) => (
        <input
          key={i}
          type="number"
          min="1"
          max="9"
          value={value}
          onChange={(e) => onChange(i, e.target.value)}
          disabled={disabled}
          className={`sudoku-cell ${isOddSection(i) ? 'sudoku-cell-light' : 'sudoku-cell-dark'}`}
        />
      ))}
    </div>
  );
};

export default SudokuGrid;
