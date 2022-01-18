import { initializeApp } from "firebase/app";
import { getFirestore, collection, where, query, getDocs, setDoc, addDoc, doc, updateDoc} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB8KpNHJILsB2erTcBgMuhTHWGJd_rSttk",
  authDomain: "flylinkers-login.firebaseapp.com",
  databaseURL: "https://flylinkers-login-default-rtdb.firebaseio.com",
  projectId: "flylinkers-login",
  storageBucket: "flylinkers-login.appspot.com",
  messagingSenderId: "628867348595",
  appId: "1:628867348595:web:95815a4959b5b5d0fe5206"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app); 

let user;
let user2;

export async function getUserToFirestore(data) {
  const userRef = collection(db, 'user')
  const getDoc = await getDocs(userRef)
  const users = getDoc.docs.map(doc => doc.data());

  let flag = false

  users.forEach(el => {
    if (el.email === data.email) {
      flag = true
      user = el
    }
  });


  if (flag === false) {
    saveUserToFirestore(data)
  }else{
    // getGroups(user)
  }
}


async function getUser(uid){
  const userRef = collection(db, 'user')
  const getDoc = await getDocs(userRef)
  const users = getDoc.docs.map(doc => doc.data());

  users.forEach(user =>{
    if (user.uid === uid) {
      user2 = user
    }
  })
  console.log(user2);
}
getUser(1)




async function saveUserToFirestore(data, group) {
  console.log(data);

  const collectionId = data.id.toString(16)

  const userRef = await setDoc(doc(db, 'user', collectionId), {
    uid: data.id,
    name: data.name + data.last_name,
    email: data.email,
    groups: []
  });
}

async function newGroup(user1, user2){
  const date = new Date()
  let flag = false 
  let groupId;

  for (let i = 0; i < user1.groups.length; i++) {
    for (let j = 0; j < user2.groups.length; j++) {
      if (user2.groups[j] === user1.groups[i]) {
        flag = true
        groupId = user1.groups[i]
      }
    }
  }

  console.log(flag);

  if (!flag) {
    const groupRef = await addDoc(collection(db, "group"), {
      created_by : user1.name,
      users: [user1.uid, user2.uid]
    });
    
    console.log(groupRef.id);
    updateUser(groupRef.id, user1)
    updateUser(groupRef.id, user2)

    createNewMessageGroup(groupId)

  }else{
    //getgroup
    console.log('grupo ya existe');
    console.log(groupId);

    getMessageGroup(groupId)

  }
}

const updateUser = async(groupId, user)=>{
  console.log(user);
  const collectionId = user.uid.toString(16)

  let aux = user.groups
  aux.push(groupId)

  const userDoc = doc(db, 'user', collectionId)
  console.log(userDoc);
  await updateDoc(userDoc, {
    groups: aux
  })
};



const createNewMessageGroup = async (groupId) =>{
  // addDoc(collection(db, "group"
  const date = new Date()
  const messages = await addDoc(collection(db, `message/${groupId}/messages`), {
    messageText : 'whaat?',
    sentBy: 'Omar',
    sentAt: date
  })

  const collectionMessage = await setDoc(doc(db, 'message', groupId), messages)
}

const getMessageGroup = async (groupId) =>{


  // const userRef = collection(db, 'user')
  // const getDoc = await getDocs(userRef)
  // const users = getDoc.docs.map(doc => doc.data());

  console.log(typeof(groupId));
  // db.collection("stories").where("author", "==", user.uid).get()

  const messageRef = collection(db, `message/${groupId}/messages`)
  const getMessages = await getDocs(messageRef)
  const messages = getMessages.docs.map(doc => doc.data())
  console.log(messages);

  // const users = getDoc.docs.map(doc => doc.data());
}



setTimeout(() => {
  const initChat = document.getElementById('btn-initChat')
  initChat.addEventListener('click', e =>{
    newGroup(user, user2)
  })
}, 1000);