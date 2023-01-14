import { Component } from 'react';

const withHover = WrappedComponent => {
  return class Hover extends Component {
    static displayName = `withHover(${
      WrappedComponent.displayName || WrappedComponent.name || Component
    })`;
    render() {
      return <WrappedComponent />;
    }
  };
};

export default withHover;
