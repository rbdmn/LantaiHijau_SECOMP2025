<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HasilPanen extends Model
{
    use HasFactory;

    protected $table = 'hasil_panen';

    public $timestamps = false;

    protected $fillable = [
        'id_user',
        'id_tanaman',
        'tanggal',
        'kuantitas_panen',
        'harga_tanam',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function tanaman()
    {
        return $this->belongsTo(Tanaman::class, 'id_tanaman');
    }

    public function penghematanPanen()
    {
        return $this->hasOne(PenghematanPanen::class, 'id_hasil_panen');
    }
}