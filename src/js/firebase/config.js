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
let groupId;




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
  return user
}


export async function getUser(uid){
  const userRef = collection(db, 'user')
  const getDoc = await getDocs(userRef)
  const users = getDoc.docs.map(doc => doc.data());

  users.forEach(user =>{
    if (user.uid === uid) {
      user2 = user
    }
  })
  // console.log(user2);
  return user2
}




async function saveUserToFirestore(data, group) {
  console.log(data);

  const collectionId = data.id.toString(16)

  const userRef = await setDoc(doc(db, 'user', collectionId), {
    uid: data.id,
    name: `${data.name} ${data.last_name}`,
    email: data.email,
    groups: []
  });
}


let flagGroups = false

const validateGroup = (user, user2) =>{
  
  for (let i = 0; i < user.groups.length; i++) {
    for (let j = 0; j < user2.groups.length; j++) {
      if (user2.groups[j] === user.groups[i] && user.groups[i].length > 0) {
        flagGroups = true
        console.log(user.groups[i]);
        console.log(user2.groups[j]);
        groupId = user.groups[i]
      }
    }
  }
  handleMessage(groupId, flagGroups, user, user2)
}



const handleMessage = async(groupId, flagGroups, user, user2)=>{
  let sentBy = user.name
  let messageText = 'Hola cómo estas hoy =)'

  console.log(flagGroups);
  if (!flagGroups) {
    console.log(flagGroups);
    //usuario da enter para crear documentos de grupos y mensaje
    //validar enter{
      await newGroup(user, user2)
      console.log(groupId);
      // await newMessage(groupId, sentBy, messageText)

    // }

  }else{
    await getMessages(groupId)
    //enter{
      await newMessage(groupId, sentBy, messageText)
    // }
  }
}

async function newGroup(user1, user2){
  const date = new Date()

  const groupRef = await addDoc(collection(db, "group"), {
    created_by : user1.name,
    users: [user1.uid, user2.uid]
  });
  
  // console.log(groupRef.id);
  groupId = groupRef.id
  await updateUser(groupRef.id, user1)
  await updateUser(groupRef.id, user2)


  await newMessage(groupRef.id, user1.name, 'messageText')
  // else{
  //   //getgroup
  //   console.log('grupo ya existe');
  //   console.log(groupId);
  //   // getMessageGroup(groupId)
  // }
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



const newMessage = async (groupId, sentBy, messageText) =>{
  // addDoc(collection(db, "group"
  console.log(groupId);
  const date = new Date()
  const messages = await addDoc(collection(db, `message/${groupId}/messages`), {
    messageText : messageText,
    sentBy: sentBy,
    sentAt: date
  })

  const collectionMessage = await setDoc(doc(db, 'message', groupId), messages)
}

export const getMessages = async (groupId) =>{

  console.log(typeof(groupId));

  const messageRef = collection(db, `message/${groupId}/messages`)
  const getMessages = await getDocs(messageRef)
  const messages = getMessages.docs.map(doc => doc.data())
  console.log(messages);

  // const users = getDoc.docs.map(doc => doc.data());
}


export const getGroupUser = async (groupId)=>{
  let chatWhith;
  const groupRef = collection(db, 'group')
  const groupRefId = await getDocs(groupRef)
  groupRefId.docs.forEach(el => {
    if (el.id === groupId) {
      const members = el._document.data.value.mapValue.fields.users.arrayValue.values
      members.forEach(id => {
        if (id.integerValue !== user.uid.toString()) {
          chatWhith = id.integerValue
        }
      });
    }
  });
  return parseInt(chatWhith)
}





export const  usersChat = async ()=>{
  const users = {
    user1: await user,
    user2: await user2
  }
  return users
}

// setTimeout(() => {
//   const initChat = document.getElementById('btn-initChat')
//   initChat.addEventListener('click', e =>{
//     validateGroup(user, user2)
//   })
// }, 1000);