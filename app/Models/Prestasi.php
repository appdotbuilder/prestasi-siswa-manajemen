<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Prestasi
 *
 * @property int $id
 * @property int $siswa_id
 * @property string $nama_prestasi
 * @property string $tingkat_prestasi
 * @property \Carbon\Carbon $tanggal_prestasi
 * @property string $penghargaan_juara
 * @property int|null $guru_pembimbing_id
 * @property int $semester_id
 * @property int $sekolah_id
 * @property string|null $file_sertifikat
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Siswa $siswa
 * @property-read \App\Models\Guru|null $guruPembimbing
 * @property-read \App\Models\Semester $semester
 * @property-read \App\Models\Sekolah $sekolah
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Prestasi newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Prestasi newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Prestasi query()
 * @method static \Illuminate\Database\Eloquent\Builder|Prestasi whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prestasi whereSiswaId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prestasi whereNamaPrestasi($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prestasi whereTingkatPrestasi($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prestasi whereTanggalPrestasi($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prestasi wherePenghargaanJuara($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prestasi whereGuruPembimbingId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prestasi whereSemesterId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prestasi whereSekolahId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prestasi whereFileSertifikat($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prestasi whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prestasi whereUpdatedAt($value)
 * @method static \Database\Factories\PrestasiFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Prestasi extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'prestasi';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'siswa_id',
        'nama_prestasi',
        'tingkat_prestasi',
        'tanggal_prestasi',
        'penghargaan_juara',
        'guru_pembimbing_id',
        'semester_id',
        'sekolah_id',
        'file_sertifikat',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'tanggal_prestasi' => 'date',
    ];

    /**
     * Get the student that owns the achievement.
     */
    public function siswa(): BelongsTo
    {
        return $this->belongsTo(Siswa::class);
    }

    /**
     * Get the supervising teacher for this achievement.
     */
    public function guruPembimbing(): BelongsTo
    {
        return $this->belongsTo(Guru::class, 'guru_pembimbing_id');
    }

    /**
     * Get the semester that owns the achievement.
     */
    public function semester(): BelongsTo
    {
        return $this->belongsTo(Semester::class);
    }

    /**
     * Get the school that owns the achievement.
     */
    public function sekolah(): BelongsTo
    {
        return $this->belongsTo(Sekolah::class);
    }
}