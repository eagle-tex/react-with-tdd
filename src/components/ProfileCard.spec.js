/* eslint-disable testing-library/prefer-presence-queries */
import { render, screen, waitForElementToBeRemoved } from '../test/setup';
import ProfileCard from './ProfileCard';
import storage from '../state/storage';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const server = setupServer(
  rest.post('/api/1.0/users/:id', (_req, res, ctx) => {
    return res(ctx.status(200));
  })
);

beforeAll(() => server.listen());

beforeEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());

const LOGGED_IN_USER_IN_TEST = { id: 5, username: 'user5' }; // not necessarily default user

describe('Profile Card', () => {
  const setup = (user = { id: 5, username: 'user5' }) => {
    storage.setItem('auth', LOGGED_IN_USER_IN_TEST);
    render(<ProfileCard user={user} />);
  };

  it('displays Edit button when logged in user is shown on card', () => {
    setup();

    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
  });

  it('does not display Edit button for another user', () => {
    setup({ id: 2, username: 'user2' });

    expect(
      screen.queryByRole('button', { name: 'Edit' })
    ).not.toBeInTheDocument();
  });

  it('displays input for username after clicking Edit button', () => {
    setup();
    expect(
      screen.queryByLabelText('Change your username')
    ).not.toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'Edit' }));

    // eslint-disable-next-line
    expect(screen.queryByLabelText('Change your username')).toBeInTheDocument();
  });

  it('displays Save and Cancel buttons in edit mode', async () => {
    setup();
    userEvent.click(screen.getByRole('button', { name: 'Edit' }));

    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('hides Edit button and username heading in edit mode', () => {
    setup();

    userEvent.click(screen.getByRole('button', { name: 'Edit' }));

    expect(
      screen.queryByRole('button', { name: 'Edit' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: LOGGED_IN_USER_IN_TEST.username })
    ).not.toBeInTheDocument();
  });

  it('has the current username in input', () => {
    setup();

    userEvent.click(screen.getByRole('button', { name: 'Edit' }));
    const input = screen.queryByLabelText('Change your username');

    expect(input).toHaveValue(LOGGED_IN_USER_IN_TEST.username);
    // NOTE: another way of making the same assertion
    //   expect(input.value).toBe(LOGGED_IN_USER_IN_TEST.username)
  });

  it('displays spinner during API call', async () => {
    setup();

    userEvent.click(screen.getByRole('button', { name: 'Edit' }));
    userEvent.click(screen.getByRole('button', { name: 'Save' }));
    const spinner = screen.getByRole('status');

    await waitForElementToBeRemoved(spinner);
  });
});
