<?php
namespace App\Repositories;

use App\Contracts\TimetableRepositoryInterface;
use App\Models\TimetableSlot;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class EloquentTimetableRepository implements TimetableRepositoryInterface
{
    public function saveSlots(array $slots): void
    {
        DB::transaction(function() use ($slots) {
            foreach ($slots as $s) {
                TimetableSlot::updateOrCreate(
                    [
                        'class_id' => $s['class_id'],
                        'subject_id' => $s['subject_id'],
                        'period_index' => $s['period_index'],
                        'day_of_week' => $s['day_of_week']
                    ],
                    [
                        'teacher_id' => $s['teacher_id'],
                        'room_id' => $s['room_id'] ?? null,
                        'start_time' => $s['start_time'],
                        'end_time' => $s['end_time'],
                        'generated_at' => Carbon::now()
                    ]
                );
            }
        });
    }

    public function getSlotsForClass(int $classId): array
    {
        return TimetableSlot::where('class_id', $classId)
            ->orderBy('day_of_week')
            ->orderBy('period_index')
            ->get()
            ->toArray();
    }

    public function clearGeneratedForTerm(string $term): void
    {
        TimetableSlot::where('generated_at', '<', now()->subYears(1))->delete();
    }
}
