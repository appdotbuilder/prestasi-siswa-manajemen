<?php

namespace Database\Seeders;

use App\Models\Semester;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SemesterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Semester::create([
            'nama_semester' => 'Semester Ganjil',
            'tahun_ajaran' => '2023/2024',
            'is_aktif' => false,
        ]);

        Semester::create([
            'nama_semester' => 'Semester Genap',
            'tahun_ajaran' => '2023/2024',
            'is_aktif' => false,
        ]);

        Semester::create([
            'nama_semester' => 'Semester Ganjil',
            'tahun_ajaran' => '2024/2025',
            'is_aktif' => true,
        ]);
    }
}