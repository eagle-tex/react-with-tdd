import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useState } from 'react';
import defaultProfileImage from '../assets/profile.png';

const UserListItem = props => {
  const { user, history } = props;

  const [image, setImage] = useState(user.image || 'profile.png');

  return (
    <li
      key={user.id}
      className="list-group-item list-group-item-action"
      onClick={() => history.push(`/user/${user.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={`/image/${image}`}
        alt="profile image"
        width="30"
        className="rounded-circle shadow-sm"
      />{' '}
      {user.username}
    </li>
  );
};

UserListItem.propTypes = {
  user: PropTypes.object,
  history: PropTypes.object
};

export default withRouter(UserListItem);
