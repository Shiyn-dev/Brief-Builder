// app/api/briefs/route.ts

import { NextResponse } from "next/server"

export async function GET() {
    try {
        const res = await fetch("https://brief-builder.onrender.com/api/briefs", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (!res.ok) {
            const text = await res.text()
            console.error("Ошибка от бекенда:", text)
            return NextResponse.json({ error: "Ошибка при получении брифов" }, { status: res.status })
        }

        const data = await res.json()

        if (!Array.isArray(data)) {
            return NextResponse.json({ error: "Ответ от сервера не является массивом брифов" }, { status: 500 })
        }

        return NextResponse.json(data)
    } catch (err: any) {
        console.error("Ошибка сервера:", err.message)
        return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 })
    }
}
