import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCoCY5N1GQ_HNS2LpaEfqIC-MYGczh7jro",
  authDomain: "react-native-authenticat-401f1.firebaseapp.com",
  projectId: "react-native-authenticat-401f1",
  storageBucket: "react-native-authenticat-401f1.appspot.com",
  messagingSenderId: "889090571285",
  appId: "1:889090571285:web:69d5f8738cedfbcbad221c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default firebaseConfig;
