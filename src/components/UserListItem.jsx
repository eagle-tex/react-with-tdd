import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const UserListItem = props => {
  const { user, history } = props;

  return (
    <li
      key={user.id}
      className="list-group-item list-group-item-action"
      onClick={() => history.push(`/user/${user.id}`)}
      style={{ cursor: 'pointer' }}
    >
      {user.username}
    </li>
  );
};

UserListItem.propTypes = {
  user: PropTypes.object,
  history: PropTypes.object
};

export default withRouter(UserListItem);
