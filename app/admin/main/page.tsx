"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, Plus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

// Типы из API схемы
interface Brief {
    id: number;
    name: string;
    description?: string;
    logoUrl?: string;
}

export default function AdminMainPage() {
    const { user, logout, isAdmin, loading: authLoading } = useAuth();
    const [briefs, setBriefs] = useState<Brief[]>([]);
    const [loading, setLoading] = useState(false);
    const [creating, setCreating] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
    const router = useRouter();

    const fetchBriefs = async () => {
        try {
            setLoading(true);

            const response = await fetch("https://brief-builder.onrender.com/api/briefs", {
                method: "GET"
            });

            if (!response.ok) {
                const errorText = await response.text().catch(() => "");
                throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`);
            }

            const data: Brief[] = await response.json();
            setBriefs(data);
        } catch (err) {
            setError(`Не удалось загрузить брифы: ${err instanceof Error ? err.message : "Неизвестная ошибка"}`);
        } finally {
            setLoading(false);
        }
    };

    // Проверка прав только ОДИН РАЗ после загрузки auth
    useEffect(() => {
        if (authLoading) return;

        if (!hasCheckedAuth) {
            setHasCheckedAuth(true);

            // Если пользователь авторизован, но не админ - разлогиниваем
            if (user && !isAdmin) {
                logout();
                router.replace('/');
                return;
            }

            // Если не авторизован - редирект
            if (!user) {
                router.replace('/');
                return;
            }

            // Если админ - загружаем данные
            if (user && isAdmin) {
                fetchBriefs();
            }
        }
    }, [authLoading, user, isAdmin, hasCheckedAuth, logout, router]);

    // Показываем пустой экран пока не проверили авторизацию
    if (authLoading || !hasCheckedAuth) {
        return null;
    }

    // Если не админ - не показываем ничего (редирект уже произошел)
    if (!user || !isAdmin) {
        return null;
    }

    const handleCreate = async () => {
        try {
            setCreating(true);
            setError(null);

            const createUrl = new URL("https://brief-builder.onrender.com/api/briefs");
            createUrl.searchParams.append("name", "Новый бриф");
            createUrl.searchParams.append("description", "Описание нового брифа");

            const formData = new FormData();

            const response = await fetch(createUrl.toString(), {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                const errorText = await response.text().catch(() => "");
                throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`);
            }

            const newBrief: Brief = await response.json();
            setBriefs(prev => [...prev, newBrief]);
            router.push(`/admin/edit/${newBrief.id}`);
        } catch (err: any) {
            setError(`Ошибка создания: ${err.message}`);
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = async (briefId: number, briefName: string) => {
        if (!confirm(`Удалить бриф "${briefName}"?`)) return;

        try {
            setDeletingId(briefId);
            setError(null);

            const response = await fetch(`https://brief-builder.onrender.com/api/briefs/${briefId}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                const errorText = await response.text().catch(() => "");
                throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`);
            }

            setBriefs(prev => prev.filter(brief => brief.id !== briefId));
        } catch (err: any) {
            setError(`Ошибка удаления: ${err.message}`);
        } finally {
            setDeletingId(null);
        }
    };

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    // Показываем загрузку брифов
    if (loading) {
        return (
            <div className="p-8 max-w-4xl mx-auto">
                <div className="flex justify-center items-center py-12">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#038196] mx-auto mb-4"></div>
                        <div className="text-lg text-gray-600">Загрузка брифов...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Админ-панель — Брифы</h1>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        {user.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt={user.displayName || ""}
                                className="w-10 h-10 rounded-full"
                            />
                        ) : (
                            <div className="w-10 h-10 bg-[#EA4C89] rounded-full flex items-center justify-center text-white font-bold">
                                {user.displayName?.charAt(0) || "?"}
                            </div>
                        )}
                        <span>{user.displayName}</span>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </div>
            </div>

            <div className="mb-4 p-2 bg-gray-100 rounded text-xs">
                <div>Debug: {briefs.length} брифов загружено</div>
                <div>API: https://brief-builder.onrender.com/api/briefs</div>
            </div>

            <div className="flex justify-between items-center mb-6">
                <div></div>
                <Button
                    onClick={handleCreate}
                    disabled={creating}
                    className="bg-[#038196] hover:bg-[#026b7a]"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    {creating ? "Создание..." : "Создать новый бриф"}
                </Button>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600">{error}</p>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setError(null)}
                        className="mt-2"
                    >
                        Закрыть
                    </Button>
                </div>
            )}

            {briefs.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">Брифы не найдены</p>
                    <Button
                        onClick={handleCreate}
                        disabled={creating}
                        className="bg-[#038196] hover:bg-[#026b7a]"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Создать первый бриф
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {briefs.map((brief) => (
                        <div
                            key={brief.id}
                            className="border border-gray-200 p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-4">
                                        {brief.logoUrl && (
                                            <img
                                                src={`https://brief-builder.onrender.com${brief.logoUrl}`}
                                                alt={brief.name}
                                                className="w-12 h-12 object-cover rounded"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                }}
                                            />
                                        )}
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-900">
                                                {brief.name}
                                            </h2>
                                            <p className="text-sm text-gray-500 mt-1">
                                                ID: {brief.id}
                                            </p>
                                            {brief.description && (
                                                <p className="text-sm text-gray-600 mt-2">
                                                    {brief.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => router.push(`/admin/edit/${brief.id}`)}
                                        className="hover:bg-blue-50"
                                    >
                                        <Edit className="w-4 h-4 mr-2" />
                                        Редактировать
                                    </Button>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDelete(brief.id, brief.name)}
                                        disabled={deletingId === brief.id}
                                        className="hover:bg-red-50 text-red-600 border-red-200"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        {deletingId === brief.id ? "Удаление..." : "Удалить"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {briefs.length > 0 && (
                <div className="mt-8 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500 text-center">
                        Всего брифов: {briefs.length}
                    </p>
                </div>
            )}
        </div>
    );
}