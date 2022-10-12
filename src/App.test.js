import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { UserProvider } from './context/UserContext';

import * as authFns from './services/auth';

jest.mock('./services/auth');

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

const mockUser = {
  id: '0dab2c65-5911-469c-9f12-8fb47ebe52f2',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'test@example.com',
};

test('user can create a new post', async () => {
  authFns.getUser.mockReturnValue(mockUser);

  render(
    <UserProvider>
      <MemoryRouter initialEntries={['/post/new']}>
        <App />
      </MemoryRouter>
    </UserProvider>
  );
  await screen.findByText(/title/i);
  await screen.findByText(/description/i);
  await screen.findByText(/hello test@example.com/i);
});

test('user can change theme', () => {
  render(
    <UserProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </UserProvider>
  );
  const themeButton = screen.getByRole('button', { name: /change theme/i });
  fireEvent.click(themeButton);
  
  const emoji = screen.getByText(/🐟/i);
  expect(emoji).toBeInTheDocument();
});