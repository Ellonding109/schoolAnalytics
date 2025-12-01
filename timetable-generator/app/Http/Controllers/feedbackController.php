<?php

namespace bravo\controllers;

use bravo\services\feedbackServices;
class FeedbackController {

    private feedbackServices $FeedbackServices;

    public function __construct(){
        
        $this->FeedbackServices = new feedbackServices();
    } 
    public function getFeedback(array $data): array{
        return $this->FeedbackServices->getFeedback($data);
    }

}
?>