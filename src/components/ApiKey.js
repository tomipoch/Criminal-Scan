// ApiKey.js
import React, { createContext, useState } from 'react';

// Create a Context for the API key
export const ApiKeyContext = createContext();

const ApiKey = ({ children }) => {
  const [apiKey, setApiKey] = useState('');

  const logout = () => {
    setApiKey('');
  };

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey, logout }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export default ApiKey;
