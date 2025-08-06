<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Tanaman;

class TanamanController extends Controller
{
    // GET /api/tanaman
    public function index()
    {
        $tanaman = Tanaman::all();
        return response()->json($tanaman);
    }
}
