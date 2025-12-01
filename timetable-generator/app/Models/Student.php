<?php
/**
 * Delight generator
 *
 * @see       https:/github.com/12492sachet/DelightSchool/    The Delight generator repository
 * @author    CBravin Rotich gmail <rotichbravin13@gmail.com>
 * @copyright 2025 - 2026 Bravo @ rotich
 * @license   this program has been written by bravin for the purpose of the the delight school analytics and no part can be taken from it without any prior permission from Bravin Rotich CEO BRAVOX
 * @see contact at +254757715147
 */

namespace bravo\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
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

    // Relationships
    public function classModel()
    {
        return $this->belongsTo(ClassModel::class, 'class_id');
    }

    public function results()
    {
        return $this->hasMany(Result::class, 'student_id');
    }

    public function timetableSlots()
    {
        return $this->hasManyThrough(
            TimetableSlots::class,
            ClassModel::class,
            'id',
            'class_id',
            'class_id',
            'id'
        );
    }
}
