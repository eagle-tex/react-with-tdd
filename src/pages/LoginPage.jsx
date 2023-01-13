import { useState, useEffect } from 'react';

const LoginPage = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('increasing counter');
      setCounter(previousCounter => {
        return previousCounter + 1;
      });
    }, 1000);
    console.log('this is like component did mount');
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    console.log(
      'this is like component did update, but it is for specified dependency'
    );
  }, [counter]);

  return (
    <div data-testid="login-page">
      <h1>Login Page</h1>
      {counter}
    </div>
  );
};

export default LoginPage;
