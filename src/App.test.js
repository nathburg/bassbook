import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';

import * as authFns from './services/auth';
import * as postFns from './services/posts';



jest.mock('./services/auth');
jest.mock('./services/posts');


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







const fakePost = [
  {
    id: 1,
    title: 'Fake Post #1',
    description: 'This is a fake post',
    user_id: 1,
  },
  { id: 2, title: 'Fake Post #2', description: 'This is a fake post', user_id: 1 },
];

test('signed in users should see a list of post at /topic', async () => {
  authFns.getUser.mockReturnValue(mockUser);
  postFns.getPosts.mockReturnValue(fakePost);

  render(
    <UserProvider>
      <MemoryRouter initialEntries={[`/`]}>
        <App />
      </MemoryRouter>
    </UserProvider>
  );
  
  await screen.findByText(/Fake Post #1/i);
  await screen.findAllByText(/Edit/i);
  await screen.findByText(/Fake Post #2/i);
});


const NewPost = [
  {
    id: 1,
    title: 'New Post #1',
    description: 'This is a new post',
    user_id: 1,
  },
];


test('signed in users should be able to create a new post', async () => {
  authFns.getUser.mockReturnValue(mockUser);
  postFns.createPost.mockReturnValue(NewPost);
  postFns.getPosts.mockReturnValue(fakePost);

  render(
    <UserProvider>
      <MemoryRouter initialEntries={[`/post/new`]}>
        <App />
      </MemoryRouter>
    </UserProvider>
  );

  // const newPostLink = screen.getByText('Create Post');
  // fireEvent.click(newPostLink);
  // screen.debug();
  
  const titleInput = await screen.findByLabelText('Title');
  fireEvent.change(titleInput, { target: { value: 'New Post' } });
  expect(titleInput.value).toBe('New Post');

  const descriptionInput = screen.getByLabelText('Description');
  fireEvent.change(descriptionInput, { target: { value: 'This is a new post' } });
  expect(descriptionInput.value).toBe('This is a new post');

  const submitButton = await screen.findByText('Submit');
  fireEvent.click(submitButton);

  await screen.findByText(/Fake Post #1/i);


});
