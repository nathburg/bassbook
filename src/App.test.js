import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';

import * as authFns from './services/auth';


jest.mock('./services/auth');


const mockUser = {
  id: 1,
  aud: 'authenticated',
  role: 'authenticated',
  email: 'tanner@example.com',

};

test ('user can sign in', async () => {
  authFns.getUser.mockReturnValue(null);
  authFns.authUser.mockReturnValue(mockUser);

  render(
    <UserProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </UserProvider>
  );

  const HeaderElement = screen.getByText(/Welcome to Bassbook 🎸/i);
  expect(HeaderElement).toBeInTheDocument();

  const signInLink = screen.getByText('Sign In');
  fireEvent.click(signInLink);

  const emailInput = screen.getByLabelText('Email');
  fireEvent.change(emailInput, { target: { value: 'text' } });
  expect(emailInput.value).toBe('text');
  
  const passwordInput = screen.getByLabelText('Password', { type: 'password' });
  fireEvent.change(passwordInput, { target: { value: 'password' } });

  const signInButton = screen.getByText('Enter');
  fireEvent.click(signInButton);

});





// write test for auth






