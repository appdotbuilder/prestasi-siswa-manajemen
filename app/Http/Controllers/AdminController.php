<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Sekolah;
use App\Models\Semester;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index()
    {
        $schools = Sekolah::with('siswa', 'guru', 'prestasi')->get();
        $semesters = Semester::with('siswa', 'prestasi')->get();
        $activeSemester = Semester::where('is_aktif', true)->first();

        return Inertia::render('admin/dashboard', [
            'schools' => $schools,
            'semesters' => $semesters,
            'activeSemester' => $activeSemester,
        ]);
    }

    /**
     * Import student data from Dapodik JSON file.
     */
    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:json',
            'sekolah_id' => 'required|exists:sekolah,id',
        ]);

        $file = $request->file('file');
        $content = file_get_contents($file->getPathname());
        $data = json_decode($content, true);

        if (!$data) {
            return redirect()->back()->withErrors(['file' => 'File JSON tidak valid.']);
        }

        $activeSemester = Semester::where('is_aktif', true)->first();
        if (!$activeSemester) {
            return redirect()->back()->withErrors(['semester' => 'Tidak ada semester aktif.']);
        }

        $imported = 0;
        $updated = 0;

        DB::transaction(function () use ($data, $request, $activeSemester, &$imported, &$updated) {
            foreach ($data as $studentData) {
                if (!isset($studentData['nisn']) || !isset($studentData['nama'])) {
                    continue;
                }

                $existingStudent = Siswa::where('nisn', $studentData['nisn'])->first();

                if ($existingStudent) {
                    // Update existing student but keep their achievements
                    $existingStudent->update([
                        'nama' => $studentData['nama'],
                        'kelas' => $studentData['kelas'] ?? $existingStudent->kelas,
                        'sekolah_id' => $request->sekolah_id,
                        'semester_id' => $activeSemester->id,
                    ]);
                    $updated++;
                } else {
                    // Create new student
                    Siswa::create([
                        'nisn' => $studentData['nisn'],
                        'nama' => $studentData['nama'],
                        'kelas' => $studentData['kelas'] ?? '',
                        'sekolah_id' => $request->sekolah_id,
                        'semester_id' => $activeSemester->id,
                    ]);
                    $imported++;
                }
            }
        });

        return redirect()->back()->with('success', 
            "Import berhasil. {$imported} siswa baru ditambahkan, {$updated} siswa diperbarui."
        );
    }
}