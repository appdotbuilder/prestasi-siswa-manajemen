<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSemesterRequest;
use App\Http\Requests\UpdateSemesterRequest;
use App\Models\Semester;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SemesterController extends Controller
{
    /**
     * Display a listing of semesters.
     */
    public function index()
    {
        $semesters = Semester::withCount(['siswa', 'prestasi'])->paginate(10);

        return Inertia::render('admin/semester', [
            'semesters' => $semesters,
        ]);
    }

    /**
     * Store a newly created semester.
     */
    public function store(StoreSemesterRequest $request)
    {
        DB::transaction(function () use ($request) {
            if ($request->validated()['is_aktif']) {
                // Deactivate all other semesters
                Semester::where('is_aktif', true)->update(['is_aktif' => false]);
            }

            Semester::create($request->validated());
        });

        return redirect()->route('semester.index')
            ->with('success', 'Semester berhasil ditambahkan.');
    }

    /**
     * Update the specified semester.
     */
    public function update(UpdateSemesterRequest $request, Semester $semester)
    {
        DB::transaction(function () use ($request, $semester) {
            if ($request->validated()['is_aktif']) {
                // Deactivate all other semesters
                Semester::where('id', '!=', $semester->id)->update(['is_aktif' => false]);
            }

            $semester->update($request->validated());
        });

        return redirect()->route('semester.index')
            ->with('success', 'Semester berhasil diperbarui.');
    }

    /**
     * Remove the specified semester.
     */
    public function destroy(Semester $semester)
    {
        $semester->delete();

        return redirect()->route('semester.index')
            ->with('success', 'Semester berhasil dihapus.');
    }
}