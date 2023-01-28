/* eslint-disable testing-library/prefer-presence-queries */
import { render, screen, waitForElementToBeRemoved } from '../test/setup';
import ProfileCard from './ProfileCard';
import storage from '../state/storage';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

let counter = 0;
let id, requestBody, header; // undefined
const server = setupServer(
  rest.put('/api/1.0/users/:id', (req, res, ctx) => {
    counter += 1;
    id = req.params.id;
    requestBody = req.body;
    header = req.headers.get('Authorization');
    return res(ctx.status(200));
  })
);

beforeAll(() => server.listen());

beforeEach(() => {
  counter = 0;
  id = 0;
  server.resetHandlers();
});

afterAll(() => server.close());

const LOGGED_IN_USER_IN_TEST = {
  id: 5,
  username: 'user5',
  header: 'auth header value'
}; // not necessarily default user

describe('Profile Card', () => {
  const setup = (user = { id: 5, username: 'user5' }) => {
    storage.setItem('auth', LOGGED_IN_USER_IN_TEST);
    render(<ProfileCard user={user} />);
  };

  let saveButton; // undefined
  const setupInEditMode = () => {
    setup();
    userEvent.click(screen.getByRole('button', { name: 'Edit' }));
    saveButton = screen.getByRole('button', { name: 'Save' });
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
    setupInEditMode();

    userEvent.click(saveButton);
    const spinner = screen.getByRole('status');

    await waitForElementToBeRemoved(spinner);
    // expect(spinner).not.toBeInTheDocument();
  });

  it('disables the Save button during API call', async () => {
    setupInEditMode();

    userEvent.click(saveButton);
    userEvent.click(saveButton);
    const spinner = screen.getByRole('status');
    await waitForElementToBeRemoved(spinner);

    expect(counter).toBe(1);
  });

  it('sends request to the endpoint with logged in user id', async () => {
    setupInEditMode();

    userEvent.click(saveButton);
    const spinner = screen.getByRole('status');
    await waitForElementToBeRemoved(spinner);

    expect(id).toBe(LOGGED_IN_USER_IN_TEST.id.toString()); // toBe('5')
  });

  it('sends request with body having updated username', async () => {
    setupInEditMode();
    const editInput = screen.getByLabelText('Change your username');

    userEvent.clear(editInput);
    userEvent.type(editInput, 'user5-updated');
    userEvent.click(saveButton);
    const spinner = screen.getByRole('status');
    await waitForElementToBeRemoved(spinner);

    expect(requestBody).toEqual({ username: 'user5-updated' });
  });

  it('sends request with Authorization header', async () => {
    setupInEditMode();

    userEvent.click(saveButton);
    const spinner = screen.getByRole('status');
    await waitForElementToBeRemoved(spinner);

    expect(header).toBe(LOGGED_IN_USER_IN_TEST.header);
  });

  it('sends request with body having username even if user does not update it', async () => {
    setupInEditMode();

    userEvent.click(saveButton);
    const spinner = screen.getByRole('status');
    await waitForElementToBeRemoved(spinner);

    expect(requestBody).toEqual({ username: LOGGED_IN_USER_IN_TEST.username }); // 'user5'
  });

  it('hides edit layout after successful update', async () => {
    setupInEditMode();

    userEvent.click(saveButton);
    const editButton = await screen.findByRole('button', { name: 'Edit' });

    expect(editButton).toBeInTheDocument();
  });

  it('updates username in profile card after successful update', async () => {
    setupInEditMode();
    const editInput = screen.getByLabelText('Change your username');
    const updatedUsername = 'new-username';

    userEvent.clear(editInput);
    userEvent.type(editInput, updatedUsername);
    userEvent.click(saveButton);
    const newUsername = await screen.findByRole('heading', {
      name: updatedUsername
    });

    expect(newUsername).toBeInTheDocument();
  });

  it('displays last updated name in input in edit mode after successful username update', async () => {
    setupInEditMode();
    let editInput = screen.getByLabelText('Change your username');
    const updatedUsername = 'new-username';

    userEvent.clear(editInput);
    userEvent.type(editInput, updatedUsername);
    userEvent.click(saveButton);
    const editButton = await screen.findByRole('button', { name: 'Edit' });
    userEvent.click(editButton);
    editInput = screen.getByLabelText('Change your username');

    expect(editInput).toHaveValue(updatedUsername);
  });

  it('hides edit layout after clicking Cancel', async () => {
    setupInEditMode();

    userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    const editButton = await screen.findByRole('button', { name: 'Edit' });

    expect(editButton).toBeInTheDocument();
  });

  it('displays the original username after username is changed in edit mode but cancelled', async () => {
    setupInEditMode();
    const editInput = screen.getByLabelText('Change your username');
    const updatedUsername = 'new-username';

    userEvent.clear(editInput);
    userEvent.type(editInput, updatedUsername);
    userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    const heading = screen.getByRole('heading', {
      name: LOGGED_IN_USER_IN_TEST.username
    });

    expect(heading).toBeInTheDocument();
  });

  it('displays last updated username after clicking Cancel on second edit', async () => {
    setupInEditMode();
    const editInput = screen.getByLabelText('Change your username');
    const updatedUsername = 'new-username';

    userEvent.clear(editInput);
    userEvent.type(editInput, updatedUsername);
    userEvent.click(saveButton);
    const editButton = await screen.findByRole('button', { name: 'Edit' });
    userEvent.click(editButton);
    userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    const heading = screen.getByRole('heading', {
      name: updatedUsername
    });

    expect(heading).toBeInTheDocument();
  });

  it('displays Delete button when logged in user is shown on card', () => {
    setup();

    expect(
      screen.getByRole('button', { name: 'Delete My Account' })
    ).toBeInTheDocument();
  });

  it('does not display Delete button for another user', () => {
    setup({ id: 2, username: 'user2' });

    expect(
      screen.queryByRole('button', { name: 'Delete My Account' })
    ).not.toBeInTheDocument();
  });
});
