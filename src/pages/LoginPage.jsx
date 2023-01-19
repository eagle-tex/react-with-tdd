import Input from '../components/Input';
import { useState } from 'react';
import { login } from '../api/apiCalls';
import Spinner from '../components/Spinner';

const LoginPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [apiProgress, setApiProgress] = useState(false);

  const submit = async event => {
    event.preventDefault();
    setApiProgress(true);
    try {
      await login();
    } catch (error) {
      //
    }

    setApiProgress(false);
  };

  const disabled = !(email && password);

  return (
    <div
      className="col-lg-6 offset-lg-3 col-md-8 offset-md-2"
      data-testid="login-page"
    >
      <form className="card">
        <div className="card-header">
          <h1 className="text-center">Login</h1>
        </div>
        <div className="card-body">
          {/* email input */}
          <Input
            id="email"
            label="E-mail"
            onChange={event => setEmail(event.target.value)}
          />
          {/* password input */}
          <Input
            id="password"
            label="Password"
            type="password"
            onChange={event => setPassword(event.target.value)}
          />
          <div className="text-center">
            <button
              className="btn btn-primary"
              disabled={disabled}
              onClick={submit}
            >
              {apiProgress && <Spinner />}
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
