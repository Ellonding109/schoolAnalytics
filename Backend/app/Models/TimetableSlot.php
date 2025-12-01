<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TimetableSlot extends Model
{
    use HasFactory;

    protected $table = 'timetable_slots';
    protected $fillable = [
        'class_id','subject_id','teacher_id','room_id',
        'day_of_week','start_time','end_time','period_index','generated_at'
    ];

    public function classModel()
    {
        return $this->belongsTo(ClassModel::class, 'class_id');
    }
    public function subject() { return $this->belongsTo(Subject::class, 'subject_id'); }
    public function teacher() { return $this->belongsTo(Teacher::class, 'teacher_id'); }
    public function room() { return $this->belongsTo(Room::class, 'room_id'); }
}
