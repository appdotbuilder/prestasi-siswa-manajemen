import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Siswa {
    id: number;
    nama: string;
    nisn: string;
    kelas: string;
}

interface Guru {
    id: number;
    nama: string;
    nip: string;
}

interface Semester {
    id: number;
    nama_semester: string;
    tahun_ajaran: string;
}

interface Sekolah {
    id: number;
    nama_sekolah: string;
    npsn: string;
}

interface Prestasi {
    id: number;
    nama_prestasi: string;
    tingkat_prestasi: string;
    tanggal_prestasi: string;
    penghargaan_juara: string;
    file_sertifikat: string | null;
    siswa: Siswa;
    guru_pembimbing: Guru | null;
    semester: Semester;
    sekolah: Sekolah;
}

interface PaginatedPrestasi {
    data: Prestasi[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    prestasi: PaginatedPrestasi;
    filters: {
        search?: string;
        semester_id?: string;
        tingkat_prestasi?: string;
    };
    semesters: Semester[];
    tingkatOptions: string[];
    [key: string]: unknown;
}

export default function PrestasiIndex({ prestasi, filters, semesters, tingkatOptions }: Props) {
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get('search') as string;
        const semester_id = formData.get('semester_id') as string;
        const tingkat_prestasi = formData.get('tingkat_prestasi') as string;

        router.get(route('prestasi.index'), {
            search: search || undefined,
            semester_id: semester_id || undefined,
            tingkat_prestasi: tingkat_prestasi || undefined,
        });
    };

    const clearFilters = () => {
        router.get(route('prestasi.index'));
    };

    const getTingkatBadgeColor = (tingkat: string) => {
        const colors: Record<string, string> = {
            'sekolah': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            'kecamatan': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            'kabupaten': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            'provinsi': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
            'nasional': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
            'internasional': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        };
        return colors[tingkat] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    };

    return (
        <AppShell>
            <Head title="Student Achievements" />
            
            <div className="container mx-auto p-6">
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            🏆 Student Achievements
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage and track student achievements across all levels
                        </p>
                    </div>
                    
                    <div className="mt-4 sm:mt-0">
                        <Link
                            href={route('prestasi.create')}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <span className="mr-2">➕</span>
                            Add Achievement
                        </Link>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
                    <form onSubmit={handleSearch} className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Search
                                </label>
                                <input
                                    type="text"
                                    name="search"
                                    defaultValue={filters.search || ''}
                                    placeholder="Search by achievement or student name..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Semester
                                </label>
                                <select
                                    name="semester_id"
                                    defaultValue={filters.semester_id || ''}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                >
                                    <option value="">All Semesters</option>
                                    {semesters.map((semester) => (
                                        <option key={semester.id} value={semester.id}>
                                            {semester.nama_semester} {semester.tahun_ajaran}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Achievement Level
                                </label>
                                <select
                                    name="tingkat_prestasi"
                                    defaultValue={filters.tingkat_prestasi || ''}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                >
                                    <option value="">All Levels</option>
                                    {tingkatOptions.map((tingkat) => (
                                        <option key={tingkat} value={tingkat}>
                                            {tingkat.charAt(0).toUpperCase() + tingkat.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="flex items-end gap-2">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    🔍 Search
                                </button>
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Results Summary */}
                <div className="mb-6">
                    <p className="text-gray-600 dark:text-gray-400">
                        Showing {prestasi.data.length} of {prestasi.total} achievements
                    </p>
                </div>

                {/* Achievements List */}
                <div className="space-y-4">
                    {prestasi.data.length === 0 ? (
                        <div className="text-center py-8">
                            <span className="text-6xl mb-4 block">🏆</span>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                No achievements found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Try adjusting your search criteria or add a new achievement.
                            </p>
                        </div>
                    ) : (
                        prestasi.data.map((achievement) => (
                            <div key={achievement.id} className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow">
                                <div className="p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    {achievement.nama_prestasi}
                                                </h3>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTingkatBadgeColor(achievement.tingkat_prestasi)}`}>
                                                    {achievement.tingkat_prestasi.charAt(0).toUpperCase() + achievement.tingkat_prestasi.slice(1)}
                                                </span>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                                                <div>
                                                    <p><strong>Student:</strong> {achievement.siswa.nama}</p>
                                                    <p><strong>Class:</strong> {achievement.siswa.kelas}</p>
                                                    <p><strong>NISN:</strong> {achievement.siswa.nisn}</p>
                                                </div>
                                                <div>
                                                    <p><strong>Award:</strong> {achievement.penghargaan_juara}</p>
                                                    <p><strong>Date:</strong> {new Date(achievement.tanggal_prestasi).toLocaleDateString()}</p>
                                                    {achievement.guru_pembimbing && (
                                                        <p><strong>Supervisor:</strong> {achievement.guru_pembimbing.nama}</p>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <div className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                                                {achievement.semester.nama_semester} {achievement.semester.tahun_ajaran} • {achievement.sekolah.nama_sekolah}
                                            </div>
                                        </div>
                                        
                                        <div className="mt-4 sm:mt-0 sm:ml-6 flex items-center gap-2">
                                            {achievement.file_sertifikat && (
                                                <a
                                                    href={`/storage/${achievement.file_sertifikat}`}
                                                    target="_blank"
                                                    className="inline-flex items-center px-3 py-1 text-sm bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors dark:bg-green-900 dark:text-green-200"
                                                >
                                                    📄 Certificate
                                                </a>
                                            )}
                                            <Link
                                                href={route('prestasi.show', achievement.id)}
                                                className="inline-flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors dark:bg-blue-900 dark:text-blue-200"
                                            >
                                                👁️ View
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {prestasi.last_page > 1 && (
                    <div className="mt-8 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Showing page {prestasi.current_page} of {prestasi.last_page}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            {prestasi.current_page > 1 && (
                                <Link
                                    href={route('prestasi.index', { ...filters, page: prestasi.current_page - 1 })}
                                    className="px-3 py-2 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                >
                                    Previous
                                </Link>
                            )}
                            {prestasi.current_page < prestasi.last_page && (
                                <Link
                                    href={route('prestasi.index', { ...filters, page: prestasi.current_page + 1 })}
                                    className="px-3 py-2 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                >
                                    Next
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}