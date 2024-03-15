import { createContext,useContext,ReactNode,useState,useEffect } from "react";
import { Models } from "appwrite";
import { getCurrentSession,deleteCurrentSession } from "@/lib/auth";

interface AppAuthContext{
  session?: Models.Session;
  logOut: Function;
}

export const AuthContext = createContext<AppAuthContext | undefined >(undefined)

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

export function useAuthState() {
  const [session,setSession] = useState<Models.Session>();
  useEffect(()=> {
    (async function run() {
      const data = await getCurrentSession();
      setSession(data.session);
    })();
  }, [])
  async function logIn() {
    await logIn()
  }
  async function logOut() {
    await deleteCurrentSession();
    setSession(undefined);
  }

  return{
    session,
    logOut
  }
}

export function useAuth() {
  const auth = useContext(AuthContext);
  if(!auth){
    throw new Error('useAuth cannot be used outside of AuthContext')
  }
  return auth;
}
