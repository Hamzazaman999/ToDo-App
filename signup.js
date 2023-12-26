import {createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth, db, storage } from "./config.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js'

const form = document.querySelector("#form")
const email = document.querySelector("#newEmail")
const password = document.querySelector("#newPassword")
const userName = document.querySelector('#name');

form.addEventListener('submit', (event) => {
  event.preventDefault()
  console.log(email.value);
  console.log(password.value);
  createUserWithEmailAndPassword(auth, email.value, password.value)
  .then(async (userCredential) => {
    const user = userCredential.user;
    console.log(user);
    try {
        const docRef = await addDoc(collection(db, "users"), {
            name: userName.value,
            email: email.value,
            uid: user.uid
        });
        console.log("Document written with ID: ", docRef.id);
        window.location = 'login.html'
    } catch (e) {
        console.error("Error adding document: ", e);
    }
})
.catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
});
})
