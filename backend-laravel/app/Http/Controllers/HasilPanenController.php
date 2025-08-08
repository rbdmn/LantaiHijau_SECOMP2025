<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HasilPanen;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Exception;

class HasilPanenController extends Controller
{
    // Ambil semua hasil panen milik user yang sedang login
    public function index(Request $request)
    {
        try {
            $user = $request->user();
            $hasilPanen = HasilPanen::with(['tanaman'])
                ->where('id_user', $user->id)
                ->get();

            // Hitung total penghematan: (harga rata-rata tanaman / 1000 * kuantitas gram) - harga tanam
            $totalPenghematan = 0;
            foreach ($hasilPanen as $panen) {
                $hargaTanam = $panen->harga_tanam ?? 0;
                $hargaRata = optional($panen->tanaman)->rata_harga ?? 0;
                $kuantitasGram = $panen->kuantitas_panen ?? 0;
                $penghematan = ($hargaRata / 1000 * $kuantitasGram) - $hargaTanam;
                $totalPenghematan += $penghematan; // Akumulasi semua, bisa positif/negatif
            }

            return response()->json([
                'data' => $hasilPanen->map(function ($item) {
                    $hargaPasar = optional($item->tanaman)->rata_harga ?? $item->harga_pasar ?? 0;
                    $kuantitasGram = $item->kuantitas_panen ?? 0;
                    $hargaTanam = $item->harga_tanam ?? 0;
                    $penghematan = ($hargaPasar / 1000 * $kuantitasGram) - $hargaTanam;
                    return [
                        'id' => $item->id,
                        'nama_tanaman' => optional($item->tanaman)->nama_tanaman,
                        'tanggal' => $item->tanggal,
                        'kuantitas_panen' => $item->kuantitas_panen,
                        'harga_tanam' => $item->harga_tanam,
                        'foto_tanaman' => optional($item->tanaman)->foto_tanaman 
                            ? url('/uploads/' . ltrim(optional($item->tanaman)->foto_tanaman, '/')) 
                            : null,
                        'harga_pasar' => $hargaPasar,
                        'penghematan' => $penghematan,
                        'tanaman' => [
                            'rata_harga' => optional($item->tanaman)->rata_harga ?? 0
                        ]
                    ];
                }),
                'total_penghematan' => $totalPenghematan,
            ]);
        } catch (Exception $e) {
            Log::error('Error in HasilPanenController@index: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to fetch harvest data',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    // Update hasil panen
    public function update(Request $request, $id)
    {
        try {
            // Log request untuk debugging
            Log::info('Update request received', [
                'id' => $id,
                'data' => $request->all(),
                'user_id' => $request->user()->id ?? 'unknown'
            ]);

            // Validasi request
            $validated = $request->validate([
                'kuantitas_panen' => 'required|numeric|min:0',
                'harga_tanam' => 'required|numeric|min:0'
            ]);

            // Dapatkan hasil panen dan pastikan milik user yang sedang login
            $hasilPanen = HasilPanen::where('id', $id)
                ->where('id_user', $request->user()->id)
                ->first();

            if (!$hasilPanen) {
                Log::warning('Harvest data not found or unauthorized', [
                    'id' => $id,
                    'user_id' => $request->user()->id
                ]);
                return response()->json([
                    'error' => 'Harvest data not found or you are not authorized to update it'
                ], 404);
            }

            Log::info('Found harvest data', [
                'harvest_id' => $hasilPanen->id,
                'current_kuantitas' => $hasilPanen->kuantitas_panen,
                'current_harga_tanam' => $hasilPanen->harga_tanam,
                'tanaman_id' => $hasilPanen->id_tanaman
            ]);

            // Update data
            $hasilPanen->update([
                'kuantitas_panen' => $validated['kuantitas_panen'],
                'harga_tanam' => $validated['harga_tanam']
            ]);

            // Load tanaman relation to get harga rata
            $hasilPanen->load('tanaman');

            // Tidak perlu update penghematan_panen, penghematan dihitung langsung di frontend/backend

            Log::info('Harvest data updated successfully', [
                'id' => $hasilPanen->id,
                'new_kuantitas' => $validated['kuantitas_panen'],
                'new_harga_tanam' => $validated['harga_tanam']
            ]);

            return response()->json([
                'message' => 'Hasil panen berhasil diupdate',
                'data' => [
                    'id' => $hasilPanen->id,
                    'kuantitas_panen' => $hasilPanen->kuantitas_panen,
                    'harga_tanam' => $hasilPanen->harga_tanam,
                    'tanaman' => $hasilPanen->tanaman ? [
                        'nama_tanaman' => $hasilPanen->tanaman->nama_tanaman,
                        'rata_harga' => $hasilPanen->tanaman->rata_harga
                    ] : null
                ]
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation error in update: ', $e->errors());
            return response()->json([
                'error' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            Log::error('Error in HasilPanenController@update: ' . $e->getMessage(), [
                'id' => $id,
                'request_data' => $request->all(),
                'stack_trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'error' => 'Failed to update harvest data',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    // Method untuk debugging - bisa dihapus setelah selesai
    public function debug(Request $request, $id)
    {
        try {
            $user = $request->user();
            $hasilPanen = HasilPanen::with(['tanaman', 'penghematanPanen'])
                ->where('id', $id)
                ->where('id_user', $user->id)
                ->first();

            if (!$hasilPanen) {
                return response()->json(['error' => 'Not found'], 404);
            }

            return response()->json([
                'harvest_data' => $hasilPanen,
                'tanaman_data' => $hasilPanen->tanaman,
                'penghematan_data' => $hasilPanen->penghematanPanen,
                'relationships' => [
                    'has_tanaman' => $hasilPanen->tanaman ? true : false,
                    'has_penghematan' => $hasilPanen->penghematanPanen ? true : false,
                    'tanaman_methods' => $hasilPanen->tanaman ? get_class_methods($hasilPanen->tanaman) : [],
                ]
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], 500);
        }
    }

   public function destroy(Request $request, $id)
    {
        try {
            // Find the harvest data ensuring it belongs to the authenticated user.
            $panen = HasilPanen::where('id', $id)
                               ->where('id_user', $request->user()->id)
                               ->first();

            // If not found or doesn't belong to the user, return 404.
            if (!$panen) {
                return response()->json(['message' => 'Data tidak ditemukan atau Anda tidak berhak menghapusnya'], 404);
            }

            // If found and belongs to the user, delete it.
            $panen->delete();

            return response()->json(['message' => 'Data berhasil dihapus']);

        } catch (Exception $e) {
            Log::error('Error in HasilPanenController@destroy: ' . $e->getMessage());
            return response()->json([
                'error' => 'Gagal menghapus data',
                'message' => $e->getMessage()
            ], 500);
        }
    }

}