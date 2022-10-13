const { fireEvent, render, screen, findByText, getByText } = require('@testing-library/react');
const { MemoryRouter } = require('react-router-dom');
import { act } from 'react-dom/test-utils';
import App from './App';
import { UserProvider } from './context/UserContext';

import * as authFns from './services/auth';
import * as postFns from './services/posts';


jest.mock('./services/auth');
jest.mock('./services/posts');

const mockUser = {
  id: '0dab2c65-5911-469c-9f12-8fb47ebe52f2',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'nathans.email.address@gmail.com',
};

test('user can sign in', () => {
  authFns.getUser.mockReturnValue(null);
  authFns.authUser.mockReturnValue(mockUser);
  
  render(
    <UserProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </UserProvider>
  );

  const headerEl = screen.getByText(/welcome to bassbook/i);
  expect(headerEl).toBeInTheDocument();

  const emailInput = screen.getByLabelText('Email');
  fireEvent.change(emailInput, { target: { value: 'nathans.email.address@gmail.com' } });
  expect(emailInput.value).toBe('nathans.email.address@gmail.com');
});

test('user can change theme', async () => {

  render(
    <UserProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </UserProvider>
  );

  
  const headerGuitarEl = await screen.findByText(/🎸/i);
  expect(headerGuitarEl).toBeInTheDocument();
  
  const changeThemeButtonEl = screen.getByText(/Change Theme/i);
  expect(changeThemeButtonEl).toBeInTheDocument();
  fireEvent.click(changeThemeButtonEl);

  const headerFishEl = await screen.findByText(/🐟/i);
  expect(headerFishEl).toBeInTheDocument();

});

const fakePosts = [
  {
    id: 1,
    title: 'Fake Post #1',
    description: '#1 description',
    user_id: '0dab2c65-5911-469c-9f12-8fb47ebe52f2',
  },
  { id: 2, title: 'Fake Post #2', description: '#2 description' },
];


test('user can see items on board', async () => {
  authFns.getUser.mockReturnValue(mockUser);
  postFns.getPosts.mockReturnValue(fakePosts);

  render(
    <UserProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </UserProvider>
  );

  await screen.findByText(/Fake Post #1/i);
});

const fakePost = [{ id: 2, title: 'sick new post', description: 'description for fake post', user_id: '0dab2c65-5911-469c-9f12-8fb47ebe52f2' }];

test('user can add item to board', async () => {

  authFns.getUser.mockReturnValue(mockUser);
  // postFns.createPost.mockReturnValue(fakePost);
  postFns.getPosts.mockReturnValue(fakePosts);

  
  render(
    <UserProvider>
      <MemoryRouter initialEntries={['/post/new']}>
        <App />
      </MemoryRouter>
    </UserProvider>
  );

  const titleInputEl = screen.getByLabelText('Title');
  expect(titleInputEl).toBeInTheDocument();
  const descriptionInputEl = screen.getByLabelText('Description');
  expect(descriptionInputEl).toBeInTheDocument();
  const submitButton = screen.getByRole('button');
  expect(submitButton).toBeInTheDocument();
  
  act(() => {
    fireEvent.change(titleInputEl, { target: { value: 'sick new post' } });
    fireEvent.change(descriptionInputEl, { target: { value: 'this is a fake post to trick a robot' } });
    fireEvent.click(submitButton);
  });
  
  await screen.findByText(/Fake Post #1/i);

});


