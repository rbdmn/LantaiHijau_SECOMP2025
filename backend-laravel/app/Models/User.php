<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'user'; // Using the 'user' table instead of default 'users'

    protected $fillable = [
        'username',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
    ];

    // Relationships
    public function kebuns()
    {
        return $this->hasMany(Kebun::class, 'id_user');
    }

    public function koleksiTanaman()
    {
        return $this->hasMany(KoleksiTanaman::class, 'id_user');
    }

    public function hasilPanen()
    {
        return $this->hasMany(HasilPanen::class, 'id_user');
    }

    public function jurnals()
    {
        return $this->hasMany(Jurnal::class, 'id_user');
    }

    public function todolists()
    {
        return $this->hasMany(Todolist::class, 'id_user');
    }
}