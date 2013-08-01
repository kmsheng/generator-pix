<?php

class HelperLib
{
    public static function getStaticVersion($files = [])
    {
        $body = '';

        foreach ($files as $f) {
            if (! file_exists($f)) {
                return md5(time());
            } else {
                $body .= file_get_contents($f);
            }
        }
        return md5($body);
    }

    public static function staticSrc($src)
    {
        if (defined('SHOW_ORIGIN_JS_CSS') and SHOW_ORIGIN_JS_CSS) {

            $parts = parse_url((preg_match('#^//#', $src) ? 'http:' : '').$src);

            // 只有在網址是 .test.pixnet 結尾或是相對路徑而且 SHOW_ORIGIN_JS_CSS = true 的情況下才會轉成 .src.
            if (!isset($parts['host']) or preg_match('#test\.pixnet$#', $parts['host'])) {
                $src = preg_replace('#\.min\.js$#', '.src.js', $src);
                $src = preg_replace('#\.min\.css$#', '.src.css', $src);
            }
        }

        return $src . '?v=' . STATIC_VERSION;
    }

    public static function isTestSite()
    {
        return (true === IS_TEST_SITE);
    }
}
