import { Component } from 'react';
import PropTypes from 'prop-types';
import { getUserById } from '../api/apiCalls';

class UserPage extends Component {
  state = {
    user: {}
  };

  async componentDidMount() {
    try {
      const response = await getUserById(this.props.match.params.id);
      this.setState({ user: response.data });
    } catch (error) {
      // empty
    }
  }

  render() {
    const { user } = this.state;

    return <div data-testid="user-page">{user.username}</div>;
  }
}

UserPage.propTypes = {
  match: PropTypes.object
};

export default UserPage;
