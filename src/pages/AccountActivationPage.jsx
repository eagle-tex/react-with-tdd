import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { activate } from '../api/apiCalls';

const AccountActivationPage = props => {
  const [result, setResult] = useState();

  useEffect(() => {
    activate(props.match.params.token).then(() => {
      setResult('success');
    });
  }, []);

  return (
    <div data-testid="activation-page">
      {result === 'success' && (
        <div className="alert alert-success mt-3">Account is activated</div>
      )}
    </div>
  );
};

AccountActivationPage.propTypes = {
  match: PropTypes.object
};

export default AccountActivationPage;
