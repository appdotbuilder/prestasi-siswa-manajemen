<?php

namespace Database\Factories;

use App\Models\Sekolah;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Guru>
 */
class GuruFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nip' => fake()->unique()->numerify('##########'),
            'nama' => fake()->name(),
            'mata_pelajaran' => fake()->randomElement([
                'Matematika', 'Bahasa Indonesia', 'Bahasa Inggris', 'Fisika', 'Kimia', 
                'Biologi', 'Sejarah', 'Geografi', 'Ekonomi', 'Sosiologi'
            ]),
            'sekolah_id' => Sekolah::factory(),
        ];
    }
}