import { storage } from "@/lib/appwrite";
import {ID} from 'appwrite';

export async function uploadFile(file:File) {
  const data = await storage.createFile(import.meta.env.VITE_APP_APPWRITE_EVENTS_BUCKET_ID,ID.unique(), file)
  return data;
}

export function getPreviewImageById(fileId:string) {
  return storage.getFilePreview(import.meta.env.VITE_APP_APPWRITE_EVENTS_BUCKET_ID,fileId)
}
