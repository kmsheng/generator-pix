<?php

class ApplicationAction extends Pix_Controller
{
    public function init()
    {
    }

    public function segment($index)
    {
        $parts = explode('/', $this->getURI());

        if (array_key_exists($index, $parts)) {
            return $parts[$index];
        }
        return null;
    }
}
