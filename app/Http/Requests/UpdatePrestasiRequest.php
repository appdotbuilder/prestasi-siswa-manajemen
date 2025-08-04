<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePrestasiRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->canManageAll();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'siswa_id' => 'required|exists:siswa,id',
            'nama_prestasi' => 'required|string|max:255',
            'tingkat_prestasi' => 'required|in:sekolah,kecamatan,kabupaten,provinsi,nasional,internasional',
            'tanggal_prestasi' => 'required|date',
            'penghargaan_juara' => 'required|string|max:255',
            'guru_pembimbing_id' => 'nullable|exists:guru,id',
            'semester_id' => 'required|exists:semester,id',
            'file_sertifikat' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'siswa_id.required' => 'Siswa wajib dipilih.',
            'siswa_id.exists' => 'Siswa tidak ditemukan.',
            'nama_prestasi.required' => 'Nama prestasi wajib diisi.',
            'tingkat_prestasi.required' => 'Tingkat prestasi wajib dipilih.',
            'tingkat_prestasi.in' => 'Tingkat prestasi tidak valid.',
            'tanggal_prestasi.required' => 'Tanggal prestasi wajib diisi.',
            'tanggal_prestasi.date' => 'Format tanggal tidak valid.',
            'penghargaan_juara.required' => 'Penghargaan/juara wajib diisi.',
            'semester_id.required' => 'Semester wajib dipilih.',
            'semester_id.exists' => 'Semester tidak ditemukan.',
            'file_sertifikat.mimes' => 'File harus berformat PDF, JPG, JPEG, atau PNG.',
            'file_sertifikat.max' => 'Ukuran file maksimal 2MB.',
        ];
    }
}