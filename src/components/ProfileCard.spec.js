import { render, screen } from '../test/setup';
import ProfileCard from './ProfileCard';
import storage from '../state/storage';

describe('Profile Card', () => {
  it('displays Edit button when logged in user is shown on card', () => {
    const user = { id: 5, username: 'user5' };
    storage.setItem('auth', user);
    render(<ProfileCard user={user} />);

    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
  });

  it('does not display Edit button for another user', () => {
    const user = { id: 5, username: 'user5' };
    storage.setItem('auth', user);
    render(<ProfileCard user={{ id: 2, username: 'user2' }} />);

    expect(
      screen.queryByRole('button', { name: 'Edit' })
    ).not.toBeInTheDocument();
  });
});
