<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TanamanKebun extends Model
{
    use HasFactory;

    protected $table = 'tanaman_kebun';

    protected $fillable = [
        'id_kebun',
        'id_tanaman',
        'tanggal_tanam',
        'posisi_x',
        'posisi_y',
    ];

    // Relationships
    public function kebun()
    {
        return $this->belongsTo(Kebun::class, 'id_kebun');
    }

    public function tanaman()
    {
        return $this->belongsTo(Tanaman::class, 'id_tanaman');
    }

    public function todolists()
    {
        return $this->hasMany(Todolist::class, 'id_tanaman_kebun');
    }
}