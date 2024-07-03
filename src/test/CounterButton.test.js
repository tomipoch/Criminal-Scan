import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Para las aserciones adicionales
import CounterButton from '../components/CounterButton';

test('increments counter on button click', () => {
  const { getByText } = render(<CounterButton />);
  const button = getByText('Increment');
  fireEvent.click(button);
  expect(getByText('Count: 1')).toBeInTheDocument();
});
