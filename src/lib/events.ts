import { Models, ID } from "appwrite";
import { databases } from "./appwrite";
import { LiveBeatEvent } from "@/types/events";
import { deleteFileById } from "./storage";

// index
export async function getEvents() {
  const {documents} = await databases.listDocuments(import.meta.env.VITE_APP_APPWRITE_EVENTS_DATABASE_ID, import.meta.env.VITE_APP_APPWRITE_EVENTS_COLLECTION_ID);
  return {
    events:documents.map(mapDocumentToEvent)
  }
}

// show
export async function getEventByID(eventId:LiveBeatEvent['$id']) {
  const document = await databases.getDocument(import.meta.env.VITE_APP_APPWRITE_EVENTS_DATABASE_ID, import.meta.env.VITE_APP_APPWRITE_EVENTS_COLLECTION_ID, eventId);
  return {
    event: mapDocumentToEvent(document)
  }
}

// new/create
export async function createEvent(event: Omit<LiveBeatEvent, '$id'>) {
  const document = await databases.createDocument(import.meta.env.VITE_APP_APPWRITE_EVENTS_DATABASE_ID, import.meta.env.VITE_APP_APPWRITE_EVENTS_COLLECTION_ID, ID.unique(),event);
  return {
    event: mapDocumentToEvent(document)
  }
}

// update
export async function updateEventByID(eventId:LiveBeatEvent['$id']) {
  const document = await databases.updateDocument(import.meta.env.VITE_APP_APPWRITE_EVENTS_DATABASE_ID, import.meta.env.VITE_APP_APPWRITE_EVENTS_COLLECTION_ID, eventId);
  return {
    event: mapDocumentToEvent(document)
  }
}

// delete
export async function deleteEventByID(eventId:LiveBeatEvent['$id']) {
  const {event} = await getEventByID(eventId);
  if (event.imageFileID){
    const resultsFile = await deleteFileById(event.imageFileID)
  }
  const data = await databases.deleteDocument(import.meta.env.VITE_APP_APPWRITE_EVENTS_DATABASE_ID, import.meta.env.VITE_APP_APPWRITE_EVENTS_COLLECTION_ID, eventId);
  return data;
}

// instance event definition
function mapDocumentToEvent(document: Models.Document) {
  const event: LiveBeatEvent = {
    $id: document.$id,
    name: document.name,
    location:document.location,
    date:document.date,
    imageHeight: document.imageHeight,
    imageFileID: document.imageFileID,
    imageWidth: document.imageWidth
  }
  return event;
}
