import { useState } from 'react';
import { createEvent } from "@/lib/events";
import { uploadFile } from "@/lib/storage";
import useLocation from 'wouter/use-location';
import { AppwriteException } from 'appwrite';
import Form from './form';

import Layout from '@/components/Layout';
import Container from '@/components/Container';



// interface LiveBeatImage {
//   file: File;
//   height: number;
//   width: number;
// }

function EventNew() {
  // states
  const [,navigate] = useLocation();
  const [error, setError] = useState<string>();
  const [image,setImage] = useState();

  function handleOnChange(event: React.FormEvent<HTMLInputElement>){
    const target = event.target as HTMLInputElement & {
      files:FileList;
    }

    const img = new Image();
    img.onload = function() {
      setImage({
        file: target.files[0],
        height: img.height,
        width: img.width,
      })
    }
    img.src = URL.createObjectURL(target.files[0])
  }


  async function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    try{
      const target = e.target as typeof e.target & {
        name: {value:string}
        location:{value:string}
        date: {value:string}
      }

      let file ;

      if (image?.file) {
        file = await uploadFile(image.file);
      }

      const results = await createEvent({
        name:target.name.value,
        location:target.location.value,
        date: new Date(target.date.value).toISOString(),
        imageFileID: file?.$id,
        imageHeight: image?.height,
        imageWidth: image?.width
      });

      navigate(`/event/${results.event.$id}`)

    }catch(error: unknown){
      AppwriteException
      if (error instanceof AppwriteException){
        setError(error.message)
      }
    }
  }

  return (
    <Layout>
      <Container className="grid gap-12 grid-cols-1 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold mb-6">
            Create a New Event
          </h1>
          <p className="mb-4">
            Creating an event on LiveBeat is a surefire way to elevate your event's success to
            unprecedented heights. From concerts to festivals, LiveBeat caters to all event types,
            making it the ideal stage to capture the attention of your target audience.
          </p>
          <p>
            Focus on what matters most—delivering an unforgettable experience—and witness your
            event gain momentum like never before on LiveBeat.
          </p>
        </div>
      </Container>
      {error && (
        <p className="bg-red-50 p-4 mt-6 rounded">{ error }</p>
      )}
      <Form
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
      />
    </Layout>
  )
}

export default EventNew;
