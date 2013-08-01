<?php

class ErrorController extends Pix_Controller
{
    public function errorAction()
    {
        if (! $exception = $this->view->exception) {
            header("HTTP/1.0 404", 404);
        }

        echo $exception->getMessage();
        return $this->noview();
    }
}
