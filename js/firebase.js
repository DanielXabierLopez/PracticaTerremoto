import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
  getFirestore
}
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDKC7bUcJ9jIVDdwdrxea4LwFgKV9suo1g",
  authDomain: "earthquake-app-44a59.firebaseapp.com",
  projectId: "earthquake-app-44a59",
  storageBucket: "earthquake-app-44a59.firebasestorage.app",
  messagingSenderId: "743879346313",
  appId: "1:743879346313:web:ac9552db3daf9800df9e58",
  measurementId: "G-FFZY70BX9E"
};

const app =
  initializeApp(
    firebaseConfig
  );

export const auth =
  getAuth(app);

export const db =
  getFirestore(app);

const provider =
  new GoogleAuthProvider();

export const login =
  async () => {

    try {

      await signInWithPopup(
        auth,
        provider
      );

    } catch (error) {

      console.error(error);

    }

  };

export const logout =
  async () => {

    try {

      await signOut(auth);

    } catch (error) {

      console.error(error);

    }

  };

export {
  onAuthStateChanged
};