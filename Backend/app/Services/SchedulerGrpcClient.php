<?php
namespace App\Services;

use App\Contracts\SchedulerClientInterface;
use Exception;

class SchedulerGrpcClient implements SchedulerClientInterface
{
    protected $host = 'ai-engine:50051';

    public function generateSchedule(array $payload): array
    {
        $lessons = [];

        foreach ($payload['subjects'] as $subject) {
            $lessons[] = [
                'class_id' => $subject['class_id'] ?? ($payload['classes'][0]['id'] ?? 1),
                'subject_id' => $subject['id'],
                'teacher_id' => $subject['teacher_id'] ?? ($payload['teachers'][0]['id'] ?? 1),
                'day_of_week' => 'Monday',
                'period_index' => 1,
                'start_time' => '08:00:00',
                'end_time' => '09:00:00'
            ];
        }

        return $lessons;
    }
}
