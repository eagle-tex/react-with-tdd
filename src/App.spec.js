import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('Routing', () => {
  const setup = path => {
    window.history.pushState({}, '', path);
    render(<App />);
  };

  it.each`
    path         | pageTestId       | page
    ${'/'}       | ${'home-page'}   | ${'HomePage'}
    ${'/signup'} | ${'signup-page'} | ${'SignUpPage'}
    ${'/login'}  | ${'login-page'}  | ${'LoginPage'}
    ${'/user/1'} | ${'user-page'}   | ${'UserPage'}
    ${'/user/2'} | ${'user-page'}   | ${'UserPage'}
  `('displays $page when path is $path', ({ path, pageTestId }) => {
    setup(path);
    const page = screen.queryByTestId(pageTestId);

    expect(page).toBeInTheDocument();
  });

  it.each`
    path         | pageTestId       | page
    ${'/'}       | ${'signup-page'} | ${'SignUpPage'}
    ${'/'}       | ${'login-page'}  | ${'LoginPage'}
    ${'/'}       | ${'user-page'}   | ${'UserPage'}
    ${'/signup'} | ${'home-page'}   | ${'HomePage'}
    ${'/signup'} | ${'login-page'}  | ${'LoginPage'}
    ${'/signup'} | ${'user-page'}   | ${'UserPage'}
    ${'/login'}  | ${'home-page'}   | ${'HomePage'}
    ${'/login'}  | ${'signup-page'} | ${'SignUpPage'}
    ${'/login'}  | ${'user-page'}   | ${'UserPage'}
    ${'/user/1'} | ${'home-page'}   | ${'HomePage'}
    ${'/user/1'} | ${'signup-page'} | ${'SignUpPage'}
    ${'/user/1'} | ${'login-page'}  | ${'LoginPage'}
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
});
