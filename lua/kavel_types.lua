-- Typed models for the Kavel SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class AnonQuery
---@field images? table
---@field status string
---@field videos? table
---@field watermarked? table

---@class AnonQueryLoadMatch
---@field media_type string
---@field provider string
---@field task_id string

local M = {}

return M
