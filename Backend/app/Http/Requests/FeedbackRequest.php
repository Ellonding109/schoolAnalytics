<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FeedbackRequest extends FormRequest
{
    public function authorize() { return true; }

    public function rules()
    {
        return [
            'user_type' => 'required|in:teacher,student',
            'user_id' => 'required|integer',
            'timetable_slot_id' => 'required|integer|exists:timetable_slots,id',
            'rating' => 'required|integer|min:1|max:5',
            'comments' => 'nullable|string|max:2000'
        ];
    }
}
