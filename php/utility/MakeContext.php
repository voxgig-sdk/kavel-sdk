<?php
declare(strict_types=1);

// Kavel SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class KavelMakeContext
{
    public static function call(array $ctxmap, ?KavelContext $basectx): KavelContext
    {
        return new KavelContext($ctxmap, $basectx);
    }
}
