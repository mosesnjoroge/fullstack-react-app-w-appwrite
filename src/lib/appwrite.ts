import { Client, Databases } from 'appwrite';

export const client = new Client();
export const databases = new Databases(client);

client
    .setEndpoint(import.meta.env.VITE_APP_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APP_APPWRITE_PROJECT_ID);

const promise = databases.listDocuments('[DATABASE_ID]','[COLLECTION_ID]');

promise.then(function(response){
  console.log(response); //success
}, function(error) {
  console.log(error); //failure
});
