import React, { createContext, useState, useEffect, useContext } from 'react';
import { ApiKeyContext } from '../components/ApiKey';

export const CriminalsContext = createContext();

export const ApiCriminales = ({ children }) => {
  const [apiResponse, setApiResponse] = useState(null);
  const { apiKey } = useContext(ApiKeyContext);

  const getPersonaBuscada = async () => {
    try {
      const response = await fetch('https://wpcpsvb9-8000.brs.devtunnels.ms/carabinero/personas_buscadas/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'APIKEY': apiKey,
        },
      });

      const json = await response.json();
      setApiResponse(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getPersonaBuscada();
  }, [apiKey]);

  return (
    <CriminalsContext.Provider value={apiResponse}>
      {children}
    </CriminalsContext.Provider>
  );
};
