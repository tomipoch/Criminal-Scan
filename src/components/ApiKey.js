import React, { createContext, useState } from 'react';

// Create a Context for the API key
export const ApiKeyContext = createContext();

const ApiKey = ({ children }) => {
  const [apiKey, setApiKey] = useState('');

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export default ApiKey;
