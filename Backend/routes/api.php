<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\StudentController;
use App\Http\Controllers\API\TimetableController;
use App\Http\Controllers\API\FeedbackController;
use App\Http\Controllers\API\ReportController;

Route::prefix('v1')->group(function() {
    Route::middleware('auth:sanctum')->group(function() {
        Route::post('timetables/generate', [TimetableController::class, 'generate']);
        Route::get('timetables/{classId}', [TimetableController::class, 'show']);
        Route::post('feedback', [FeedbackController::class, 'store']);
        Route::get('reports/performance', [ReportController::class, 'performance']);
        Route::apiResource('students', StudentController::class)->only(['index','show']);
    });
});
