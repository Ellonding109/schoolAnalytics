<?php
namespace App\Contracts;

interface SchedulerClientInterface
{
    /**
     * Send schedule request to external solver (Python) and return lessons array
     * @param array $payload
     * @return array
     */
    public function generateSchedule(array $payload): array;
}
