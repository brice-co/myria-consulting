import { openDB, type DBSchema } from 'idb';
import type { ConversationSession } from './types';

interface VoiceAgentDB extends DBSchema {
  sessions: {
    key: string;
    value: ConversationSession;
    indexes: { 'by-date': number };
  };
}

const DB_NAME = 'voice-agent-db';
const DB_VERSION = 1;

async function getDB() {
  return openDB<VoiceAgentDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      const store = db.createObjectStore('sessions', { keyPath: 'id' });
      store.createIndex('by-date', 'startedAt');
    },
  });
}

export async function saveSession(session: ConversationSession) {
  const db = await getDB();
  await db.put('sessions', session);
}

export async function getSession(id: string) {
  const db = await getDB();
  return db.get('sessions', id);
}

export async function getAllSessions(): Promise<ConversationSession[]> {
  const db = await getDB();
  return db.getAllFromIndex('sessions', 'by-date');
}

export async function deleteSession(id: string) {
  const db = await getDB();
  await db.delete('sessions', id);
}
