import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AppContext from './AppContext';

function AppProvider({ children }) {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [visible, setVisible] = useState(false);
  // const [name, setName] = useState('');
  // const [role, setRole] = useState('');
  // const [token, setToken] = useState('');
  const [selectedCards, setSelectedCards] = useState([]);

  const context = {
    // email,
    // setEmail,
    // password,
    // setPassword,
    // visible,
    // setVisible,
    // name,
    // setName,
    // role,
    // setRole,
    // token,
    // setToken,
    selectedCards,
    setSelectedCards,
  };

  return (
    <AppContext.Provider value={ context }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
