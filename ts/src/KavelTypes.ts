// Typed models for the Kavel SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface AnonQuery {
  images?: any[]
  status: string
  videos?: any[]
  watermarked?: any[]
}

export interface AnonQueryLoadMatch {
  media_type: string
  provider: string
  task_id: string
}

