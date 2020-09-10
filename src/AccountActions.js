export async function login(username, password) {
  await new Promise(r => setTimeout(r, 100));
  if (username === 'admin' && password === 'qwerty') {
    return true;
  }
  throw new Error('Unable to log in');
}
