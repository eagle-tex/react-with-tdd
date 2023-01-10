import { render, screen } from '@testing-library/react';
import App from './App';

describe('Routing', () => {
  it.each`
    path         | pageTestId       | page
    ${'/'}       | ${'home-page'}   | ${'HomePage'}
    ${'/signup'} | ${'signup-page'} | ${'SignUpPage'}
  `('displays $page when path is $path', ({ path, pageTestId }) => {
    window.history.pushState({}, '', path);
    render(<App />);
    const page = screen.queryByTestId(pageTestId);

    expect(page).toBeInTheDocument();
  });

  it('does not display SignUpPage when at /', () => {
    render(<App />);
    const page = screen.queryByTestId('signup-page');

    expect(page).not.toBeInTheDocument();
  });

  it('does not display HomePage when at /signup', () => {
    window.history.pushState({}, '', '/signup');
    render(<App />);
    const page = screen.queryByTestId('home-page');

    expect(page).not.toBeInTheDocument();
  });
});
