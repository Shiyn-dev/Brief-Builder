"use client"

import { useState, useEffect } from "react"
import { type User, signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth"
import { getFirebaseAuth } from "@/lib/firebase"
import { getFirestore, doc, getDoc } from "firebase/firestore"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  // Проверка белого списка
  const checkIsAdmin = async (email: string): Promise<boolean> => {
    try {
      const db = getFirestore();
      const whitelistDoc = await getDoc(doc(db, 'admins', 'whitelist'));

      if (whitelistDoc.exists()) {
        const emailsArray = whitelistDoc.data().emails || [];
        return emailsArray.includes(email.toLowerCase());
      }

      return false;
    } catch (error) {
      console.error("Ошибка при проверке прав админа:", error);
      return false;
    }
  }

  useEffect(() => {
    const auth = getFirebaseAuth()
    if (!auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)

      if (currentUser && currentUser.email) {
        const adminStatus = await checkIsAdmin(currentUser.email);
        setIsAdmin(adminStatus);
      } else {
        setIsAdmin(false);
      }

      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signInWithGoogle = async () => {
    const auth = getFirebaseAuth()
    if (!auth) {
      console.error("Firebase Auth не инициализирован")
      return
    }
    try {
      setLoading(true)
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({ prompt: "select_account" })
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error("Ошибка входа через Google:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    const auth = getFirebaseAuth()
    if (!auth) {
      console.error("Firebase Auth не инициализирован")
      return
    }
    try {
      await signOut(auth)
      setIsAdmin(false);
    } catch (error) {
      console.error("Ошибка выхода:", error)
      throw error
    }
  }

  return {
    user,
    loading,
    isAdmin,
    signInWithGoogle,
    logout,
  }
}