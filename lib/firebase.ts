"use client" // Добавляем "use client" так как инициализация Firebase происходит на клиенте

import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore, type Firestore, doc, getDoc, setDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDRBkz7iyJ-BAR-pqQuO4oV67rSOBrm3ss",
  authDomain: "brief-bulder.firebaseapp.com",
  projectId: "brief-bulder",
  storageBucket: "brief-bulder.firebasestorage.app",
  messagingSenderId: "743757028708",
  appId: "1:743757028708:web:28de590dca34eaca552e71",
  measurementId: "G-J0C2H2M9JW"
};

let firebaseAppInstance: FirebaseApp | null = null
let firebaseAuthInstance: Auth | null = null
let firebaseFirestoreInstance: Firestore | null = null

export function getFirebaseApp(): FirebaseApp | null {
  if (typeof window === "undefined") return null // Только на клиенте
  if (!firebaseAppInstance) {
    try {
      if (getApps().length === 0) {
        firebaseAppInstance = initializeApp(firebaseConfig)
      } else {
        firebaseAppInstance = getApps()[0]
      }
    } catch (error) {
      console.error("Firebase app initialization error:", error)
      return null
    }
  }
  return firebaseAppInstance
}

export function getFirebaseAuth(): Auth | null {
  if (typeof window === "undefined") return null
  const app = getFirebaseApp()
  if (!app) return null
  if (!firebaseAuthInstance) {
    try {
      firebaseAuthInstance = getAuth(app)
    } catch (error) {
      console.error("Firebase auth initialization error:", error)
      return null
    }
  }
  return firebaseAuthInstance
}

export function getFirebaseFirestore(): Firestore | null {
  if (typeof window === "undefined") return null
  const app = getFirebaseApp()
  if (!app) return null
  if (!firebaseFirestoreInstance) {
    try {
      firebaseFirestoreInstance = getFirestore(app)
    } catch (error) {
      console.error("Firebase firestore initialization error:", error)
      return null
    }
  }
  return firebaseFirestoreInstance
}

export const googleProvider = new GoogleAuthProvider()

// Check if user is admin via Firestore
export const isAdminEmail = async (email: string): Promise<boolean> => {
  const db = getFirebaseFirestore()
  if (!db) {
    console.error("Firestore not initialized for admin check.")
    return false
  }
  try {
    const adminDoc = await getDoc(doc(db, "admins", email.toLowerCase()))
    return adminDoc.exists()
  } catch (error) {
    console.error("Error checking admin status:", error)
    return false
  }
}

