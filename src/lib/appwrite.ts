import { Client, Databases, Storage, Account} from 'appwrite';

export const client = new Client();
export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);

client
    .setEndpoint(import.meta.env.VITE_APP_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APP_APPWRITE_PROJECT_ID);

// const promise = databases.listDocuments(
//     import.meta.env.VITE_APP_APPWRITE_EVENTS_DATABASE_ID,
//     import.meta.env.VITE_APP_APPWRITE_EVENTS_COLLECTION_ID,
//   );

// promise.then(function(response){
//   console.log(response); //success
// }, function(error) {
//   console.log(error); //failure
// });
