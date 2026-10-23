<?php
declare(strict_types=1);

// Typed models for the Kavel SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** AnonQuery entity data model. */
class AnonQuery
{
    public ?array $images = null;
    public string $status;
    public ?array $videos = null;
    public ?array $watermarked = null;
}

/** Request payload for AnonQuery#load. */
class AnonQueryLoadMatch
{
    public string $media_type;
    public string $provider;
    public string $task_id;
}

