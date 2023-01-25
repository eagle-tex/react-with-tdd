import PropTypes from 'prop-types';
import defaultProfileImage from '../assets/profile.png';
import { useSelector } from 'react-redux';

const ProfileCard = props => {
  const { user } = props;
  const id = useSelector(store => store.id);

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
        {user.id === id && (
          <button className="btn btn-outline-success">Edit</button>
        )}
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  user: PropTypes.object,
  auth: PropTypes.object
};

export default ProfileCard;
