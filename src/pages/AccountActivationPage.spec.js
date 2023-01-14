import { render, screen } from '@testing-library/react';
import AccountActivationPage from './AccountActivationPage.jsx';

describe('Account Activation Page', () => {
  it('displays activation success message when token is valid', async () => {
    const match = { params: { token: '1234' } };

    render(<AccountActivationPage match={match} />);
    const message = await screen.findByText('Account is activated');

    expect(message).toBeInTheDocument();
  });
});
