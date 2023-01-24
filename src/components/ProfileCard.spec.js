import { render, screen } from '../test/setup';
import ProfileCard from './ProfileCard';
import storage from '../state/storage';
import expect from '../../../../../../.cache/typescript/4.9/node_modules/expect/build/index';

describe('Profile Card', () => {
  it('displays Edit button when logged in user is shown on card', () => {
    const user = { id: 5, username: 'user5' };
    storage.setItem('auth', user);
    render(<ProfileCard user={user} />);

    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
  });
});
