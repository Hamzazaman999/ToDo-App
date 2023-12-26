import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { auth, db } from './config.js';
import { collection, addDoc, getDocs, query, where, Timestamp, orderBy, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


let arr = [];
let userUid;
onAuthStateChanged(auth, async(user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);
        userUid = uid;
        const q = query(collection(db, "todos"), where("uid", "==", uid), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          arr.push({...doc.data(), docId: doc.id });
        });
        renderTodo()
    } else {
        window.location = 'login.html'
    }
  });

const form = document.querySelector('#form');
const title = document.querySelector('#title');
const desc = document.querySelector('#description');
const div = document.querySelector('.container');


function renderTodo() {
  div.innerHTML = ''
  console.log(arr);
  arr.map((item) => {
    div.innerHTML += `
    <h3>Title: ${item.title}</h3>
    <h3>Description: ${item.description}</h3>
    
    <button id="deleteBtn"><i  class="fa-solid fa-trash"></i></button>
    <button id="updateBtn"><i class="fa-solid fa-pen-to-square"></i></button>
    <hr/>
    `
  })

  const deleteBtn = document.querySelectorAll('#deleteBtn');
  deleteBtn.forEach((item, index) => {
    item.addEventListener('click', () => {
      deleteTodo(index);
    })
  })

  //update todo
  const updateBtn = document.querySelectorAll('#updateBtn');
  updateBtn.forEach((item, index) => {
    item.addEventListener('click', () => {
      console.log('update called', index);
      updateTodo(index);
    })
  })
}

//add data
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    const docRef = await addDoc(collection(db, "todos"), {
      uid: auth.currentUser.uid, 
      timestamp: Timestamp.fromDate(new Date()),
      title: title.value,
      description: desc.value,
    });
    console.log("Document written with ID: ", docRef.id);
    arr.unshift({
      uid: userUid,
      docId:docRef.id,
      title: title.value,
      description: desc.value,
    })
    renderTodo()
    title.value = '';
    desc.value = '';
  } catch (e) {
    console.error("Error adding document: ", e);
  }
})
  
function deleteTodo(index) {
  deleteDoc(doc(db, "todos", arr[index].docId))
    .then(() => {
      arr.splice(index, 1);
      renderTodo()
    }).catch((err) => {
      console.log(err);
    })
}
function updateTodo(index) {
  const title = prompt('enter title to update');
  const todosRef = doc(db, "todos", arr[index].docId);
  
  updateDoc(todosRef, {
    title: title
  }).then(()=>{
    arr[index].title = title;
    renderTodo()
  }).catch((err)=>{
    console.log(err);
  })

  renderTodo()
}


const btn = document.querySelector('#logoutbtn')
btn.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('user logout successfully');
        window.location = 'login.html'
    }).catch((error) => {
        console.log('error ===>' , error);
    });
});


