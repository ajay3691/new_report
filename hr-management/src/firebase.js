import { initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDKpch9hOeb8F82Lpo3ffDwMW7tM7DXixg",
  authDomain: "hr-production-c3fe7.firebaseapp.com",
  projectId: "hr-production-c3fe7",
  storageBucket: "hr-production-c3fe7.appspot.com",
  messagingSenderId: "44850046949",
  appId: "1:44850046949:web:ac3e3846f4c1ac4c07b10c",
  measurementId: "G-5M7X57L0Y1"
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);



