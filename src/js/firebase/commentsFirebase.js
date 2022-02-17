import {db} from './config.js'
import { getFirestore, collection, where, query, getDocs, getDoc, setDoc, addDoc, doc, updateDoc, orderBy, onSnapshot, limit} from 'firebase/firestore';

export const commentsFirebase = async (template, author)=>{

  const docId = author.toString()
  const userDoc = doc(db, 'user', docId)
  const docSnap = await getDoc(userDoc)

  if (docSnap.exists()) {
    console.log(docSnap.data());

    console.log(docSnap.data().comments);
    if (docSnap.data().comments === undefined) {
      updateDoc(userDoc,{
        comments: [template]
      })
    }else{
      let aux = await docSnap.data().comments
      aux.push(template)
  
      updateDoc(userDoc,{
        comments: aux
      })
    }
  }else{
    console.log('document not found');
  }
}