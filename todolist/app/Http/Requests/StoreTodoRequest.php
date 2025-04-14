<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTodoRequest extends FormRequest
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
            'nom' => ["required", "unique:todos,nom"]
        ];
    }


    public function messages()
    {
        return [
            'nom.required' => 'le nom de la tâche est obligatoire',
            'nom.unique' => 'cette tâche existe déja'
        ];
    }
}
