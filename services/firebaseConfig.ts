// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  initializeAuth,
  getReactNativePersistence,
  indexedDBLocalPersistence,
} from "firebase/auth";
import { getFirestore, collection, DocumentReference } from "firebase/firestore";
import { CHAT_APP_CONSTANTS } from "../constants/constants";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGe2hXvwF8VOaOLwWRBZKfYHWWgzUMq0Q",
  authDomain: "pet-adopt-ed05f.firebaseapp.com",
  projectId: "pet-adopt-ed05f",
  storageBucket: "pet-adopt-ed05f.appspot.com",
  messagingSenderId: "460568904053",
  appId: "1:460568904053:web:1e6358010528651720133c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase auth instance setup (For Android)
export const auth = initializeAuth(app, CHAT_APP_CONSTANTS.isWeb ? {
  persistence: indexedDBLocalPersistence,
} : {
  // we need to make some changes in the tsconfig.json file inorder to access the "getReactNativePersistence()",
  // Also need to install another package("AsyncStorage") for persisting the user in react native async storage
  // AsyncStorage -> is responsible for storing the user data in local storage
  persistence: getReactNativePersistence(AsyncStorage),
});

// Instance of firestore db
export const db = getFirestore(app);

// Reference of usersCollection
export const usersCollectionRef = collection(
  db,
  CHAT_APP_CONSTANTS.USERS_COLLLECTION
);
export const roomsCollectionRef = collection(
  db,
  CHAT_APP_CONSTANTS.ROOMS_COLLECTION
);
export const messagesCollectionRef = (docRef: DocumentReference) => collection(
  docRef,
  CHAT_APP_CONSTANTS.MESSAGE_COLLECTION
);
