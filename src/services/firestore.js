import { initializeApp } from "firebase/app";
import { 
  getFirestore,
  getDoc, 
  doc, 
  collection,
  addDoc,
  listCollections,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// This is just a helper to add the type to the db responses
const createCollection = (collectionName) => {
  return collection(db, collectionName)
}

// export all collections
export const usersCol = createCollection('users')
export const activitiesCol = createCollection('activities')

export const getUser = async (userId) => {
  const userDocRef = doc(usersCol, userId)
  const userDoc = await getDoc(userDocRef)
  const userData = userDoc.data();
  getUserSubCollections(userDoc);
  if (userData) { 
    console.log(userData)
    return userData;
  }
}

const getUserSubCollections = async (userDoc) => {
  const subCollections = await userDoc.listCollections();
  subCollections.forEach(subCollection => {
    console.log('Found subcollection with id:', subCollection.id);
  });

  // const userDocRef = doc(activitiesCol, userId)
  // const userDoc = await getDoc(userDocRef)
  // const userData = userDoc.data();
  // if (userData) { 
  //   console.log(userData)
  //   return userData;
  // }
  // doc(db, "department", deptId, "employees", empId);
}

export const createUser = (firstName, lastName) => {
  const usersRef = collection(db, 'users')
  return addDoc(usersRef, {
  });
};