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

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
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
