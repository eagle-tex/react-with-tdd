const Modal = () => {
  return (
    <div
      className="modal show d-block bg-black bg-opacity-50"
      tabIndex="-1"
      data-testid="modal"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <p>Are you sure you want to delete your account ?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="button" className="btn btn-primary">
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
