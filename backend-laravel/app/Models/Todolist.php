<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todolist extends Model
{
    use HasFactory;

    protected $table = 'todolist';

    protected $fillable = [
        'id_user',
        'id_kebun',
        'deskripsi',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function kebun()
    {
        return $this->belongsTo(Kebun::class, 'id_kebun');
    }
}