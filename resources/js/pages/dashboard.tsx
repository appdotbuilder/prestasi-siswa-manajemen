import React, { useEffect } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import { SharedData } from '@/types';

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;

    useEffect(() => {
        const user = auth.user;
        
        if (!user) {
            router.visit(route('login'));
            return;
        }

        // Redirect based on user role
        if (user.role === 'admin' || user.role === 'kepala_sekolah') {
            router.visit(route('admin.dashboard'));
        } else {
            router.visit(route('prestasi.index'));
        }
    }, [auth.user]);

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="text-4xl mb-4">🔄</div>
                    <p className="text-gray-600 dark:text-gray-400">
                        Redirecting to your dashboard...
                    </p>
                </div>
            </div>
        </>
    );
}