
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJFtXlC8W13BLVk2uY-5yu2Ng74EzK9ZA",
  authDomain: "test-device-1c877.firebaseapp.com",
  projectId: "test-device-1c877",
  storageBucket: "test-device-1c877.firebasestorage.app",
  messagingSenderId: "907465664751",
  appId: "1:907465664751:web:695c259df712f10ac8931a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth(app);

export {auth}