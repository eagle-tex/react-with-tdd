import { Component } from 'react';
import PropTypes from 'prop-types';
import { getUserById } from '../api/apiCalls';
import ProfileCard from '../components/ProfileCard.jsx';
import Spinner from '../components/Spinner.jsx';
import Alert from '../components/Alert.jsx';

class UserPage extends Component {
  state = {
    user: {},
    pendingApiCall: false,
    failResponse: undefined
  };

  loadUser = async () => {
    this.setState({ pendingApiCall: true });

    try {
      const response = await getUserById(this.props.match.params.id);
      this.setState({ user: response.data });
    } catch (error) {
      this.setState({ failResponse: error.response.data.message });
    }

    this.setState({ pendingApiCall: false });
  };

  async componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(previousProps, _previousState) {
    if (previousProps.match.params.id !== this.props.match.params.id) {
      this.loadUser();
    }
  }

  render() {
    const { user, pendingApiCall, failResponse } = this.state;

    let content = (
      <Alert type="secondary" center>
        <Spinner size="big" />
      </Alert>
    );

    if (!pendingApiCall) {
      if (failResponse) {
        content = (
          <Alert type="danger" center>
            {failResponse}
          </Alert>
        );
      } else {
        content = <ProfileCard user={user} auth={this.props.auth} />;
      }
    }

    return <div data-testid="user-page">{content}</div>;
  }
}

UserPage.propTypes = {
  match: PropTypes.object,
  auth: PropTypes.object
};

export default UserPage;
