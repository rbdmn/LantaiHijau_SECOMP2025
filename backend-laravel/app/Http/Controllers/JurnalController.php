<?php

namespace App\Http\Controllers;

use App\Models\Jurnal;
use App\Models\Tanaman;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class JurnalController extends Controller
{
    /**
     * Display a listing of the user's jurnal entries.
     */
    public function index()
    {
        try {
            $user = Auth::user();
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized. Please login first.'
                ], 401);
            }

            $jurnal = Jurnal::with(['tanaman'])
                ->where('id_user', $user->id)
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'tanaman' => $item->tanaman->nama_tanaman ?? 'Unknown',
                        'img' => $item->tanaman->foto_tanaman ?? 'placeholder-plant.png',
                        'mulai' => date('d/m/Y', strtotime($item->mulai_menanam)),
                        'panen' => date('d/m/Y', strtotime($item->tanggal_panen)),
                        'catatan' => $item->catatan,
                        'dokumentasi' => $item->foto_dokumentasi ?? 'placeholder-plant.png',
                        'id_tanaman' => $item->id_tanaman
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $jurnal
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch jurnal entries',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created jurnal entry.
     */
   public function store(Request $request)
    {
        try {
            $user = Auth::user();
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized. Please login first.'
                ], 401);
            }

            $validator = Validator::make($request->all(), [
                'id_tanaman' => 'required|exists:tanaman,id',
                'mulai_menanam' => 'required|date',
                'tanggal_panen' => 'required|date|after_or_equal:mulai_menanam',
                'catatan' => 'required|string|max:1000',
                'foto_dokumentasi' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:512'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $data = [
                'id_user' => $user->id,
                'id_tanaman' => $request->id_tanaman,
                'mulai_menanam' => $request->mulai_menanam,
                'tanggal_panen' => $request->tanggal_panen,
                'catatan' => $request->catatan
            ];

            // Handle file upload - simpan ke frontend/public
            if ($request->hasFile('foto_dokumentasi')) {
                $file = $request->file('foto_dokumentasi');
                $originalName = $file->getClientOriginalName();
                
                // Path ke frontend/public
                $frontendPath = base_path('../frontend/public');
                
                // Buat folder jika belum ada
                if (!file_exists($frontendPath)) {
                    mkdir($frontendPath, 0777, true);
                }
                
                // Nama file (gunakan nama asli)
                $filename = $originalName;
                $destinationPath = $frontendPath . DIRECTORY_SEPARATOR . $filename;
                
                // Jika file sudah ada, tambahkan timestamp
                if (file_exists($destinationPath)) {
                    $pathInfo = pathinfo($originalName);
                    $filename = $pathInfo['filename'] . '_' . time() . '.' . $pathInfo['extension'];
                    $destinationPath = $frontendPath . DIRECTORY_SEPARATOR . $filename;
                }
                
                try {
                    // Coba move dulu
                    $moved = $file->move($frontendPath, $filename);
                    if ($moved) {
                        $data['foto_dokumentasi'] = $filename;
                        \Log::info('File uploaded successfully', ['filename' => $filename]);
                    }
                } catch (\Exception $e) {
                    // Jika move gagal, coba copy
                    try {
                        $copySuccess = copy($file->getPathname(), $destinationPath);
                        if ($copySuccess) {
                            $data['foto_dokumentasi'] = $filename;
                            \Log::info('File copied successfully', ['filename' => $filename]);
                        }
                    } catch (\Exception $copyError) {
                        \Log::error('File upload failed', ['error' => $copyError->getMessage()]);
                    }
                }
            }

            $jurnal = Jurnal::create($data);
            $jurnal->load('tanaman');

            return response()->json([
                'success' => true,
                'message' => 'Jurnal entry created successfully',
                'data' => [
                    'id' => $jurnal->id,
                    'tanaman' => $jurnal->tanaman->nama_tanaman ?? 'Unknown',
                    'img' => $jurnal->tanaman->foto_tanaman ?? 'placeholder-plant.png',
                    'mulai' => date('d/m/Y', strtotime($jurnal->mulai_menanam)),
                    'panen' => date('d/m/Y', strtotime($jurnal->tanggal_panen)),
                    'catatan' => $jurnal->catatan,
                    'dokumentasi' => $jurnal->foto_dokumentasi ?? 'placeholder-plant.png'
                ]
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create jurnal entry',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified jurnal entry.
     */
    public function show($id)
    {
        try {
            $user = Auth::user();
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized. Please login first.'
                ], 401);
            }

            $jurnal = Jurnal::with(['tanaman'])
                ->where('id', $id)
                ->where('id_user', $user->id)
                ->first();

            if (!$jurnal) {
                return response()->json([
                    'success' => false,
                    'message' => 'Jurnal entry not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $jurnal->id,
                    'id_tanaman' => $jurnal->id_tanaman,
                    'tanaman' => $jurnal->tanaman->nama_tanaman,
                    'img' => $jurnal->tanaman->foto_tanaman ?? 'placeholder-plant.png',
                    'mulai_menanam' => $jurnal->mulai_menanam,
                    'tanggal_panen' => $jurnal->tanggal_panen,
                    'mulai' => date('d/m/Y', strtotime($jurnal->mulai_menanam)),
                    'panen' => date('d/m/Y', strtotime($jurnal->tanggal_panen)),
                    'catatan' => $jurnal->catatan,
                    'dokumentasi' => $jurnal->foto_dokumentasi ?? 'placeholder-plant.png'
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch jurnal entry',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified jurnal entry.
     */
    public function update(Request $request, $id)
    {
        try {
            $user = Auth::user();
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized. Please login first.'
                ], 401);
            }

            $jurnal = Jurnal::where('id', $id)
                ->where('id_user', $user->id)
                ->first();

            if (!$jurnal) {
                return response()->json([
                    'success' => false,
                    'message' => 'Jurnal entry not found'
                ], 404);
            }

            $validator = Validator::make($request->all(), [
                'id_tanaman' => 'required|exists:tanaman,id',
                'mulai_menanam' => 'required|date',
                'tanggal_panen' => 'required|date|after_or_equal:mulai_menanam',
                'catatan' => 'required|string|max:1000',
                'foto_dokumentasi' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:512'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $data = [
                'id_tanaman' => $request->id_tanaman,
                'mulai_menanam' => $request->mulai_menanam,
                'tanggal_panen' => $request->tanggal_panen,
                'catatan' => $request->catatan
            ];

            // Handle file upload - update foto dokumentasi
            if ($request->hasFile('foto_dokumentasi')) {
                $file = $request->file('foto_dokumentasi');
                $originalName = $file->getClientOriginalName();
                
                $frontendPath = base_path('../frontend/public');
                
                // Buat folder jika belum ada
                if (!file_exists($frontendPath)) {
                    mkdir($frontendPath, 0777, true);
                }
                
                // Hapus file lama jika ada
                if ($jurnal->foto_dokumentasi) {
                    $oldFilePath = $frontendPath . DIRECTORY_SEPARATOR . $jurnal->foto_dokumentasi;
                    if (file_exists($oldFilePath)) {
                        unlink($oldFilePath);
                    }
                }
                
                // Nama file baru
                $filename = $originalName;
                $destinationPath = $frontendPath . DIRECTORY_SEPARATOR . $filename;
                
                // Jika file sudah ada, tambahkan timestamp
                if (file_exists($destinationPath)) {
                    $pathInfo = pathinfo($originalName);
                    $filename = $pathInfo['filename'] . '_' . time() . '.' . $pathInfo['extension'];
                    $destinationPath = $frontendPath . DIRECTORY_SEPARATOR . $filename;
                }
                
                try {
                    // Coba move dulu
                    $moved = $file->move($frontendPath, $filename);
                    if ($moved) {
                        $data['foto_dokumentasi'] = $filename;
                    }
                } catch (\Exception $e) {
                    // Jika move gagal, coba copy
                    try {
                        $copySuccess = copy($file->getPathname(), $destinationPath);
                        if ($copySuccess) {
                            $data['foto_dokumentasi'] = $filename;
                        }
                    } catch (\Exception $copyError) {
                        \Log::error('File update failed', ['error' => $copyError->getMessage()]);
                    }
                }
            }

            $jurnal->update($data);
            $jurnal->load('tanaman');

            return response()->json([
                'success' => true,
                'message' => 'Jurnal entry updated successfully',
                'data' => [
                    'id' => $jurnal->id,
                    'tanaman' => $jurnal->tanaman->nama_tanaman,
                    'img' => $jurnal->tanaman->foto_tanaman ?? 'placeholder-plant.png',
                    'mulai' => date('d/m/Y', strtotime($jurnal->mulai_menanam)),
                    'panen' => date('d/m/Y', strtotime($jurnal->tanggal_panen)),
                    'catatan' => $jurnal->catatan,
                    'dokumentasi' => $jurnal->foto_dokumentasi ?? 'placeholder-plant.png'
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update jurnal entry',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified jurnal entry.
     */
    public function destroy($id)
    {
        try {
            $user = Auth::user();
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized. Please login first.'
                ], 401);
            }

            $jurnal = Jurnal::where('id', $id)
                ->where('id_user', $user->id)
                ->first();

            if (!$jurnal) {
                return response()->json([
                    'success' => false,
                    'message' => 'Jurnal entry not found'
                ], 404);
            }

            // Delete documentation file if exists
            if ($jurnal->foto_dokumentasi) {
                $possiblePaths = [
                    base_path('../frontend/public'),
                    public_path(),
                    storage_path('app/public')
                ];

                foreach ($possiblePaths as $basePath) {
                    $filePath = $basePath . DIRECTORY_SEPARATOR . $jurnal->foto_dokumentasi;
                    if (file_exists($filePath)) {
                        unlink($filePath);
                        \Log::info('Deleted documentation file:', ['file' => $jurnal->foto_dokumentasi, 'path' => $basePath]);
                        break;
                    }
                }
            }

            $jurnal->delete();

            return response()->json([
                'success' => true,
                'message' => 'Jurnal entry deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete jurnal entry',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get tanaman options for dropdown
     */
    public function getTanamanOptions()
    {
        try {
            $tanaman = Tanaman::select('id', 'nama_tanaman')
                ->orderBy('nama_tanaman')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $tanaman
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch tanaman options',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}