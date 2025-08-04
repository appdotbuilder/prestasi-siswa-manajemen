<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Siswa
 *
 * @property int $id
 * @property string $nisn
 * @property string $nama
 * @property string $kelas
 * @property int $sekolah_id
 * @property int $semester_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Sekolah $sekolah
 * @property-read \App\Models\Semester $semester
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Prestasi> $prestasi
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Siswa newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Siswa newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Siswa query()
 * @method static \Illuminate\Database\Eloquent\Builder|Siswa whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Siswa whereNisn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Siswa whereNama($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Siswa whereKelas($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Siswa whereSekolahId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Siswa whereSemesterId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Siswa whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Siswa whereUpdatedAt($value)
 * @method static \Database\Factories\SiswaFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Siswa extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'siswa';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nisn',
        'nama',
        'kelas',
        'sekolah_id',
        'semester_id',
    ];

    /**
     * Get the school that owns the student.
     */
    public function sekolah(): BelongsTo
    {
        return $this->belongsTo(Sekolah::class);
    }

    /**
     * Get the semester that owns the student.
     */
    public function semester(): BelongsTo
    {
        return $this->belongsTo(Semester::class);
    }

    /**
     * Get the achievements for the student.
     */
    public function prestasi(): HasMany
    {
        return $this->hasMany(Prestasi::class);
    }
}