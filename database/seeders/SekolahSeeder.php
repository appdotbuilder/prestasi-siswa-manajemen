<?php

namespace Database\Seeders;

use App\Models\Sekolah;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SekolahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Sekolah::create([
            'nama_sekolah' => 'SMA Negeri 1 Jakarta',
            'npsn' => '20100001',
            'alamat' => 'Jl. Diponegoro No. 123, Jakarta Pusat, DKI Jakarta',
        ]);

        Sekolah::create([
            'nama_sekolah' => 'SMA Negeri 2 Jakarta',
            'npsn' => '20100002',
            'alamat' => 'Jl. Sudirman No. 456, Jakarta Selatan, DKI Jakarta',
        ]);

        Sekolah::create([
            'nama_sekolah' => 'SMA Negeri 3 Jakarta',
            'npsn' => '20100003',
            'alamat' => 'Jl. Thamrin No. 789, Jakarta Pusat, DKI Jakarta',
        ]);
    }
}