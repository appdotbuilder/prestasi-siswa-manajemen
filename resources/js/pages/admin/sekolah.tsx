import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
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

interface PaginatedSchools {
    data: School[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    schools: PaginatedSchools;
    [key: string]: unknown;
}

export default function AdminSekolah({ schools }: Props) {
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingSchool, setEditingSchool] = useState<School | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            nama_sekolah: formData.get('nama_sekolah') as string,
            npsn: formData.get('npsn') as string,
            alamat: formData.get('alamat') as string,
        };

        if (editingSchool) {
            router.put(route('sekolah.update', editingSchool.id), data, {
                onSuccess: () => {
                    setEditingSchool(null);
                }
            });
        } else {
            router.post(route('sekolah.store'), data, {
                onSuccess: () => {
                    setShowAddForm(false);
                }
            });
        }
    };

    const handleDelete = (school: School) => {
        if (confirm(`Are you sure you want to delete ${school.nama_sekolah}?`)) {
            router.delete(route('sekolah.destroy', school.id));
        }
    };

    return (
        <AppShell>
            <Head title="School Management" />
            
            <div className="container mx-auto p-6">
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            🏫 School Management
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage schools in the achievement system
                        </p>
                    </div>
                    
                    <div className="mt-4 sm:mt-0">
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <span className="mr-2">➕</span>
                            Add School
                        </button>
                    </div>
                </div>

                {/* Add/Edit Form */}
                {(showAddForm || editingSchool) && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {editingSchool ? 'Edit School' : 'Add New School'}
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        School Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="nama_sekolah"
                                        defaultValue={editingSchool?.nama_sekolah || ''}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        placeholder="e.g., SMA Negeri 1 Jakarta"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        NPSN *
                                    </label>
                                    <input
                                        type="text"
                                        name="npsn"
                                        defaultValue={editingSchool?.npsn || ''}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        placeholder="e.g., 20100001"
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Address *
                                </label>
                                <textarea
                                    name="alamat"
                                    defaultValue={editingSchool?.alamat || ''}
                                    required
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Full school address"
                                />
                            </div>
                            
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    {editingSchool ? 'Update School' : 'Add School'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddForm(false);
                                        setEditingSchool(null);
                                    }}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Schools List */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Schools ({schools.total})
                        </h2>
                    </div>
                    
                    {schools.data.length === 0 ? (
                        <div className="text-center py-8">
                            <span className="text-6xl mb-4 block">🏫</span>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                No schools found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Add your first school to get started.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            School
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            NPSN
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Statistics
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                    {schools.data.map((school) => (
                                        <tr key={school.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {school.nama_sekolah}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {school.alamat}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {school.npsn}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                <div className="space-y-1">
                                                    <div>👥 {school.siswa_count} students</div>
                                                    <div>👨‍🏫 {school.guru_count} teachers</div>
                                                    <div>🏆 {school.prestasi_count} achievements</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => setEditingSchool(school)}
                                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                    >
                                                        ✏️ Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(school)}
                                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                    >
                                                        🗑️ Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}