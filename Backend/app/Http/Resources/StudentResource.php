<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'=>$this->id,
            'first_name'=>$this->first_name,
            'second_name'=>$this->second_name,
            'reg_no'=>$this->reg_no,
            'class'=>$this->classModel->name ?? null,
            'results'=>$this->whenLoaded('results')
        ];
    }
}
