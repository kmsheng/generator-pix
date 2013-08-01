<?php

class <%= _.capitalize(controllerName) %>Controller extends Pix_Controller
{
    public function indexAction()
    {
        return $this->noview();
    }

    // endbuild
}
