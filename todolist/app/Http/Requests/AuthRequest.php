<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'email', 'unique:users,email'],
            'name' => ["required", "min:4"],
            'password' => ['required', 'confirmed']
        ];
    }

    public function messages()
    {
        return [
            'email.required' => "l'email est obligatoire",
            'email.email' => "veillez renseigner un email valide",
            'email.unique' => "cette email existe déjà",
            'name.min' => "ce nom est trop court",
            'name.required' => "le nom est obligatoire",
            'password.required' => "le mot de passe est obligatoire",
            'password.confirmed' => "les mot de passe ne correspondent pas !"
        ];
    }
}
