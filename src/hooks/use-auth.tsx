import { createContext,useContext,ReactNode} from "react";
import { Models } from "appwrite";
import { useAuthState } from "./use-auth-state";


interface AppAuthContext{
  session?: Models.Session;
  isAdmin?: boolean;
  logIn: Function;
  logOut: Function;
  verifySession: Function;
}

export const AuthContext = createContext<AppAuthContext | undefined >(undefined);

interface AuthProviderProps{
  children?: ReactNode;
}
export function AuthProvider({children}: AuthProviderProps) {
  const auth = useAuthState();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
 );
}

export function useAuth() {
  const auth = useContext(AuthContext);
  if(!auth){
    throw new Error('useAuth cannot be used outside of AuthContext')
  }
  return auth;
}
