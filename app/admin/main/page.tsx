"use client"

import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AdminMainPage() {
    const { user, logout, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        // Сначала дождись окончания загрузки, потом делай редирект
        if (!loading && !user) {
            router.push("/")
        }
    }, [user, loading, router])

    return (
        <div style={{ padding: '2rem' }}>
            <h1>now you are admin</h1>
            {user && (
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "2rem" }}>
                    <div style={{
                        width: "48px",
                        height: "48px",
                        background: "#EA4C89",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontSize: "24px",
                        color: "#fff"
                    }}>
                        {user.displayName?.charAt(0) || "?"}
                    </div>
                    <span>{user.displayName}</span>
                    <Button variant="ghost" size="sm" onClick={logout}>
                        Logout
                    </Button>
                </div>
            )}
        </div>
    )
}