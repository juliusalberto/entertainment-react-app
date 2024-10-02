import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, arrayUnion, arrayRemove, doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const initializeUserDocument = async (userId) => {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        await setDoc(userRef, {
            bookmarks: []
        })
    }
}

export const addBookmark = async (userId, type, mediaId) => {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            bookmarks: arrayUnion({ type, id: mediaId })
        });
    } catch (error) {
        console.error("Error adding bookmark: ", error);
    }
};

export const removeBookmark = async (userId, type, mediaId) => {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            bookmarks: arrayRemove({ type, id: mediaId })
        });
    } catch (error) {
        console.error("Error removing bookmark: ", error);
    }
};

export const getBookmarks = async (userId) => {
    try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            return userSnap.data().bookmarks || [];
        } else {
            console.log("No such user document!");
            return [];
        }
    } catch (error) {
        console.error("Error getting bookmarks: ", error);
        return [];
    }
};