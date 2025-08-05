<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PenghematanPanen extends Model
{
    use HasFactory;

    protected $table = 'penghematan_panen';

    protected $fillable = [
        'id_tanaman',
        'id_hasil_panen',
        'total_penghematan',
    ];

    // Relationships
    public function tanaman()
    {
        return $this->belongsTo(Tanaman::class, 'id_tanaman');
    }

    public function hasilPanen()
    {
        return $this->belongsTo(HasilPanen::class, 'id_hasil_panen');
    }
}