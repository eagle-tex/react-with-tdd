import PropTypes from 'prop-types';
import { useContext } from 'react';
import defaultProfileImage from '../assets/profile.png';
import { AuthContext } from '../App';

const ProfileCard = props => {
  const { user } = props;
  const auth = useContext(AuthContext);

  return (
    <div className="card text-center">
      <div className="card-header">
        <img
          src={defaultProfileImage}
          alt="profile image"
          width="200"
          height="200"
          className="rounded-circle shadow"
        />{' '}
      </div>
      <div className="card-body">
        <h3>{user.username}</h3>
      </div>
      {auth && user.id === auth.id && <button>Edit</button>}
    </div>
  );
};

ProfileCard.propTypes = {
  user: PropTypes.object,
  auth: PropTypes.object
};

export default ProfileCard;
