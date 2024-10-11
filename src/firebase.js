import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
    apiKey: "AIzaSyBpiFtf4i6x8Nb_GUNOr9C0tVbqPx-wm6I",
    authDomain: "xclone-65c3b.firebaseapp.com",
    projectId: "xclone-65c3b",
    storageBucket: "xclone-65c3b.appspot.com",
    messagingSenderId: "223220159770",
    appId: "1:223220159770:web:6f12710c7f992789df48a3",
    measurementId: "G-VLMFHP8QKS"
};


const fb = initializeApp(firebaseConfig);

export const auth = getAuth(fb);
export const db = getFirestore(fb);
export const storage = getStorage(fb);
export default fb;
