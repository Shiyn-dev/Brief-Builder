import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore, doc, getDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDRBkz7iyJ-BAR-pqQuO4oV67rSOBrm3ss",
  authDomain: "brief-builder.firebaseapp.com",
  projectId: "brief-builder",
  storageBucket: "brief-builder.appspot.com",
  messagingSenderId: "743757028708",
  appId: "1:743757028708:web:AIzaSyDRBkz7iyJ-BAR-pqQuO4oV67rSOBrm3ss",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()

// Check if user is admin via Firestore
export const isAdminEmail = async (email: string): Promise<boolean> => {
  try {
    const adminDoc = await getDoc(doc(db, "admins", email.toLowerCase()))
    return adminDoc.exists()
  } catch (error) {
    console.error("Error checking admin status:", error)
    return false
  }
}
