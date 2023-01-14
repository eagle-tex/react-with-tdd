import { render, screen } from '@testing-library/react';
import AccountActivationPage from './AccountActivationPage.jsx';

describe('Account Activation Page', () => {
  const setup = token => {
    const match = { params: { token } };
    render(<AccountActivationPage match={match} />);
  };

  it('displays activation success message when token is valid', async () => {
    setup('1234');
    const message = await screen.findByText('Account is activated');

    expect(message).toBeInTheDocument();
  });
});
