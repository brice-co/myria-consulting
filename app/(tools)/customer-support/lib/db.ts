import { openDB, IDBPDatabase } from 'idb';
import type { CallSession } from './schemas';

const DB_NAME = 'voice-support-hub';
const DB_VERSION = 1;
const STORE_NAME = 'call-sessions';

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          store.createIndex('startedAt', 'startedAt');
        }
      },
    });
  }
  return dbPromise;
}

export async function saveSession(session: CallSession) {
  const db = await getDB();
  await db.put(STORE_NAME, session);
}

export async function getSessions(): Promise<CallSession[]> {
  const db = await getDB();
  const all = await db.getAllFromIndex(STORE_NAME, 'startedAt');
  return all.reverse();
}

export async function getSession(id: string): Promise<CallSession | undefined> {
  const db = await getDB();
  return db.get(STORE_NAME, id);
}

export async function deleteSession(id: string) {
  const db = await getDB();
  await db.delete(STORE_NAME, id);
}

export async function clearSessions() {
  const db = await getDB();
  await db.clear(STORE_NAME);
}
