import PropTypes from 'prop-types';

const Modal = props => {
  const { content, confirmButton, cancelButton } = props;

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
              data-bs-dismiss="modal"
            >
              {cancelButton}
            </button>
            <button type="button" className="btn btn-primary">
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
  cancelButton: PropTypes.string
};

Modal.defaultProps = {
  confirmButton: 'Yes',
  cancelButton: 'Cancel'
};

export default Modal;
