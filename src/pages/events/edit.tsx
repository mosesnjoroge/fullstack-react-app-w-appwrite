import { useState } from "react";
import Layout from '@/components/Layout';
import useLocation from 'wouter/use-location';
import Form from './form';
import { updateEventByID } from "@/lib/events";
import { uploadFile } from "@/lib/storage";

function EventEdit() {
  // states
  const [,navigate] = useLocation();
  const [error] = useState<string>();
  const [image,setImage] = useState();

  async function handleOnUpdateEvent() {
    if (!event?.$id) return;
    await updateEventByID(event.$id);

    navigate(`/event/${results/event.$id}/update`);

  }
  async function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: {value:string}
      location:{value:string}
      date: {value:string}
    }

    let file ;

    if (image?.file) {
      file = await uploadFile(image.file);
    }

  }
  return(
    <Layout>
      <h1 className="text-3xl font-bold mb-6">
        Edit Event
      </h1>
      <Form handleOnChange={handleOnUpdateEvent} handleOnSubmit={handleOnSubmit}/>
      {error && (
        <p className="bg-red-50 p-4 mt-6 rounded">{ error }</p>
      )}
    </Layout>
  );
}
export default EventEdit;
