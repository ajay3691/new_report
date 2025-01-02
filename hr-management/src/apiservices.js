import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  orderBy,
  query,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export const FetchData = async (endpoint) => {
  try {
    const q = query(collection(db, endpoint), orderBy("order", "asc"));
    const querySnapshot = await getDocs(q);

    let queryData = [];
    querySnapshot.docs.forEach((doc, index) => {
      queryData.push({
        id: index + 1,
        deleteId: doc.id,
        ...doc.data(),
      });
    });

    return queryData;
  } catch (error) {
    throw error;
  }
};

// export const DeleteData = async (endpoint, id) => {
//   const querydelete = await deleteDoc(doc(db, `${endpoint}`, `${id}`));
//   return querydelete;
// };

// export const updateData = async (endpoint, data, id) => {
//   const queryupdate = doc(db, `${endpoint}`, `${id}`);
//   const querydata = await updateDoc(queryupdate, data);
//   return querydata;
// };
// export const postData = async (endoint, data) => {
//   data.order = Date.now();
//   const addemployee = await addDoc(collection(db, `${endoint}`), data);
//   return addemployee;
// };
export const DeleteData = async (endpoint, id) => {
  try {
    const documentRef = doc(db, endpoint, id);

    // Check if the document exists before attempting to delete
    const documentSnapshot = await getDoc(documentRef);

    if (documentSnapshot.exists()) {
      const querydelete = await deleteDoc(documentRef);
      return querydelete;
    } else {
      throw new Error('Document not found');
    }
  } catch (error) {
    throw error; // Rethrow the error to propagate it up the call stack
  }
};

export const updateData = async (endpoint, data, id) => {
  try {
    const queryupdate = doc(db, `${endpoint}`, `${id}`);
    const querydata = await updateDoc(queryupdate, data);
    return querydata;
  } catch (error) {
    throw error;
  }
};

export const postData = async (endpoint, data) => {
  try {
    // if (!isValidEndpoint(endpoint)) {
    //   throw new Error('Invalid endpoint');
    // }
    data.order = Date.now();
    const addemployee = await addDoc(collection(db, `${endpoint}`), data);
    return addemployee;
  } catch (error) {
    throw error;
  }
};



