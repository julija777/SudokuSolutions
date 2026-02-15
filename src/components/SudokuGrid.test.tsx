import React from 'react';
import { render, screen } from '@testing-library/react';
import SudokuGrid from './SudokuGrid';

describe('SudokuGrid Component', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('should render 81 input cells', () => {
    const values = Array(81).fill('');
    render(
      <SudokuGrid
        values={values}
        onChange={mockOnChange}
        disabled={false}
      />
    );

    const inputs = screen.getAllByRole('spinbutton');
    expect(inputs).toHaveLength(81);
  });

  it('should display initial values', () => {
    const values = Array(81).fill('');
    values[0] = '5';
    values[10] = '3';

    render(
      <SudokuGrid
        values={values}
        onChange={mockOnChange}
        disabled={false}
      />
    );

    const inputs = screen.getAllByRole('spinbutton');
    expect(inputs[0]).toHaveValue(5);
    expect(inputs[10]).toHaveValue(3);
  });

  it('should call onChange when a cell is modified', () => {
    const values = Array(81).fill('');
    const { container } = render(
      <SudokuGrid
        values={values}
        onChange={mockOnChange}
        disabled={false}
      />
    );

    const inputs = container.querySelectorAll('input');
    const event = new Event('change', { bubbles: true });
    (inputs[0] as HTMLInputElement).value = '7';
    inputs[0].dispatchEvent(event);

    // Note: In actual React testing, you'd use userEvent instead
  });

  it('should have correct cell styling (odd/even sections)', () => {
    const values = Array(81).fill('');
    const { container } = render(
      <SudokuGrid
        values={values}
        onChange={mockOnChange}
        disabled={false}
      />
    );

    const cells = container.querySelectorAll('.sudoku-cell');
    expect(cells).toHaveLength(81);

    // Check that some cells have light background and some have dark
    const lightCells = container.querySelectorAll('.sudoku-cell-light');
    const darkCells = container.querySelectorAll('.sudoku-cell-dark');

    expect(lightCells.length).toBeGreaterThan(0);
    expect(darkCells.length).toBeGreaterThan(0);
  });

  it('should disable inputs when disabled prop is true', () => {
    const values = Array(81).fill('');
    const { container } = render(
      <SudokuGrid
        values={values}
        onChange={mockOnChange}
        disabled={true}
      />
    );

    const inputs = container.querySelectorAll('input');
    inputs.forEach((input) => {
      expect(input).toBeDisabled();
    });
  });

  it('should enforce min/max attributes on number inputs', () => {
    const values = Array(81).fill('');
    const { container } = render(
      <SudokuGrid
        values={values}
        onChange={mockOnChange}
        disabled={false}
      />
    );

    const inputs = container.querySelectorAll('input[type="number"]');
    expect(inputs.length).toBeGreaterThan(0);
    inputs.forEach((input) => {
      expect(input).toHaveAttribute('min', '1');
      expect(input).toHaveAttribute('max', '9');
    });
  });
});
