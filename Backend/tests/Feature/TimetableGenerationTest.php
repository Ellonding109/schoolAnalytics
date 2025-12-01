<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Contracts\SchedulerClientInterface;

class TimetableGenerationTest extends TestCase
{
    use RefreshDatabase;

    public function test_generate_timetable_calls_scheduler_and_persists_slots()
    {
        $fakeLessons = [
            [
                'class_id'=>1,'subject_id'=>1,'teacher_id'=>1,
                'day_of_week'=>'Monday','period_index'=>1,
                'start_time'=>'08:00:00','end_time'=>'09:00:00'
            ]
        ];

        $this->instance(SchedulerClientInterface::class, new class($fakeLessons) implements SchedulerClientInterface {
            private $lessons;
            public function __construct($lessons) { $this->lessons = $lessons; }
            public function generateSchedule(array $payload): array { return $this->lessons; }
        });

        \App\Models\ClassModel::factory()->create(['id'=>1,'name'=>'1A']);
        \App\Models\Teacher::factory()->create(['id'=>1,'first_name'=>'T','second_name'=>'One','staff_no'=>'S1']);
        \App\Models\Subject::factory()->create(['id'=>1,'name'=>'Math']);

        $payload = [
            'classes' => [['id'=>1]],
            'teachers' => [['id'=>1]],
            'subjects' => [['id'=>1,'teacher_id'=>1]],
        ];

        $response = $this->actingAs(\App\Models\User::factory()->create(), 'sanctum')
            ->postJson('/api/v1/timetables/generate', $payload);

        $response->assertStatus(201);
        $this->assertDatabaseHas('timetable_slots', [
            'class_id'=>1, 'subject_id'=>1, 'teacher_id'=>1
        ]);
    }
}
