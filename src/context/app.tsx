import React, { ReactNode, createContext, useContext, useState } from "react";

interface AppProviderProps {
  children: ReactNode;
}

interface AppContextData {
  isLoggedIn: boolean;
}

const AppContext = createContext({} as AppContextData);

const AppProvider = ({ children }: AppProviderProps) => {
  const [isLoggedIn, setLoggedIn] = useState(true);
  return (
    <AppContext.Provider value={{ isLoggedIn }}>{children}</AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
