import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { activate } from '../api/apiCalls';
import Alert from '../components/Alert.jsx';
import Spinner from '../components/Spinner.jsx';

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

  let content = (
    <Alert type="secondary" center>
      <Spinner size="big" />
    </Alert>
  );
  if (result === 'success') {
    content = <Alert text="Account is activated" />;
  } else if (result === 'fail') {
    content = <Alert type="danger" text="Activation failure" />;
  }

  return <div data-testid="activation-page">{content}</div>;
};

AccountActivationPage.propTypes = {
  match: PropTypes.object
};

export default AccountActivationPage;
