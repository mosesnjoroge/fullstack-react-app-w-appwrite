import {account} from '@/lib/appwrite';
import {ID} from 'appwrite'

export async function logIn(email:string) {
  const data =await account.createMagicURLSession(ID.unique(), email, `${window.location.origin}/session`)
  return data;
}

export async function verifySession(userId: string, secret: string) {
  const data = await account.updateMagicURLSession(userId, secret);
  return data;
}
