'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState('');

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const email = form.email.value;
        const password = form.password.value;

        const auth = getAuth();
        try {
            await signInWithEmailAndPassword(auth, email, password);

            // После успешного входа редирект на админку
            router.push('/admin/main');
        } catch (err: any) {
            setError(err.message);
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <input name="email" type="email" required />
            <input name="password" type="password" required />
            <button type="submit">Войти</button>
            {error && <div>{error}</div>}
        </form>
    );
}