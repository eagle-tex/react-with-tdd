import { Component } from 'react';

class SignUpPage extends Component {
  state = {
    disabled: true
    // password: '',
    // passwordRepeat: ''
  };

  onChangePassword = event => {
    const currentValue = event.target.value;
    this.setState({
      password: currentValue,
      disabled: currentValue !== this.state.passwordRepeat
    });
  };

  onChangePasswordRepeat = event => {
    const currentValue = event.target.value;
    this.setState({
      passwordRepeat: currentValue,
      disabled: currentValue !== this.state.password
    });
  };

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <label htmlFor="username">Username</label>
        <input id="username" />
        <label htmlFor="email">E-mail</label>
        <input id="email" />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" onChange={this.onChangePassword} />
        <label htmlFor="passwordRepeat">Password Repeat</label>
        <input
          id="passwordRepeat"
          type="password"
          onChange={this.onChangePasswordRepeat}
        />
        <button disabled={this.state.disabled}>Sign Up</button>
      </div>
    );
  }
}

export default SignUpPage;
