import PropTypes from 'prop-types';
import defaultProfileImage from '../assets/profile.png';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Input from './Input';
import ButtonWithProgress from './ButtonWithProgress';
import { updateUser } from '../api/apiCalls';

const ProfileCard = props => {
  const [inEditMode, setEditMode] = useState(false);
  const [apiProgress, setApiProgress] = useState(false);
  const dispatch = useDispatch();

  const { user } = props;
  const [newUsername, setNewUsername] = useState(user.username);

  const { id, username } = useSelector(store => ({
    id: store.id,
    username: store.username
  }));

  const onClickSave = async () => {
    setApiProgress(true);
    try {
      await updateUser(id, { username: newUsername });
      setEditMode(false);
      dispatch({
        type: 'user-update-success',
        payload: {
          username: newUsername
        }
      });
    } catch (error) {
      // empty for now
    }
    setApiProgress(false);
  };

  const onClickCancel = () => {
    setEditMode(false);
    setNewUsername(username);
  };

  let content; // undefined

  if (inEditMode) {
    content = (
      <>
        <Input
          label="Change your username"
          id="username"
          initialValue={newUsername}
          onChange={event => setNewUsername(event.target.value)}
        />
        <ButtonWithProgress onClick={onClickSave} apiProgress={apiProgress}>
          Save
        </ButtonWithProgress>{' '}
        <button className="btn btn-outline-secondary" onClick={onClickCancel}>
          Cancel
        </button>
      </>
    );
  } else {
    content = (
      <>
        <h3>{newUsername}</h3>
        {user.id === id && (
          <>
            <div>
              <button
                className="btn btn-outline-success"
                onClick={() => setEditMode(true)}
              >
                Edit
              </button>
            </div>
            <div className="pt-2">
              <button className="btn btn-danger">Delete My Account</button>
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <>
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
      <div
        className="modal show d-block bg-black bg-opacity-50"
        tabIndex="-1"
        data-testid="modal"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ProfileCard.propTypes = {
  user: PropTypes.object,
  auth: PropTypes.object
};

export default ProfileCard;
