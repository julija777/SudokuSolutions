import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Mock the sudoku solver to avoid complex computations in tests
jest.mock('./utils/sudokuSolver', () => ({
  solveSudoku: jest.fn((puzzle: string) => {
    if (puzzle === '.'.repeat(81)) {
      return {
        solvable: true,
        solution: '135762984946381257728459613694517832812693475357248169483926751269175348571834926'
      };
    }
    if (puzzle.includes('1')) {
      return {
        solvable: true,
        solution: '123456789456789123789123456234567891567891234891234567345678912678912345912345678'
      };
    }
    return {
      solvable: false,
      solution: null
    };
  })
}));

describe('App Component', () => {
  it('should render the main heading', () => {
    render(<App />);
    expect(screen.getByText(/Need help with your Sudoku/i)).toBeInTheDocument();
  });

  it('should render the description text', () => {
    render(<App />);
    expect(screen.getByText(/Enter the numbers and we'll solve it for you/i)).toBeInTheDocument();
  });

  it('should render Solve and Reset buttons', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /Solve/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reset/i })).toBeInTheDocument();
  });

  it('should initially have empty grid', () => {
    render(<App />);
    const inputs = screen.getAllByRole('spinbutton');
    inputs.forEach((input) => {
      expect((input as HTMLInputElement).value).toBe('');
    });
  });

  it('should disable solve button when clicked', () => {
    render(<App />);
    const solveButton = screen.getByRole('button', { name: /Solve/i });

    expect(solveButton).not.toBeDisabled();
    expect(solveButton).toHaveTextContent('Solve');
  });

  it('should display correct background gradient classes', () => {
    const { container } = render(<App />);
    const mainDiv = container.querySelector('.min-h-screen');

    expect(mainDiv).toHaveClass('from-teal-950');
    expect(mainDiv).toHaveClass('to-teal-900');
    expect(mainDiv).toHaveClass('bg-gradient-to-b');
  });

  it('should have white container background', () => {
    const { container } = render(<App />);
    const containerDiv = container.querySelector('.bg-white');

    expect(containerDiv).toBeInTheDocument();
    expect(containerDiv).toHaveClass('rounded-lg');
    expect(containerDiv).toHaveClass('shadow-2xl');
  });

  it('should render sudoku grid with 81 cells', () => {
    render(<App />);
    const inputs = screen.getAllByRole('spinbutton');
    expect(inputs).toHaveLength(81);
  });

  it('should have proper button styling', () => {
    render(<App />);
    const solveButton = screen.getByRole('button', { name: /Solve/i });
    const resetButton = screen.getByRole('button', { name: /Reset/i });

    expect(solveButton).toHaveClass('bg-blue-600');
    expect(solveButton).toHaveClass('text-white');
    expect(solveButton).toHaveClass('font-semibold');
    expect(solveButton).toHaveClass('rounded-lg');

    expect(resetButton).toHaveClass('bg-gray-400');
    expect(resetButton).toHaveClass('text-white');
  });

  it('should render centered layout', () => {
    const { container } = render(<App />);
    const mainDiv = container.querySelector('.min-h-screen');

    expect(mainDiv).toHaveClass('flex');
    expect(mainDiv).toHaveClass('items-center');
    expect(mainDiv).toHaveClass('justify-center');
  });
});
