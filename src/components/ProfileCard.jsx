import PropTypes from 'prop-types';
import defaultProfileImage from '../assets/profile.png';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Input from './Input';
import ButtonWithProgress from './ButtonWithProgress';
import { updateUser } from '../api/apiCalls';

const ProfileCard = props => {
  const [inEditMode, setEditMode] = useState(false);
  const [apiProgress, setApiProgress] = useState(false);
  const [newUsername, setNewUsername] = useState();

  const { user } = props;
  const id = useSelector(store => store.id);

  const onClickSave = async () => {
    setApiProgress(true);
    try {
      await updateUser(id, { username: newUsername });
    } catch (error) {
      // empty for now
    }
    setApiProgress(false);
  };

  let content; // undefined

  if (inEditMode) {
    content = (
      <>
        <Input
          label="Change your username"
          id="username"
          initialValue={user.username}
          onChange={event => setNewUsername(event.target.value)}
        />
        <ButtonWithProgress onClick={onClickSave} apiProgress={apiProgress}>
          Save
        </ButtonWithProgress>{' '}
        <button className="btn btn-outline-secondary">Cancel</button>
      </>
    );
  } else {
    content = (
      <>
        <h3>{user.username}</h3>
        {user.id === id && (
          <button
            className="btn btn-outline-success"
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
        )}
      </>
    );
  }

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
      <div className="card-body">{content}</div>
    </div>
  );
};

ProfileCard.propTypes = {
  user: PropTypes.object,
  auth: PropTypes.object
};

export default ProfileCard;
