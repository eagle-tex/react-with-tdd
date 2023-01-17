import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import defaultProfileImage from '../assets/profile.png';

const UserListItem = props => {
  const { user, history } = props;

  const [image, setImage] = useState();

  useEffect(() => {
    if (props.user.image) {
      setImage(props.user.image);
    } else {
      setImage('profile.png');
    }
  }, [props.user.image]);

  return (
    <li
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
