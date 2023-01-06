import { Component } from 'react';
import axios from 'axios';

class SignUpPage extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
    apiProgress: false,
    signUpSuccess: false
  };

  onChange = event => {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    });
  };

  submit = event => {
    event.preventDefault();
    const { username, email, password } = this.state;
    const body = { username, email, password };
    this.setState({ apiProgress: true });
    axios.post('/api/1.0/users', body).then(() => {
      this.setState({ signUpSuccess: true });
    });
  };

  render() {
    let disabled = true;
    const { password, passwordRepeat, apiProgress, signUpSuccess } = this.state;
    if (password && passwordRepeat) {
      disabled = password !== passwordRepeat;
    }

    return (
      <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
        <form className="card mt-5">
          <div className="card-header">
            <h1 className="text-center">Sign Up</h1>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                id="username"
                className="form-control"
                onChange={this.onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                E-mail
              </label>
              <input
                id="email"
                className="form-control"
                onChange={this.onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                className="form-control"
                type="password"
                onChange={this.onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="passwordRepeat" className="form-label">
                Password Repeat
              </label>
              <input
                id="passwordRepeat"
                className="form-control"
                type="password"
                onChange={this.onChange}
              />
            </div>
            <div className="text-center">
              <button
                className="btn btn-primary"
                disabled={disabled || apiProgress}
                onClick={this.submit}
              >
                {apiProgress && (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                  ></span>
                )}
                Sign Up
              </button>
            </div>
          </div>
        </form>

        {signUpSuccess && (
          <div className="alert alert-success mt-3">
            Please check your e-mail to activate your account
          </div>
        )}
      </div>
    );
  }
}

export default SignUpPage;
