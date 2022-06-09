import { initializeApp } from "firebase/app";
import { 
  getFirestore,
  getDoc, 
  doc, 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getActivity = (activityId) => {
  const activityDocRef = doc(db, 'activities', activityId)
  return getDoc(activityDocRef);
};