import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Student Achievement Management System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 text-gray-800 lg:justify-center lg:p-8 dark:from-gray-900 dark:to-gray-800 dark:text-gray-200">
                <header className="mb-6 w-full max-w-[335px] text-sm lg:max-w-6xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow">
                    <main className="flex w-full max-w-[335px] flex-col lg:max-w-6xl lg:flex-row lg:gap-12">
                        {/* Hero Section */}
                        <div className="flex-1 text-center lg:text-left lg:flex lg:flex-col lg:justify-center">
                            <div className="mb-8">
                                <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-6xl dark:text-white">
                                    🏆 Student Achievement 
                                    <span className="block text-blue-600">Management System</span>
                                </h1>
                                <p className="mb-8 text-lg text-gray-600 lg:text-xl dark:text-gray-300">
                                    Comprehensive platform for managing and tracking student achievements across all educational levels
                                </p>
                            </div>

                            {/* Key Features */}
                            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                                <div className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                                    <div className="text-2xl">📚</div>
                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-white">Achievement Tracking</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            From school to international level
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                                    <div className="text-2xl">👥</div>
                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-white">Multi-Role Access</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Admin, principals, teachers, students
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                                    <div className="text-2xl">📊</div>
                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-white">Analytics & Reports</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Detailed statistics and visualizations
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                                    <div className="text-2xl">📄</div>
                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-white">Certificate Storage</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Secure document management
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            {!auth.user && (
                                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                                    <Link
                                        href={route('register')}
                                        className="rounded-lg bg-blue-600 px-8 py-3 text-center font-medium text-white hover:bg-blue-700 transition-colors"
                                    >
                                        Get Started
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="rounded-lg border border-gray-300 px-8 py-3 text-center font-medium text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                    >
                                        Sign In
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Visual Section */}
                        <div className="flex-1 mt-8 lg:mt-0">
                            <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
                                <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                                    Achievement Levels
                                </h2>
                                <div className="space-y-4">
                                    {[
                                        { level: 'International', color: 'bg-purple-500', count: '15' },
                                        { level: 'National', color: 'bg-red-500', count: '42' },
                                        { level: 'Provincial', color: 'bg-orange-500', count: '128' },
                                        { level: 'Regency', color: 'bg-yellow-500', count: '256' },
                                        { level: 'District', color: 'bg-green-500', count: '384' },
                                        { level: 'School', color: 'bg-blue-500', count: '512' },
                                    ].map((item) => (
                                        <div key={item.level} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`h-3 w-3 rounded-full ${item.color}`}></div>
                                                <span className="text-gray-700 dark:text-gray-300">{item.level}</span>
                                            </div>
                                            <span className="font-semibold text-gray-900 dark:text-white">
                                                {item.count}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="text-lg">🎯</div>
                                        <h3 className="font-medium text-blue-900 dark:text-blue-200">
                                            Track Every Success
                                        </h3>
                                    </div>
                                    <p className="text-sm text-blue-800 dark:text-blue-300">
                                        Monitor student achievements from classroom competitions to international championships
                                    </p>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                
                <footer className="mt-12 text-center text-sm text-gray-600 dark:text-gray-400">
                    <p>
                        Penampungan Prestasi Siswa • Built with Laravel & React
                    </p>
                </footer>
            </div>
        </>
    );
}