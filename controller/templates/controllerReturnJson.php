<?php

class <%= _.capitalize(controllerName) %>Controller extends Pix_Controller
{
    public function indexAction()
    {
        return $this->json([
            'error' => false,
            'message' => 'This is <%= _.capitalize(controllerName) %> Controller.',
        ]);
    }

    // endbuild
}
