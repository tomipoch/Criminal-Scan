// ScanContext.js
import React, { createContext, useState } from 'react';

export const ScanContext = createContext();

export const ScanProvider = ({ children }) => {
  const [scans, setScans] = useState([]);

  const addScan = (scan) => {
    setScans((prevScans) => [...prevScans, scan]);
  };

  return (
    <ScanContext.Provider value={{ scans, addScan }}>
      {children}
    </ScanContext.Provider>
  );
};
