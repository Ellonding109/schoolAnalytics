<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\FeedbackRequest;
use App\Models\Feedback;

class FeedbackController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function store(FeedbackRequest $request)
    {
        $data = $request->validated();
        $feedback = Feedback::create($data);

        dispatch(function () use ($feedback) {
            // TODO: send feedback to ML service (async)
        });

        return response()->json(['status' => 'ok', 'feedback' => $feedback], 201);
    }
}
