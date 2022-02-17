import {db} from './config.js'
import { getFirestore, collection, where, query, getDocs, getDoc, setDoc, addDoc, doc, updateDoc, orderBy, onSnapshot, limit} from 'firebase/firestore';

export const friendsRequestFirebase = async (template, author)=>{

  const docId = author.toString()
  const userDoc = doc(db, 'user', docId)
  const docSnap = await getDoc(userDoc)

  if (docSnap.exists()) {
    console.log(docSnap.data());

    console.log(docSnap.data().friends);
    if (docSnap.data().friends === undefined) {
      updateDoc(userDoc,{
        friends: [template]
      })
    }else{
      let aux = await docSnap.data().friends
      aux.push(template)
  
      updateDoc(userDoc,{
        friends: aux
      })
    }
  }else{
    console.log('document not found');
  }
}