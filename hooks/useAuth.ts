"use client"

import { useState, useEffect } from "react"
import { type User, signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth"
import { getFirebaseAuth } from "@/lib/firebase" // убираем импорт isAdminEmail, addAdminToWhitelist

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  // const [isAdmin, setIsAdmin] = useState(false) // временно убираем

  useEffect(() => {
    const auth = getFirebaseAuth()
    if (!auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
      // Временно отключаем проверку админа
      // if (currentUser) {
      //   const adminStatus = await isAdminEmail(currentUser.email || "")
      //   setIsAdmin(adminStatus)
      // } else {
      //   setIsAdmin(false)
      // }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signInWithGoogle = async () => {
    const auth = getFirebaseAuth()
    if (!auth) {
      console.error("Firebase Auth not initialized.")
      return
    }
    try {
      setLoading(true)
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({ prompt: "select_account" })
      await signInWithPopup(auth, provider)
      setLoading(false)
    } catch (error) {
      console.error("Error signing in with Google:", error)
      setLoading(false)
      throw error
    }
  }

  const logout = async () => {
    const auth = getFirebaseAuth()
    if (!auth) {
      console.error("Firebase Auth not initialized.")
      return
    }
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error signing out:", error)
      throw error
    }
  }

  return {
    user,
    loading,
    // isAdmin, // временно убираем
    signInWithGoogle,
    logout,
  }
}