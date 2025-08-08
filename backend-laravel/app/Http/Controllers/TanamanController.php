<?php
namespace App\Http\Controllers;
use App\Models\Tanaman;
use Illuminate\Http\Request;

class TanamanController extends Controller
{
    public function show($id)
    {
        try {
            $tanaman = Tanaman::with('panduan')->findOrFail($id);
            
            return response()->json($tanaman);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Tanaman tidak ditemukan'
            ], 404);
        }
    }

    public function index()
    {
        try {
            $tanaman = Tanaman::all();
            return response()->json($tanaman);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mengambil data tanaman'
            ], 500);
        }
    }
}