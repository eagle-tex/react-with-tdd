import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react';
import LoginPage from './LoginPage';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const server = setupServer(
  rest.post('/api/1.0/auth', (req, res, ctx) => {
    return res(ctx.status(401));
  })
);

beforeAll(() => server.listen());

beforeEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());

describe('Login Page', () => {
  describe('Layout', () => {
    it('has header', () => {
      render(<LoginPage />);
      const header = screen.queryByRole('heading', { name: 'Login' });

      expect(header).toBeInTheDocument();
    });

    it('has email input', () => {
      render(<LoginPage />);
      const input = screen.getByLabelText('E-mail');

      expect(input).toBeInTheDocument();
    });

    it('has password input', () => {
      render(<LoginPage />);
      const input = screen.getByLabelText('Password');

      expect(input).toBeInTheDocument();
    });

    it('has password type for password input', () => {
      render(<LoginPage />);
      const input = screen.getByLabelText('Password');

      expect(input.type).toBe('password');
    });

    it('has "Login" button', () => {
      render(<LoginPage />);
      const button = screen.queryByRole('button', { name: 'Login' });

      expect(button).toBeInTheDocument();
    });

    it('disables the button initially', () => {
      render(<LoginPage />);
      const button = screen.queryByRole('button', { name: 'Login' });

      expect(button).toBeDisabled();
    });
  });

  describe('Interactions', () => {
    let button; // undefined

    const setup = () => {
      render(<LoginPage />);
      const emailInput = screen.getByLabelText('E-mail');
      const passwordInput = screen.getByLabelText('Password');
      button = screen.queryByRole('button', { name: 'Login' });

      userEvent.type(emailInput, 'user100@mail.com');
      userEvent.type(passwordInput, 'P4ssword');
    };

    it('enables the button when email and password inputs are filled', () => {
      setup();

      expect(button).toBeEnabled();
    });

    it('displays spinner during API call', async () => {
      setup();
      expect(screen.queryByRole('status')).not.toBeInTheDocument();

      userEvent.click(button);
      const spinner = screen.getByRole('status');

      await waitForElementToBeRemoved(spinner);
    });
  });
});
