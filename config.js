import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
 import { getStorage } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyAZr6YfrWvnuZHC7zDb36ZpLGerOi72f0k",
    authDomain: "todo-app-eaa31.firebaseapp.com",
    databaseURL: "https://todo-app-eaa31-default-rtdb.firebaseio.com",
    projectId: "todo-app-eaa31",
    storageBucket: "todo-app-eaa31.appspot.com",
    messagingSenderId: "984671093189",
    appId: "1:984671093189:web:0e3d4f7e5ef37e17cc8bac",
    measurementId: "G-6D6BC96DEK"
  };
  

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);