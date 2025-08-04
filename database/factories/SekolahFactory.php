<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sekolah>
 */
class SekolahFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama_sekolah' => 'SMA Negeri ' . fake()->numberBetween(1, 50) . ' ' . fake()->city(),
            'npsn' => fake()->unique()->numerify('201#####'),
            'alamat' => fake()->address(),
        ];
    }
}