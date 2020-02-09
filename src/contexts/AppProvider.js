import React from "react";
import PropTypes from "prop-types";
import { AppContext } from './Context'

const AppProvider = ({ children }) => {
  const user = {
    name: 'Humayun Kabir',
    type: 'admin',
  };

  const value = { user };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {children: PropTypes.node.isRequired};

export default AppProvider;
