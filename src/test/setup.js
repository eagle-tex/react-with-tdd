// NOTE: https://testing-library.com/docs/react-testing-library/setup
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContextWrapper from '../state/AuthContextWrapper';
import LanguageSelector from '../components/LanguageSelector';

const RootWrapper = ({ children }) => {
  return (
    <Router theme="light">
      <AuthContextWrapper>
        {children}
        <LanguageSelector />
      </AuthContextWrapper>
    </Router>
  );
};

RootWrapper.propTypes = {
  children: PropTypes.element
};

const customRender = (ui, options) =>
  render(ui, { wrapper: RootWrapper, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
