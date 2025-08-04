<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSekolahRequest;
use App\Http\Requests\UpdateSekolahRequest;
use App\Models\Sekolah;
use Inertia\Inertia;

class SekolahController extends Controller
{
    /**
     * Display a listing of schools.
     */
    public function index()
    {
        $schools = Sekolah::withCount(['siswa', 'guru', 'prestasi'])->paginate(10);

        return Inertia::render('admin/sekolah', [
            'schools' => $schools,
        ]);
    }

    /**
     * Store a newly created school.
     */
    public function store(StoreSekolahRequest $request)
    {
        Sekolah::create($request->validated());

        return redirect()->route('sekolah.index')
            ->with('success', 'Sekolah berhasil ditambahkan.');
    }

    /**
     * Update the specified school.
     */
    public function update(UpdateSekolahRequest $request, Sekolah $sekolah)
    {
        $sekolah->update($request->validated());

        return redirect()->route('sekolah.index')
            ->with('success', 'Sekolah berhasil diperbarui.');
    }

    /**
     * Remove the specified school.
     */
    public function destroy(Sekolah $sekolah)
    {
        $sekolah->delete();

        return redirect()->route('sekolah.index')
            ->with('success', 'Sekolah berhasil dihapus.');
    }
}