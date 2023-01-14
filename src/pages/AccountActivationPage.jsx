import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { activate } from '../api/apiCalls';

const AccountActivationPage = props => {
  const [result, setResult] = useState(); // result === undefined

  useEffect(() => {
    setResult(); // set result to undefined
    activate(props.match.params.token)
      .then(() => {
        setResult('success');
      })
      .catch(() => {
        setResult('fail');
      });
  }, [props.match.params.token]);

  return (
    <div data-testid="activation-page">
      {result === 'success' && (
        <div className="alert alert-success mt-3">Account is activated</div>
      )}
      {result === 'fail' && (
        <div className="alert alert-danger mt-3">Activation failure</div>
      )}
      {/* display spinner if result is falsy (ie undefined in this case) */}
      {!result && (
        <span className="spinner-border spinner-border" role="status"></span>
      )}
    </div>
  );
};

AccountActivationPage.propTypes = {
  match: PropTypes.object
};

export default AccountActivationPage;
