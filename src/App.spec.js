import { render, screen } from '@testing-library/react';
import App from './App';

describe('Routing', () => {
  it('displays homepage at /', () => {
    render(<App />);
    const homePage = screen.getByTestId('home-page');

    expect(homePage).toBeInTheDocument();
  });

  it('does not display SignUpPage when at /', () => {
    render(<App />);
    const page = screen.queryByTestId('signup-page');

    expect(page).not.toBeInTheDocument();
  });

  it('displays signup page at /signup', () => {
    window.history.pushState({}, '', '/signup');
    render(<App />);
    const page = screen.queryByTestId('signup-page');

    expect(page).toBeInTheDocument();
  });

  it('does not display HomePage when at /signup', () => {
    window.history.pushState({}, '', '/signup');
    render(<App />);
    const page = screen.queryByTestId('home-page');

    expect(page).not.toBeInTheDocument();
  });
});
