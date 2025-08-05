<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jurnal extends Model
{
    use HasFactory;

    protected $table = 'jurnal';

    protected $fillable = [
        'id_user',
        'id_tanaman',
        'mulai_menanam',
        'tanggal_panen',
        'catatan',
        'foto_dokumentasi',
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
}