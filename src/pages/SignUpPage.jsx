import { Component } from 'react';
import Input from '../components/Input.jsx';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { signUp } from '../api/apiCalls';

class SignUpPage extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
    apiProgress: false,
    signUpSuccess: false,
    errors: {},
    counter: 0
  };

  // interval; // is this line necessary? maybe not

  // componentDidMount() {
  //   console.log('mounted');
  //   this.interval = setInterval(() => {
  //     console.log('increasing counter');
  //     this.setState(previousState => {
  //       return {
  //         counter: previousState + 1
  //       };
  //     });
  //   });
  // }

  componentDidUpdate(previousProps, previousState) {
    console.log('update', previousProps, this.props);
  }

  // componentWillUnmount() {
  //   console.log('unmount');
  //   clearInterval(this.interval);
  // }

  onChange = event => {
    const { id, value } = event.target;

    // WARN: if you need to update an object in state, it is
    //   VERY IMPORTANT to make copy of that object first
    //   This is not necessary in our case because we have no nested object
    // NOTE: Use the version below if the errors state has a nested object inside
    //   const errorsCopy = JSON.parse(JSON.stringify(this.state.errors));
    const errorsCopy = { ...this.state.errors };
    delete errorsCopy[id];

    this.setState({
      [id]: value,
      errors: errorsCopy
    });
  };

  submit = async event => {
    event.preventDefault();
    const { username, email, password } = this.state;
    const body = { username, email, password };
    this.setState({ apiProgress: true });
    try {
      await signUp(body);
      this.setState({ signUpSuccess: true });
    } catch (error) {
      if (error.response.status === 400) {
        this.setState({ errors: error.response.data.validationErrors });
      }
      this.setState({ apiProgress: false });
    }
  };

  render() {
    const { t } = this.props;
    let disabled = true;
    const { password, passwordRepeat, apiProgress, signUpSuccess, errors } =
      this.state;
    if (password && passwordRepeat) {
      disabled = password !== passwordRepeat;
    }

    const passwordMismatch =
      password !== passwordRepeat ? t('passwordMismatchValidation') : '';

    return (
      <div
        className="col-lg-6 offset-lg-3 col-md-8 offset-md-2"
        data-testid="signup-page"
      >
        {!signUpSuccess && (
          <form className="card mt-5" data-testid="form-sign-up">
            <div className="card-header">
              <h1 className="text-center">{t('signUp')}</h1>
            </div>
            <div className="card-body">
              {/* username input */}
              <Input
                id="username"
                label={t('username')}
                onChange={this.onChange}
                help={errors.username}
              />
              {/* email input */}
              <Input
                id="email"
                label={t('email')}
                onChange={this.onChange}
                help={errors.email}
              />
              {/* password input */}
              <Input
                id="password"
                label={t('password')}
                onChange={this.onChange}
                help={errors.password}
                type="password"
              />
              {/* passwordRepeat input */}
              <Input
                id="passwordRepeat"
                label={t('passwordRepeat')}
                onChange={this.onChange}
                help={passwordMismatch}
                type="password"
              />
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
                  {t('signUp')}
                </button>
              </div>
            </div>
          </form>
        )}

        {signUpSuccess && (
          <div className="alert alert-success mt-3">
            Please check your e-mail to activate your account
          </div>
        )}
      </div>
    );
  }
}

SignUpPage.propTypes = {
  t: PropTypes.func,
  i18n: PropTypes.object
};

const SignUpPageWithTranslation = withTranslation()(SignUpPage);

export default SignUpPageWithTranslation;
