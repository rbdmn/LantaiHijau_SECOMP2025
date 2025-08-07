<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tanaman extends Model
{
    use HasFactory;

    protected $table = 'tanaman';

    protected $fillable = [
        'nama_tanaman',
        'level_kesulitan',
        'suhu',
        'musim_panen',
        'waktu_tumbuh',
        'deskripsi',
        'foto_tanaman',
        'rata_harga',
        'link_youtube',
    ];

    // Relationships
    public function koleksiTanaman()
    {
        return $this->hasMany(KoleksiTanaman::class, 'id_tanaman');
    }

    public function tanamanKebun()
    {
        return $this->hasMany(TanamanKebun::class, 'id_tanaman');
    }

    public function hasilPanen()
    {
        return $this->hasMany(HasilPanen::class, 'id_tanaman');
    }

    public function jurnals()
    {
        return $this->hasMany(Jurnal::class, 'id_tanaman');
    }
    public function jurnal()
    {
        return $this->hasMany(Jurnal::class, 'id_tanaman');
    }

    // Relasi ke panduan tanaman
    public function panduan()
    {
        return $this->hasMany(PanduanTanaman::class)->orderBy('step_number');
    }
}

class PanduanTanaman extends Model
{
    use HasFactory;

    protected $table = 'panduan_tanaman';
    
    protected $fillable = [
        'tanaman_id',
        'step_number',
        'step_title',
        'step_content',
        'alat_bahan',
        'tips'
    ];

    protected $casts = [
        'alat_bahan' => 'array'
    ];

    // Relasi balik ke tanaman
    public function tanaman()
    {
        return $this->belongsTo(Tanaman::class);
    }
}