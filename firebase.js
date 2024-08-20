
// const firebaseConfig = {
//   apiKey: "AIzaSyBRQbnV5cYhdqaNoG2HLzAWEGyxLze4A5U",
//   authDomain: "flashcard-saas-89d6a.firebaseapp.com",
//   projectId: "flashcard-saas-89d6a",
//   storageBucket: "flashcard-saas-89d6a.appspot.com",
//   messagingSenderId: "123965136964",
//   appId: "1:123965136964:web:b2b344f9c331b4621e5c11"
// };
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6ZcFqyM-caFVaTenz6UJzvPsoY0KGYGI",
  authDomain: "flashcard-ai-35e3e.firebaseapp.com",
  projectId: "flashcard-ai-35e3e",
  storageBucket: "flashcard-ai-35e3e.appspot.com",
  messagingSenderId: "723104764801",
  appId: "1:723104764801:web:d2270d45b0ca99e0978e80"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export{db}

