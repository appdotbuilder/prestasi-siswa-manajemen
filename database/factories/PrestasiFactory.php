<?php

namespace Database\Factories;

use App\Models\Siswa;
use App\Models\Guru;
use App\Models\Semester;
use App\Models\Sekolah;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Prestasi>
 */
class PrestasiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'siswa_id' => Siswa::factory(),
            'nama_prestasi' => fake()->randomElement([
                'Olimpiade Matematika', 'Lomba Debat Bahasa Indonesia', 'Kompetisi Sains',
                'Festival Musik', 'Lomba Karya Tulis Ilmiah', 'Kejuaraan Olahraga',
                'Kompetisi Robotika', 'Lomba Desain Grafis', 'Olimpiade Fisika'
            ]),
            'tingkat_prestasi' => fake()->randomElement(['sekolah', 'kecamatan', 'kabupaten', 'provinsi', 'nasional', 'internasional']),
            'tanggal_prestasi' => fake()->dateTimeBetween('-2 years', 'now'),
            'penghargaan_juara' => fake()->randomElement(['Juara 1', 'Juara 2', 'Juara 3', 'Harapan 1', 'Harapan 2', 'Peserta Terbaik']),
            'guru_pembimbing_id' => fake()->boolean(80) ? Guru::factory() : null,
            'semester_id' => Semester::factory(),
            'sekolah_id' => Sekolah::factory(),
            'file_sertifikat' => fake()->boolean(60) ? 'prestasi/' . fake()->uuid() . '.pdf' : null,
        ];
    }
}