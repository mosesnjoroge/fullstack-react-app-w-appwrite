import { Route } from 'wouter';
import Home from '@/pages/index';
import Login from '@/pages/login';
import Session from '@/pages/session';
import EventsNew from '@/pages/events/new';
import Event from '@/pages/event/[eventId]';
import { useAuth } from './hooks/use-auth';

const Router = () => {
  const {session} = useAuth();
  return(
    <>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/session" component={Session} />
      {session &&(
        <Route path="/events/new" component={EventsNew} />
      )}
      <Route path="/event/:eventId" component={Event} />
    </>
  )
}

export default Router;
