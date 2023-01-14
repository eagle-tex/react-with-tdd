import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { activate } from '../api/apiCalls';
import Alert from '../components/Alert.jsx';
import Spinner from '../components/Spinner.jsx';

const AccountActivationPage = props => {
  const [result, setResult] = useState(); // result === undefined

  useEffect(() => {
    async function activateRequest() {
      setResult(); // set result to undefined
      try {
        await activate(props.match.params.token);
        setResult('success');
      } catch (error) {
        setResult('fail');
      }
    }
    activateRequest();
  }, [props.match.params.token]);

  let content = (
    <Alert type="secondary" center>
      <Spinner size="big" />
    </Alert>
  );
  if (result === 'success') {
    content = <Alert>Account is activated</Alert>;
  } else if (result === 'fail') {
    content = <Alert type="danger">Activation failure</Alert>;
  }

  return <div data-testid="activation-page">{content}</div>;
};

AccountActivationPage.propTypes = {
  match: PropTypes.object
};

export default AccountActivationPage;
