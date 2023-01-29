/* eslint-disable no-console */
import PropTypes from 'prop-types';

const Modal = props => {
  const {
    content,
    confirmButton,
    cancelButton,
    onClickCancel,
    onClickConfirm
  } = props;

  return (
    <div
      className="modal show d-block bg-black bg-opacity-50"
      tabIndex="-1"
      data-testid="modal"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <p>{content}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClickCancel}
            >
              {cancelButton}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onClickConfirm}
            >
              {confirmButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  content: PropTypes.string,
  confirmButton: PropTypes.string,
  cancelButton: PropTypes.string,
  onClickCancel: PropTypes.func,
  onClickConfirm: PropTypes.func
};

Modal.defaultProps = {
  confirmButton: 'Yes',
  cancelButton: 'Cancel',
  onClickCancel: () => console.log('onClickCancel is not set'),
  onClickConfirm: () => console.log('onClickConfirm is not set')
};

export default Modal;
