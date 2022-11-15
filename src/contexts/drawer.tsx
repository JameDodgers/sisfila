import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface DrawerContextData {
  organizationId: string;
  setOrganizationId: Dispatch<SetStateAction<string>>;
}

interface DrawerProviderProps {
  children: ReactNode;
}

export const DrawerContext = createContext({} as DrawerContextData);

function DrawerProvider({ children }: DrawerProviderProps) {
  const [organizationId, setOrganizationId] = useState<string>("");

  return (
    <DrawerContext.Provider
      value={{
        organizationId,
        setOrganizationId,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

const useDrawer = () => {
  const context = useContext(DrawerContext);

  return context;
};

export { DrawerProvider, useDrawer };
