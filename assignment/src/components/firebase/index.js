import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAReBAgAnOC70MejJfjkwSiECdyk_l7uuc",
  authDomain: "web-application-assignme-91e23.firebaseapp.com",
  projectId: "web-application-assignme-91e23",
  storageBucket: "web-application-assignme-91e23.appspot.com",
  messagingSenderId: "714357052935",
  appId: "1:714357052935:web:a163cf411e68a9687abca2",
  measurementId: "G-K0QRWJ3GQT"
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export default { auth };
