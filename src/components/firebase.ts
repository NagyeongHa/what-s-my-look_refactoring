import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAoncO2Mf0Hj0aN7VsQ9nMMN4P9Xkb95Sc',
  authDomain: 'what-s-my-look.web.app',
  databaseURL: 'https://what-s-my-look-default-rtdb.firebaseio.com',
  projectId: 'what-s-my-look',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);
const auth = getAuth(app);

export { storage, app, database, auth };
