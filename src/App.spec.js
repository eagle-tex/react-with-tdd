import { render, screen } from './test/setup';
import App from './App';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const server = setupServer(
  // endpoint for user activation with token
  rest.post('/api/1.0/users/token/:token', (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
  // endpoint for getting users list
  rest.get('/api/1.0/users', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        content: [
          {
            id: 1,
            username: 'user-in-list',
            email: 'user-in-list@mail.com',
            image: null
          }
        ],
        page: 0,
        size: 0,
        totalPages: 0
      })
    );
  }),
  // add endpoint for getting user by id
  rest.get('/api/1.0/users/:id', (req, res, ctx) => {
    const id = Number.parseInt(req.params.id);
    return res(
      ctx.json({
        id: id,
        username: `user${id}`,
        email: `user${id}@mail.com`,
        image: null
      })
    );
  }),
  rest.post('/api/1.0/auth', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: 5, username: 'user5' }));
  })
);

beforeAll(() => server.listen());

beforeEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());

const setup = path => {
  window.history.pushState({}, '', path);
  render(<App />);
};

describe('Routing', () => {
  it.each`
    path               | pageTestId           | page
    ${'/'}             | ${'home-page'}       | ${'HomePage'}
    ${'/signup'}       | ${'signup-page'}     | ${'SignUpPage'}
    ${'/login'}        | ${'login-page'}      | ${'LoginPage'}
    ${'/user/1'}       | ${'user-page'}       | ${'UserPage'}
    ${'/user/2'}       | ${'user-page'}       | ${'UserPage'}
    ${'/activate/123'} | ${'activation-page'} | ${'AccountActivationPage'}
    ${'/activate/456'} | ${'activation-page'} | ${'AccountActivationPage'}
  `('displays $page when path is $path', ({ path, pageTestId }) => {
    setup(path);
    const page = screen.queryByTestId(pageTestId);

    expect(page).toBeInTheDocument();
  });

  it.each`
    path                 | pageTestId           | page
    ${'/'}               | ${'signup-page'}     | ${'SignUpPage'}
    ${'/'}               | ${'login-page'}      | ${'LoginPage'}
    ${'/'}               | ${'user-page'}       | ${'UserPage'}
    ${'/'}               | ${'activation-page'} | ${'AccountActivationPage'}
    ${'/signup'}         | ${'home-page'}       | ${'HomePage'}
    ${'/signup'}         | ${'login-page'}      | ${'LoginPage'}
    ${'/signup'}         | ${'user-page'}       | ${'UserPage'}
    ${'/signup'}         | ${'activation-page'} | ${'AccountActivationPage'}
    ${'/login'}          | ${'home-page'}       | ${'HomePage'}
    ${'/login'}          | ${'signup-page'}     | ${'SignUpPage'}
    ${'/login'}          | ${'user-page'}       | ${'UserPage'}
    ${'/login'}          | ${'activation-page'} | ${'AccountActivationPage'}
    ${'/user/1'}         | ${'home-page'}       | ${'HomePage'}
    ${'/user/1'}         | ${'signup-page'}     | ${'SignUpPage'}
    ${'/user/1'}         | ${'login-page'}      | ${'LoginPage'}
    ${'/user/1'}         | ${'activation-page'} | ${'AccountActivationPage'}
    ${'/activation/123'} | ${'home-page'}       | ${'AccountActivationPage'}
    ${'/activation/123'} | ${'signup-page'}     | ${'SignUpPage'}
    ${'/activation/123'} | ${'login-page'}      | ${'LoginPage'}
    ${'/activation/123'} | ${'user-page'}       | ${'UserPage'}
  `('does not display $page when path is $path', ({ path, pageTestId }) => {
    setup(path);
    const page = screen.queryByTestId(pageTestId);

    expect(page).not.toBeInTheDocument();
  });

  it.each`
    targetPage
    ${'Home'}
    ${'Sign Up'}
    ${'Login'}
  `('has link to $targetPage page on NavBar', ({ targetPage }) => {
    setup('/'); // any path would do ('/signup' or '/login', ...)
    const link = screen.getByRole('link', { description: targetPage });
    // const link = screen.getByRole('link', { name: 'Hoaxify' });
    // const link = screen.getByTitle('Home');

    expect(link).toBeInTheDocument();
  });

  it.each`
    initialPath  | clickingTo   | visiblePageId    | visiblePage
    ${'/'}       | ${'Sign Up'} | ${'signup-page'} | ${'Sign Up Page'}
    ${'/signup'} | ${'Home'}    | ${'home-page'}   | ${'Home Page'}
    ${'/signup'} | ${'Login'}   | ${'login-page'}  | ${'Login Page'}
  `(
    'displays $visiblePage after clicking $clickingTo link',
    ({ initialPath, clickingTo, visiblePageId }) => {
      setup(initialPath);
      const link = screen.getByRole('link', { description: clickingTo });

      userEvent.click(link);

      expect(screen.getByTestId(visiblePageId)).toBeInTheDocument();
    }
  );

  it('displays Home page when clicking brand logo', () => {
    setup('/login');
    const logo = screen.queryByAltText('Hoaxify');
    userEvent.click(logo);

    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('navigates to user page when clicking on the username in user list', async () => {
    setup('/');
    const user = await screen.findByText('user-in-list');

    userEvent.click(user);
    // any type of query would be OK/possible here: queryByTestId or getByTestId
    const page = await screen.findByTestId('user-page');

    expect(page).toBeInTheDocument();
  });
});

describe('Login', () => {
  const setupLoggedIn = () => {
    setup('/login');
    userEvent.type(screen.getByLabelText('E-mail'), 'user5@mail.com');
    userEvent.type(screen.getByLabelText('Password'), 'P4ssword');
    userEvent.click(screen.getByRole('button'), { name: 'Login' });
  };

  it('redirects to homepage after successful login', async () => {
    setupLoggedIn();
    const page = await screen.findByTestId('home-page');

    expect(page).toBeInTheDocument();
  });

  it('hides Login and Sign Up from navbar after successful login', async () => {
    setupLoggedIn();

    await screen.findByTestId('home-page');
    const loginLink = screen.queryByRole('link', { name: 'Login' });
    const signUpLink = screen.queryByRole('link', { name: 'Sign Up' });

    expect(loginLink).not.toBeInTheDocument();
    expect(signUpLink).not.toBeInTheDocument();
  });

  it('displays My Profile link on navbar after successful login', async () => {
    setup('/login');
    const myProfileLinkBeforeLogin = screen.queryByRole('link', {
      name: 'My Profile'
    });
    expect(myProfileLinkBeforeLogin).not.toBeInTheDocument();

    userEvent.type(screen.getByLabelText('E-mail'), 'user5@mail.com');
    userEvent.type(screen.getByLabelText('Password'), 'P4ssword');
    userEvent.click(screen.getByRole('button'), { name: 'Login' });

    await screen.findByTestId('home-page');
    const myProfileLinkAfterLogin = screen.queryByRole('link', {
      name: 'My Profile'
    });

    expect(myProfileLinkAfterLogin).toBeInTheDocument();
  });

  it('displays user page with logged in user id in url after clicking My Profile link', async () => {
    setupLoggedIn();
    await screen.findByTestId('home-page');
    const myProfile = screen.queryByRole('link', {
      name: 'My Profile'
    });
    userEvent.click(myProfile);
    await screen.findByTestId('user-page');
    const username = await screen.findByText('user5');

    expect(username).toBeInTheDocument();
  });

  it('stores loggedIn state in localStorage', async () => {
    setupLoggedIn();
    await screen.findByTestId('home-page');
    const state = JSON.parse(localStorage.getItem('auth'));

    expect(state.isLoggedIn).toBeTruthy();
  });

  it('displays layout of logged in state', () => {
    localStorage.setItem('auth', JSON.stringify({ isLoggedIn: true }));
    setup('/');
    const myProfileLink = screen.queryByRole('link', {
      name: 'My Profile'
    });

    expect(myProfileLink).toBeInTheDocument();
  });
});

// console.error = () => {};
