<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\PrestasiController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\SekolahController;
use App\Http\Controllers\SemesterController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();
        
        if ($user->isAdmin() || $user->isKepalaSekolah()) {
            return redirect()->route('admin.dashboard');
        } elseif ($user->isGuru()) {
            return redirect()->route('prestasi.index');
        } else {
            return redirect()->route('prestasi.index');
        }
    })->name('dashboard');

    // Admin routes
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/', [AdminController::class, 'index'])->name('dashboard');
        
        // Student import
        Route::post('/import-siswa', [AdminController::class, 'store'])->name('import.siswa');
    });

    // School management
    Route::resource('sekolah', SekolahController::class)->except(['show', 'create', 'edit']);
    
    // Semester management  
    Route::resource('semester', SemesterController::class)->except(['show', 'create', 'edit']);

    // Achievement management (all authenticated users)
    Route::resource('prestasi', PrestasiController::class);

    // Reports (all authenticated users)
    Route::get('/laporan', [LaporanController::class, 'index'])->name('laporan.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
