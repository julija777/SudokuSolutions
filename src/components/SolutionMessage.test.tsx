import React from 'react';
import { render, screen } from '@testing-library/react';
import SolutionMessage from './SolutionMessage';

describe('SolutionMessage Component', () => {
  it('should render success message with correct styling', () => {
    const message = '✓ Here you are! We have got the solution for you!';
    render(<SolutionMessage message={message} />);

    const messageElement = screen.getByText(message);
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveClass('bg-green-100');
    expect(messageElement).toHaveClass('text-green-800');
    expect(messageElement).toHaveClass('border-green-300');
  });

  it('should render error message with correct styling', () => {
    const message = '✗ Seems there is no solution for this set.';
    render(<SolutionMessage message={message} />);

    const messageElement = screen.getByText(message);
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveClass('bg-red-100');
    expect(messageElement).toHaveClass('text-red-800');
    expect(messageElement).toHaveClass('border-red-300');
  });

  it('should have correct base styling classes', () => {
    const message = '✓ Test message';
    const { container } = render(<SolutionMessage message={message} />);

    const messageDiv = container.firstChild;
    expect(messageDiv).toHaveClass('p-4');
    expect(messageDiv).toHaveClass('rounded-lg');
    expect(messageDiv).toHaveClass('text-center');
    expect(messageDiv).toHaveClass('text-lg');
    expect(messageDiv).toHaveClass('font-semibold');
  });

  it('should correctly identify success message by checkmark', () => {
    const successMessages = [
      '✓ Success!',
      '✓ Puzzle solved',
      '✓ Here you are!'
    ];

    successMessages.forEach((msg) => {
      const { container } = render(<SolutionMessage message={msg} />);
      const messageDiv = container.firstChild;
      expect(messageDiv).toHaveClass('bg-green-100');
    });
  });

  it('should correctly identify error message by X mark', () => {
    const errorMessages = [
      '✗ Error!',
      '✗ No solution',
      '✗ Invalid puzzle'
    ];

    errorMessages.forEach((msg) => {
      const { container } = render(<SolutionMessage message={msg} />);
      const messageDiv = container.firstChild;
      expect(messageDiv).toHaveClass('bg-red-100');
    });
  });
});
