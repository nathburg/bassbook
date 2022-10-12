import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { UserProvider } from './context/UserContext';

test('renders Welcome to Bassbook header', () => {
  render(
    <MemoryRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/welcome to bassbook/i);
  expect(linkElement).toBeInTheDocument();
});
