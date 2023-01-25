import PropTypes from 'prop-types';
import defaultProfileImage from '../assets/profile.png';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Input from './Input';

const ProfileCard = props => {
  const [inEditMode, setEditMode] = useState(false);

  const { user } = props;
  const id = useSelector(store => store.id);

  return (
    <div className="card text-center">
      <div className="card-header">
        <img
          src={defaultProfileImage}
          alt="profile"
          width="200"
          height="200"
          className="rounded-circle shadow"
        />{' '}
      </div>
      <div className="card-body">
        <h3>{user.username}</h3>
        {user.id === id && (
          <button
            className="btn btn-outline-success"
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
        )}
        {inEditMode && <Input label="Change your username" id="username" />}
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  user: PropTypes.object,
  auth: PropTypes.object
};

export default ProfileCard;
