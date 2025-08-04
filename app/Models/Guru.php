<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Guru
 *
 * @property int $id
 * @property string $nip
 * @property string $nama
 * @property string|null $mata_pelajaran
 * @property int $sekolah_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Sekolah $sekolah
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Prestasi> $prestasiDibimbing
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Guru newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Guru newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Guru query()
 * @method static \Illuminate\Database\Eloquent\Builder|Guru whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Guru whereNip($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Guru whereNama($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Guru whereMataPelajaran($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Guru whereSekolahId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Guru whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Guru whereUpdatedAt($value)
 * @method static \Database\Factories\GuruFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Guru extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'guru';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nip',
        'nama',
        'mata_pelajaran',
        'sekolah_id',
    ];

    /**
     * Get the school that owns the teacher.
     */
    public function sekolah(): BelongsTo
    {
        return $this->belongsTo(Sekolah::class);
    }

    /**
     * Get the achievements supervised by this teacher.
     */
    public function prestasiDibimbing(): HasMany
    {
        return $this->hasMany(Prestasi::class, 'guru_pembimbing_id');
    }
}