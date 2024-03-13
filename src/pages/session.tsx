import {useEffect} from 'react'
import { verifySession } from '@/lib/auth';
import Container from '@/components/Container';
import { useEffect } from 'react';
import { URLSearchParams } from 'url';

function Session() {
  useEffect (() =>{
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    const secret = params.get('secret');

    if(typeof userId !== 'string' || typeof secret !== 'string'){
      return;
    }

    (async function run() {
      await verifySession(userId,secret)
    })();
  },[]);

  return (
    <Container className="h-screen flex items-center justify-center text-center">
      <p>Logging you in...</p>
    </Container>
  )
}

export default Session;
