<?php

if (file_exists(__DIR__ . "/debug.php")) {
    require __DIR__ . "/debug.php";
}

require __DIR__ . '/../vendor/autoload.php';

Pix_Loader::registerAutoload();

define('DOMAIN_APPEND', '');
define('STATIC_VERSION', HelperLib::getStaticVersion([__DIR__ . "/../fingerprint.txt"]));

Pix_Controller::addCommonHelpers();
Pix_Partial::setTrimMode(true);
Pix_Partial::addCommonHelpers();
Pix_Controller::dispatch(__DIR__);
