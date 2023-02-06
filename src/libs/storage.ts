type Storage = 'local' | 'session';

export function getStorage(name: string, type: Storage) {
  if (type === 'local') {
    return localStorage.getItem(name);
  }
  return sessionStorage.getItem(name);
}
