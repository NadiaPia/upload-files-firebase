// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; //tells the firebase that we gonna use the storage in this app


//this configuration code is from Firebase SDK----------
const firebaseConfig = {
  apiKey: "AIzaSyDxuCdLOJpdYY4A9TYCjezZef6OoBP4mJY",
  authDomain: "uploadimages-753bf.firebaseapp.com",
  projectId: "uploadimages-753bf",
  storageBucket: "uploadimages-753bf.appspot.com",
  messagingSenderId: "800166544172",
  appId: "1:800166544172:web:4409d8ac46cd393edee289"
};
//-------------------------------------

// Initialize Firebase
const app = initializeApp(firebaseConfig); //this configuration code is from Firebase SDK
export const storage = getStorage(app); //will allow us to make refferance which storage we are using, 
//we need access it from all files of the app => we need export it