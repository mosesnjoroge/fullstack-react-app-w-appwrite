import {account} from '@/lib/appwrite';
import {ID} from 'appwrite'

export async function logIn(email:string) {
  const data =await account.createMagicURLSession(ID.unique(), email)
  return data;
}
