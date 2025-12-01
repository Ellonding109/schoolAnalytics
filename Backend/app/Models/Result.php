<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Result extends Model
{
    use HasFactory;
    protected $table = 'results';
    protected $fillable = ['student_id','subject_id','score','grade','exam_date','term','year'];
    public function student() { return $this->belongsTo(Student::class,'student_id'); }
    public function subject() { return $this->belongsTo(Subject::class,'subject_id'); }
}
