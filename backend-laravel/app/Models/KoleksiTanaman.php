<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KoleksiTanaman extends Model
{
    use HasFactory;

    protected $table = 'koleksi_tanaman';

    protected $fillable = [
        'id_user',
        'id_tanaman',
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