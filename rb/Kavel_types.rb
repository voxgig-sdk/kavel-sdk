# frozen_string_literal: true

# Typed models for the Kavel SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# AnonQuery entity data model.
#
# @!attribute [rw] images
#   @return [Array, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] videos
#   @return [Array, nil]
#
# @!attribute [rw] watermarked
#   @return [Array, nil]
AnonQuery = Struct.new(
  :images,
  :status,
  :videos,
  :watermarked,
  keyword_init: true
)

# Request payload for AnonQuery#load.
#
# @!attribute [rw] media_type
#   @return [String]
#
# @!attribute [rw] provider
#   @return [String]
#
# @!attribute [rw] task_id
#   @return [String]
AnonQueryLoadMatch = Struct.new(
  :media_type,
  :provider,
  :task_id,
  keyword_init: true
)

