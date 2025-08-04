<?php

namespace Database\Factories;

use App\Models\Sekolah;
use App\Models\Semester;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Siswa>
 */
class SiswaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nisn' => fake()->unique()->numerify('##########'),
            'nama' => fake()->name(),
            'kelas' => fake()->randomElement(['X', 'XI', 'XII']) . ' ' . fake()->randomElement(['IPA', 'IPS']) . ' ' . fake()->numberBetween(1, 5),
            'sekolah_id' => Sekolah::factory(),
            'semester_id' => Semester::factory(),
        ];
    }
}