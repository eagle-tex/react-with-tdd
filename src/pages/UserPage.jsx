import { Component } from 'react';
import PropTypes from 'prop-types';
import { getUserById } from '../api/apiCalls';
import ProfileCard from '../components/ProfileCard.jsx';
import Spinner from '../components/Spinner.jsx';
import Alert from '../components/Alert.jsx';

class UserPage extends Component {
  state = {
    user: {},
    pendingApiCall: false
  };

  async componentDidMount() {
    this.setState({ pendingApiCall: true });

    try {
      const response = await getUserById(this.props.match.params.id);
      this.setState({ user: response.data });
    } catch (error) {
      // empty
    }

    this.setState({ pendingApiCall: false });
  }

  render() {
    const { user, pendingApiCall } = this.state;

    return (
      <div data-testid="user-page">
        {!pendingApiCall && <ProfileCard user={user} />}
        {pendingApiCall && (
          <Alert type="secondary" center>
            <Spinner size="big" />
          </Alert>
        )}
      </div>
    );
  }
}

UserPage.propTypes = {
  match: PropTypes.object
};

export default UserPage;
