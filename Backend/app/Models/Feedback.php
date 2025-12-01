<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Feedback extends Model
{
    use HasFactory;
    protected $table = 'feedback';
    protected $fillable = ['user_type','user_id','timetable_slot_id','rating','comments','created_at'];
    public function slot() { return $this->belongsTo(TimetableSlot::class, 'timetable_slot_id'); }
}
