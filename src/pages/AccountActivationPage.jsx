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

  let content = <span className="spinner-border" role="status"></span>;
  if (result === 'success') {
    content = (
      <div className="alert alert-success mt-3">Account is activated</div>
    );
  } else if (result === 'fail') {
    content = <div className="alert alert-danger mt-3">Activation failure</div>;
  }

  return <div data-testid="activation-page">{content}</div>;
};

AccountActivationPage.propTypes = {
  match: PropTypes.object
};

export default AccountActivationPage;
