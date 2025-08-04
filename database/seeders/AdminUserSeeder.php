<?php

namespace Database\Seeders;

use App\Models\Sekolah;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $firstSchool = Sekolah::first();

        // Create admin user
        User::create([
            'name' => 'Administrator',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // Create principal user
        if ($firstSchool) {
            User::create([
                'name' => 'Kepala Sekolah',
                'email' => 'kepsek@example.com',
                'password' => Hash::make('password'),
                'role' => 'kepala_sekolah',
                'sekolah_id' => $firstSchool->id,
                'nip' => '197001011990031001',
                'email_verified_at' => now(),
            ]);

            // Create teacher user
            User::create([
                'name' => 'Guru Matematika',
                'email' => 'guru@example.com',
                'password' => Hash::make('password'),
                'role' => 'guru',
                'sekolah_id' => $firstSchool->id,
                'nip' => '198001011995122001',
                'email_verified_at' => now(),
            ]);

            // Create student user
            User::create([
                'name' => 'Siswa Contoh',
                'email' => 'siswa@example.com',
                'password' => Hash::make('password'),
                'role' => 'siswa',
                'sekolah_id' => $firstSchool->id,
                'nisn' => '1234567890',
                'email_verified_at' => now(),
            ]);
        }
    }
}