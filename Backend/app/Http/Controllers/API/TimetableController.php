<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\GenerateTimetableRequest;
use App\Services\TimetableService;

class TimetableController extends Controller
{
    protected TimetableService $service;

    public function __construct(TimetableService $service)
    {
        $this->service = $service;
        $this->middleware('auth:sanctum');
    }

    public function generate(GenerateTimetableRequest $request)
    {
        $input = $request->validated();
        $lessons = $this->service->generateAndSave($input);

        return response()->json([
            'status' => 'success',
            'data' => $lessons
        ], 201);
    }

    public function show($classId)
    {
        $slots = app('App\\Contracts\\TimetableRepositoryInterface')->getSlotsForClass((int)$classId);
        return response()->json(['data' => $slots]);
    }
}
