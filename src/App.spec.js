import { render, screen } from '@testing-library/react';
import App from './App';

describe('Routing', () => {
  it.each`
    path         | pageTestId       | page
    ${'/'}       | ${'home-page'}   | ${'HomePage'}
    ${'/signup'} | ${'signup-page'} | ${'SignUpPage'}
    ${'/login'}  | ${'login-page'}  | ${'LoginPage'}
  `('displays $page when path is $path', ({ path, pageTestId }) => {
    window.history.pushState({}, '', path);
    render(<App />);
    const page = screen.queryByTestId(pageTestId);

    expect(page).toBeInTheDocument();
  });

  it.each`
    path         | pageTestId       | page
    ${'/'}       | ${'signup-page'} | ${'SignUpPage'}
    ${'/'}       | ${'login-page'}  | ${'LoginPage'}
    ${'/signup'} | ${'home-page'}   | ${'HomePage'}
    ${'/signup'} | ${'login-page'}  | ${'LoginPage'}
    ${'/login'}  | ${'home-page'}   | ${'HomePage'}
    ${'/login'}  | ${'signup-page'} | ${'SignUpPage'}
  `('does not display $page when path is $path', ({ path, pageTestId }) => {
    window.history.pushState({}, '', path);
    render(<App />);
    const page = screen.queryByTestId(pageTestId);

    expect(page).not.toBeInTheDocument();
  });
});
