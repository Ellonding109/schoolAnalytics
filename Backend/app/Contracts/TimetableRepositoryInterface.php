<?php
namespace App\Contracts;

interface TimetableRepositoryInterface
{
    public function saveSlots(array $slots): void;
    public function getSlotsForClass(int $classId): array;
    public function clearGeneratedForTerm(string $term): void;
}
