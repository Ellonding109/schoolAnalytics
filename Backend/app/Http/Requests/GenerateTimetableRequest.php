<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GenerateTimetableRequest extends FormRequest
{
    public function authorize() { return true; }

    public function rules()
    {
        return [
            'classes' => 'required|array|min:1',
            'classes.*.id' => 'required|integer',
            'teachers' => 'required|array',
            'subjects' => 'required|array',
            'constraints' => 'sometimes|array'
        ];
    }
}
