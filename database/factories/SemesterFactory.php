<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Semester>
 */
class SemesterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama_semester' => fake()->randomElement(['Semester Ganjil', 'Semester Genap']),
            'tahun_ajaran' => fake()->randomElement(['2022/2023', '2023/2024', '2024/2025']),
            'is_aktif' => false,
        ];
    }

    /**
     * Indicate that the semester is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_aktif' => true,
        ]);
    }
}