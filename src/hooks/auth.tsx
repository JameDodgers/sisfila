import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

import api from "../services/api";
import { COLLECTION_USER } from "../configs/storage";
import Storage from "../libs/storage";

const WEB_CLIENT_ID = process.env.WEB_CLIENT_ID;

WebBrowser.maybeCompleteAuthSession();

interface User {
  email: string;
  token: string;
}

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface AuthenticateUserRequest {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  request: AuthSession.GoogleAuthRequestConfig | null;
  signIn: (params: AuthenticateUserRequest) => Promise<void>;
  signUp: (params: CreateUserRequest) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<AuthSession.AuthSessionResult>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: WEB_CLIENT_ID,
  });

  useEffect(() => {
    const loadStorageData = async () => {
      const storage = await Storage.getItem(COLLECTION_USER);

      if (storage) {
        const userLogged = JSON.parse(storage) as User;
        api.defaults.headers.authorization = `Bearer ${userLogged.token}`;

        setUser(userLogged);
      }
    };
    loadStorageData();
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;

      setLoading(true);

      const authenticateWithGoogle = async () => {
        try {
          const { data } = await api.post("v1/users/auth/google", {
            oauthToken: id_token,
            audience: WEB_CLIENT_ID,
          });

          const userData = {
            ...data.user,
            token: data.token,
          };

          await Storage.setItem(COLLECTION_USER, JSON.stringify(userData));

          setUser(userData);
        } catch (error) {
          throw new Error("Não foi possível autenticar");
        } finally {
          setLoading(false);
        }
      };

      authenticateWithGoogle();
    }
  }, [response]);

  const signUp = async ({ email, password, name }: CreateUserRequest) => {
    setLoading(true);
    try {
      const { data } = await api.post("v1/users", {
        email,
        password,
        name,
      });

      const userData = {
        ...data.user,
        token: data.token,
      };

      await Storage.setItem(COLLECTION_USER, JSON.stringify(userData));

      setUser(userData);
    } catch (error) {
      throw new Error("Não foi possível cadastrar");
    } finally {
      setLoading(false);
    }
  };

  const signIn = async ({ email, password }: AuthenticateUserRequest) => {
    setLoading(true);
    try {
      const { data } = await api.post("v1/users/auth", {
        email,
        password,
      });

      const userData = {
        ...data.user,
        token: data.token,
      };

      await Storage.setItem(COLLECTION_USER, JSON.stringify(userData));

      setUser(userData);
    } catch (error) {
      throw new Error("Não foi possível autenticar");
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await Storage.removeItem(COLLECTION_USER);

      setUser({} as User);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        request,
        signIn,
        signInWithGoogle: promptAsync,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
