import React from 'react';
import { Head } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Semester {
    id: number;
    nama_semester: string;
    tahun_ajaran: string;
}

interface StatItem {
    semester?: string;
    tingkat?: string;
    juara?: string;
    total: number;
}

interface RecentPrestasi {
    id: number;
    nama_prestasi: string;
    tingkat_prestasi: string;
    tanggal_prestasi: string;
    siswa: {
        nama: string;
    };
    semester: {
        nama_semester: string;
        tahun_ajaran: string;
    };
}

interface Props {
    totalPrestasi: number;
    prestasiPerSemester: StatItem[];
    prestasiPerTingkat: StatItem[];
    prestasiPerJuara: StatItem[];
    recentPrestasi: RecentPrestasi[];
    filters: {
        semester_id?: string;
        tingkat_prestasi?: string;
        penghargaan_juara?: string;
    };
    semesters: Semester[];
    tingkatOptions: string[];
    [key: string]: unknown;
}

export default function LaporanIndex({ 
    totalPrestasi, 
    prestasiPerSemester, 
    prestasiPerTingkat, 
    prestasiPerJuara, 
    recentPrestasi
}: Props) {
    const getTingkatColor = (tingkat: string) => {
        const colors: Record<string, string> = {
            'Sekolah': '#3B82F6',
            'Kecamatan': '#10B981',
            'Kabupaten': '#F59E0B',
            'Provinsi': '#F97316',
            'Nasional': '#EF4444',
            'Internasional': '#8B5CF6',
        };
        return colors[tingkat] || '#6B7280';
    };

    return (
        <AppShell>
            <Head title="Achievement Reports" />
            
            <div className="container mx-auto p-6">
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            📊 Achievement Reports
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Comprehensive statistics and insights about student achievements
                        </p>
                    </div>
                    
                    <div className="mt-4 sm:mt-0">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Real-time statistics and analytics
                        </div>
                    </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                                <span className="text-2xl">🏆</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total Achievements
                                </p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {totalPrestasi}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                                <span className="text-2xl">🌍</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    International
                                </p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {prestasiPerTingkat.find(p => p.tingkat === 'Internasional')?.total || 0}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-red-100 dark:bg-red-900">
                                <span className="text-2xl">🇮🇩</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    National
                                </p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {prestasiPerTingkat.find(p => p.tingkat === 'Nasional')?.total || 0}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900">
                                <span className="text-2xl">🏛️</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Provincial
                                </p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {prestasiPerTingkat.find(p => p.tingkat === 'Provinsi')?.total || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Achievements by Level */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Achievements by Level
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {prestasiPerTingkat.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div 
                                                className="w-4 h-4 rounded-full" 
                                                style={{ backgroundColor: getTingkatColor(item.tingkat || '') }}
                                            ></div>
                                            <span className="text-gray-700 dark:text-gray-300">
                                                {item.tingkat}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-gray-900 dark:text-white">
                                                {item.total}
                                            </span>
                                            <div className="w-20 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                                                <div 
                                                    className="h-2 rounded-full" 
                                                    style={{ 
                                                        backgroundColor: getTingkatColor(item.tingkat || ''),
                                                        width: `${Math.min((item.total / Math.max(...prestasiPerTingkat.map(p => p.total))) * 100, 100)}%`
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Achievements by Semester */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Achievements by Semester
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {prestasiPerSemester.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div>
                                            <span className="text-gray-700 dark:text-gray-300">
                                                {item.semester}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-gray-900 dark:text-white">
                                                {item.total}
                                            </span>
                                            <div className="w-20 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                                                <div 
                                                    className="bg-blue-600 h-2 rounded-full" 
                                                    style={{ 
                                                        width: `${Math.min((item.total / Math.max(...prestasiPerSemester.map(p => p.total))) * 100, 100)}%`
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Top Awards */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Top Awards
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-3">
                                {prestasiPerJuara.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">
                                                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅'}
                                            </span>
                                            <span className="text-gray-700 dark:text-gray-300">
                                                {item.juara}
                                            </span>
                                        </div>
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            {item.total}
                                        </span>
                                    </div>
                                ))}
                                {prestasiPerJuara.length === 0 && (
                                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                                        No award data available
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Recent Achievements */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Recent Achievements
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {recentPrestasi.map((prestasi) => (
                                    <div key={prestasi.id} className="border-l-4 border-blue-500 pl-4">
                                        <h3 className="font-medium text-gray-900 dark:text-white">
                                            {prestasi.nama_prestasi}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {prestasi.siswa.nama} • {prestasi.tingkat_prestasi}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-500">
                                            {new Date(prestasi.tanggal_prestasi).toLocaleDateString()} • 
                                            {prestasi.semester.nama_semester} {prestasi.semester.tahun_ajaran}
                                        </p>
                                    </div>
                                ))}
                                {recentPrestasi.length === 0 && (
                                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                                        No recent achievements
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}