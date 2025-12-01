<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Http\Resources\StudentResource;

class StudentController extends Controller
{
    public function index()
    {
        $students = Student::paginate(25);
        return StudentResource::collection($students);
    }

    public function show($id)
    {
        $student = Student::with(['classModel','results'])->findOrFail($id);
        return new StudentResource($student);
    }
}
