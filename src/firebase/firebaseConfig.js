// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH3-tsNOA4jKlgv8Eh7ZgpPNmWkWOIzoU",
  authDomain: "chat-application-f3f41.firebaseapp.com",
  projectId: "chat-application-f3f41",
  storageBucket: "chat-application-f3f41.appspot.com",
  messagingSenderId: "497281266923",
  appId: "1:497281266923:web:ff74db7edcea7a903d7aae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;