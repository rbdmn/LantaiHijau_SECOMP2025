<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kebun extends Model
{
    use HasFactory;

    protected $table = 'kebun';

    protected $fillable = [
        'id_user',
        'nama_kebun',
        'panjang',
        'lebar',
        'created_at',
        'updated_at',
        'grid_data',
    ];

    // protected $casts = [
    //     'grid_data' => 'array',
    // ];


    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function tanamanKebun()
    {
        return $this->hasMany(TanamanKebun::class, 'id_kebun');
    }
}