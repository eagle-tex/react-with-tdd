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

  it.each`
    path         | pageTestId       | page
    ${'/'}       | ${'signup-page'} | ${'HomePage'}
    ${'/signup'} | ${'home-page'}   | ${'SignUpPage'}
  `('does not display $page when path is $path', ({ path, pageTestId }) => {
    window.history.pushState({}, '', path);
    render(<App />);
    const page = screen.queryByTestId(pageTestId);

    expect(page).not.toBeInTheDocument();
  });
});
