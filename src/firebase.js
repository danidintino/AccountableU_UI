import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";

  // Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnGCJc2UX0gJuUPJl0VdVNfMS9pKNEsng",
  authDomain: "accountableu.firebaseapp.com",
  databaseURL: "https://accountableu-default-rtdb.firebaseio.com",
  projectId: "accountableu",
  storageBucket: "accountableu.appspot.com",
  messagingSenderId: "774071259586",
  appId: "1:774071259586:web:8f16e2eae6eb7c917cc65b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const logInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        displayName: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (displayName, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      displayName: user.displayName,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};


const createGoal = async (user, newGoal) => {
  try {
    const docRef = await addDoc(collection(db, "goals"), { ...newGoal, uid: user.uid });
    return docRef;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

const getGoalsByUid = async (uid) => {
  try {
    const q = query(collection(db, "goals"), where("uid", "==", uid));
    const docs = await getDocs(q);
    if (docs) {
      const docsList = [];
      docs.forEach((doc) => {
        docsList.push({ ...doc.data(), id: doc.id });
      });
      return docsList;
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

// const updateGoal = async (user, updatedGoal) => {
//   try {
//     const docRef = await setDoc(collection(db, "goals"), { ...updatedGoal, uid: user.uid });
//     return docRef;
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// }

export {
  auth,
  db,
  logInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  createGoal,
  getGoalsByUid,
};