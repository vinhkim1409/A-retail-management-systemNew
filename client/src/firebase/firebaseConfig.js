import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyDh_mK2CxlmlLUThTt8ykFGgJEiMzX3XJ4",
  authDomain: "bk-management-b1126.firebaseapp.com",
  projectId: "bk-management-b1126",
  storageBucket: "bk-management-b1126.appspot.com",
  messagingSenderId: "126047676686",
  appId: "1:126047676686:web:fdf04c0c41a630756e0f5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const imageDB = getStorage(app)