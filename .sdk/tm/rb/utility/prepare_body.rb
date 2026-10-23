# Kavel SDK utility: prepare_body
require_relative 'media'
module KavelUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return KavelUtilities.raw_body(ctx.reqdata) if KavelUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
