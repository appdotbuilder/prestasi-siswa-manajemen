<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePrestasiRequest;
use App\Http\Requests\UpdatePrestasiRequest;
use App\Models\Prestasi;
use App\Models\Siswa;
use App\Models\Guru;
use App\Models\Semester;
use App\Models\Sekolah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PrestasiController extends Controller
{
    /**
     * Display a listing of achievements.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $query = Prestasi::with(['siswa', 'guruPembimbing', 'semester', 'sekolah']);

        // Role-based filtering
        if ($user->isSiswa()) {
            $siswa = Siswa::where('nisn', $user->nisn)->first();
            if ($siswa) {
                $query->where('siswa_id', $siswa->id);
            } else {
                $query->whereRaw('1 = 0'); // No results if student not found
            }
        } elseif ($user->isGuru()) {
            $guru = Guru::where('nip', $user->nip)->first();
            if ($guru) {
                $query->where('guru_pembimbing_id', $guru->id);
            } else {
                $query->whereRaw('1 = 0'); // No results if teacher not found
            }
        } elseif ($user->canManageAll() && $user->sekolah_id) {
            $query->where('sekolah_id', $user->sekolah_id);
        }

        // Search functionality
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('nama_prestasi', 'like', '%' . $request->search . '%')
                  ->orWhereHas('siswa', function ($sq) use ($request) {
                      $sq->where('nama', 'like', '%' . $request->search . '%');
                  });
            });
        }

        // Filter by semester
        if ($request->semester_id) {
            $query->where('semester_id', $request->semester_id);
        }

        // Filter by achievement level
        if ($request->tingkat_prestasi) {
            $query->where('tingkat_prestasi', $request->tingkat_prestasi);
        }

        $prestasi = $query->latest('tanggal_prestasi')->paginate(10);

        return Inertia::render('prestasi/index', [
            'prestasi' => $prestasi,
            'filters' => $request->only(['search', 'semester_id', 'tingkat_prestasi']),
            'semesters' => Semester::all(),
            'tingkatOptions' => ['sekolah', 'kecamatan', 'kabupaten', 'provinsi', 'nasional', 'internasional'],
        ]);
    }

    /**
     * Show the form for creating a new achievement.
     */
    public function create()
    {
        $user = Auth::user();
        
        if (!$user->canManageAll()) {
            abort(403, 'Unauthorized.');
        }

        $siswa = Siswa::where('sekolah_id', $user->sekolah_id)->get();
        $guru = Guru::where('sekolah_id', $user->sekolah_id)->get();
        $semesters = Semester::all();

        return Inertia::render('prestasi/create', [
            'siswa' => $siswa,
            'guru' => $guru,
            'semesters' => $semesters,
            'tingkatOptions' => ['sekolah', 'kecamatan', 'kabupaten', 'provinsi', 'nasional', 'internasional'],
        ]);
    }

    /**
     * Store a newly created achievement.
     */
    public function store(StorePrestasiRequest $request)
    {
        $user = Auth::user();
        
        if (!$user->canManageAll()) {
            abort(403, 'Unauthorized.');
        }

        $data = $request->validated();
        $data['sekolah_id'] = $user->sekolah_id;

        // Handle file upload
        if ($request->hasFile('file_sertifikat')) {
            $file = $request->file('file_sertifikat');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('prestasi', $filename, 'public');
            $data['file_sertifikat'] = $path;
        }

        Prestasi::create($data);

        return redirect()->route('prestasi.index')
            ->with('success', 'Prestasi berhasil ditambahkan.');
    }

    /**
     * Display the specified achievement.
     */
    public function show(Prestasi $prestasi)
    {
        $user = Auth::user();

        // Check authorization
        if ($user->isSiswa()) {
            $siswa = Siswa::where('nisn', $user->nisn)->first();
            if (!$siswa || $prestasi->siswa_id !== $siswa->id) {
                abort(403, 'Unauthorized.');
            }
        } elseif ($user->isGuru()) {
            $guru = Guru::where('nip', $user->nip)->first();
            if (!$guru || $prestasi->guru_pembimbing_id !== $guru->id) {
                abort(403, 'Unauthorized.');
            }
        } elseif ($user->canManageAll() && $prestasi->sekolah_id !== $user->sekolah_id) {
            abort(403, 'Unauthorized.');
        }

        $prestasi->load(['siswa', 'guruPembimbing', 'semester', 'sekolah']);

        return Inertia::render('prestasi/show', [
            'prestasi' => $prestasi,
        ]);
    }

    /**
     * Show the form for editing the specified achievement.
     */
    public function edit(Prestasi $prestasi)
    {
        $user = Auth::user();
        
        if (!$user->canManageAll() || $prestasi->sekolah_id !== $user->sekolah_id) {
            abort(403, 'Unauthorized.');
        }

        $prestasi->load(['siswa', 'guruPembimbing', 'semester', 'sekolah']);
        $siswa = Siswa::where('sekolah_id', $user->sekolah_id)->get();
        $guru = Guru::where('sekolah_id', $user->sekolah_id)->get();
        $semesters = Semester::all();

        return Inertia::render('prestasi/edit', [
            'prestasi' => $prestasi,
            'siswa' => $siswa,
            'guru' => $guru,
            'semesters' => $semesters,
            'tingkatOptions' => ['sekolah', 'kecamatan', 'kabupaten', 'provinsi', 'nasional', 'internasional'],
        ]);
    }

    /**
     * Update the specified achievement.
     */
    public function update(UpdatePrestasiRequest $request, Prestasi $prestasi)
    {
        $user = Auth::user();
        
        if (!$user->canManageAll() || $prestasi->sekolah_id !== $user->sekolah_id) {
            abort(403, 'Unauthorized.');
        }

        $data = $request->validated();

        // Handle file upload
        if ($request->hasFile('file_sertifikat')) {
            // Delete old file
            if ($prestasi->file_sertifikat) {
                Storage::disk('public')->delete($prestasi->file_sertifikat);
            }

            $file = $request->file('file_sertifikat');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('prestasi', $filename, 'public');
            $data['file_sertifikat'] = $path;
        }

        $prestasi->update($data);

        return redirect()->route('prestasi.show', $prestasi)
            ->with('success', 'Prestasi berhasil diperbarui.');
    }

    /**
     * Remove the specified achievement.
     */
    public function destroy(Prestasi $prestasi)
    {
        $user = Auth::user();
        
        if (!$user->canManageAll() || $prestasi->sekolah_id !== $user->sekolah_id) {
            abort(403, 'Unauthorized.');
        }

        // Delete certificate file
        if ($prestasi->file_sertifikat) {
            Storage::disk('public')->delete($prestasi->file_sertifikat);
        }

        $prestasi->delete();

        return redirect()->route('prestasi.index')
            ->with('success', 'Prestasi berhasil dihapus.');
    }
}