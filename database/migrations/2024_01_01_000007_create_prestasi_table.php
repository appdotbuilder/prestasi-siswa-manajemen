<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('prestasi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('siswa_id')->constrained('siswa')->onDelete('cascade');
            $table->string('nama_prestasi');
            $table->enum('tingkat_prestasi', ['sekolah', 'kecamatan', 'kabupaten', 'provinsi', 'nasional', 'internasional']);
            $table->date('tanggal_prestasi');
            $table->string('penghargaan_juara');
            $table->foreignId('guru_pembimbing_id')->nullable()->constrained('guru')->onDelete('set null');
            $table->foreignId('semester_id')->constrained('semester')->onDelete('cascade');
            $table->foreignId('sekolah_id')->constrained('sekolah')->onDelete('cascade');
            $table->string('file_sertifikat')->nullable();
            $table->timestamps();
            
            $table->index('tingkat_prestasi');
            $table->index('tanggal_prestasi');
            $table->index(['siswa_id', 'semester_id']);
            $table->index(['sekolah_id', 'semester_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prestasi');
    }
};