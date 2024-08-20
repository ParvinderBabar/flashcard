// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBRQbnV5cYhdqaNoG2HLzAWEGyxLze4A5U",
//   authDomain: "flashcard-saas-89d6a.firebaseapp.com",
//   projectId: "flashcard-saas-89d6a",
//   storageBucket: "flashcard-saas-89d6a.appspot.com",
//   messagingSenderId: "123965136964",
//   appId: "1:123965136964:web:b2b344f9c331b4621e5c11"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwfaWtI5vexH-58ejak2dRojCo-tV3ey4",
  authDomain: "flashcard-40fea.firebaseapp.com",
  projectId: "flashcard-40fea",
  storageBucket: "flashcard-40fea.appspot.com",
  messagingSenderId: "232774355145",
  appId: "1:232774355145:web:c4aa979a15e14b1b89a518",
  measurementId: "G-Q5QZ1XGHTS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export{db}