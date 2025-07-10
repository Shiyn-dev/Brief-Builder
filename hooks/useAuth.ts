"use client"

import { useState, useEffect } from "react"
import { type User, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth"
import { auth, googleProvider, isAdminEmail } from "@/lib/firebase"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)

      if (user) {
        const adminStatus = await isAdminEmail(user.email || "")
        setIsAdmin(adminStatus)
      } else {
        setIsAdmin(false)
      }

      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      return result.user
    } catch (error) {
      console.error("Error signing in with Google:", error)
      throw error
    }
  }

  const logout = async () => {
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
    isAdmin,
    signInWithGoogle,
    logout,
  }
}
