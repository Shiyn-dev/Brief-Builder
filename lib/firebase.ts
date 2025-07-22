"use client" // Добавляем "use client" так как инициализация Firebase происходит на клиенте

import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore, type Firestore, doc, getDoc, setDoc } from "firebase/firestore"

// Firebase configuration
// ВАЖНО: Для правильной работы Google Sign-In убедитесь, что в Google Console настроены правильные redirect_uri:
// - Для разработки: http://localhost:3000/__/auth/handler
// - Для продакшена: https://ваш-домен.com/__/auth/handler
// Firebase автоматически использует /__/auth/handler для redirect_uri при использовании signInWithRedirect
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDRBkz7iyJ-BAR-pqQuO4oV67rSOBrm3ss",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "brief-builder.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "brief-builder",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "brief-builder.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "743757028708",
  // ВАЖНО: Замените на реальный appId из Firebase Console или используйте переменную окружения
  // Можно найти в настройках проекта Firebase -> General -> Your apps
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:743757028708:web:your-app-id", // TODO: Заменить на реальный appId
}

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

// Конфигурация Google Auth Provider для стандартного Firebase flow
// ВАЖНО: НЕ добавляйте custom_parameters или redirect_uri вручную!
// Firebase автоматически управляет redirect_uri при использовании signInWithRedirect
export const googleProvider = new GoogleAuthProvider()

// Опционально: можно настроить дополнительные scopes, если нужно
// googleProvider.addScope('email')
// googleProvider.addScope('profile')

// НЕ ДЕЛАЙТЕ ТАК - это вызовет redirect_uri_mismatch:
// googleProvider.setCustomParameters({ redirect_uri: 'custom-uri' })

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

// Function to add an email to the admin whitelist in Firestore
export const addAdminToWhitelist = async (email: string): Promise<void> => {
  const db = getFirebaseFirestore()
  if (!db) {
    console.error("Firestore not initialized for adding admin.")
    return
  }
  try {
    await setDoc(doc(db, "admins", email.toLowerCase()), {
      addedAt: new Date(),
    })
    console.log(`Email ${email} added to admin whitelist.`)
  } catch (error) {
    console.error("Error adding admin to whitelist:", error)
  }
}
