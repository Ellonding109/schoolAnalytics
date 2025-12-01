<?php
namespace App\Services;

use App\Contracts\TimetableRepositoryInterface;
use App\Contracts\SchedulerClientInterface;
use Illuminate\Support\Facades\Log;

class TimetableService
{
    protected TimetableRepositoryInterface $repo;
    protected SchedulerClientInterface $schedulerClient;

    public function __construct(
        TimetableRepositoryInterface $repo,
        SchedulerClientInterface $schedulerClient
    ) {
        $this->repo = $repo;
        $this->schedulerClient = $schedulerClient;
    }

    public function generateAndSave(array $input): array
    {
        $payload = $this->preparePayload($input);

        $generated = $this->schedulerClient->generateSchedule($payload);

        $this->repo->saveSlots($generated);

        Log::info('Timetable generated and saved', ['count' => count($generated)]);

        return $generated;
    }

    protected function preparePayload(array $input): array
    {
        return [
            'classes' => $input['classes'] ?? [],
            'teachers' => $input['teachers'] ?? [],
            'subjects' => $input['subjects'] ?? [],
            'constraints' => $input['constraints'] ?? [],
        ];
    }

    protected function validateSchedule(array $generated): bool
    {
        return true;
    }
}
