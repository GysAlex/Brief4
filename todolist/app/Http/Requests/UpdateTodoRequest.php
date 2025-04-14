<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTodoRequest extends FormRequest
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
            'nom' => ["required", Rule::unique('todos')->ignore($this->todo->id)],
            'completed' => "required|boolean"
        ];
    }

    public function messages()
    {
        return [
            'nom.required' => 'le nom de la tâche est obligatoire',
            'nom.unique' => 'ce nom de tâche exite déjà',
            'completed.required' => 'Veillez spécifiez l\'etat de la tâche'
        ];
    }
}
