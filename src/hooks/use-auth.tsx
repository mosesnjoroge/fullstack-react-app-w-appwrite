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

// export function useAuthState() {
//   const [session,setSession] = useState<Models.Session>();
//   useEffect(()=> {
//     (async function run() {
//       const data = await getCurrentSession();
//       setSession(data.session);
//     })();
//   }, [])
//   async function verifySessionAndSave(options: VerifySessionOptions) {
//     const data = await verifySession(options);
//     setSession(data);
//   }
//   async function logOut() {
//     await deleteCurrentSession();
//     setSession(undefined);
//   }

//   return{
//     session,
//     logIn,
//     logOut,
//     verifySession: verifySessionAndSave
//   }
// }

export function useAuth() {
  const auth = useContext(AuthContext);
  if(!auth){
    throw new Error('useAuth cannot be used outside of AuthContext')
  }
  return auth;
}
