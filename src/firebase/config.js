import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA0EiVtHVKRQOLWo5yWLdK_SCHGDh7sztE",
  authDomain: "abel-ecommerce-reactjs.firebaseapp.com",
  projectId: "abel-ecommerce-reactjs",
  storageBucket: "abel-ecommerce-reactjs.firebasestorage.app",
  messagingSenderId: "317981917370",
  appId: "1:317981917370:web:789a2d80e5b41b5755c283"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);