import { Component } from 'react';
import { loadUsers } from '../api/apiCalls';
import { Link } from 'react-router-dom';

class UserList extends Component {
  state = {
    page: {
      content: [],
      page: 0,
      size: 0,
      totalPages: 0
    }
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = async pageIndex => {
    try {
      const response = await loadUsers(pageIndex);
      this.setState({ page: response.data });
    } catch (error) {
      // empty for now
    }
  };

  render() {
    const { totalPages, page, content } = this.state.page;

    return (
      <div className="card">
        <div className="card-header text-center">
          <h3>Users</h3>
        </div>
        <ul className="list-group list-group-flush">
          {content.map(user => {
            return (
              <li
                key={user.id}
                className="list-group-item list-group-item-action"
              >
                <Link to={`/user/${user.id}`}>{user.username}</Link>
              </li>
            );
          })}
        </ul>
        <div className="card-footer">
          {page !== 0 && (
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => this.loadData(page - 1)}
            >
              &lt; previous
            </button>
          )}
          {totalPages > page + 1 && (
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => this.loadData(page + 1)}
            >
              next &gt;
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default UserList;
