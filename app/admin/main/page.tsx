"use client"

import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"

export default function AdminMainPage() {
    const { user, logout } = useAuth()

    return (
        <div style={{ padding: '2rem' }}>
            <h1>now you are admin</h1>
            {user && (
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "2rem" }}>
                    <img
                        src={user.photoURL || ""}
                        alt={user.displayName || ""}
                        style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                    />
                    <span>{user.displayName}</span>
                    <Button variant="ghost" size="sm" onClick={logout}>
                        Logout
                    </Button>
                </div>
            )}
        </div>
    )
}