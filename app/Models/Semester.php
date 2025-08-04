<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Semester
 *
 * @property int $id
 * @property string $nama_semester
 * @property string $tahun_ajaran
 * @property bool $is_aktif
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Siswa> $siswa
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Prestasi> $prestasi
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Semester newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Semester newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Semester query()
 * @method static \Illuminate\Database\Eloquent\Builder|Semester whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Semester whereNamaSemester($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Semester whereTahunAjaran($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Semester whereIsAktif($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Semester whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Semester whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Semester active()
 * @method static \Database\Factories\SemesterFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Semester extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'semester';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nama_semester',
        'tahun_ajaran',
        'is_aktif',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_aktif' => 'boolean',
    ];

    /**
     * Get the students for the semester.
     */
    public function siswa(): HasMany
    {
        return $this->hasMany(Siswa::class);
    }

    /**
     * Get the achievements for the semester.
     */
    public function prestasi(): HasMany
    {
        return $this->hasMany(Prestasi::class);
    }

    /**
     * Scope a query to only include active semester.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_aktif', true);
    }
}