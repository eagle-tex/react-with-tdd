import { render, screen } from '@testing-library/react';
import AccountActivationPage from './AccountActivationPage.jsx';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

let counter = 0;
const server = setupServer(
  rest.post('/api/1.0/users/token/:token', (req, res, ctx) => {
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

  it('sends activation request to backend', async () => {
    setup('1234');
    await screen.findByText('Account is activated');

    expect(counter).toBe(1);
  });
});
