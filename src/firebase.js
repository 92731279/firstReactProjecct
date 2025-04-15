import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_PJqq8g23BC1c9TLCmJsU_yPx2UINL40",
  authDomain: "reactproject-fec79.firebaseapp.com",
  projectId: "reactproject-fec79",
  storageBucket: "reactproject-fec79.appspot.com", // Corrigé le nom du bucket
  messagingSenderId: "158547838002",
  appId: "1:158547838002:web:694f587516e1268668682b",
  measurementId: "G-6PLCJFM3LV"
};

// Initialisation unique
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };