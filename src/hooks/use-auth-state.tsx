import { useState,useEffect } from "react";
import { logIn ,verifySession , getCurrentSession, deleteCurrentSession, VerifySessionOptions } from "@/lib/auth";
import { Models } from "appwrite";
import { getTeams } from "@/lib/user";

export function useAuthState() {
  const [session,setSession] = useState<Models.Session>();
  const [isAdmin,setIsAdmin] = useState<boolean>(false);


  useEffect(()=> {
    (async function run() {
      const data = await getCurrentSession();
      setSession(data.session);
    })();
  }, [])

  useEffect(()=> {
    if (!session?.$id) return;
    (async function run() {
      const {teams} = await getTeams();
      const isAdmin = !!teams.find(team => team.$id === import.meta.env.VITE_APP_APPWRITE_TEAM_ADMIN_ID)
      setIsAdmin(isAdmin);
    })();
  }, [session?.$id])

  async function logOut() {
    await deleteCurrentSession();
    setSession(undefined);
  }

  async function verifySessionAndSave(options: VerifySessionOptions) {
    const data = await verifySession(options);
    setSession(data);
  }
  return{
    session,
    isAdmin,
    logIn,
    logOut,
    verifySession: verifySessionAndSave
  }
}
