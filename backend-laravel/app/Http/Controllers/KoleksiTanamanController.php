<?php

namespace App\Http\Controllers;

use App\Models\KoleksiTanaman;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class KoleksiTanamanController extends Controller
{
    /**
     * Simpan tanaman ke koleksi user
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'id_tanaman' => 'required|integer|exists:tanaman,id'
            ]);

            $userId = Auth::id();
            $tanamanId = $request->id_tanaman;

            // Cek apakah tanaman sudah ada di koleksi user
            $existing = KoleksiTanaman::where('id_user', $userId)
                                    ->where('id_tanaman', $tanamanId)
                                    ->first();

            if ($existing) {
                // Ini bukan error, tapi kondisi bisnis yang valid
                return response()->json([
                    'success' => false,
                    'message' => 'Tanaman sudah ada di koleksi Anda',
                    'code' => 'ALREADY_EXISTS'
                ], 400);
            }

            // Simpan ke koleksi
            $koleksi = KoleksiTanaman::create([
                'id_user' => $userId,
                'id_tanaman' => $tanamanId
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Tanaman berhasil ditambahkan ke koleksi',
                'data' => $koleksi
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan tanaman ke koleksi',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Ambil semua koleksi tanaman user
     */
    public function index()
    {
        try {
            $userId = Auth::id();
            
            $koleksi = KoleksiTanaman::with('tanaman')
                                   ->where('id_user', $userId)
                                   ->get();

            return response()->json([
                'success' => true,
                'data' => $koleksi
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data koleksi',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Hapus tanaman dari koleksi
     */
    public function destroy($id)
    {
        try {
            $userId = Auth::id();
            
            $koleksi = KoleksiTanaman::where('id', $id)
                                   ->where('id_user', $userId)
                                   ->first();

            if (!$koleksi) {
                return response()->json([
                    'success' => false,
                    'message' => 'Koleksi tidak ditemukan'
                ], 404);
            }

            $koleksi->delete();

            return response()->json([
                'success' => true,
                'message' => 'Tanaman berhasil dihapus dari koleksi'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus tanaman dari koleksi',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Cek apakah tanaman sudah ada di koleksi user
     */
    public function checkCollection($tanamanId)
    {
        try {
            $userId = Auth::id();
            
            $exists = KoleksiTanaman::where('id_user', $userId)
                                  ->where('id_tanaman', $tanamanId)
                                  ->exists();

            return response()->json([
                'success' => true,
                'exists' => $exists
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memeriksa koleksi',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}