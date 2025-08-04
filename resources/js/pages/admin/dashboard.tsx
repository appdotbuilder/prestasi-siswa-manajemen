import React from 'react';
import { Head } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface School {
    id: number;
    nama_sekolah: string;
    npsn: string;
    alamat: string;
    siswa_count: number;
    guru_count: number;
    prestasi_count: number;
}

interface Semester {
    id: number;
    nama_semester: string;
    tahun_ajaran: string;
    is_aktif: boolean;
    siswa_count: number;
    prestasi_count: number;
}

interface Props {
    schools: School[];
    semesters: Semester[];
    activeSemester: Semester | null;
    [key: string]: unknown;
}

export default function AdminDashboard({ schools, semesters, activeSemester }: Props) {
    const totalStudents = schools.reduce((sum, school) => sum + school.siswa_count, 0);
    const totalTeachers = schools.reduce((sum, school) => sum + school.guru_count, 0);
    const totalAchievements = schools.reduce((sum, school) => sum + school.prestasi_count, 0);

    return (
        <AppShell>
            <Head title="Admin Dashboard" />
            
            <div className="container mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        📊 Admin Dashboard
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Overview of the student achievement management system
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                                <span className="text-2xl">🏫</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total Schools
                                </p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {schools.length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                                <span className="text-2xl">👥</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total Students
                                </p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {totalStudents}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                                <span className="text-2xl">👨‍🏫</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total Teachers
                                </p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {totalTeachers}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
                                <span className="text-2xl">🏆</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total Achievements
                                </p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {totalAchievements}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Active Semester */}
                {activeSemester && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">📅</span>
                            <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-200">
                                Active Semester
                            </h2>
                        </div>
                        <p className="text-blue-800 dark:text-blue-300">
                            {activeSemester.nama_semester} {activeSemester.tahun_ajaran} • 
                            {activeSemester.siswa_count} students • 
                            {activeSemester.prestasi_count} achievements
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Schools Overview */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Schools Overview
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {schools.slice(0, 5).map((school) => (
                                    <div key={school.id} className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-medium text-gray-900 dark:text-white">
                                                {school.nama_sekolah}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                NPSN: {school.npsn}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {school.prestasi_count} achievements
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                                {school.siswa_count} students
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Semesters Overview */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Semesters Overview
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {semesters.map((semester) => (
                                    <div key={semester.id} className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            {semester.is_aktif && (
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                    Active
                                                </span>
                                            )}
                                            <div>
                                                <h3 className="font-medium text-gray-900 dark:text-white">
                                                    {semester.nama_semester}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {semester.tahun_ajaran}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {semester.prestasi_count} achievements
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                                {semester.siswa_count} students
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a
                        href={route('sekolah.index')}
                        className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🏫</span>
                            <div>
                                <h3 className="font-medium text-gray-900 dark:text-white">
                                    Manage Schools
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Add, edit, or delete schools
                                </p>
                            </div>
                        </div>
                    </a>

                    <a
                        href={route('semester.index')}
                        className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">📅</span>
                            <div>
                                <h3 className="font-medium text-gray-900 dark:text-white">
                                    Manage Semesters
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Configure academic periods
                                </p>
                            </div>
                        </div>
                    </a>

                    <a
                        href={route('prestasi.index')}
                        className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🏆</span>
                            <div>
                                <h3 className="font-medium text-gray-900 dark:text-white">
                                    View Achievements
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Browse all student achievements
                                </p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </AppShell>
    );
}