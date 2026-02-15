import React, { ReactNode } from 'react';

interface SolutionMessageProps {
  message: string;
}

const SolutionMessage: React.FC<SolutionMessageProps> = ({ message }) => {
  const isSuccess = message.includes('✓');

  return (
    <div
      className={`p-4 rounded-lg text-center text-lg font-semibold ${
        isSuccess
          ? 'bg-green-100 text-green-800 border border-green-300'
          : 'bg-red-100 text-red-800 border border-red-300'
      }`}
    >
      {message}
    </div>
  );
};

export default SolutionMessage;
