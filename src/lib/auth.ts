import {account} from '@/lib/appwrite';


export async function logIn() {
  await account.createMagicURLSession(uniqueId, email)
}
