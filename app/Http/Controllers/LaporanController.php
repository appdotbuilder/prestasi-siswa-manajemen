<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Prestasi;
use App\Models\Semester;
use App\Models\Siswa;
use App\Models\Guru;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LaporanController extends Controller
{
    /**
     * Display achievement reports and statistics.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $query = Prestasi::with(['siswa', 'semester', 'sekolah']);

        // Role-based filtering
        if ($user->isSiswa()) {
            $siswa = Siswa::where('nisn', $user->nisn)->first();
            if ($siswa) {
                $query->where('siswa_id', $siswa->id);
            } else {
                $query->whereRaw('1 = 0');
            }
        } elseif ($user->isGuru()) {
            $guru = Guru::where('nip', $user->nip)->first();
            if ($guru) {
                $query->where('guru_pembimbing_id', $guru->id);
            } else {
                $query->whereRaw('1 = 0');
            }
        } elseif ($user->canManageAll() && $user->sekolah_id) {
            $query->where('sekolah_id', $user->sekolah_id);
        }

        // Apply filters
        if ($request->semester_id) {
            $query->where('semester_id', $request->semester_id);
        }

        if ($request->tingkat_prestasi) {
            $query->where('tingkat_prestasi', $request->tingkat_prestasi);
        }

        if ($request->penghargaan_juara) {
            $query->where('penghargaan_juara', 'like', '%' . $request->penghargaan_juara . '%');
        }

        // Get statistics
        $totalPrestasi = $query->count();
        
        $prestasiPerSemesterQuery = clone $query;
        $prestasiPerSemester = collect([]);
        
        $semesterStats = $prestasiPerSemesterQuery
            ->select('semester_id', DB::raw('count(*) as jumlah'))
            ->groupBy('semester_id')
            ->get();
            
        foreach ($semesterStats as $stat) {
            $semester = \App\Models\Semester::find($stat->semester_id);
            $prestasiPerSemester->push([
                'semester' => $semester ? $semester->nama_semester . ' ' . $semester->tahun_ajaran : 'Unknown',
                'total' => (int) $stat->getAttribute('jumlah'),
            ]);
        }

        $prestasiPerTingkatQuery = clone $query;
        $prestasiPerTingkat = collect([]);
        
        $tingkatStats = $prestasiPerTingkatQuery
            ->select('tingkat_prestasi', DB::raw('count(*) as jumlah'))
            ->groupBy('tingkat_prestasi')
            ->get();
            
        foreach ($tingkatStats as $stat) {
            $prestasiPerTingkat->push([
                'tingkat' => ucfirst($stat->tingkat_prestasi),
                'total' => (int) $stat->getAttribute('jumlah'),
            ]);
        }

        $prestasiPerJuaraQuery = clone $query;
        $prestasiPerJuara = collect([]);
        
        $juaraStats = $prestasiPerJuaraQuery
            ->select('penghargaan_juara', DB::raw('count(*) as jumlah'))
            ->groupBy('penghargaan_juara')
            ->orderBy('jumlah', 'desc')
            ->limit(10)
            ->get();
            
        foreach ($juaraStats as $stat) {
            $prestasiPerJuara->push([
                'juara' => $stat->penghargaan_juara,
                'total' => (int) $stat->getAttribute('jumlah'),
            ]);
        }

        // Recent achievements
        $recentPrestasi = $query
            ->with(['siswa', 'semester'])
            ->latest('tanggal_prestasi')
            ->limit(5)
            ->get();

        return Inertia::render('laporan/index', [
            'totalPrestasi' => $totalPrestasi,
            'prestasiPerSemester' => $prestasiPerSemester,
            'prestasiPerTingkat' => $prestasiPerTingkat,
            'prestasiPerJuara' => $prestasiPerJuara,
            'recentPrestasi' => $recentPrestasi,
            'filters' => $request->only(['semester_id', 'tingkat_prestasi', 'penghargaan_juara']),
            'semesters' => Semester::all(),
            'tingkatOptions' => ['sekolah', 'kecamatan', 'kabupaten', 'provinsi', 'nasional', 'internasional'],
        ]);
    }


}