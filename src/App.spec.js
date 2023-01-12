import { render, screen } from '@testing-library/react';
import App from './App';

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

  it('has link to home page on NavBar', () => {
    setup('/'); // any path would do ('/signup' or '/login', ...)
    const link = screen.getByRole('link', { name: 'Hoaxify' });
    // const link = screen.getByTitle('Home');

    expect(link).toBeInTheDocument();
  });
});
