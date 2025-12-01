<?php 
namespace bravo\services;

use bravo\Models\Feedback;

class feedbackServices{
    private Feedback $feedback;
    private feedbackServices $FeedbackServices;

    public function __construct() {
        $this->FeedbackServices = new feedbackServices();
        $this->feedback = new Feedback();
        
    }

    
    public function getFeedback(array $data): array {
        if (!isset($data['id'])){
            return[
                'success' => false,
                'message' => 'Feedback id is required',
                'code' => 400
            ];   
        }
    $feedId = $data['id'];
    
        return[];
    }


}

?>