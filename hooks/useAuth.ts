"use client"

import { useState, useEffect } from "react"
import { type User, signInWithRedirect, signOut, onAuthStateChanged, getRedirectResult } from "firebase/auth"
import { getFirebaseAuth, googleProvider, isAdminEmail, addAdminToWhitelist } from "@/lib/firebase" // Обновляем импорт getFirebaseAuth

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const auth = getFirebaseAuth()
    if (!auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)

      if (currentUser) {
        const adminStatus = await isAdminEmail(currentUser.email || "")
        setIsAdmin(adminStatus)
      } else {
        setIsAdmin(false)
      }

      setLoading(false)
    })

    // Обработка результата перенаправления после входа через Google
    // Firebase автоматически перенаправляет на /__/auth/handler и возвращает результат
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth)
        if (result && result.user) {
          // Пользователь успешно вошел через перенаправление
          console.log("Signed in via redirect:", result.user)

          // Автоматически добавляем nurgisabazaraly@gmail.com в белый список админов
          if (result.user.email?.toLowerCase() === "nurgisabazaraly@gmail.com") {
            await addAdminToWhitelist(result.user.email)
            setIsAdmin(true) // Обновляем статус админа сразу
          }
        }
      } catch (error) {
        console.error("Error getting redirect result:", error)
      } finally {
        setLoading(false) // Убедимся, что загрузка завершена
      }
    }

    // Вызываем обработчик перенаправления при монтировании компонента
    handleRedirectResult()

    return unsubscribe
  }, []) // Пустой массив зависимостей, чтобы эффект запускался только один раз при монтировании

  // Функция входа через Google с использованием стандартного Firebase flow
  // ВАЖНО: используем signInWithRedirect без дополнительных параметров
  // Firebase автоматически настроит redirect_uri как https://ваш-домен.com/__/auth/handler
  const signInWithGoogle = async () => {
    const auth = getFirebaseAuth()
    if (!auth) {
      console.error("Firebase Auth not initialized.")
      return
    }
    try {
      setLoading(true) // Начинаем загрузку перед перенаправлением
      // Используем стандартный Firebase signInWithRedirect без custom параметров
      // Это автоматически настроит правильный redirect_uri
      await signInWithRedirect(auth, googleProvider)
      // После этого вызова страница будет перенаправлена, и результат будет обработан в useEffect
    } catch (error) {
      console.error("Error signing in with Google:", error)
      setLoading(false) // Если произошла ошибка до перенаправления, сбрасываем загрузку
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
    isAdmin,
    signInWithGoogle,
    logout,
  }
}
