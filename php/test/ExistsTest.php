<?php
declare(strict_types=1);

// Kavel SDK exists test

require_once __DIR__ . '/../kavel_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = KavelSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
