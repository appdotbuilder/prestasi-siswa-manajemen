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
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['admin', 'kepala_sekolah', 'guru', 'siswa'])->default('siswa');
            $table->foreignId('sekolah_id')->nullable()->constrained('sekolah')->onDelete('cascade');
            $table->string('nisn')->nullable()->unique();
            $table->string('nip')->nullable()->unique();
            
            $table->index('role');
            $table->index('sekolah_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'sekolah_id', 'nisn', 'nip']);
        });
    }
};