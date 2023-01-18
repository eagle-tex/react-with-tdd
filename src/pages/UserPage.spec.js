import { render, screen, waitFor } from '@testing-library/react';
import UserPage from './UserPage.jsx';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const server = setupServer();

beforeAll(() => server.listen());

beforeEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());

describe('User Page', () => {
  beforeEach(() => {
    server.use(
      rest.get('/api/1.0/users/:id', (req, res, ctx) => {
        return res(
          ctx.json({
            id: 1,
            username: 'user1',
            email: 'user1@mail.com',
            image: null
          })
        );
      })
    );
  });

  it('displays user name on page when user found', async () => {
    const match = { params: { id: 1 } };
    render(<UserPage match={match} />);

    await waitFor(() => {
      expect(screen.queryByText('user1')).toBeInTheDocument();
    });
  });

  it('displays spinner while the API call is in progress', async () => {
    const match = { params: { id: 1 } };
    render(<UserPage match={match} />);
    const spinner = screen.getByRole('status');

    await screen.findByText('user1');

    expect(spinner).not.toBeInTheDocument();
  });
});
