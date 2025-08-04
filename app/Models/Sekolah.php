<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Sekolah
 *
 * @property int $id
 * @property string $nama_sekolah
 * @property string $npsn
 * @property string $alamat
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Siswa> $siswa
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Guru> $guru
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Prestasi> $prestasi
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $users
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Sekolah newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Sekolah newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Sekolah query()
 * @method static \Illuminate\Database\Eloquent\Builder|Sekolah whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sekolah whereNamaSekolah($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sekolah whereNpsn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sekolah whereAlamat($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sekolah whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sekolah whereUpdatedAt($value)
 * @method static \Database\Factories\SekolahFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Sekolah extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'sekolah';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nama_sekolah',
        'npsn',
        'alamat',
    ];

    /**
     * Get the students for the school.
     */
    public function siswa(): HasMany
    {
        return $this->hasMany(Siswa::class);
    }

    /**
     * Get the teachers for the school.
     */
    public function guru(): HasMany
    {
        return $this->hasMany(Guru::class);
    }

    /**
     * Get the achievements for the school.
     */
    public function prestasi(): HasMany
    {
        return $this->hasMany(Prestasi::class);
    }

    /**
     * Get the users for the school.
     */
    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}