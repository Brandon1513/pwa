import { openDB } from 'idb';

const DB_NAME = 'tasksDB';
const STORE_NAME = 'tasks';

export const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
    }
  },
});

// Guardar una tarea en IndexedDB
export async function saveTask(task) {
  const db = await dbPromise;
  return db.put(STORE_NAME, task);
}

// Obtener todas las tareas
export async function getTasks() {
  const db = await dbPromise;
  return db.getAll(STORE_NAME);
}

// Eliminar una tarea
export async function deleteTask(id) {
  const db = await dbPromise;
  return db.delete(STORE_NAME, id);
}
