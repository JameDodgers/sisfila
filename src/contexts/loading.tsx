import React, {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

type LoadingAPIContext = {
  showLoading: () => void;
  hideLoading: () => void;
};

const LoadingAPIContext = createContext({} as LoadingAPIContext);

const LoadingContext = createContext(false);

type Props = {
  children: ReactNode;
};

export const LoadingProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState(false);

  const api = useMemo(() => {
    const showLoading = () => {
      setLoading(true);
    };

    const hideLoading = () => {
      setLoading(false);
    };

    return {
      showLoading,
      hideLoading,
    };
  }, []);

  return (
    <LoadingAPIContext.Provider value={api}>
      <LoadingContext.Provider value={loading}>
        {children}
      </LoadingContext.Provider>
    </LoadingAPIContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);

export const useLoadingAPI = () => useContext(LoadingAPIContext);
