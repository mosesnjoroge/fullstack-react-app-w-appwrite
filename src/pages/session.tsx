import {useEffect} from 'react'
import { verifySession } from '@/lib/auth';
import { useLocation } from 'wouter';
import Container from '@/components/Container';

function Session() {
  const [,navigate] =  useLocation();
  useEffect (() =>{
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    const secret = params.get('secret');

    console.log('userId', userId);
    console.log('secret', secret);

    if(typeof userId !== 'string' || typeof secret !== 'string'){
      navigate('/login');
      return;
    }

    (async function run() {
      await verifySession(userId,secret);
      navigate('/');
    })();
  },[]);

  return (
    <Container className="h-screen flex items-center justify-center text-center">
      <p>Logging you in...</p>
    </Container>
  )
}

export default Session;
