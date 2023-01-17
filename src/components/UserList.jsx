import { Component } from 'react';
import PropTypes from 'prop-types';
import { loadUsers } from '../api/apiCalls';
import UserListItem from './UserListItem.jsx';

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
      const page = response.data;
      if (!pageIndex) {
        page.content[1].image = 'dog.jpg';
      }

      this.setState({ page: page });
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
            return <UserListItem key={user.id} user={user} />;
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

UserList.propTypes = {
  key: PropTypes.number,
  user: PropTypes.object
};

export default UserList;
