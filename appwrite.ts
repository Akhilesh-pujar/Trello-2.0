import { Client, ID, Storage, Account, Databases } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);

const databases = new Databases(client);

const storage = new Storage(client);

export { client, ID, storage, account, databases };