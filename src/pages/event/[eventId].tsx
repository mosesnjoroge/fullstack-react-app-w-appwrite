import { useState, useEffect } from 'react';

import { getEventByID,deleteEventByID, updateEventByID } from '@/lib/events';
import { LiveBeatEvent } from '@/types/events';
import { getPreviewImageById } from '@/lib/storage';

import useLocation from 'wouter/use-location';

import Layout from '@/components/Layout';
import Container from '@/components/Container';
import Button from '@/components/Button';



function Event({params}: {params: {eventId: string}}) {
  // states
  const [event,setEvent] = useState<LiveBeatEvent | undefined>();
  const [,navigate] = useLocation();

  const imageUrl = event?.imageFileID && getPreviewImageById(event.imageFileID)

  const image = {
    url: imageUrl,
    alt: '',
    height: event?.imageHeight,
    width: event?.imageWidth,
  };

  useEffect(() => {
    (async function run() {
      const { event } = await getEventByID(params.eventId)
      setEvent(event);
    })();
  }, [params.eventId]);

  async function handleOnDeleteEvent() {
    if (!event?.$id) return;
    await deleteEventByID(event.$id);

    navigate(`/`)
  }

  async function handleOnUpdateEvent() {
    if (!event?.$id) return;
    await updateEventByID(event.$id);

    // navigate(`/event/${results/event.$id}/update`);

  }
  return (
    <Layout>
      <Container className="grid gap-12 grid-cols-1 md:grid-cols-2">
        <div>
          {image?.url && (
            <img
              className="block rounded"
              width={image.width}
              height={image.height}
              src={image.url}
              alt={image.alt}
            />
          )}
        </div>

        <div>
          {event && (
            <>
              <h1 className="text-3xl font-bold mb-6">
                { event?.name }
              </h1>
              <p className="text-lg font-medium text-neutral-600 dark:text-neutral-200">
                <strong>Date:</strong> { event?.date && new Date(event?.date).toLocaleString('en-US', { month: 'long', day: 'numeric' }) }
              </p>
              <p className="text-lg font-medium text-neutral-600 dark:text-neutral-200">
                <strong>Location:</strong> { event?.location }
              </p>
              <p className="mt-6">
                <Button color="red" onClick={handleOnDeleteEvent}>Delete Event</Button>
              </p>
              <p className="mt-6">
                <Button color="red" onClick={handleOnUpdateEvent}>Update Event</Button>
              </p>
            </>
          )}
        </div>
      </Container>
    </Layout>
  )
}

export default Event;
