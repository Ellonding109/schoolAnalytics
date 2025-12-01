<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Result;
use DB;

class ReportController extends Controller
{
    public function performance(Request $request)
    {
        $classId = $request->query('class_id');
        $data = Result::select('subject_id', DB::raw('AVG(score) as avg_score'))
            ->join('students','results.student_id','students.id')
            ->when($classId, fn($q) => $q->where('students.class_id',$classId))
            ->groupBy('subject_id')
            ->get();

        return response()->json(['data' => $data]);
    }
}
