<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TimetableResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'class' => $this->classModel->name ?? null,
            'subject' => $this->subject->name ?? null,
            'teacher' => ($this->teacher->first_name ?? '') . ' ' . ($this->teacher->second_name ?? ''),
            'day_of_week' => $this->day_of_week,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'period_index' => $this->period_index
        ];
    }
}
