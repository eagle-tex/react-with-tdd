import { render, screen } from '../test/setup';
import UserList from './UserList.jsx';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';
import en from '../locale/en.json';
import fr from '../locale/fr.json';
import storage from '../state/storage';

const users = [
  { id: 1, username: 'user1', email: 'user1@mail.com', image: null },
  { id: 2, username: 'user2', email: 'user2@mail.com', image: null },
  { id: 3, username: 'user3', email: 'user3@mail.com', image: null },
  { id: 4, username: 'user4', email: 'user4@mail.com', image: null },
  { id: 5, username: 'user5', email: 'user5@mail.com', image: null },
  { id: 6, username: 'user6', email: 'user6@mail.com', image: null },
  { id: 7, username: 'user7', email: 'user7@mail.com', image: null }
];

const getPage = (page, size) => {
  const start = page * size;
  const end = start + size;
  const totalPages = Math.ceil(users.length / size);

  return {
    content: users.slice(start, end),
    page,
    size,
    totalPages
  };
};

let header; // undefined
const server = setupServer(
  rest.get('/api/1.0/users', (req, res, ctx) => {
    header = req.headers.get('Authorization');
    let page = Number.parseInt(req.url.searchParams.get('page'));
    let size = Number.parseInt(req.url.searchParams.get('size'));
    if (Number.isNaN(page)) {
      page = 0;
    }
    if (Number.isNaN(size)) {
      size = 5;
    }

    return res(ctx.status(200), ctx.json(getPage(page, size)));
  })
);

beforeAll(() => server.listen());

beforeEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());

const setup = () => {
  render(<UserList />);
};

describe('User List', () => {
  describe('Interactions', () => {
    it('displays three users in list', async () => {
      setup();
      const usersList = await screen.findAllByText(/user/);

      expect(usersList.length).toBe(3);
    });

    it('displays next page link', async () => {
      setup();
      await screen.findByText('user1');

      expect(screen.getByText('next >')).toBeInTheDocument();
    });

    it('displays next page afer clicking next', async () => {
      setup();
      await screen.findByText('user1');
      const nextPageLink = screen.queryByText('next >');

      userEvent.click(nextPageLink);
      const firstUserOnPage2 = await screen.findByText('user4');

      expect(firstUserOnPage2).toBeInTheDocument();
    });

    it('hides next page link at last page', async () => {
      setup();
      await screen.findByText('user1');

      userEvent.click(screen.queryByText('next >'));
      await screen.findByText('user4');
      userEvent.click(screen.queryByText('next >'));
      await screen.findByText('user7');

      expect(screen.queryByText('next >')).not.toBeInTheDocument();
    });

    it('does not display the previous page link in first page', async () => {
      setup();
      await screen.findByText('user1');
      const previousPageLink = screen.queryByText('< previous');

      expect(previousPageLink).not.toBeInTheDocument();
    });

    it('displays the previous page link in second page', async () => {
      setup();
      await screen.findByText('user1');

      userEvent.click(screen.queryByText('next >'));
      await screen.findByText('user4');

      const previousPageLink = screen.queryByText('< previous');
      expect(previousPageLink).toBeInTheDocument();
    });

    it('displays the previous page link on second page', async () => {
      setup();
      await screen.findByText('user1');

      userEvent.click(screen.queryByText('next >'));
      await screen.findByText('user4');
      userEvent.click(screen.queryByText('< previous'));
      const firstUserOnFirstPage = await screen.findByText('user1');

      expect(firstUserOnFirstPage).toBeInTheDocument();
    });

    it('displays spinner while the API call is in progress', async () => {
      setup();
      const spinner = screen.getByRole('status'); // throws error if not found
      await screen.findByText('user1');

      expect(spinner).not.toBeInTheDocument();
    });

    it('sends request with authorization header', async () => {
      storage.setItem('auth', {
        id: 5,
        username: 'user5',
        header: 'auth header value'
      });
      setup();
      await screen.findByText('user1');

      expect(header).toBe('auth header value');
    });
  });

  describe('Internationalization', () => {
    beforeEach(() => {
      server.use(
        rest.get('/api/1.0/users', (_req, res, ctx) => {
          return res(ctx.status(200), ctx.json(getPage(1, 3)));
        })
      );
    });

    it('initially displays header and navigation links in French after selecting the language', async () => {
      setup();
      await screen.findByText('user4');

      userEvent.click(screen.getByTitle('French'));

      expect(screen.getByText(fr.users)).toBeInTheDocument();
      expect(screen.getByText(fr.nextPage)).toBeInTheDocument();
      expect(screen.getByText(fr.previousPage)).toBeInTheDocument();
    });

    it('initially displays header and navigation links in English', async () => {
      setup();
      await screen.findByText('user4');

      expect(screen.getByText(en.users)).toBeInTheDocument();
      expect(screen.getByText(en.nextPage)).toBeInTheDocument();
      expect(screen.getByText(en.previousPage)).toBeInTheDocument();
    });
  });
});
