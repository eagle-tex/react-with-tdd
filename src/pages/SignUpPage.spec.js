import SignUpPage from './SignUpPage.jsx';
import {
  render,
  screen,
  waitFor,
  act
  // waitForElementToBeRemoved
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import axios from 'axios';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import i18n from '../locale/i18n';
import en from '../locale/en.json';
import fr from '../locale/fr.json';
import LanguageSelector from '../components/LanguageSelector.jsx';

describe('Sign Up Page', () => {
  describe('Layout', () => {
    it('has header', () => {
      render(<SignUpPage />);
      const header = screen.queryByRole('heading', { name: 'Sign Up' });

      expect(header).toBeInTheDocument();
    });

    it('has username input', () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText('Username');

      expect(input).toBeInTheDocument();
    });

    it('has email input', () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText('E-mail');

      expect(input).toBeInTheDocument();
    });

    it('has password input', () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText('Password');

      expect(input).toBeInTheDocument();
    });

    it('has password type for password input', () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText('Password');

      expect(input.type).toBe('password');
    });

    it('has password repeat input', () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText('Password Repeat');

      expect(input).toBeInTheDocument();
    });

    it('has password type for password repeat input', () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText('Password Repeat');

      expect(input.type).toBe('password');
    });

    it('has "Sign Up" button', () => {
      render(<SignUpPage />);
      const button = screen.queryByRole('button', { name: 'Sign Up' });

      expect(button).toBeInTheDocument();
    });

    it('disables the button initially', () => {
      render(<SignUpPage />);
      const button = screen.queryByRole('button', { name: 'Sign Up' });

      expect(button).toBeDisabled();
    });
  });

  describe('Interactions', () => {
    let requestBody; // undefined
    let counter = 0;
    const server = setupServer(
      rest.post('/api/1.0/users', (req, res, ctx) => {
        requestBody = req.body;
        counter += 1;
        return res(ctx.status(200));
      })
    );

    beforeAll(() => server.listen());

    beforeEach(() => {
      counter = 0;
      server.resetHandlers();
    });

    afterAll(() => server.close());

    let button, usernameInput, emailInput, passwordInput, passwordRepeatInput; // all undefined

    const setup = () => {
      render(<SignUpPage />);
      usernameInput = screen.getByLabelText('Username');
      emailInput = screen.getByLabelText('E-mail');
      passwordInput = screen.getByLabelText('Password');
      passwordRepeatInput = screen.getByLabelText('Password Repeat');
      userEvent.type(usernameInput, 'user1');
      userEvent.type(emailInput, 'user1@mail.com');
      userEvent.type(passwordInput, 'P4ssword');
      userEvent.type(passwordRepeatInput, 'P4ssword');

      button = screen.queryByRole('button', { name: 'Sign Up' });
    };

    it('enables the button when password and password repeat fields have the same value', () => {
      setup();

      expect(button).toBeEnabled();
      // ALTERNATIVE WAY: expect(button).not.toBeDisabled()
    });

    it('sends username, email and password to backend after clicking the button', async () => {
      setup();

      userEvent.click(button);

      await screen.findByText(
        'Please check your e-mail to activate your account'
      );

      expect(requestBody).toEqual({
        username: 'user1',
        email: 'user1@mail.com',
        password: 'P4ssword'
      });
    });

    it('disables button when there is an ongoing api call', async () => {
      setup();

      userEvent.click(button);
      userEvent.click(button);

      await screen.findByText(
        'Please check your e-mail to activate your account'
      );

      expect(counter).toBe(1);
    });

    it('displays spinner after clicking the submit button', async () => {
      setup();

      expect(screen.queryByRole('status')).not.toBeInTheDocument();

      userEvent.click(button);
      const spinner = screen.getByRole('status');

      expect(spinner).toBeInTheDocument();
      await screen.findByText(
        'Please check your e-mail to activate your account'
      );
    });

    it('displays account activation notification after successful signup request', async () => {
      setup();
      const message = 'Please check your e-mail to activate your account';

      expect(screen.queryByText(message)).not.toBeInTheDocument();

      userEvent.click(button);
      const text = await screen.findByText(message);

      expect(text).toBeInTheDocument();
    });

    it('hides sign up form after successful sign up request', async () => {
      setup();
      const form = screen.getByTestId('form-sign-up');
      userEvent.click(button);

      await waitFor(() => {
        expect(form).not.toBeInTheDocument();
      });
      // NOTE: alternative way
      // await waitForElementToBeRemoved(form);
    });

    const generateValidationError = (field, message) => {
      return rest.post('/api/1.0/users', (_req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            validationErrors: { [field]: message }
          })
        );
      });
    };

    it.each`
      field         | message
      ${'username'} | ${'Username cannot be null'}
      ${'email'}    | ${'E-mail cannot be null'}
      ${'password'} | ${'Password cannot be null'}
    `(`displays "$message" for $field`, async ({ field, message }) => {
      server.use(generateValidationError(field, message));
      setup();

      userEvent.click(button);
      const validationError = await screen.findByText(message);

      expect(validationError).toBeInTheDocument();
    });

    it('hides spinner and enables button after receiving response', async () => {
      server.use(
        generateValidationError('username', 'Username cannot be null')
      );
      setup();

      userEvent.click(button);
      await screen.findByText('Username cannot be null');

      expect(screen.queryByRole('status')).not.toBeInTheDocument();
      expect(button).toBeEnabled();
    });

    it('displays mismatch message for password repeat input', () => {
      setup();
      userEvent.type(passwordInput, 'P4ssword');
      userEvent.type(passwordRepeatInput, 'AnotherP4ssword');

      const validationError = screen.queryByText('Password mismatch');

      expect(validationError).toBeInTheDocument();
    });

    it.each`
      field         | message                      | label
      ${'username'} | ${'Username cannot be null'} | ${'Username'}
      ${'email'}    | ${'E-mail cannot be null'}   | ${'E-mail'}
      ${'password'} | ${'Password cannot be null'} | ${'Password'}
    `(
      'clears validation error after "$field" is updated',
      async ({ field, message, label }) => {
        server.use(generateValidationError(field, message));
        setup();

        userEvent.click(button);
        const validationError = await screen.findByText(message);
        userEvent.type(screen.getByLabelText(label), 'updated');

        expect(validationError).not.toBeInTheDocument();
      }
    );
  });

  describe('Internationalization', () => {
    const setup = () => {
      render(
        <>
          <SignUpPage />
          <LanguageSelector />
        </>
      );
    };

    afterEach(() => {
      act(() => {
        i18n.changeLanguage('en');
      });
    });

    it('initially displays all text in English', () => {
      setup();

      expect(
        screen.getByRole('heading', { name: en.signUp })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: en.signUp })
      ).toBeInTheDocument();
      expect(screen.getByLabelText(en.username)).toBeInTheDocument();
      expect(screen.getByLabelText(en.email)).toBeInTheDocument();
      expect(screen.getByLabelText(en.password)).toBeInTheDocument();
      expect(screen.getByLabelText(en.passwordRepeat)).toBeInTheDocument();
    });

    it('displays all text in French after changing the language', () => {
      setup();

      const frenchToggle = screen.getByTitle('French');
      userEvent.click(frenchToggle);

      expect(
        screen.getByRole('heading', { name: fr.signUp })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: fr.signUp })
      ).toBeInTheDocument();
      expect(screen.getByLabelText(fr.username)).toBeInTheDocument();
      expect(screen.getByLabelText(fr.email)).toBeInTheDocument();
      expect(screen.getByLabelText(fr.password)).toBeInTheDocument();
      expect(screen.getByLabelText(fr.passwordRepeat)).toBeInTheDocument();
    });

    it('displays all text in English after changing back from French', () => {
      setup();

      const frenchToggle = screen.getByTitle('French');
      userEvent.click(frenchToggle);
      const englishToggle = screen.getByTitle('English');
      userEvent.click(englishToggle);

      expect(
        screen.getByRole('heading', { name: en.signUp })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: en.signUp })
      ).toBeInTheDocument();
      expect(screen.getByLabelText(en.username)).toBeInTheDocument();
      expect(screen.getByLabelText(en.email)).toBeInTheDocument();
      expect(screen.getByLabelText(en.password)).toBeInTheDocument();
      expect(screen.getByLabelText(en.passwordRepeat)).toBeInTheDocument();
    });

    it('displays password mismatch validation in French', () => {
      setup();

      const frenchToggle = screen.getByTitle('French');
      userEvent.click(frenchToggle);
      const passwordInput = screen.getByLabelText(fr.password);
      userEvent.type(passwordInput, 'P4ss');
      const validationMessageInFrench = screen.queryByText(
        fr.passwordMismatchValidation
      );

      expect(validationMessageInFrench).toBeInTheDocument();
    });
  });
});
