import {db} from './config.js'
import { getFirestore, collection, where, query, getDocs, getDoc, setDoc, addDoc, doc, updateDoc, orderBy, onSnapshot, limit} from 'firebase/firestore';

export const reactionsFirebase = async (template, author)=>{

  const docId = author.toString()
  const userDoc = doc(db, 'user', docId)
  const docSnap = await getDoc(userDoc)

  if (docSnap.exists()) {
    console.log(docSnap.data());

    console.log(docSnap.data().reactions);
    if (docSnap.data().reactions === undefined) {
      updateDoc(userDoc,{
        reactions: [template]
      })
    }else{
      let aux = await docSnap.data().reactions
      aux.push(template)
  
      updateDoc(userDoc,{
        reactions: aux
      })
    }
  }else{
    console.log('document not found');
  }
}