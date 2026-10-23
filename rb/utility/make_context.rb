# Kavel SDK utility: make_context
require_relative '../core/context'
module KavelUtilities
  MakeContext = ->(ctxmap, basectx) {
    KavelContext.new(ctxmap, basectx)
  }
end
