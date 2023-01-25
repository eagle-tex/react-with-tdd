import { render, screen } from '../test/setup';
import ProfileCard from './ProfileCard';
import storage from '../state/storage';
import userEvent from '@testing-library/user-event';

describe('Profile Card', () => {
  const setup = (user = { id: 5, username: 'user5' }) => {
    const LOGGED_IN_USER_IN_TEST = { id: 5, username: 'user5' }; // not necessarily default user
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
});
