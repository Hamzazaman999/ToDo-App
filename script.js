import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';
import { auth, db } from './config.js';
import { collection, addDoc, getDocs, query, where, Timestamp, orderBy, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


const addbtn = document.querySelector("#addbtn");

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user;
        console.log(uid);
    } else {
        window.location = 'login.html'
    }
});

addbtn.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        title: title.value,
        description: desc.value,
        uid: auth.currentUser.uid,
        timestamp: Timestamp.fromDate(new Date()),
      });
      console.log("Document written with ID: ", docRef.id);
      arr.unshift({
        title: title.value,
        description: desc.value,
        uid: userUid,
        docId:docRef.id
      })
      renderTodo()
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  })
  

const btn = document.querySelector('#logoutbtn')
btn.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('user logout successfully');
        window.location = 'login.html'
    }).catch((error) => {
        console.log('error ===>' , error);
    });
})


