<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'students';

    protected $fillable = [
        'first_name',
        'second_name',
        'reg_no',
        'dob',
        'gender',
        'enrollment_date',
        'class_id'
    ];

    public function classModel()
    {
        return $this->belongsTo(ClassModel::class, 'class_id');
    }

    public function results()
    {
        return $this->hasMany(Result::class, 'student_id');
    }
}
