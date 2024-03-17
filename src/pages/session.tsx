import {useState,useEffect} from 'react'

import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';

import Container from '@/components/Container';
import { AppwriteException } from 'appwrite';

function Session() {
  const { verifySession } = useAuth();
  const [error, setError] = useState<string>();
  const [,navigate] =  useLocation();

  // use effect
  useEffect (() =>{
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    const secret = params.get('secret');

    if(typeof userId !== 'string' || typeof secret !== 'string'){
      navigate('/login');
      return;
    }

    (async function run() {
      try{
        await verifySession({userId,secret});
        navigate('/');
      }catch(error: unknown){
        AppwriteException
        if (error instanceof AppwriteException){
          setError(error.message);
          navigate('/login?error=${error}');
        }
      }
    })();
  },[]);

  return (
    <Container className="h-screen flex items-center justify-center text-center">
      {!error &&(
        <p>Logging you in...</p>
      )}
      {error}

    </Container>
  )
}

export default Session;
