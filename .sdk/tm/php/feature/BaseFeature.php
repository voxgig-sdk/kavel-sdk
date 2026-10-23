<?php
declare(strict_types=1);

// Kavel SDK base feature

class KavelBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(KavelContext $ctx, array $options): void {}
    public function PostConstruct(KavelContext $ctx): void {}
    public function PostConstructEntity(KavelContext $ctx): void {}
    public function SetData(KavelContext $ctx): void {}
    public function GetData(KavelContext $ctx): void {}
    public function GetMatch(KavelContext $ctx): void {}
    public function SetMatch(KavelContext $ctx): void {}
    public function PrePoint(KavelContext $ctx): void {}
    public function PreSpec(KavelContext $ctx): void {}
    public function PreRequest(KavelContext $ctx): void {}
    public function PreResponse(KavelContext $ctx): void {}
    public function PreResult(KavelContext $ctx): void {}
    public function PreDone(KavelContext $ctx): void {}
    public function PreUnexpected(KavelContext $ctx): void {}
}
