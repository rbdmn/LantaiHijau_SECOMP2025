<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kebun;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class KebunController extends Controller
{
    // GET /api/koleksi-tanaman?user_id=xx
    public function koleksiTanaman(Request $request)
    {
        $userId = $request->query('user_id');
        if (!$userId) {
            return response()->json(['error' => 'user_id is required'], 400);
        }
        $koleksi = \App\Models\KoleksiTanaman::with('tanaman')->where('id_user', $userId)->get();
        return response()->json($koleksi);
    }
    // GET /api/kebun?user_id=xx
    public function index(Request $request)
    {
        $userId = $request->query('user_id');
        if (!$userId) {
            return response()->json(['error' => 'user_id is required'], 400);
        }
        $kebuns = Kebun::where('id_user', $userId)->get();
        return response()->json($kebuns);
    }

    // POST /api/kebun
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_user' => 'required|integer',
            'nama_kebun' => 'required|string|max:255',
            'panjang' => 'required|numeric',
            'lebar' => 'required|numeric',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $kebun = Kebun::create([
            'id_user' => $request->id_user,
            'nama_kebun' => $request->nama_kebun,
            'panjang' => $request->panjang,
            'lebar' => $request->lebar,
        ]);
        return response()->json($kebun, 201);
    }

    public function update(Request $request, $id)
    {
        $kebun = Kebun::find($id);
        if (!$kebun) {
            return response()->json(['error' => 'Kebun not found'], 404);
        }
        $data = $request->only(['grid_data']);
        if (isset($data['grid_data'])) {
            $kebun->grid_data = is_array($data['grid_data']) ? json_encode($data['grid_data']) : $data['grid_data'];
        }
        $kebun->save();
        return response()->json(['success' => true, 'kebun' => $kebun]);
    }

    public function harvestPlant(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_kebun' => 'required|integer',
            'id_user' => 'required|integer',
            'id_tanaman' => 'required|integer',
            'posisi_x' => 'required|integer',
            'posisi_y' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Invalid input'], 422);
        }

        try {
            \DB::beginTransaction();

            // Create hasil_panen record
            $hasilPanen = \App\Models\HasilPanen::create([
                'id_user' => $request->id_user,
                'id_tanaman' => $request->id_tanaman,
                'tanggal' => now(),
                'kuantitas_panen' => null, 
                'harga_tanam' => null, 
            ]);

            // Get and update kebun grid data
            $kebun = Kebun::find($request->id_kebun);
            if (!$kebun) {
                \DB::rollback();
                return response()->json(['error' => 'Kebun not found'], 404);
            }

            $gridData = json_decode($kebun->grid_data, true);
            if (!$gridData) $gridData = ['grid_data' => []];
            
            if (!isset($gridData['grid_data'])) {
                $gridData = ['grid_data' => $gridData];
            }

            // Remove plant from grid data
            if (isset($gridData['grid_data']['tanaman'])) {
                $gridData['grid_data']['tanaman'] = array_filter(
                    $gridData['grid_data']['tanaman'],
                    function($t) use ($request) {
                        return !($t['posisi_x'] == $request->posisi_x && $t['posisi_y'] == $request->posisi_y);
                    }
                );
                // Re-index array
                $gridData['grid_data']['tanaman'] = array_values($gridData['grid_data']['tanaman']);
            }

            $kebun->grid_data = json_encode($gridData);
            $kebun->save();

            \DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Tanaman berhasil dipanen',
                'hasil_panen' => $hasilPanen
            ]);

        } catch (\Exception $e) {
            \DB::rollback();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $kebun = Kebun::findOrFail($id);
            $kebun->delete();
            return response()->json(['message' => 'Kebun berhasil dihapus']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Gagal menghapus kebun'], 500);
        }
    }
}
