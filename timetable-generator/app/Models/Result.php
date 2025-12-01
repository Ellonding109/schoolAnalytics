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

class Result extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'results'; // explicitly set table name

    protected $fillable = [
        'student_id',
        'subject_id',
        'score',
        'grade',
        'exam_date',
        'term',
        'year'
    ];

    /**
     * Each result belongs to a student
     */
    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }

    /**
     * Each result belongs to a subject
     */
    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id');
    }
}
