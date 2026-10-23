<?php
declare(strict_types=1);

// Kavel SDK utility: result_headers

class KavelResultHeaders
{
    public static function call(KavelContext $ctx): ?KavelResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
